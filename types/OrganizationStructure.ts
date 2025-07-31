export interface OrganizationStructure {
  id_organization_structure: number | null;
  id_organization_periode: number | null;
  id_organization_position: number | null;
  id_member: number | null;
  description: string;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
  name: string | null;
}
