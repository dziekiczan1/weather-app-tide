export interface City {
  id: string;
  name: string;
  country: string;
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
  onSelect: (city: City) => void;
  editingCityId?: string;
  selectedCityId?: string;
  maxHeight?: number;
  visibleItems?: number;
}

export interface CityItemProps {
  city: City;
  isBeingEdited: boolean;
  isSelected: boolean;
  isPending: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

export interface CitySearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export interface CityEmptyStateProps {
  type: "no-cities" | "no-results";
}

export interface CityManagerProps {
  initialCities: City[];
}
