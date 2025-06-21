"use server";

import { z } from "zod";

const contributionMoneySchema = z.object({
  nominal: z
    .number({
      required_error: "Nominal is required!",
      invalid_type_error: "Nominal must be a number",
    })
    .min(1000, "Nominal must be at least Rp. 1.000"),
});

export type ContributionMoneyFormData = z.infer<typeof contributionMoneySchema>;

export async function submitContributionMoney(data: ContributionMoneyFormData) {
  const parse = contributionMoneySchema.safeParse(data);
  if (!parse.success) {
    throw new Error(parse.error.errors[0]?.message || "Invalid data");
  }

  try {
    const res = await fetch(`${process.env.API_URL}/monthly-contribution`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nominal: data.nominal,
        id_created_by: 1,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Update failed!");
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
