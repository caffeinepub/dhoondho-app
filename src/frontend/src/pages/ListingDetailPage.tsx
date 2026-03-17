import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Globe, MapPin, Phone } from "lucide-react";
import { Suspense, lazy } from "react";
import type { SearchParams } from "../App";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import { useCategories } from "../hooks/useQueries";

const MapView = lazy(() => import("../components/MapView"));
const emptySearch: SearchParams = {};

export default function ListingDetailPage() {
  const { id } = useParams({ from: "/listing/$id" });
  const { data: backendCategories } = useCategories();
  const categories = backendCategories?.length
    ? backendCategories
    : SAMPLE_CATEGORIES;

  const listing = SAMPLE_LISTINGS.find((l) => l.id.toString() === id);

  if (!listing) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        data-ocid="listing.error_state"
      >
        <h2 className="text-2xl font-bold mb-3">Listing not found</h2>
        <Link to="/search" search={emptySearch}>
          <Button className="bg-primary text-white">Back to Search</Button>
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === listing.categoryId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/search"
        search={emptySearch}
        className="inline-flex items-center gap-1.5 text-sm text-primary mb-6 hover:underline"
      >
        <ArrowLeft size={15} />
        Back to Search
      </Link>

      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{category?.icon ?? "🏢"}</span>
              <Badge variant="secondary" className="text-xs">
                {category?.name ?? "Business"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {listing.name}
            </h1>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {listing.description}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-0.5 shrink-0" size={17} />
              <div>
                <p className="text-sm font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">
                  {listing.address}, {listing.city}, {listing.state}
                </p>
              </div>
            </div>
            {listing.phone && (
              <div className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5 shrink-0" size={17} />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {listing.phone}
                  </a>
                </div>
              </div>
            )}
            {listing.website && (
              <div className="flex items-start gap-3">
                <Globe className="text-primary mt-0.5 shrink-0" size={17} />
                <div>
                  <p className="text-sm font-medium text-foreground">Website</p>
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {listing.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">Location</h3>
        <Suspense fallback={<div className="h-64 bg-secondary rounded-xl" />}>
          <MapView
            listings={[listing]}
            categories={categories}
            center={[listing.location.lat, listing.location.lng]}
            zoom={15}
            height="300px"
          />
        </Suspense>
      </div>
    </div>
  );
}
