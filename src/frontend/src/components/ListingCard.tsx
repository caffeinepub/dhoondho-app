import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Globe, MapPin, Phone, Tag } from "lucide-react";
import type { Category, Listing } from "../backend";
import { ListingStatus } from "../backend";

interface ListingCardProps {
  listing: Listing;
  categories: Category[];
  showStatus?: boolean;
  index?: number;
}

export default function ListingCard({
  listing,
  categories,
  showStatus = false,
  index = 1,
}: ListingCardProps) {
  const category = categories.find((c) => c.id === listing.categoryId);

  const statusColor = {
    [ListingStatus.approved]: "bg-green-100 text-green-700",
    [ListingStatus.pending]: "bg-yellow-100 text-yellow-700",
    [ListingStatus.rejected]: "bg-red-100 text-red-700",
  };

  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id.toString() }}
      className="block"
      data-ocid={`listing.item.${index}`}
    >
      <div className="bg-card rounded-xl border border-border hover:shadow-card transition-shadow p-5 h-full flex flex-col">
        {/* Category + Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span className="text-base">{category?.icon ?? "🏢"}</span>
            {category?.name ?? "Business"}
          </span>
          {showStatus && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor[listing.status]}`}
            >
              {listing.status}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-foreground text-lg mb-1 leading-tight line-clamp-1">
          {listing.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {listing.description}
        </p>

        {/* Details */}
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-start gap-1.5">
            <MapPin size={13} className="mt-0.5 shrink-0 text-primary" />
            <span className="line-clamp-1">
              {listing.address}, {listing.city}, {listing.state}
            </span>
          </div>
          {listing.phone && (
            <div className="flex items-center gap-1.5">
              <Phone size={13} className="shrink-0 text-primary" />
              <span>{listing.phone}</span>
            </div>
          )}
          {listing.website && (
            <div className="flex items-center gap-1.5">
              <Globe size={13} className="shrink-0 text-primary" />
              <span className="line-clamp-1">
                {listing.website.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
