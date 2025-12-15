"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, MapPin, Edit2, Cloud } from "lucide-react";

import { CityForm } from "./city-form";
import { CityList } from "./city-list";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { City, CityManagerProps } from "./types";
import { getWeather } from "@/actions/weather";
import { WeatherData } from "@/components/weather/types";
import { WeatherCard } from "@/components/weather/weather-card";
import { capitalize } from "@/lib/utils";

export const CityManager = ({ initialCities }: CityManagerProps) => {
  const [cities, setCities] = useState<City[]>(initialCities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string>();
  const [isLoadingWeather, startWeatherTransition] = useTransition();

  useEffect(() => {
    if (!selectedCity) {
      setWeather(null);
      setWeatherError(undefined);
      return;
    }

    startWeatherTransition(async () => {
      const result = await getWeather(selectedCity.name, selectedCity.country);

      if (result.error) {
        setWeatherError(result.error);
        setWeather(null);
      } else if (result.data) {
        setWeather(result.data);
        setWeatherError(undefined);
      }
    });
  }, [selectedCity]);

  const handleSelectCity = (city: City) => {
    if (selectedCity?.id === city.id) {
      setSelectedCity(null);
      setIsEditing(false);
    } else {
      setSelectedCity(city);
      setIsEditing(false);
    }
  };

  const handleEditCity = (city: City) => {
    setSelectedCity(city);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAddSuccess = (newCity: City) => {
    setCities((prev) => [newCity, ...prev]);
    setSelectedCity(newCity);
  };

  const handleUpdateSuccess = (updatedCity: City) => {
    setCities((prev) =>
      prev.map((city) => (city.id === updatedCity.id ? updatedCity : city)),
    );
    setSelectedCity(updatedCity);
    setIsEditing(false);
  };

  const handleDeleteSuccess = (cityId: string) => {
    setCities((prev) => prev.filter((city) => city.id !== cityId));

    if (selectedCity?.id === cityId) {
      setSelectedCity(null);
      setIsEditing(false);
    }
  };

  const editingCity = isEditing ? selectedCity : null;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <CardWrapper
        heading={editingCity ? "Edit City" : "Add City"}
        icon={editingCity ? Edit2 : Plus}
        iconGradient={
          editingCity
            ? "from-amber-400 to-orange-500"
            : "from-purple-400 to-indigo-500"
        }
      >
        <CityForm
          editingCity={editingCity}
          onCancelEdit={handleCancelEdit}
          onAddSuccess={handleAddSuccess}
          onSuccess={handleUpdateSuccess}
        />
      </CardWrapper>

      <CardWrapper
        heading="Saved Cities"
        icon={MapPin}
        iconGradient="from-emerald-400 to-cyan-500"
      >
        <CityList
          cities={cities}
          onEdit={handleEditCity}
          onDelete={handleDeleteSuccess}
          onSelect={handleSelectCity}
          editingCityId={editingCity?.id}
          selectedCityId={selectedCity?.id}
        />
      </CardWrapper>

      <CardWrapper
        heading={
          selectedCity
            ? `Weather in ${capitalize(selectedCity.name)}`
            : "Weather"
        }
        icon={Cloud}
        iconGradient="from-blue-400 to-cyan-500"
      >
        <WeatherCard
          weather={weather}
          isLoading={isLoadingWeather}
          error={weatherError}
        />
      </CardWrapper>
    </div>
  );
};
