import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/actions/weather";
import { WeatherData } from "@/components/weather/types";
import { City } from "@/components/city/types";
import { CACHE_TIME, ERROR_MESSAGES } from "@/lib/api-constants";

export const useWeather = (city: City | null) => {
  const cityKey = ["weather", city?.name, city?.country] as const;

  const { data, isLoading, error } = useQuery({
    queryKey: cityKey,
    queryFn: async () => {
      if (!city) throw new Error(ERROR_MESSAGES.NO_CITY_SELECTED);
      const res = await getWeather(city.name, city.country);
      if (res.error) throw new Error(res.error);
      return res.data as WeatherData;
    },
    enabled: !!city,
    staleTime: CACHE_TIME.WEATHER,
  });

  return { weather: data ?? null, error: error?.message, isLoading };
};
