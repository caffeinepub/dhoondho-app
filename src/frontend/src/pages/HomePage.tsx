import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronRight,
  MapPin,
  Search,
  Settings,
  Star,
  Store,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Suspense, lazy, useState } from "react";
import type { SearchParams } from "../App";
import ListingCard from "../components/ListingCard";
import { SAMPLE_CATEGORIES, SAMPLE_LISTINGS } from "../data/sampleData";
import { useCategories } from "../hooks/useQueries";

const MapView = lazy(() => import("../components/MapView"));

const BUSINESS_FEATURES = [
  {
    key: "free",
    icon: <CheckCircle className="text-primary" size={22} />,
    title: "Free Listing",
    desc: "List your business at no cost",
  },
  {
    key: "visibility",
    icon: <Zap className="text-primary" size={22} />,
    title: "Instant Visibility",
    desc: "Get found by local customers",
  },
  {
    key: "trust",
    icon: <Star className="text-primary" size={22} />,
    title: "Build Trust",
    desc: "Collect reviews & grow",
  },
];

const ADMIN_FEATURES = [
  "\u2705 Approve pending listings",
  "\ud83d\udccb Manage categories",
  "\ud83d\udc65 View all vendors",
  "\ud83d\uddd1\ufe0f Delete or edit any listing",
];

export default function HomePage() {
  const [searchCity, setSearchCity] = useState("");
  const [radius, setRadius] = useState(10);
  const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();
  const { data: backendCategories } = useCategories();

  const categories = backendCategories?.length
    ? backendCategories
    : SAMPLE_CATEGORIES;

  const handleSearch = () => {
    if (searchCity.trim()) {
      const search: SearchParams = { city: searchCity.trim() };
      navigate({ to: "/search", search });
    }
  };

  const handleUseLocation = () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationLoading(false);
        const search: SearchParams = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          radius,
        };
        navigate({ to: "/search", search });
      },
      () => {
        setLocationLoading(false);
        alert("Could not get your location. Please allow location access.");
      },
    );
  };

  const approvedListings = SAMPLE_LISTINGS.filter(
    (l) => l.status === "approved",
  );

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-india-market.dim_1920x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Dhoondho — Find Local Services Across India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-lg mb-8"
          >
            Search restaurants, doctors, salons, plumbers, and more — by city or
            near your location.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-4 shadow-xl"
          >
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search city, area or business... e.g. Mumbai, Bandra"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  data-ocid="search.input"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-orange hover:bg-orange/90 text-white px-6 rounded-xl font-semibold"
                data-ocid="search.primary_button"
              >
                Search
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                variant="outline"
                onClick={handleUseLocation}
                disabled={locationLoading}
                className="text-sm flex items-center gap-2 rounded-xl border-primary/30 text-primary"
                data-ocid="search.secondary_button"
              >
                <MapPin size={15} />
                {locationLoading ? "Getting location..." : "Use My Location"}
              </Button>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Radius: {radius} km
                </span>
                <Slider
                  min={5}
                  max={50}
                  step={5}
                  value={[radius]}
                  onValueChange={([v]) => setRadius(v)}
                  className="flex-1"
                  data-ocid="search.select"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Popular Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Popular Categories
            </h2>
            <Button
              variant="ghost"
              className="text-primary text-sm gap-1"
              onClick={() => navigate({ to: "/search", search: {} })}
            >
              View all <ChevronRight size={15} />
            </Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id.toString()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() =>
                  navigate({
                    to: "/search",
                    search: { category: cat.id.toString() },
                  })
                }
                className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-2 hover:border-primary/50 hover:shadow-card transition-all cursor-pointer group"
                data-ocid={`category.item.${i + 1}`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground text-center leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Map view */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Explore on the Map
            </h2>
            <Button
              variant="outline"
              className="text-sm text-primary border-primary/30"
              onClick={() => navigate({ to: "/search", search: {} })}
            >
              Show List View
            </Button>
          </div>
          <Suspense
            fallback={
              <div className="h-96 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground">
                Loading map...
              </div>
            }
          >
            <MapView
              listings={approvedListings}
              categories={categories}
              center={[20.5937, 78.9629]}
              zoom={5}
              height="420px"
            />
          </Suspense>
        </section>

        {/* Featured listings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Featured Local Listings
            </h2>
            <Button
              variant="ghost"
              className="text-primary text-sm gap-1"
              onClick={() => navigate({ to: "/search", search: {} })}
            >
              View all <ChevronRight size={15} />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {approvedListings.slice(0, 4).map((listing, i) => (
              <ListingCard
                key={listing.id.toString()}
                listing={listing}
                categories={categories}
                index={i + 1}
              />
            ))}
          </div>
        </section>

        {/* For Business Owners */}
        <section className="bg-secondary rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Store className="text-primary" size={22} />
                <h2 className="text-2xl font-bold text-foreground">
                  For Business Owners
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                List your business on Dhoondho.App and reach thousands of local
                customers searching for your services every day.
              </p>
              <Button
                className="bg-orange hover:bg-orange/90 text-white rounded-xl px-6"
                onClick={() => navigate({ to: "/vendor" })}
                data-ocid="business.primary_button"
              >
                Add Your Business Free
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BUSINESS_FEATURES.map((feat) => (
                <div
                  key={feat.key}
                  className="bg-card rounded-xl p-4 border border-border"
                >
                  {feat.icon}
                  <h4 className="font-semibold text-foreground mt-2 mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Admins */}
        <section className="bg-secondary rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="text-primary" size={22} />
                <h2 className="text-2xl font-bold text-foreground">
                  For Admins
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Manage all listings, approve vendors, control categories, and
                keep the directory accurate and up to date.
              </p>
              <Button
                className="bg-navy hover:bg-navy/90 text-white rounded-xl px-6"
                onClick={() => navigate({ to: "/admin" })}
                data-ocid="admin.primary_button"
              >
                Go to Admin Panel
              </Button>
            </div>
            <div className="flex-1 bg-card rounded-xl border border-border p-4">
              <div className="space-y-2">
                {ADMIN_FEATURES.map((item) => (
                  <div
                    key={item}
                    className="text-sm text-foreground py-2 px-3 bg-secondary rounded-lg"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
