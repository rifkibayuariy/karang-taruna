"use server";

import { LocationSchemaFormData } from "@/lib/schemas/LocationSchema";

export async function submitLocation(
  data: LocationSchemaFormData,
  mode: "new" | "edit"
) {
  const method = mode == "new" ? "POST" : "PATCH";
  const payload =
    mode === "new"
      ? {
          location_name: data.location,
          description: data.description,
          created_by: 1,
          last_update_by: null,
        }
      : {
          id_location: data.id_location,
          location_name: data.location,
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
        err.message || `${mode == "new" ? "Add Location" : "Update"} failed!`
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

export async function deleteLocation(id: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/locations/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Delete location failed!`);
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
