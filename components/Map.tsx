"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import candyData from "../data/candies.json";

// --- Define our custom spooky icons ---
const pumpkinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const collectedIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [20, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// --- Define the props our component will accept ---
interface MapProps {
  collectedCandies: number[];
  onCollectCandy: (candyId: number) => void;
  theme: string | undefined;
}

export default function Map({
  collectedCandies,
  onCollectCandy,
  theme,
}: MapProps) {
  const initialPosition: L.LatLngExpression = [40.713, -74.003];
  const isDarkMode = theme === "dark";
  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={initialPosition}
      zoom={16}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        key={theme} // Add a key to force re-render on theme change
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={isDarkMode ? darkTileUrl : lightTileUrl}
      />

      {candyData.map((candy) => {
        const isCollected = collectedCandies.includes(candy.id);

        return (
          <Marker
            key={candy.id}
            position={candy.coords as L.LatLngExpression}
            icon={isCollected ? collectedIcon : pumpkinIcon} // <-- Dynamically set the icon!
            eventHandlers={{
              click: () => {
                if (!isCollected) {
                  onCollectCandy(candy.id);
                }
              },
            }}
          >
            <Popup>
              <div className="text-center text-black">
                <h3 className="font-bold">{candy.name}</h3>
                {isCollected ? (
                  <p className="text-gray-500">
                    You've already found this treat!
                  </p>
                ) : (
                  <p>Click to collect this treat!</p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
