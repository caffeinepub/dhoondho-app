import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { List, Map as MapIcon, Search } from "lucide-react";
import { Suspense, lazy, useState } from "react";
import type { SearchParams } from "../App";
import type { Listing } from "../backend";
import ListingCard from "../components/ListingCard";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import { useCategories, useSearchByCity } from "../hooks/useQueries";

const MapView = lazy(() => import("../components/MapView"));

export default function SearchPage() {
  const searchParams = useSearch({ from: "/search" }) as SearchParams;
  const navigate = useNavigate();

  const [cityInput, setCityInput] = useState(searchParams.city ?? "");
  const [radius, setRadius] = useState(searchParams.radius ?? 10);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.category ?? "",
  );
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { data: backendCategories } = useCategories();
  const categories = backendCategories?.length
    ? backendCategories
    : SAMPLE_CATEGORIES;

  const { data: cityListings, isLoading } = useSearchByCity(
    searchParams.city ?? "",
  );

  let listings: Listing[] = [];
  if (searchParams.city) {
    const backendResults = cityListings ?? [];
    const sampleResults = SAMPLE_LISTINGS.filter(
      (l) =>
        l.status === "approved" &&
        l.city.toLowerCase().includes((searchParams.city ?? "").toLowerCase()),
    );
    const combined = [...backendResults];
    for (const s of sampleResults) {
      if (!combined.find((r) => r.id === s.id)) combined.push(s);
    }
    listings = combined;
  } else {
    listings = SAMPLE_LISTINGS.filter((l) => l.status === "approved");
  }

  if (selectedCategory) {
    listings = listings.filter(
      (l) => l.categoryId.toString() === selectedCategory,
    );
  }

  const handleSearch = () => {
    const search: SearchParams = { city: cityInput.trim() };
    navigate({ to: "/search", search });
  };

  const mapCenter: [number, number] =
    searchParams.lat && searchParams.lng
      ? [searchParams.lat, searchParams.lng]
      : [20.5937, 78.9629];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Search bar */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={17}
          />
          <input
            type="text"
            placeholder="Search city or area..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            data-ocid="search.input"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-orange hover:bg-orange/90 text-white rounded-xl"
          data-ocid="search.primary_button"
        >
          Search
        </Button>
        {searchParams.lat && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Radius: {radius} km
            </span>
            <Slider
              min={5}
              max={50}
              step={5}
              value={[radius]}
              onValueChange={([v]) => setRadius(v)}
              className="w-32"
            />
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-card rounded-xl border border-border p-4 sticky top-20">
            <h3 className="font-semibold text-foreground mb-3">Categories</h3>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("")}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-secondary"
                }`}
                data-ocid="filter.tab"
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.id.toString()}
                  onClick={() =>
                    setSelectedCategory(
                      cat.id.toString() === selectedCategory
                        ? ""
                        : cat.id.toString(),
                    )
                  }
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.id.toString()
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-secondary"
                  }`}
                  data-ocid="filter.tab"
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Searching..."
                : `${listings.length} result${listings.length !== 1 ? "s" : ""} found`}
              {searchParams.city ? ` in "${searchParams.city}"` : ""}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary text-white" : ""}
                data-ocid="view.toggle"
              >
                <List size={15} className="mr-1" /> List
              </Button>
              <Button
                size="sm"
                variant={viewMode === "map" ? "default" : "outline"}
                onClick={() => setViewMode("map")}
                className={viewMode === "map" ? "bg-primary text-white" : ""}
                data-ocid="view.toggle"
              >
                <MapIcon size={15} className="mr-1" /> Map
              </Button>
            </div>
          </div>

          {/* Map view — always mounted to keep Leaflet instance alive */}
          <div style={{ display: viewMode === "map" ? "block" : "none" }}>
            <Suspense
              fallback={<div className="h-96 bg-secondary rounded-xl" />}
            >
              <MapView
                listings={listings}
                categories={categories}
                center={mapCenter}
                zoom={searchParams.city ? 12 : 5}
                height="600px"
              />
            </Suspense>
          </div>

          {/* List view — always mounted, hidden when map is active */}
          <div style={{ display: viewMode === "list" ? "block" : "none" }}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-52 rounded-xl"
                    data-ocid="listing.loading_state"
                  />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div
                className="bg-card rounded-xl border border-border p-16 text-center"
                data-ocid="listing.empty_state"
              >
                <Search
                  size={40}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h3 className="font-semibold text-foreground mb-2">
                  No results found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try a different city or category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {listings.map((listing, i) => (
                  <ListingCard
                    key={listing.id.toString()}
                    listing={listing}
                    categories={categories}
                    index={i + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
