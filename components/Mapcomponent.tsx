"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  from: { lat: number; lng: number };
  to: { lat: number; lng: number };
  fromLabel: string;
  toLabel: string;
}

// Fix for default marker icons in Leaflet with Next.js
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const startIcon = createCustomIcon("#10b981"); // Green
const endIcon = createCustomIcon("#ff5500"); // Orange

// Component to fit map bounds
function MapBounds({ from, to }: { from: { lat: number; lng: number }; to: { lat: number; lng: number } }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([
      [from.lat, from.lng],
      [to.lat, to.lng],
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, from, to]);

  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ from, to, fromLabel, toLabel }) => {
  // Calculate midpoint for initial center
  const center: [number, number] = [
    (from.lat + to.lat) / 2,
    (from.lng + to.lng) / 2,
  ];

  // Create a curved path
  const pathOptions = {
    color: "#ff5500",
    weight: 4,
    opacity: 0.8,
    dashArray: "10, 10",
  };

  // Generate intermediate points for a curved line
  const generateCurvedPath = () => {
    const points: [number, number][] = [];
    const numPoints = 50;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      
      // Interpolate between start and end
      const lat = from.lat + (to.lat - from.lat) * t;
      const lng = from.lng + (to.lng - from.lng) * t;
      
      // Add a curve by offsetting perpendicular to the line
      const perpOffset = Math.sin(t * Math.PI) * 2; // Adjust curve intensity
      const angle = Math.atan2(to.lat - from.lat, to.lng - from.lng) + Math.PI / 2;
      
      const curvedLat = lat + perpOffset * Math.cos(angle);
      const curvedLng = lng + perpOffset * Math.sin(angle);
      
      points.push([curvedLat, curvedLng]);
    }
    
    return points;
  };

  const pathPositions = generateCurvedPath();

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100%", width: "100%", borderRadius: "28px 28px 0 0" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Markers */}
        <Marker position={[from.lat, from.lng]} icon={startIcon}>
          <Popup>
            <div style={{ fontFamily: "Urbanist, sans-serif", padding: "4px" }}>
              <strong>📍 From</strong><br />
              {fromLabel}
            </div>
          </Popup>
        </Marker>
        
        <Marker position={[to.lat, to.lng]} icon={endIcon}>
          <Popup>
            <div style={{ fontFamily: "Urbanist, sans-serif", padding: "4px" }}>
              <strong>🎯 To</strong><br />
              {toLabel}
            </div>
          </Popup>
        </Marker>

        {/* Curved polyline route */}
        <Polyline positions={pathPositions} pathOptions={pathOptions} />

        {/* Fit bounds to show both markers */}
        <MapBounds from={from} to={to} />
      </MapContainer>

      <style jsx global>{`
        .leaflet-container {
          font-family: "Urbanist", sans-serif;
        }
        
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: rgba(10, 10, 10, 0.95);
          color: #ffffff;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        
        .leaflet-popup-tip {
          background: rgba(10, 10, 10, 0.95);
        }
        
        .leaflet-popup-content {
          margin: 8px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;