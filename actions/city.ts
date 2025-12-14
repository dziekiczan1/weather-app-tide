"use server";

import * as z from "zod";

import { CitySchema } from "@/schemas";
import { db } from "@/lib/db";

export const addCity = async (values: z.infer<typeof CitySchema>) => {
  const validatedFields = CitySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, country } = validatedFields.data;

  const existingCity = await db.city.findFirst({
    where: {
      name: name.toLowerCase(),
      country: country?.toUpperCase(),
    },
  });

  if (existingCity) {
    return { error: "City already exists!" };
  }

  try {
    const city = await db.city.create({
      data: {
        name: name.toLowerCase(),
        country: country?.toUpperCase(),
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
        country: country?.toUpperCase(),
      },
    });
  } catch (error) {
    return { error: "Failed to update city!" };
  }

  return { success: "City updated successfully!" };
};
