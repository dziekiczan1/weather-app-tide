"use client";

import { useState } from "react";
import { Plus, MapPin, Edit2 } from "lucide-react";

import { CityForm } from "@/components/city/city-form";
import { CardWrapper } from "@/components/ui/card-wrapper";
import { CityList } from "@/components/city/city-list";
import { City, CityManagerProps } from "@/components/city/types";

export const CityManager = ({ initialCities }: CityManagerProps) => {
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>(initialCities);

  const handleEditCity = (city: City) => {
    setEditingCity(city);
  };

  const handleCancelEdit = () => {
    setEditingCity(null);
  };

  const handleAddSuccess = (newCity: City) => {
    setCities((prev) => [newCity, ...prev]);
  };

  const handleUpdateSuccess = (updatedCity: City) => {
    setCities((prev) =>
      prev.map((city) => (city.id === updatedCity.id ? updatedCity : city)),
    );
    setEditingCity(null);
  };

  const handleDeleteSuccess = (cityId: string) => {
    setCities((prev) => prev.filter((city) => city.id !== cityId));
    if (editingCity?.id === cityId) {
      setEditingCity(null);
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
          editingCityId={editingCity?.id}
        />
      </CardWrapper>
    </div>
  );
};
