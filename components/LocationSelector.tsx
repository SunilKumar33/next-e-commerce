"use client";

import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function LocationSelector() {
  const [location, setLocation] = useState<string>("New York");

  const [loading, setLoading] = useState(false);
  const locations: string[] = ["New York", "Los Angeles", "Chicago", "Houston"];

  const getGeolocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          // Here you would typically make an API call to get the city name from coordinates
          // For demo purposes, we'll just set the closest major city
          const closestCity = findClosestCity(coords);
          setLocation(closestCity);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    }
  };

  // Simple function to find the closest city (demo purposes)
  const findClosestCity = (coords: Coordinates) => {
    const cityCoords = {
      "New York": { lat: 40.7128, lng: -74.0060 },
      "Los Angeles": { lat: 34.0522, lng: -118.2437 },
      "Chicago": { lat: 41.8781, lng: -87.6298 },
      "Houston": { lat: 29.7604, lng: -95.3698 }
    };

    let closestCity = locations[0];
    let minDistance = Number.MAX_VALUE;

    for (const [city, cityCoord] of Object.entries(cityCoords)) {
      const distance = Math.sqrt(
        Math.pow(cityCoord.lat - coords.latitude, 2) +
        Math.pow(cityCoord.lng - coords.longitude, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    }

    return closestCity;
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-white text-black p-2 rounded"
        disabled={loading}
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      <button
        onClick={getGeolocation}
        className="p-2 rounded bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
        title="Use my location"
      >
        <FaLocationArrow className={loading ? "animate-spin" : ""} />
      </button>
    </div>
  );
}
