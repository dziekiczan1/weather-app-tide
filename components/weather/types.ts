import { LucideIcon } from "lucide-react";

export const OPENWEATHER_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  city_name: string;
  country: string;
}

export interface WeatherCardProps {
  weather: WeatherData | null;
  isLoading: boolean;
  error?: string;
}

export interface WeatherStatProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
}

export interface WeatherStatsProps {
  weather: WeatherData;
}
