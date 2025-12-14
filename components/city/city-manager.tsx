"use client";

import { useState } from "react";
import { Plus, MapPin, Edit2 } from "lucide-react";

import { CityForm } from "./city-form";
import { CityList } from "./city-list";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { City, CityManagerProps } from "./types";

export const CityManager = ({ initialCities }: CityManagerProps) => {
  const [cities, setCities] = useState<City[]>(initialCities);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setIsEditing(false);
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
        heading={isEditing ? "Edit City" : "Add City"}
        icon={isEditing ? Edit2 : Plus}
        iconGradient={
          isEditing
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
    </div>
  );
};
