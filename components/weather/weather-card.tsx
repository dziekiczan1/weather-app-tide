"use client";

import { Cloud } from "lucide-react";
import Image from "next/image";

import { WeatherCardProps } from "@/components/weather/types";
import { WeatherStats } from "@/components/weather/weather-stats";
import { getWeatherIconUrl } from "@/lib/utils";

export const WeatherCard = ({
  weather,
  isLoading,
  error,
}: WeatherCardProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Cloud className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center py-8">
        <Cloud className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400">Select a city to see weather</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white capitalize">
            {weather.city_name}
          </h3>
          <p className="text-slate-400">{weather.country}</p>
        </div>
        <Image
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </div>

      <div className="flex items-end gap-2">
        <span className="text-6xl font-bold text-white">{weather.temp}</span>
        <span className="text-2xl text-slate-400 mb-2">°C</span>
      </div>

      <p className="text-slate-300 capitalize">{weather.description}</p>

      <WeatherStats weather={weather} />
    </div>
  );
};
