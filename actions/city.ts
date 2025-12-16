"use server";

import * as z from "zod";

import { CitySchema } from "@/schemas";
import { db } from "@/lib/db";
import { OPENWEATHER_BASE_URL } from "@/components/weather/types";

export const addCity = async (values: z.infer<typeof CitySchema>) => {
  const validatedFields = CitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, country } = validatedFields.data;

  const cityValidation = await validateCityExists(name, country);

  if (!cityValidation.valid) {
    return {
      error: "City not found. Please check the city name and country code.",
    };
  }

  const existingCity = await db.city.findFirst({
    where: {
      name: name.toLowerCase(),
      country: country.toUpperCase(),
    },
  });

  if (existingCity) {
    return { error: "City already exists!" };
  }

  try {
    const city = await db.city.create({
      data: {
        name: name.toLowerCase(),
        country: country.toUpperCase(),
      },
    });

    return {
      success: "City added successfully!",
      city: city,
    };
  } catch (error) {
    return { error: "Failed to add city!" };
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

export const getCities = async () => {
  const cities = await db.city.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return cities;
};

export const deleteCity = async (cityId: string) => {
  try {
    await db.city.delete({
      where: {
        id: cityId,
      },
    });
  } catch (error) {
    return { error: "Failed to delete city!" };
  }

  return { success: "City deleted successfully!" };
};

export const updateCity = async (
  cityId: string,
  values: z.infer<typeof CitySchema>,
) => {
  const validatedFields = CitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, country } = validatedFields.data;

  try {
    await db.city.update({
      where: {
        id: cityId,
      },
      data: {
        name: name.toLowerCase(),
        country: country.toUpperCase(),
      },
    });
  } catch (error) {
    return { error: "Failed to update city!" };
  }

  return { success: "City updated successfully!" };
};
