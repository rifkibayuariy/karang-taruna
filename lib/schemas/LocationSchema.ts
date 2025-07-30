import { z } from "zod";

export const LocationSchema = z.object({
  id_location: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  location: z.string().min(2, {
    message: "Location Name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

export type LocationFormInput = z.input<typeof LocationSchema>;
export type LocationSchemaFormData = z.infer<typeof LocationSchema>;

export const LocationApiSchema = z.object({
  id_location: z.number().nullable(),
  location_name: z.coerce.string(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
  last_update_date: z.coerce.date().nullable(),
  last_update_by: z.number().nullable(),
});

export const ListApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(LocationApiSchema),
  meta: z
    .object({
      page: z.number(),
      per_page: z.number(),
      total_page: z.number(),
      total_data: z.number(),
      search: z.string().optional(),
    })
    .optional(),
});

export const SingleApiResponseSchema = z.object({
  message: z.string(),
  data: LocationApiSchema,
});

export type Location = z.infer<typeof LocationApiSchema>;
export type ListApiResponse = z.infer<typeof ListApiResponseSchema>;
export type SingleApiResponse = z.infer<typeof SingleApiResponseSchema>;
