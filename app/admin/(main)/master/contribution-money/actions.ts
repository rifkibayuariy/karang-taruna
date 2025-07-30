"use server";

import { ContributionMoneyFormData } from "@/lib/schemas/ContributionMoneySchema";

export async function submitContributionMoney(data: ContributionMoneyFormData) {
  try {
    const res = await fetch(`${process.env.API_URL}/monthly-contributions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nominal: data.nominal,
        created_by: 1,
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
