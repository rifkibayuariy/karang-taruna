export interface OrganizationPosition {
  id_position: number | null;
  position_name: string;
  description: string;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
}