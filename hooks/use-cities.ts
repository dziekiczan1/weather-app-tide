"use client";

import { useState } from "react";

import { City } from "@/components/city/types";

export const useCities = (initial: City[]) => {
  const [cities, setCities] = useState(initial);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  return {
    cities,
    selectedCity,
    isEditing,
    setCities,
    setSelectedCity,
    setIsEditing,
  };
};
