"use server";

export async function startMeeting(
  id_member: number,
  id_monthly_contribution: number
) {
  const method = "POST";
  const payload = {
    id_member: id_member,
    created_by: 1,
    id_monthly_contribution: id_monthly_contribution,
  };

  try {
    const res = await fetch(`${process.env.API_URL}/monthly-meetings`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await res.json();

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Start Meeting Failed");
    }

    return {
      success: true,
      id_monthly_meeting: responseData.data.id_monthly_meeting,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred.");
  }
}
