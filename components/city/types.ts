export interface City {
  id: string;
  name: string;
  country: string;
}

export interface CityManagerProps {
  initialCities: City[];
}

export interface CityFormProps {
  editingCity?: City | null;
  onCancelEdit?: () => void;
  onAddSuccess?: (city: City) => void;
  onSuccess?: (city: City) => void;
}

export interface CityListProps {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (cityId: string) => void;
  editingCityId?: string;
  maxHeight?: number;
  visibleItems?: number;
}
