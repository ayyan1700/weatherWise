import React from "react";
import ForecastCard from "./ForecastCard";

export default function Forecast({ forecast, weather, setWeather }) {
  return (
    <div>
      <h3 className="text-gray-100 text-xl mb-3">
        5-day forecast
      </h3>

      <div className="flex gap-4 overflow-x-auto p-3">
        {forecast.map((day, i) => (
          <ForecastCard
            key={i}
            day={day}
            onClick={() =>
              setWeather({
                ...weather,
                temp: Math.round(day.main.temp),
                humidity: day.main.humidity,
                wind: day.wind.speed,
                icon: day.weather[0].icon,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
