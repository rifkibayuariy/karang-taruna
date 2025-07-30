import { z } from "zod";

export const ContributionMoneySchema = z.object({
  nominal: z
    .number({
      required_error: "Nominal is required!",
      invalid_type_error: "Nominal must be a number",
    })
    .min(1000, "Nominal must be at least Rp. 1.000"),
});

export type ContributionMoneyFormData = z.infer<typeof ContributionMoneySchema>;

export const ContributionMoneyApiSchema = z.object({
  id_monthly_contribution: z.number(),
  nominal: z.coerce.number(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
});

export const ListApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(ContributionMoneyApiSchema),
});

export const SingleApiResponseSchema = z.object({
  message: z.string(),
  data: ContributionMoneyApiSchema,
});

export type Location = z.infer<typeof ContributionMoneyApiSchema>;
export type ListApiResponse = z.infer<typeof ListApiResponseSchema>;
export type SingleApiResponse = z.infer<typeof SingleApiResponseSchema>;