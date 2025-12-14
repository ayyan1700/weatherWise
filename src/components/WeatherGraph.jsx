import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeatherGraph({ hourly }) {
  const data = hourly.map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "numeric",
    }),
    temp: Math.round(item.main.temp),
  }));

  return (
    <div
      className="
         bg-gradient-to-r
          from-blue-700
          to-blue-900
        rounded-3xl
        p-4
        md:p-6
        shadow-xl
        border
        border-white/30
      "
    >
      <h3 className="mb-4 text-gray-300 text-sm md:text-base">
        Hourly temperature
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          {/* X AXIS FIX */}
          <XAxis
            dataKey="time"
            stroke="#9ca3af"
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
            tickMargin={10}
          />

          <YAxis
            stroke="#9ca3af"
            tick={{ fontSize: 11 }}
            width={30}
            unit="°"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#e5e7eb"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
