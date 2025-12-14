import React from "react";

export default function ForecastCard({ day, onClick }) {
  const date = new Date(day.dt_txt);

  return (
    <button
      onClick={onClick}
      className="
        min-w-[110px]
        rounded-2xl
        p-4
        flex
        flex-col
        items-center
        gap-2
        bg-gradient-to-br
        from-blue-700
        to-blue-900
        text-white
        shadow-lg
        hover:scale-[1.04]
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Day */}
      <p className="text-xs text-blue-100">
        {date.toLocaleDateString(undefined, { weekday: "short" })}
      </p>

      {/* Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        alt="weather"
        className="w-10 h-10"
      />

      {/* Temp */}
      <p className="text-lg font-semibold">
        {Math.round(day.main.temp)}°
      </p>
    </button>
  );
}
