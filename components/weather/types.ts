export const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

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
