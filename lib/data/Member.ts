import bcrypt from "bcrypt";

export async function getMemberByUsername(username: string) {
  const hashedPassword = await bcrypt.hash("12345678", 10);

  try {
    //   const response = await fetch(`${process.env.API_URL}/locations/${id}`, {
    //     cache: "no-store",
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed fetching data");
    //   }
    //   const data = await response.json();

    //   const validatedResponse = ApiResponseSchema.parse(data);

    //   if (validatedResponse.data.length > 0) return validatedResponse.data[0];

    const members = [
      {
        id_member: 1,
        email: "email.rifkibayu@gmail.com",
        telephone: "0888",
        fullname: "Rifki Bayu Ariyanto",
        nickname: "Kiki",
        gender: "male",
        date_of_birth: "2003-09-08T17:00:00.000Z",
        id_location_detail: 12,
        username: "rifki",
        password: hashedPassword,
        request_date: "2003-09-08T17:00:00.000Z",
        is_active: true,
        status: "approved",
        status_activation_date: "2003-09-08T17:00:00.000Z",
        creation_date: "2003-09-08T17:00:00.000Z",
        created_by: 1,
        last_update_date: "2003-09-08T17:00:00.000Z",
        last_update_by: 1,
      },
    ];

    const filtered = members.filter(
      (member) =>
        member.status == "approved" &&
        (member.username == username || member.email == username)
    );

    return filtered[0];
  } catch (error) {
    console.error("Errors validations:", error);
    throw error;
  }
}
