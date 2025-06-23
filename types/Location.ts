export interface Location {
  id_location: number | null;
  location_name: string;
  description: string;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
}
