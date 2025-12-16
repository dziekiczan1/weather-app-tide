export const ITEM_HEIGHT = 56;
export const ITEM_GAP = 8;
export const ITEM_TOTAL = ITEM_HEIGHT + ITEM_GAP;

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

export const CityAction = {
  ADD: "add",
  EDIT: "edit",
  UPDATE: "update",
  DELETE: "delete",
  SELECT: "select",
} as const;

export type CityAction = (typeof CityAction)[keyof typeof CityAction];
