import { OrganizationStructure } from "@/types/OrganizationStructure";

export async function getOrganizationPositionsPeriod(
  id_organization_period: number
): Promise<OrganizationStructure[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/organization-structure/period/${id_organization_period}`,
      {
        cache: "no-store",
      }
    );

    if (response.status == 404) return null;

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
