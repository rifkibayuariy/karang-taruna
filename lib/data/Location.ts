import { z } from "zod";

export const LocationApiSchema = z.object({
  id_location: z.number().nullable(),
  location_name: z.coerce.string(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
  last_update_date: z.coerce.date().nullable(),
  last_update_by: z.number().nullable(),
});

export const LocationSchema = LocationApiSchema.transform((data) => ({
  id_location: data.id_location,
  location_name: data.location_name,
  description: data.description,
  creation_date: data.creation_date,
  created_by: data.created_by,
  last_update_date: data.last_update_date,
  last_update_by: data.last_update_by,
}));

export const ApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(LocationSchema),
  meta: z
    .object({
      page: z.number(),
      per_page: z.number(),
      total_page: z.number(),
      total_data: z.number(),
      search: z.string(),
    })
    .optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export async function getLocationDataTable({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<ApiResponse> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      search: search ?? "",
    });

    const response = await fetch(`${process.env.API_URL}/locations?${params}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed fetching data");
    }
    const data = await response.json();

    const validatedResponse = ApiResponseSchema.parse(data);

    return validatedResponse;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}

export async function getLocationById(id: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/locations/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }
    const data = await response.json();

    const validatedResponse = ApiResponseSchema.parse(data);

    if (validatedResponse.data.length > 0) return validatedResponse.data[0];
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}
