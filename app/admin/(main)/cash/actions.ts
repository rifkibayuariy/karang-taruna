"use server";

import { format } from "date-fns";
import { z } from "zod";

const TransactionSchema = z.object({
	date: z.date(),
	type: z.string().min(2, {
		message: "Location Name must be at least 2 characters.",
	}),
	description: z.string().min(1, {
		message: "Description must be at least 1 characters.",
	}),
	nominal: z
		.number()
		.min(1, {
			message: "Nominal must be at least 1 characters.",
		})
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), { message: "Nominal must be a number" }),
});

export type TransactionSchemaFormData = z.infer<typeof TransactionSchema>;

export async function submitTransaction(data: TransactionSchemaFormData) {
	const parse = TransactionSchema.safeParse(data);
	if (!parse.success) {
		throw new Error(parse.error.errors[0]?.message || "Invalid data");
	}

	const dateFormatted = format(data.date, "yyyy-MM-dd HH:mm:ss");

	const payload = {
		date: dateFormatted,
		type: data.type,
		nominal: data.nominal,
		description: data.description,
		created_by: 1,
		last_update_by: null,
	};

	try {
		const res = await fetch(`${process.env.API_URL}/cash`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.message || `Add Transaction failed!`);
		}

		return { success: true };
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw new Error("Unexpected error occurred.");
	}
}

export async function deleteTransaction(id_field: number, type: string) {
	try {
		const res = await fetch(`${process.env.API_URL}/cash`, {
			method: "DELETE",
			body: JSON.stringify({
				id_field,
				type,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.message || `Delete location failed!`);
		}

		return { success: true };
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw new Error("Unexpected error occurred.");
	}
}
