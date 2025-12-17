"use server";

import { OPENWEATHER_BASE_URL, WeatherData } from "@/components/weather/types";
import { ActionResponse, ERROR_MESSAGES } from "@/lib/api-constants";

export const getWeather = async (
  cityName: string,
  country: string,
): Promise<ActionResponse<WeatherData>> => {
  if (!process.env.OPENWEATHER_API_KEY) {
    return { error: ERROR_MESSAGES.API_KEY_MISSING };
  }

  try {
    const query = `${cityName},${country}`;
    const url = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(query)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return { error: ERROR_MESSAGES.CITY_NOT_FOUND };
      }
      return { error: ERROR_MESSAGES.UNKNOWN_ERROR };
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind_speed: Math.round(data.wind.speed * 3.6),
      city_name: data.name,
      country: data.sys.country,
    };

    return { data: weatherData };
  } catch (error) {
    return { error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};
