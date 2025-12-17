export type ActionResponse<T = void> = {
  success?: string;
  error?: string;
  data?: T;
};

export const ERROR_MESSAGES = {
  INVALID_FIELDS: "Invalid fields!",
  CITY_NOT_FOUND:
    "City not found. Please check the city name and country code.",
  CITY_EXISTS: "City already exists!",
  FAILED_TO_ADD: "Failed to add city!",
  FAILED_TO_UPDATE: "Failed to update city!",
  FAILED_TO_DELETE: "Failed to delete city!",
  API_KEY_MISSING: "API key not configured",
  UNKNOWN_ERROR: "Unknown error occurred.",
} as const;

export const SUCCESS_MESSAGES = {
  CITY_ADDED: "City added successfully!",
  CITY_UPDATED: "City updated successfully!",
  CITY_DELETED: "City deleted successfully!",
} as const;
