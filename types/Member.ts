export interface Member {
  id_member: number | null;
  email: string;
  telephone: string;
  fullname: string;
  nickname: string;
  gender: "male" | "female";
  date_of_birth: Date;
  id_location_detail: string;
  username: string;
  password: string;
  request_date: Date;
  is_active: boolean;
  status: "approved" | "pending" | "rejected";
  status_activation_date: Date;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
}
