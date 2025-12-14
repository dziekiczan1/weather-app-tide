"use client";

import { useState } from "react";
import { Plus, Edit2 } from "lucide-react";

import { CityForm } from "@/components/city/city-form";
import { CardWrapper } from "@/components/ui/card-wrapper";

interface City {
  id: string;
  name: string;
  country: string;
}

interface CityManagerProps {
  initialCities: City[];
}

export const CityManager = ({ initialCities }: CityManagerProps) => {
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>(initialCities);

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
    </div>
  );
};
