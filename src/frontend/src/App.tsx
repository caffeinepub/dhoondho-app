import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ListingDetailPage from "./pages/ListingDetailPage";
import SearchPage from "./pages/SearchPage";
import VendorPortalPage from "./pages/VendorPortalPage";

export type SearchParams = {
  city?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  category?: string;
};

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    city: typeof search.city === "string" ? search.city : undefined,
    lat: typeof search.lat === "number" ? search.lat : undefined,
    lng: typeof search.lng === "number" ? search.lng : undefined,
    radius: typeof search.radius === "number" ? search.radius : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
  }),
});

const listingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listing/$id",
  component: ListingDetailPage,
});

const vendorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor",
  component: VendorPortalPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  listingRoute,
  vendorRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
