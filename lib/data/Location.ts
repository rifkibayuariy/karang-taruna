import { z } from "zod";

export const LocationApiSchema = z.object({
  id_location: z.number(),
  name: z.coerce.string(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
});

export const LocationSchema = LocationApiSchema.transform((data) => ({
  id_location: data.id_location,
  name: data.name,
  description: data.description,
  creation_date: data.creation_date,
  created_by: data.created_by,
}));

export const ApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(LocationSchema),
  meta: z.object({
    page: z.number(),
    per_page: z.number(),
    total_page: z.number(),
    total_data: z.number(),
    search: z.string(),
  }),
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

    const response = await fetch(`${process.env.API_URL}/location?${params}`, {
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

export async function getLocationDataTableDummy({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<ApiResponse> {
  const locations = [
    {
      id_location: 1,
      name: "RT 21",
      description: "RT Kidul",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 2,
      name: "RT 22",
      description: "RT Tengah",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 3,
      name: "RT 23",
      description: "RT Lor",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 4,
      name: "RT 24",
      description: "RT Kidul",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 5,
      name: "RT 25",
      description: "RT Tengah",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 6,
      name: "RT 26",
      description: "RT Lor",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 7,
      name: "RT 27",
      description: "RT Kidul",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 8,
      name: "RT 28",
      description: "RT Tengah",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 9,
      name: "RT 29",
      description: "RT Lor",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 10,
      name: "RT 30",
      description: "RT Kidul",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 11,
      name: "RT 31",
      description: "RT Tengah",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 12,
      name: "RT 32",
      description: "RT Lor",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 13,
      name: "RT 33",
      description: "RT Kidul",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 14,
      name: "RT 34",
      description: "RT Tengah",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
    {
      id_location: 15,
      name: "RT 35",
      description: "RT Lor",
      creation_date: new Date("2025-06-21T11:04:45.000Z"),
      created_by: 1,
    },
  ];

  const itemsPerPage = 10;

  const filtered = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      loc.description.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const result = {
    message: "hehe",
    data: paginated,
    meta: {
      page: page,
      per_page: itemsPerPage,
      total_page: totalPages,
      total_data: filtered.length,
      search: search,
    },
  };

  return result;
}
