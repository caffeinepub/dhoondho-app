import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Loader2,
  Plus,
  ShieldAlert,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ListingStatus } from "../backend";
import { SAMPLE_CATEGORIES } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddCategory,
  useAdminDeleteListing,
  useAllVendors,
  useCategories,
  useChangeListingStatus,
  useDeleteCategory,
  useIsCallerAdmin,
  usePendingListings,
} from "../hooks/useQueries";

export default function AdminPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: pendingListings, isLoading: pendingLoading } =
    usePendingListings();
  const { data: vendors, isLoading: vendorsLoading } = useAllVendors();
  const { data: backendCategories, isLoading: catsLoading } = useCategories();
  const categories = backendCategories?.length
    ? backendCategories
    : SAMPLE_CATEGORIES;

  const changeStatus = useChangeListingStatus();
  const adminDelete = useAdminDeleteListing();
  const addCategory = useAddCategory();
  const deleteCategory = useDeleteCategory();

  const [search, setSearch] = useState("");
  const [newCat, setNewCat] = useState({ name: "", icon: "", description: "" });

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-card rounded-2xl border border-border p-10">
          <ShieldAlert className="mx-auto text-primary mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-3">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">
            Sign in with an admin account to access this panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="bg-primary text-white rounded-xl px-8"
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div
        className="max-w-5xl mx-auto px-4 py-8"
        data-ocid="admin.loading_state"
      >
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center"
        data-ocid="admin.error_state"
      >
        <ShieldAlert className="mx-auto text-destructive mb-4" size={48} />
        <h1 className="text-2xl font-bold mb-3">Access Denied</h1>
        <p className="text-muted-foreground">
          You don't have admin privileges.
        </p>
      </div>
    );
  }

  const handleApprove = async (id: bigint) => {
    try {
      await changeStatus.mutateAsync({ id, status: ListingStatus.approved });
      toast.success("Listing approved");
    } catch {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (id: bigint) => {
    try {
      await changeStatus.mutateAsync({ id, status: ListingStatus.rejected });
      toast.success("Listing rejected");
    } catch {
      toast.error("Failed to reject");
    }
  };

  const handleAdminDelete = async (id: bigint) => {
    if (!confirm("Delete this listing permanently?")) return;
    try {
      await adminDelete.mutateAsync(id);
      toast.success("Listing deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleAddCategory = async () => {
    if (!newCat.name.trim()) {
      toast.error("Category name required");
      return;
    }
    try {
      await addCategory.mutateAsync(newCat);
      toast.success("Category added");
      setNewCat({ name: "", icon: "", description: "" });
    } catch {
      toast.error("Failed to add category");
    }
  };

  const handleDeleteCategory = async (id: bigint) => {
    if (!confirm("Delete category?")) return;
    try {
      await deleteCategory.mutateAsync(id);
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Panel</h1>

      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending" data-ocid="admin.tab">
            Pending Listings
          </TabsTrigger>
          <TabsTrigger value="categories" data-ocid="admin.tab">
            Categories
          </TabsTrigger>
          <TabsTrigger value="vendors" data-ocid="admin.tab">
            Vendors
          </TabsTrigger>
        </TabsList>

        {/* Pending Listings */}
        <TabsContent value="pending">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">
                Pending Listings
              </h2>
              <p className="text-sm text-muted-foreground">
                Review and approve or reject submitted listings
              </p>
            </div>
            {pendingLoading ? (
              <div className="p-6 space-y-3" data-ocid="admin.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : !pendingListings || pendingListings.length === 0 ? (
              <div className="p-12 text-center" data-ocid="pending.empty_state">
                <CheckCircle
                  className="mx-auto text-green-500 mb-3"
                  size={36}
                />
                <p className="text-muted-foreground">
                  No pending listings. All caught up!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pendingListings.map((listing, i) => (
                  <div
                    key={listing.id.toString()}
                    className="p-4 flex items-start justify-between gap-4"
                    data-ocid={`pending.item.${i + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {listing.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {listing.city}, {listing.state}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {listing.description}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleApprove(listing.id)}
                        disabled={changeStatus.isPending}
                        data-ocid={`pending.confirm_button.${i + 1}`}
                      >
                        <CheckCircle size={14} className="mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive/30"
                        onClick={() => handleReject(listing.id)}
                        disabled={changeStatus.isPending}
                        data-ocid={`pending.cancel_button.${i + 1}`}
                      >
                        <XCircle size={14} className="mr-1" /> Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive/30"
                        onClick={() => handleAdminDelete(listing.id)}
                        data-ocid={`pending.delete_button.${i + 1}`}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">
                Manage Categories
              </h2>
            </div>

            {/* Add category */}
            <div className="p-4 border-b border-border bg-secondary/50">
              <div className="flex gap-3 flex-wrap">
                <Input
                  placeholder="Category name"
                  value={newCat.name}
                  onChange={(e) =>
                    setNewCat((c) => ({ ...c, name: e.target.value }))
                  }
                  className="w-40"
                  data-ocid="category.input"
                />
                <Input
                  placeholder="Icon emoji 🏠"
                  value={newCat.icon}
                  onChange={(e) =>
                    setNewCat((c) => ({ ...c, icon: e.target.value }))
                  }
                  className="w-32"
                  data-ocid="category.input"
                />
                <Input
                  placeholder="Description"
                  value={newCat.description}
                  onChange={(e) =>
                    setNewCat((c) => ({ ...c, description: e.target.value }))
                  }
                  className="w-48"
                  data-ocid="category.input"
                />
                <Button
                  onClick={handleAddCategory}
                  disabled={addCategory.isPending}
                  className="bg-primary text-white"
                  data-ocid="category.submit_button"
                >
                  {addCategory.isPending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Plus size={14} className="mr-1" /> Add
                    </>
                  )}
                </Button>
              </div>
            </div>

            {catsLoading ? (
              <div className="p-4 space-y-2" data-ocid="category.loading_state">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {categories.map((cat, i) => (
                  <div
                    key={cat.id.toString()}
                    className="p-4 flex items-center justify-between"
                    data-ocid={`category.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <p className="font-medium text-foreground">
                          {cat.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30"
                      onClick={() => handleDeleteCategory(cat.id)}
                      data-ocid={`category.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Vendors */}
        <TabsContent value="vendors">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Registered Vendors
              </h2>
              <Input
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48"
                data-ocid="vendor.search_input"
              />
            </div>
            {vendorsLoading ? (
              <div className="p-4 space-y-2" data-ocid="vendor.loading_state">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-12" />
                ))}
              </div>
            ) : !vendors || vendors.length === 0 ? (
              <div className="p-12 text-center" data-ocid="vendor.empty_state">
                <p className="text-muted-foreground">
                  No vendors registered yet.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {vendors
                  .filter(
                    (v) =>
                      !search ||
                      v.name.toLowerCase().includes(search.toLowerCase()) ||
                      v.businessName
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map((vendor, i) => (
                    <div
                      key={vendor.principal.toString()}
                      className="p-4"
                      data-ocid={`vendor.item.${i + 1}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">
                            {vendor.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {vendor.businessName} · {vendor.phone}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {vendor.principal.toString().slice(0, 20)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
