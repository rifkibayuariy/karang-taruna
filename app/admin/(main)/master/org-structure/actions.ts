"use server";

import { OrganizationPeriodSchemaFormData } from "@/lib/schemas/OrganizationPeriodSchema";

export async function submitNewPeriod(
  data: OrganizationPeriodSchemaFormData,
  mode: "new" | "edit"
) {
  const method = mode == "new" ? "POST" : "PATCH";
  const payload =
    mode === "new"
      ? {
          start_period: data.start_periode.toLocaleDateString("en-CA"),
          end_period: data.end_periode.toLocaleDateString("en-CA"),
          description: data.description ?? "",
          created_by: 1,
        }
      : {
          id_organization_period: data.id_organization_periode,
          start_period: data.start_periode.toLocaleDateString("en-CA"),
          end_period: data.end_periode.toLocaleDateString("en-CA"),
          description: data.description,
          last_update_by: 1,
        };

  try {
    const res = await fetch(`${process.env.API_URL}/organization-periods`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        err.message ||
          `${
            mode == "new"
              ? "Add New Organization Period"
              : "Update Organization Period"
          } failed!`
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

export async function submitPeriodPosition(
  id_period: number,
  id_organization_position: number
) {
  const method = "POST";
  const payload = {
    id_organization_position: id_organization_position,
    id_organization_period: id_period,
    created_by: 1,
  };

  try {
    const res = await fetch(
      `${process.env.API_URL}/organization-structure/add-position`,
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Add Position to Period Failed!");
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function submitStructureMember(
  id_organization_structure: number,
  id_member: number
) {
  const method = "PATCH";
  const payload = {
    id_organization_structure: id_organization_structure,
    id_member: id_member,
    last_update_by: 1,
  };

  try {
    const res = await fetch(
      `${process.env.API_URL}/organization-structure/set-position-member`,
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        err.message || "Select Member to Position Period Failed!"
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

export async function deleteOrganizationPeriod(id: number) {
  try {
    const res = await fetch(
      `${process.env.API_URL}/organization-periods/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Delete Organization Period failed!`);
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}

export async function deleteStructure(id: number) {
  try {
    const res = await fetch(
      `${process.env.API_URL}/organization-structure/${id}`,
      {
        method: "DELETE",
      }
    );

    console.log()

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Delete Position at Period failed!`);
    }

    return { success: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
