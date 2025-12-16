"use client";

import { useState, useEffect, useTransition } from "react";

import { getWeather } from "@/actions/weather";
import { WeatherData } from "@/components/weather/types";
import { City } from "@/components/city/types";

export const useWeather = (city: City | null) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (!city) {
      setWeather(null);
      setError(undefined);
      return;
    }

    startTransition(async () => {
      const result = await getWeather(city.name, city.country);

      if (result.error) {
        setError(result.error);
        setWeather(null);
      } else if (result.data) {
        setWeather(result.data);
        setError(undefined);
      }
    });
  }, [city]);

  return { weather, error, isLoading };
};
