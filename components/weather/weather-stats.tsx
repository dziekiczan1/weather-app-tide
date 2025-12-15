import { Thermometer, Droplets, Wind } from "lucide-react";

import { WeatherStat } from "./weather-stat";
import { WeatherStatsProps } from "@/components/weather/types";

export const WeatherStats = ({ weather }: WeatherStatsProps) => {
  const stats = [
    {
      icon: Thermometer,
      label: "Feels like",
      value: weather.feels_like,
      unit: "°C",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: weather.humidity,
      unit: "%",
    },
    {
      icon: Wind,
      label: "Wind",
      value: weather.wind_speed,
      unit: " km/h",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
      {stats.map((stat) => (
        <WeatherStat
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  );
};
