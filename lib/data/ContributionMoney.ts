import {
  ListApiResponseSchema,
  SingleApiResponseSchema,
} from "@/lib/schemas/ContributionMoneySchema";
import { ContributionMoney } from "@/types/ContributionMoney";

export async function getContributionMoney(): Promise<ContributionMoney[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/monthly-contributions`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed fetching data");
    }
    const data = await response.json();

    const validatedResponse = ListApiResponseSchema.parse(data);

    return validatedResponse.data;
  } catch (error) {
    console.error("Errors validations:", error);
    return [];
  }
}

export async function getCurrentContributionMoney(): Promise<ContributionMoney | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/monthly-contributions/latest`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed fetching data");
    }
    const data = await response.json();

    const validatedResponse = SingleApiResponseSchema.parse(data);

    return validatedResponse.data || null;
  } catch (error) {
    console.error("Errors validations:", error);
    return null;
  }
}
