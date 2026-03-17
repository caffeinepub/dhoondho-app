import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2, Plus, Store, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ListingInput } from "../backend";
import { ListingStatus } from "../backend";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCallerUserProfile,
  useCategories,
  useDeleteListing,
  useSaveCallerUserProfile,
  useSubmitListing,
} from "../hooks/useQueries";

const emptyForm = (): Omit<ListingInput, "categoryId"> & {
  categoryId: string;
} => ({
  categoryId: "",
  name: "",
  description: "",
  address: "",
  city: "",
  state: "",
  phone: "",
  website: "",
  photoIds: [],
  location: { lat: 0, lng: 0 },
});

export default function VendorPortalPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useCallerUserProfile();
  const { data: backendCategories } = useCategories();
  const categories = backendCategories?.length
    ? backendCategories
    : SAMPLE_CATEGORIES;

  const saveProfile = useSaveCallerUserProfile();
  const submitListing = useSubmitListing();
  const deleteListing = useDeleteListing();

  const [profileForm, setProfileForm] = useState({
    name: "",
    businessName: "",
    phone: "",
  });
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showListingForm, setShowListingForm] = useState(false);
  const [form, setForm] = useState(emptyForm());

  // Vendor's own listings from sample data (demo)
  const myListings = SAMPLE_LISTINGS.filter((l) => l.status !== undefined);

  const statusColors: Record<ListingStatus, string> = {
    [ListingStatus.approved]: "bg-green-100 text-green-700",
    [ListingStatus.pending]: "bg-yellow-100 text-yellow-700",
    [ListingStatus.rejected]: "bg-red-100 text-red-700",
  };

  const handleSaveProfile = async () => {
    try {
      await saveProfile.mutateAsync(profileForm);
      toast.success("Profile saved!");
      setShowProfileSetup(false);
    } catch {
      toast.error("Failed to save profile");
    }
  };

  const handleSubmitListing = async () => {
    if (!form.categoryId || !form.name || !form.city) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      await submitListing.mutateAsync({
        ...form,
        categoryId: BigInt(form.categoryId),
      });
      toast.success("Listing submitted for review!");
      setShowListingForm(false);
      setForm(emptyForm());
    } catch {
      toast.error("Failed to submit listing");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this listing?")) return;
    try {
      await deleteListing.mutateAsync(id);
      toast.success("Listing deleted");
    } catch {
      toast.error("Failed to delete listing");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-card rounded-2xl border border-border p-10">
          <Store className="mx-auto text-primary mb-4" size={48} />
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Vendor Portal
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign in to manage your business listings, add new services, and
            track your presence on Dhoondho.App.
          </p>
          <Button
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8"
            data-ocid="vendor.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Signing in...
              </>
            ) : (
              "Sign In to Continue"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-8"
        data-ocid="vendor.loading_state"
      >
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  const principalShort = identity
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Vendor Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {userProfile?.name ?? principalShort}
          </p>
        </div>
        <Button
          onClick={() => setShowListingForm(true)}
          className="bg-primary text-white rounded-xl flex items-center gap-2"
          data-ocid="vendor.primary_button"
        >
          <Plus size={16} /> Add New Listing
        </Button>
      </div>

      {/* Profile setup prompt */}
      {isFetched && !userProfile && !showProfileSetup && (
        <div className="bg-secondary rounded-xl border border-border p-5 mb-6 flex items-center justify-between">
          <p className="text-sm text-foreground">
            Complete your vendor profile to get started
          </p>
          <Button
            variant="outline"
            onClick={() => setShowProfileSetup(true)}
            data-ocid="vendor.secondary_button"
          >
            Setup Profile
          </Button>
        </div>
      )}

      {/* Profile form */}
      {showProfileSetup && (
        <div
          className="bg-card rounded-xl border border-border p-6 mb-6"
          data-ocid="vendor.panel"
        >
          <h3 className="font-semibold text-foreground mb-4">Vendor Profile</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <Label>Your Name</Label>
              <Input
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Rahul Sharma"
                data-ocid="vendor.input"
              />
            </div>
            <div>
              <Label>Business Name</Label>
              <Input
                value={profileForm.businessName}
                onChange={(e) =>
                  setProfileForm((p) => ({
                    ...p,
                    businessName: e.target.value,
                  }))
                }
                placeholder="My Shop"
                data-ocid="vendor.input"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                data-ocid="vendor.input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSaveProfile}
              disabled={saveProfile.isPending}
              className="bg-primary text-white"
              data-ocid="vendor.submit_button"
            >
              {saveProfile.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Save Profile"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowProfileSetup(false)}
              data-ocid="vendor.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Add listing form */}
      {showListingForm && (
        <div
          className="bg-card rounded-xl border border-border p-6 mb-6"
          data-ocid="vendor.panel"
        >
          <h3 className="font-semibold text-foreground mb-4">
            Add New Listing
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Business Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="My Restaurant"
                data-ocid="listing.input"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select
                value={form.categoryId}
                onValueChange={(v) => setForm((f) => ({ ...f, categoryId: v }))}
              >
                <SelectTrigger data-ocid="listing.select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id.toString()} value={c.id.toString()}>
                      {c.icon} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>City *</Label>
              <Input
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                placeholder="Mumbai"
                data-ocid="listing.input"
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={form.state}
                onChange={(e) =>
                  setForm((f) => ({ ...f, state: e.target.value }))
                }
                placeholder="Maharashtra"
                data-ocid="listing.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                placeholder="Shop No. 5, ABC Market"
                data-ocid="listing.input"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                data-ocid="listing.input"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) =>
                  setForm((f) => ({ ...f, website: e.target.value }))
                }
                placeholder="https://mybusiness.com"
                data-ocid="listing.input"
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe your business..."
                rows={3}
                data-ocid="listing.textarea"
              />
            </div>
            <div>
              <Label>Latitude</Label>
              <Input
                type="number"
                value={form.location.lat || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    location: {
                      ...f.location,
                      lat: Number.parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                placeholder="19.0760"
                data-ocid="listing.input"
              />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input
                type="number"
                value={form.location.lng || ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    location: {
                      ...f.location,
                      lng: Number.parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                placeholder="72.8777"
                data-ocid="listing.input"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSubmitListing}
              disabled={submitListing.isPending}
              className="bg-primary text-white"
              data-ocid="listing.submit_button"
            >
              {submitListing.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Submit for Review"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowListingForm(false)}
              data-ocid="listing.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* My Listings */}
      <div>
        <h2 className="font-semibold text-foreground mb-4">My Listings</h2>
        {myListings.length === 0 ? (
          <div
            className="bg-card rounded-xl border border-border p-12 text-center"
            data-ocid="listing.empty_state"
          >
            <Store size={36} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              No listings yet. Add your first business!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myListings.map((listing, i) => {
              const cat = categories.find((c) => c.id === listing.categoryId);
              return (
                <div
                  key={listing.id.toString()}
                  className="bg-card rounded-xl border border-border p-4 flex items-start justify-between gap-4"
                  data-ocid={`listing.item.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{cat?.icon ?? "🏢"}</span>
                      <span className="font-semibold text-foreground truncate">
                        {listing.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[listing.status]}`}
                      >
                        {listing.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {listing.city}, {listing.state}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-primary border-primary/30"
                      data-ocid={`listing.edit_button.${i + 1}`}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30"
                      onClick={() => handleDelete(listing.id)}
                      data-ocid={`listing.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
