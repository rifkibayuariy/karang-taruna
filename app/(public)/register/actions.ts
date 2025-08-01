"use server";

import { RegisterSchemaFormData } from "@/lib/schemas/MemberSchema";
import bcrypt from "bcrypt";

export async function registerMember(data: RegisterSchemaFormData) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const method = "POST";
  const payload = {
    email: data.email,
    telephone: data.telephone ?? null,
    fullname: data.fullname,
    nickname: data.nickname,
    gender: data.gender,
    date_of_birth: data.date_of_birth.toLocaleDateString("en-CA"),
    id_location_detail: Number(data.id_location_detail),
    username: data.username,
    password: hashedPassword,
    status: "pending",
    created_by: 1,
  };

  try {
    const res = await fetch(`${process.env.API_URL}/members`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Register failed!`);
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
