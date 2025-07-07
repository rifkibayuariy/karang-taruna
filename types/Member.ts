export interface Member {
  id_member: number | null;
  email: string;
  telephone: string | null;
  fullname: string;
  nickname: string;
  gender: "male" | "female";
  date_of_birth: Date | null;
  id_location_detail: string;
  username: string;
  password: string;
  request_date: Date | null;
  is_active: boolean;
  status: "approved" | "pending" | "rejected";
  status_activation_date: Date | null;
  creation_date: Date | null;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
  location_name: string | null;
}
