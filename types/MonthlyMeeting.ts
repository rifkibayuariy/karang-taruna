export interface MonthlyMeeting {
  id_monthly_meeting: number | null;
  host: number;
  meeting_date: Date;
  description: string;
  creation_date: Date;
  created_by: number;
  last_update_date: Date | null;
  last_update_by: number | null;
  is_finish: boolean | null;
  hostname: string;
  nominal: string;
}
