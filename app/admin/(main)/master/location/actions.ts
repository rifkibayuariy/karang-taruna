import { z } from "zod";

export const LocationSchema = z.object({
  location: z.string().min(2, {
    message: "Location Name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

export type LocationSchemaFormData = z.infer<typeof LocationSchema>;

export async function submitLocation(
  data: LocationSchemaFormData,
  mode: "new" | "edit"
) {
  const parse = LocationSchema.safeParse(data);
  if (!parse.success) {
    throw new Error(parse.error.errors[0]?.message || "Invalid data");
  }

  console.log(mode);

  try {
    const res = await fetch(`${process.env.API_URL}/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Update failed!");
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
