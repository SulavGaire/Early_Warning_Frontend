import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import fireImg from "../assets/fire.png";
import sensorImg from "../assets/sensor.png";

// Define custom icons for the markers
const sensorIcon = new L.Icon({
  iconUrl: sensorImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const fireIcon = new L.Icon({
  iconUrl: fireImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Function to style the GeoJSON layer
const geoJsonStyle = {
  fillColor: "transparent",
  color: "red",
  weight: 2,
  opacity: 1,
};

// MapHandler to ensure map refreshes when data updates
const MapHandler = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize(); // Ensure map adjusts when new markers are added
  }, [map]);
  return null;
};

const NepalMap = () => {
  const [sensors, setSensors] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/c/a285-3e5a-46f0-b5a0"
        );
        const data = await response.json();
        setSensors(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const fetchGeoJson = async () => {
      try {
        const response = await fetch("/nepal.geojson"); // Adjust path if necessary
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    fetchSensorData();
    fetchGeoJson();

    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "70vh",
        width: "80%",
        margin: "0 auto",
        border: "2px solid black",
      }}
    >
      <MapContainer
        center={[27.7172, 85.324]}
        zoom={6.5}
        style={{ height: "100%", width: "100%" }}
      >
        <MapHandler />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render GeoJSON Border Overlay */}
        {geojsonData && <GeoJSON data={geojsonData} style={geoJsonStyle} />}

        {/* Render markers dynamically based on the sensors data */}
        {sensors.map((sensor) => (
          <Marker
            key={sensor.id}
            position={[sensor.latitude, sensor.longitude]}
            icon={sensor.fire_detected ? fireIcon : sensorIcon}
          >
            <Popup>
              <div>
                <h3>Sensor Data</h3>
                <p>
                  <strong>Location:</strong> {sensor.location}
                </p>
                <p>
                  <strong>Temperature:</strong> {sensor.temperature}°C
                </p>
                <p>
                  <strong>Pressure:</strong> {sensor.pressure} hPa
                </p>
                <p>
                  <strong>CO₂ Level:</strong> {sensor.co2} ppm
                </p>
                {sensor.fire_detected && (
                  <p style={{ color: "red" }}>
                    <strong>🔥 Fire Detected!</strong>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default NepalMap;
