import {
  ListApiResponse,
  ListApiResponseSchema,
  SingleApiResponseSchema,
} from "@/lib/schemas/LocationSchema";
import { Location } from "@/types/Location";

export async function getLocationDataTable({
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

    const response = await fetch(`${process.env.API_URL}/locations?${params}`, {
      cache: "no-store",
    });
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

export async function getLocationById(id: number): Promise<Location | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/locations/${id}`, {
      cache: "no-store",
    });

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

export async function getAllLocation() {
  try {
    const response = await fetch(`${process.env.API_URL}/locations/all`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }
    const data = await response.json();

    const validatedResponse = ListApiResponseSchema.parse(data);

    return validatedResponse.data;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}
