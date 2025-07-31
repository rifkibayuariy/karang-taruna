import {
  ListApiResponse,
  ListApiResponseSchema,
  SingleApiResponseSchema,
} from "@/lib/schemas/OrganizationPositionSchema";
import { OrganizationPosition } from "@/types/OrganizationPosition";

export async function getOrganizationPositionDataTable({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<ListApiResponse> {
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

    const validatedResponse = ListApiResponseSchema.parse(data);

    return validatedResponse;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}

export async function getOrganizationPositionById(
  id: number
): Promise<OrganizationPosition | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/organization-positions/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }

    const data = await response.json();

    const validatedResponse = SingleApiResponseSchema.parse(data);

    return validatedResponse.data;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}

export async function getOrganizationPositions(): Promise<OrganizationPosition[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/organization-positions/all`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}