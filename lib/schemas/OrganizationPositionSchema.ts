import { z } from "zod";

export const OrganizationPositionSchema = z.object({
  id_organization_position: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  name: z.string().min(2, {
    message: "Position Name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

export type OrganizationPositionSchemaFormData = z.infer<
  typeof OrganizationPositionSchema
>;

export type OrganizationPositionFormInput = z.input<
  typeof OrganizationPositionSchema
>;

export const OrganizationPositionApiSchema = z.object({
  id_organization_position: z.number().nullable(),
  name: z.coerce.string(),
  description: z.coerce.string(),
  creation_date: z.coerce.date(),
  created_by: z.number(),
  last_update_date: z.coerce.date().nullable(),
  last_update_by: z.number().nullable(),
});

export const ListApiResponseSchema = z.object({
  message: z.string(),
  data: z.array(OrganizationPositionApiSchema),
  meta: z
    .object({
      page: z.number(),
      per_page: z.number(),
      total_page: z.number(),
      total_data: z.number(),
      search: z.string().optional(),
    })
    .optional(),
});

export const SingleApiResponseSchema = z.object({
  message: z.string(),
  data: OrganizationPositionApiSchema,
});

export type OrganizationPosition = z.infer<typeof OrganizationPositionApiSchema>;
export type ListApiResponse = z.infer<typeof ListApiResponseSchema>;
export type SingleApiResponse = z.infer<typeof SingleApiResponseSchema>;
