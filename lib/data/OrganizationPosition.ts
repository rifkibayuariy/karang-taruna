import { z } from "zod";

export const OrganizationPostionApiSchema = z.object({
  id_organization_position: z.number().nullable(),
  name: z.coerce.string(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
  last_update_date: z.coerce.date().nullable(),
  last_update_by: z.number().nullable(),
});

export const OrganizationPostionSchema = OrganizationPostionApiSchema.transform(
  (data) => ({
    id_organization_position: data.id_organization_position,
    name: data.name,
    description: data.description,
    creation_date: data.creation_date,
    created_by: data.created_by,
    last_update_date: data.last_update_date,
    last_update_by: data.last_update_by,
  })
);

export const ApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(OrganizationPostionSchema),
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

export async function getOrganizationPositionDataTable({
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

    const response = await fetch(
      `${process.env.API_URL}/organization-positions?${params}`,
      {
        cache: "no-store",
      }
    );

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
