import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Category,
  Listing,
  ListingInput,
  Location,
  UserProfile,
  UserRole,
  Vendor,
} from "../backend";
import { type ListingStatus, SortBy } from "../backend";
import { useActor } from "./useActor";

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchByCity(city: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Listing[]>({
    queryKey: ["search", "city", city],
    queryFn: async () => {
      if (!actor || !city) return [];
      return actor.searchListingsByCity(city);
    },
    enabled: !!actor && !isFetching && !!city,
  });
}

export function useSearchByLocation(
  categoryId: bigint | null,
  center: Location | null,
  radius: number,
) {
  const { actor, isFetching } = useActor();
  return useQuery<Listing[]>({
    queryKey: [
      "search",
      "location",
      categoryId?.toString(),
      center?.lat,
      center?.lng,
      radius,
    ],
    queryFn: async () => {
      if (!actor || !center || categoryId === null) return [];
      return actor.getListingsByCategoryAndLocation(
        categoryId,
        center,
        radius,
        SortBy.byDistance,
      );
    },
    enabled: !!actor && !isFetching && !!center && categoryId !== null,
  });
}

export function usePendingListings() {
  const { actor, isFetching } = useActor();
  return useQuery<Listing[]>({
    queryKey: ["pendingListings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllVendors() {
  const { actor, isFetching } = useActor();
  return useQuery<Vendor[]>({
    queryKey: ["allVendors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVendors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ListingInput) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.submitListing(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pendingListings"] }),
  });
}

export function useUpdateListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: ListingInput }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateListing(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["search"] }),
  });
}

export function useDeleteListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteListing(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["search"] }),
  });
}

export function useChangeListingStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: ListingStatus }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.changeListingStatus(id, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingListings"] });
      qc.invalidateQueries({ queryKey: ["search"] });
    },
  });
}

export function useAdminDeleteListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.adminDeleteListing(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pendingListings"] });
      qc.invalidateQueries({ queryKey: ["search"] });
    },
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["callerUserProfile"] }),
  });
}

export function useAddCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cat: {
      name: string;
      icon: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.addCategory({ id: 0n, ...cat });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, cat }: { id: bigint; cat: Category }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateCategory(id, cat);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteCategory(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}
