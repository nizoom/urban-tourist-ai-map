import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import cityData from "./cities_over_1M.json";
import { fetchData } from "../requests";
import { useTouristStore } from "../store";
import L from "leaflet";
import CustomMarker from "../assets/custom_marker.png";

export const MapComponent = () => {
  const customMarker = new L.Icon({
    iconUrl: CustomMarker,
    iconSize: [42, 42], // Width and height of the icon
    iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });
  const [circleOpacities, setCircleOpacities] = useState({});
  const { preferences, toggleDrawer, toggleLoadingState } = useTouristStore();

  const ClickHandler = ({ cityCircles, onValidClick }) => {
    useMapEvent({
      click(e) {
        const { lat, lng } = e.latlng;

        // Check each city circle
        cityCircles.forEach(async ({ key, center, radius }) => {
          const distance = L.latLng(center).distanceTo([lat, lng]);

          if (distance <= radius) {
            onValidClick(e.latlng);
            // Set opacity for this specific circle
            setCircleOpacities((prev) => ({
              ...prev,
              [key]: 0.1,
            }));
            let currentPrefs = [];
            for (const [key, value] of Object.entries(preferences)) {
              if (value) {
                currentPrefs.push(key); // Push the KEY, not the value
              }
            }
            toggleDrawer(true);
            const data = await fetchData(lat, lng, currentPrefs);
          }
        });
      },
    });

    return null;
  };

  const [validPoints, setValidPoints] = useState([]);

  // Convert cityData to circles format for the click handler
  const cityCircles = Object.entries(cityData).map(([key, city]) => ({
    key,
    center: [city.Latitude, city.Longitude],
    radius: 16093, // 10 miles
    city,
  }));

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "700px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(cityData).map(([key, city]) => (
        <div key={key}>
          <Circle
            center={[city.Latitude, city.Longitude]}
            radius={16093}
            pathOptions={{
              opacity: circleOpacities[key] || 0, // Individual opacity per circle
              fillOpacity: circleOpacities[key] ? 0.2 : 0, // Show fill when visible
              color: "#8098adff",
              fillColor: "#8098adff",
              weight: 2,
            }}
          />
          <Marker
            position={[city.Latitude, city.Longitude]}
            icon={customMarker}
          >
            <Popup>
              <div>
                <h3>{city.City}</h3>
                <p>
                  <strong>Country:</strong> {city.Country}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {city.Population.toLocaleString()}
                </p>
                <p>
                  <strong>Capital:</strong> {city.Capital}
                </p>
                <p>
                  <strong>Coordinates:</strong> {city.Latitude},{" "}
                  {city.Longitude}
                </p>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}

      <ClickHandler
        cityCircles={cityCircles}
        onValidClick={(latlng) => setValidPoints((prev) => [...prev, latlng])}
      />
    </MapContainer>
  );
};
