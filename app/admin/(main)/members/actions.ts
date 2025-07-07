"use server";

import bcrypt from "bcrypt";
import { Member } from "@/types/Member";

export async function submitMember(data: Member, mode: "new" | "edit") {
  const hashedPassword = data.password
    ? await bcrypt.hash(data.password, 10)
    : "";

  const method = mode == "new" ? "POST" : "PATCH";
  const payload =
    mode === "new"
      ? {
          email: data.email,
          telephone: data.telephone ?? null,
          fullname: data.fullname,
          nickname: data.nickname,
          gender: data.gender,
          date_of_birth: data.date_of_birth
            ? data.date_of_birth.toLocaleDateString("en-CA")
            : null,
          id_location_detail: Number(data.id_location_detail),
          username: data.username,
          password: hashedPassword,
          status: data.status,
          created_by: 1,
        }
      : {
          id_member: data.id_member,
          email: data.email,
          telephone: data.telephone,
          fullname: data.fullname,
          nickname: data.nickname,
          gender: data.gender,
          date_of_birth: data.date_of_birth
            ? data.date_of_birth.toLocaleDateString("en-CA")
            : null,
          id_location_detail: Number(data.id_location_detail),
          username: data.username,
          password: data.password ? hashedPassword : null,
          is_active: true,
          last_update_by: 1,
        };

  try {
    const res = await fetch(`${process.env.API_URL}/members`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(JSON.stringify(payload));

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

export async function setDeactivateMember(id: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/members/deactivate/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Deactivated member failed!`);
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
