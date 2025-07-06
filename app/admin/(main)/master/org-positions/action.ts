"use server";

import { z } from "zod";

const OrganizationPostionSchema = z.object({
  id_position: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  position: z.string().min(2, {
    message: "Position Name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

export type OrganizationPostionSchemaFormData = z.infer<
  typeof OrganizationPostionSchema
>;

export async function submitOrganizationPostion(
  data: OrganizationPostionSchemaFormData,
  mode: "new" | "edit"
) {
  const parse = OrganizationPostionSchema.safeParse(data);
  if (!parse.success) {
    throw new Error(parse.error.errors[0]?.message || "Invalid data");
  }

  const method = mode == "new" ? "POST" : "PATCH";
  const payload =
    mode === "new"
      ? {
          position_name: data.position,
          description: data.description,
          created_by: 1,
          last_update_by: null,
        }
      : {
          id_position: data.id_position,
          position_name: data.position,
          description: data.description,
          last_update_by: 1,
        };
  try {
    const res = await fetch(`${process.env.API_URL}/locations`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        err.message ||
          `${mode == "new" ? "Add Organization Position" : "Update"} failed!`
      );
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function deleteOrganizationPosition(id: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/locations/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Delete Organization Position failed!`);
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
