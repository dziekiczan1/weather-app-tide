import * as z from "zod";

export const CitySchema = z.object({
  name: z
    .string()
    .min(1, "City name is required")
    .max(100, "City name is too long"),
  country: z.string().optional(),
});
