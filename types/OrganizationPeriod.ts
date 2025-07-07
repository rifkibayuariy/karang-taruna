export interface OrganizationPeriod {
  id_organization_periode: number | null;
  start_periode: Date;
  end_periode: Date;
  description: string;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
}
