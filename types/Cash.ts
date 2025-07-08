export interface Cash {
	id: number | null;
	date: Date;
	type: string;
	nominal: number;
	description: string;
	creation_date: Date;
	created_by: number;
	last_update_date: Date | null;
	last_update_by: number | null;
}
