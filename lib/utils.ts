import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cash } from "@/types/Cash";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(nominal: number | string) {
	const number = typeof nominal === "number" ? nominal : Number(nominal.replace(/\D/g, ""));
	const formatted = new Intl.NumberFormat("id-ID").format(number);
	return formatted;
}

export function formatToYMD_HMS(date: Date): string {
	const year = date.getFullYear();

	const month = String(date.getMonth() + 1).padStart(2, "0");

	const day = String(date.getDate()).padStart(2, "0");

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function calculateSummary(transactions: Cash[]) {
	let income = 0;
	let expense = 0;
	let balance = 0;

	for (const t of transactions) {
		if (t.type === "income") {
			income += Number(t.nominal);
		} else if (t.type === "expense") {
			expense += Number(t.nominal);
		}

		balance = income - expense;
	}

	return {
		income,
		expense,
		balance,
	};
}
