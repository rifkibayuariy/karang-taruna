import { z } from "zod";

export const TransactionApiSchema = z.object({
	id: z.number().nullable(),
	date: z.coerce.date(),
	type: z.coerce.string(),
	nominal: z.coerce.number(),
	description: z.coerce.string(),
	creation_date: z.coerce.date(),
	created_by: z.number(),
	last_update_date: z.coerce.date().nullable(),
	last_update_by: z.number().nullable(),
});

export const TransactionSchema = TransactionApiSchema.transform((data) => ({
	id: data.id,
	date: data.date,
	type: data.type,
	nominal: data.nominal,
	description: data.description,
	creation_date: data.creation_date,
	created_by: data.created_by,
	last_update_date: data.last_update_date,
	last_update_by: data.last_update_by,
}));

export const ApiResponseSchema = z.object({
	message: z.string(),
	data: z.array(TransactionSchema),
	meta: z
		.object({
			page: z.number(),
			per_page: z.number(),
			total_page: z.number(),
			total_data: z.number(),
			search: z.string(),
		})
		.optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export async function getCashDataTable({
	page,
	search,
}: {
	page: number;
	search: string;
}): Promise<ApiResponse> {
	try {
		const params = new URLSearchParams({
			page: String(page),
			search: search ?? "",
		});

		const response = await fetch(`${process.env.API_URL}/cash?type&${params}`, {
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Failed fetching data");
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Errors validations:", error);
		throw error;
	}
}

export async function getCashByType({ type }: { type: string }): Promise<ApiResponse> {
	try {
		const params = new URLSearchParams({ type });

		const response = await fetch(`${process.env.API_URL}/cash/all?${params}`, {
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error("Failed fetching data");
		}
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Errors validations:", error);
		throw error;
	}
}
