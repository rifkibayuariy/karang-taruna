import { MonthlyMeeting } from "@/types/MonthlyMeeting";

export async function getMonthlyMeetingById(
  id: number
): Promise<MonthlyMeeting | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/monthly-meetings/${id}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}

export async function getNominalBill(): Promise<number> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/monthly-meetings/nominal-bill`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return 0;
    }

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }

    const data = await response.json();

    return Number(data.data.nominalBill);
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}

export async function getNominalPaidByMember(
  id_member: number,
  id_monthly_meeting: number
): Promise<number> {
  const params = new URLSearchParams({
    id_member: String(id_member),
    id_monthly_meeting: String(id_monthly_meeting),
  });

  try {
    const response = await fetch(
      `${process.env.API_URL}/monthly-meetings/nominal-paid?${params}`,
      {
        cache: "no-store",
      }
    );

    if (response.status === 404) {
      return 0;
    }

    if (!response.ok) {
      throw new Error("Failed fetching data");
    }

    const data = await response.json();

    return Number(data.data.nominalPaid);
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}
