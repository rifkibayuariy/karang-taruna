import { OrganizationPeriod } from "@/types/OrganizationPeriod";

export async function getAllOrganizationPeriods(): Promise<
  OrganizationPeriod[]
> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/organization-periods`,
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
