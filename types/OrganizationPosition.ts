export interface OrganizationPosition {
  id_organization_position: number | null;
  name: string;
  description: string;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
}
