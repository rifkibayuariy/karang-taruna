import { z } from "zod";

export const OrganizationPeriodSchema = z.object({
  id_organization_periode: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  start_periode: z.date(),
  end_periode: z.date(),
  description: z.string().optional(),
});
export type OrganizationPeriodSchemaFormData = z.infer<
  typeof OrganizationPeriodSchema
>;

export type OrganizationPeriodFormInput = z.input<
  typeof OrganizationPeriodSchema
>;

export const OrganizationPeriodApiSchema = z.object({
  id_organization_periode: z.number().nullable(),
  start_periode: z.date(),
  end_periode: z.date(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
  last_update_date: z.coerce.date().nullable(),
  last_update_by: z.number().nullable(),
});

export const ListApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(OrganizationPeriodApiSchema),
});

export const SingleApiResponseSchema = z.object({
  message: z.string(),
  data: OrganizationPeriodApiSchema,
});

export type OrganizationPeriod = z.infer<typeof OrganizationPeriodApiSchema>;
export type ListApiResponse = z.infer<typeof ListApiResponseSchema>;
export type SingleApiResponse = z.infer<typeof SingleApiResponseSchema>;
