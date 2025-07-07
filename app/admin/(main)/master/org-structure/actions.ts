"use server";

import { z } from "zod";

export const OrganizationPeriodSchema = z.object({
  id_organization_period: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  start_date: z.date(),
  end_date: z.date(),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

export type OrganizationPeriodSchemaFormData = z.infer<
  typeof OrganizationPeriodSchema
>;
