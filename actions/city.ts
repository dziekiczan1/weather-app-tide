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
      country: country.toUpperCase(),
    },
  });

  if (existingCity) {
    return { error: "City already exists!" };
  }

  try {
    await db.city.create({
      data: {
        name: name.toLowerCase(),
        country: country?.toUpperCase(),
      },
    });
  } catch (error) {
    return { error: "Failed to add city!" };
  }

  return { success: "City added successfully!" };
};
