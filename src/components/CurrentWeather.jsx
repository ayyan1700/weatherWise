import React from 'react';
import { Droplets, Wind, MapPin } from 'lucide-react';

export default function CurrentWeather({ weather }) {
  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-3xl p-8 w-full max-w-md shadow-2xl hover:shadow-3xl transition duration-500">
      {/* City */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <MapPin size={22} /> {weather.city}, {weather.country}
          </h2>
          <p className="text-blue-100 text-sm md:text-base mt-1">Current Weather</p>
        </div>

        {/* Icon */}
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt="weather-icon"
          className="w-28 h-28 md:w-36 md:h-36"
        />
      </div>

      {/* Temp & Details */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-6xl md:text-7xl font-light">{weather.temp}°C</p>
          <p className="text-blue-100 mt-1 text-sm md:text-base">Feels like: {weather.temp}°C</p>
        </div>

        <div className="flex flex-col gap-4 text-blue-100 text-sm md:text-base">
          <span className="flex items-center gap-2">
            <Droplets size={18} /> {weather.humidity}%
          </span>
          <span className="flex items-center gap-2">
            <Wind size={18} /> {weather.wind} m/s
          </span>
        </div>
      </div>
    </div>
  );
}
