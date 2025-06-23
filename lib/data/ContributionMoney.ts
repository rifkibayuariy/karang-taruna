import { z } from "zod";

export const ContributionMoneyApiSchema = z.object({
  id_monthly_contribution: z.number(),
  nominal: z.coerce.number(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
});

export const ContributionMoneySchema = ContributionMoneyApiSchema.transform(
  (data) => ({
    id_monthly_contribution: data.id_monthly_contribution,
    nominal: data.nominal,
    creation_date: data.creation_date,
    created_by: data.created_by,
  })
);

export const ApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(ContributionMoneySchema),
});

export type ContributionMoney = z.infer<typeof ContributionMoneySchema>;

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

    const validatedResponse = ApiResponseSchema.parse(data);

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

    const validatedResponse = ApiResponseSchema.parse(data);

    return validatedResponse.data[0] || null;
  } catch (error) {
    console.error("Errors validations:", error);
    return null;
  }
}
