import { z } from "zod";

export const OrganizationPostionApiSchema = z.object({
  id_position: z.number().nullable(),
  position_name: z.coerce.string(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
  last_update_date: z.coerce.date().nullable(),
  last_update_by: z.number().nullable(),
});

export const OrganizationPostionSchema = OrganizationPostionApiSchema.transform(
  (data) => ({
    id_position: data.id_position,
    position_name: data.position_name,
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

    console.log(params);

    // const response = await fetch(`${process.env.API_URL}/locations?${params}`, {
    //   cache: "no-store",
    // });

    // if (!response.ok) {
    //   throw new Error("Failed fetching data");
    // }
    // const data = await response.json();

    // const validatedResponse = ApiResponseSchema.parse(data);

    // return validatedResponse;

    const orgPos = {
      message: "hehe",
      data: [
        {
          id_position: 1,
          position_name: "Ketua",
          description: "Ketua muda-mudi",
          creation_date: new Date("2003-09-08T17:00:00.000Z"),
          created_by: 1,
          last_update_date: new Date("2003-09-08T17:00:00.000Z"),
          last_update_by: 1,
        },
      ],
      meta: {
        page: 1,
        per_page: 10,
        total_page: 1,
        total_data: 1,
        search: "",
      },
    };

    return orgPos;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}
