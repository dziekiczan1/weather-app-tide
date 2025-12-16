"use client";

import { Plus, MapPin, Edit2, Cloud } from "lucide-react";

import { CityForm } from "./city-form";
import { CityList } from "./city-list";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { WeatherCard } from "@/components/weather/weather-card";
import { capitalize } from "@/lib/utils";
import { useWeather } from "@/hooks/use-weather";
import { useCities } from "@/hooks/use-cities";
import { City, CityAction, CityManagerProps } from "./types";

export const CityManager = ({ initialCities }: CityManagerProps) => {
  const {
    cities,
    selectedCity,
    isEditing,
    setCities,
    setSelectedCity,
    setIsEditing,
  } = useCities(initialCities);
  const {
    weather,
    error: weatherError,
    isLoading: isLoadingWeather,
  } = useWeather(selectedCity);
  const editingCity = isEditing ? selectedCity : null;

  const handleCityAction = (action: CityAction, city: City) => {
    switch (action) {
      case CityAction.ADD:
        setCities((prev) => [city, ...prev]);
        setSelectedCity(city);
        setIsEditing(false);
        break;
      case CityAction.EDIT:
        setSelectedCity(city);
        setIsEditing(true);
        break;
      case CityAction.UPDATE:
        setCities((prev) =>
          prev.map((existingCity) =>
            existingCity.id === city.id ? city : existingCity,
          ),
        );
        setSelectedCity(city);
        setIsEditing(false);
        break;
      case CityAction.DELETE:
        setCities((prev) =>
          prev.filter((existingCity) => existingCity.id !== city.id),
        );
        if (selectedCity?.id === city.id) {
          setSelectedCity(null);
          setIsEditing(false);
        }
        break;
      case CityAction.SELECT:
        if (selectedCity?.id === city.id) {
          setSelectedCity(null);
          setIsEditing(false);
        } else {
          setSelectedCity(city);
          setIsEditing(false);
        }
    }
  };

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
          onCancelEdit={() => setIsEditing(false)}
          onAddSuccess={(city) => handleCityAction(CityAction.ADD, city)}
          onSuccess={(city) => handleCityAction(CityAction.UPDATE, city)}
        />
      </CardWrapper>

      <CardWrapper
        heading="Saved Cities"
        icon={MapPin}
        iconGradient="from-emerald-400 to-cyan-500"
      >
        <CityList
          cities={cities}
          onEdit={(city) => handleCityAction(CityAction.EDIT, city)}
          onDelete={(city) =>
            handleCityAction(CityAction.DELETE, { id: city } as City)
          }
          onSelect={(city) => handleCityAction(CityAction.SELECT, city)}
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
