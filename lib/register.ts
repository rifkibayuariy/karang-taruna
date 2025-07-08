"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  telephone: z.string().min(8),
  fullname: z.string().min(1),
  nickname: z.string().optional(),
  gender: z.enum(["male", "female"]),
  date_of_birth: z.string(),
  id_location_detail: z.string(),
  password: z.string().min(6),
});

export interface RegisterResponse {
  message: string;
  fields?: {
    username?: string;
    email?: string;
    telephone?: string;
    fullname?: string;
    nickname?: string;
    gender?: string;
    date_of_birth?: string;
    id_location_detail?: string;
    password?: string;
  };
}

export async function registerUser(
  _prevState: unknown,
  formData: FormData
): Promise<RegisterResponse> {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = registerSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      message: "Invalid input.",
      fields: rawData,
    };
  }

  const data = parsed.data;

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const payload = {
    username: data.username,
    email: data.email,
    telephone: data.telephone,
    fullname: data.fullname,
    nickname: data.nickname,
    gender: data.gender,
    date_of_birth: data.date_of_birth,
    id_location_detail: parseInt(data.id_location_detail),
    password: hashedPassword,
    request_date: new Date().toISOString(),
    creation_date: new Date().toISOString(),
    is_active: true,
    status: "pending",
    created_by: 0,
    last_update_date: new Date().toISOString(),
    last_update_by: 0,
  };

  try {
    const res = await fetch(`${process.env.API_URL}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed with status ${res.status}`);
    }

    return {
      message: "Registration successful! You can now log in.",
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Registration failed.";
    return {
      message: errorMessage,
      fields: rawData,
    };
  }
}
