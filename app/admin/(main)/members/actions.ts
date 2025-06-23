"use server";

import { z } from "zod";

const MemberSchema = z.object({
  id_member: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  email: z.string().min(2, {
    message: "Location Name must be at least 2 characters.",
  }),
  telephone: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  fullname: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  nickname: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  gender: z.enum(["male", "female"]),
  date_of_birth: z.date(),
  id_location_detail: z.string(),
  username: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
  password: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

export type MemberSchemaFormData = z.infer<typeof MemberSchema>;

export async function submitMember(
  data: MemberSchemaFormData,
  mode: "new" | "edit"
) {
  const parse = MemberSchema.safeParse(data);
  if (!parse.success) {
    throw new Error(parse.error.errors[0]?.message || "Invalid data");
  }

  const method = mode == "new" ? "POST" : "PATCH";
  const payload =
    mode === "new"
      ? {
          email: data.email,
          telephone: data.telephone,
          fullname: data.fullname,
          nickname: data.nickname,
          gender: data.gender,
          date_of_birth: data.date_of_birth.toLocaleDateString("en-CA"),
          id_location_detail: Number(data.id_location_detail),
          username: data.username,
          password: data.password,
          is_active: true,
          status: "pending",
          created_by: 1,
          last_update_by: null,
        }
      : {
          id_member: data.id_member,
          email: data.email,
          telephone: data.telephone,
          fullname: data.fullname,
          nickname: data.nickname,
          gender: data.gender,
          date_of_birth: data.date_of_birth.toLocaleDateString("en-CA"),
          id_location_detail: Number(data.id_location_detail),
          username: data.username,
          password: data.password,
          is_active: true,
          last_update_by: 1,
        };

  try {
    const res = await fetch(`${process.env.API_URL}/members`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        err.message || `${mode == "new" ? "Add Member" : "Update"} failed!`
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
