import "leaflet/dist/leaflet.css";
import { Link } from "@tanstack/react-router";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Category, Listing } from "../backend";

// Fix Leaflet default marker icons (broken by bundlers that hash asset paths)
(L.Icon.Default.prototype as any)._getIconUrl = undefined;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * MapUpdater lives *inside* MapContainer so it has access to the live map
 * instance via useMap(). It calls setView() imperatively whenever center or
 * zoom props change, which is the correct React-Leaflet pattern and avoids
 * the "_leaflet_events" crash caused by key-based remounting.
 */
function MapUpdater({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    // Guard: map instance must still be mounted and its container present
    if (!map || !map.getContainer()) return;
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

interface MapViewProps {
  listings: Listing[];
  categories: Category[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export default function MapView({
  listings,
  categories,
  center = [20.5937, 78.9629],
  zoom = 5,
  height = "400px",
}: MapViewProps) {
  const getCategoryName = (id: bigint) =>
    categories.find((c) => c.id === id)?.name ?? "Business";

  return (
    <div
      style={{ height }}
      className="rounded-xl overflow-hidden border border-border"
      data-ocid="map.canvas_target"
    >
      {/*
       * MapContainer must NOT receive a changing `key` prop.
       * React-Leaflet manages the underlying L.map instance for its full
       * lifetime; forcing a key change destroys and recreates the DOM node
       * while Leaflet still holds references to it, triggering the
       * "_leaflet_events" error.
       *
       * center/zoom are initial values only; MapUpdater handles subsequent
       * changes without touching the map instance lifecycle.
       */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Keeps view in sync with prop changes without remounting */}
        <MapUpdater center={center} zoom={zoom} />

        {listings.map((l) => (
          <Marker
            key={l.id.toString()}
            position={[l.location.lat, l.location.lng]}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{l.name}</p>
                <p className="text-muted-foreground">
                  {getCategoryName(l.categoryId)}
                </p>
                <p>
                  {l.city}, {l.state}
                </p>
                <Link
                  to="/listing/$id"
                  params={{ id: l.id.toString() }}
                  className="text-blue-600 underline"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
