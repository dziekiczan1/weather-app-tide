"use server";

import * as z from "zod";

import { CitySchema } from "@/schemas";
import { db } from "@/lib/db";
import { OPENWEATHER_BASE_URL } from "@/components/weather/types";
import {
  ActionResponse,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/lib/api-constants";
import { City } from "@/components/city/types";

export const addCity = async (
  values: z.infer<typeof CitySchema>,
): Promise<ActionResponse<City>> => {
  const validatedFields = CitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.INVALID_FIELDS };
  }

  const { name, country } = validatedFields.data;

  const cityValidation = await validateCityExists(name, country);

  if (!cityValidation.valid) {
    return {
      error: ERROR_MESSAGES.CITY_NOT_FOUND,
    };
  }

  const existingCity = await db.city.findFirst({
    where: {
      name: name.toLowerCase(),
      country: country.toUpperCase(),
    },
  });

  if (existingCity) {
    return { error: ERROR_MESSAGES.CITY_EXISTS };
  }

  try {
    const city = await db.city.create({
      data: {
        name: name.toLowerCase(),
        country: country.toUpperCase(),
      },
    });

    return {
      success: SUCCESS_MESSAGES.CITY_ADDED,
      data: city,
    };
  } catch (error) {
    return { error: ERROR_MESSAGES.FAILED_TO_ADD };
  }
};

const validateCityExists = async (
  name: string,
  country: string,
): Promise<{ valid: boolean; cityName?: string; countryCode?: string }> => {
  if (!process.env.OPENWEATHER_API_KEY) {
    return { valid: true };
  }

  try {
    const query = country ? `${name},${country}` : name;
    const url = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(query)}&appid=${process.env.OPENWEATHER_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.cod === "404") {
      return { valid: false };
    }

    return {
      valid: true,
      cityName: data.name,
      countryCode: data.sys?.country,
    };
  } catch {
    return { valid: true };
  }
};

export const getCities = async (): Promise<ActionResponse<City[]>> => {
  try {
    const cities = await db.city.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { data: cities };
  } catch (error) {
    return { error: ERROR_MESSAGES.UNKNOWN_ERROR, data: [] };
  }
};

export const deleteCity = async (cityId: string): Promise<ActionResponse> => {
  try {
    await db.city.delete({
      where: { id: cityId },
    });
    return { success: SUCCESS_MESSAGES.CITY_DELETED };
  } catch (error) {
    return { error: ERROR_MESSAGES.FAILED_TO_DELETE };
  }
};

export const updateCity = async (
  cityId: string,
  values: z.infer<typeof CitySchema>,
): Promise<ActionResponse<City>> => {
  const validatedFields = CitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.INVALID_FIELDS };
  }

  const { name, country } = validatedFields.data;

  const cityValidation = await validateCityExists(name, country);

  if (!cityValidation.valid) {
    return {
      error: ERROR_MESSAGES.CITY_NOT_FOUND,
    };
  }

  try {
    const city = await db.city.update({
      where: { id: cityId },
      data: {
        name: name.toLowerCase(),
        country: country.toUpperCase(),
      },
    });

    return { success: SUCCESS_MESSAGES.CITY_UPDATED, data: city };
  } catch (error) {
    return { error: ERROR_MESSAGES.FAILED_TO_UPDATE };
  }
};
