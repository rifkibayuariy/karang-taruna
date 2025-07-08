"use client";

import { useState } from "react";
import { X, Save, CircleHelp, CircleX, LoaderCircle, CalendarIcon } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/admin/ui/form";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/admin/ui/alert-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitTransaction } from "../actions";
import { Cash } from "@/types/Cash";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/admin/ui/calendar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/admin/ui/select";

const TransactionFormSchema = z.object({
	date: z
		.date({
			required_error: "Date is required",
			invalid_type_error: "Not a valid date",
		})
		.refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid date" }),
	type: z.string().min(2, {
		message: "Type must be at least 2 characters.",
	}),
	description: z.string().min(1, {
		message: "Description must be at least 1 character.",
	}),
	nominal: z
		.string()
		.min(1, { message: "Nominal is required" })
		.refine((val) => !isNaN(Number(val)), { message: "Nominal must be a number" }),
});

const TransactionSchema = TransactionFormSchema.transform((data) => ({
	...data,
	date: new Date(data.date),
	nominal: Number(data.nominal),
}));

type TransactionFormInput = z.infer<typeof TransactionFormSchema>;
type TransactionSchemaFormData = z.infer<typeof TransactionSchema>;

type Props = {
	cash?: Cash;
};

export default function FormTransaction({ cash }: Props) {
	const router = useRouter();

	const [isDialogOpen, setIsDialogOpen] = useToggle();
	const [validData, setValidData] = useState<TransactionSchemaFormData | null>(null);
	const [isLoading, setIsLoading] = useToggle();

	const form = useForm<TransactionFormInput>({
		resolver: zodResolver(TransactionFormSchema),
		defaultValues: {
			date: cash?.date ? new Date(cash.date) : new Date(),
			type: cash?.type ?? "",
			nominal: cash?.nominal?.toString() ?? "",
			description: cash?.description ?? "",
		},
		mode: "onChange",
	});

	const onValidSubmit = (data: TransactionFormInput) => {
		console.log("Form value before transform", data);
		const parsedData = TransactionSchema.safeParse(data);

		if (!parsedData.success) {
			console.error("Zod transformation error", parsedData.error);
			toast.error("Form error", {
				description: "Invalid data, please check again!",
			});
			return;
		}

		setValidData(parsedData.data);
		setIsDialogOpen(true);
	};

	const handleSubmit = () => {
		if (validData) {
			onSubmit(validData);
		}
	};

	const onSubmit = async (data: TransactionSchemaFormData) => {
		setIsLoading(true);
		try {
			const res = await submitTransaction(data);
			if (res.success) {
				toast.success("Success", {
					description: `Transaction added!`,
					duration: 3000,
				});
				setIsDialogOpen(false);
				setTimeout(() => {
					router.push("/admin/cash");
				}, 500);
			}
		} catch (err: unknown) {
			console.error(err);
			toast.error("Error", {
				description: "Something went wrong!",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const formatRupiah = (value: string): string => {
		return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onValidSubmit)}
					className="space-y-6 text-techtona-1"
				>
					<FormField
						control={form.control}
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date Transaction</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"pl-3 text-left font-normal bg-zinc-50 shadow-none border-zinc-200 w-full hover:bg-techtona-3",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="center">
										<Calendar
											mode="single"
											selected={
												field.value ? new Date(field.value) : undefined
											}
											onSelect={(selectedDate) =>
												field.onChange(selectedDate)
											}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											captionLayout="dropdown"
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Type</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select transaction type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="income">Income</SelectItem>
										<SelectItem value="expense">Expense</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="nominal"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nominal</FormLabel>
								<FormControl>
									<Input
										placeholder="Nominal"
										className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
										value={formatRupiah(field.value)}
										onChange={(e) => {
											const raw = e.target.value.replace(/\./g, "");
											field.onChange(raw);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder="Description"
										className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-8 flex flex-col md:flex-row md:justify-end gap-3">
						<Button
							type="submit"
							className="bg-techtona-1 hover:bg-techtona-4 w-full md:w-fit"
						>
							<Save />
							<span>Save</span>
						</Button>
						<Link href="/admin/cash">
							<Button
								variant="outline"
								className="border-zinc-200 shadow-none hover:bg-techtona-3 w-full md:w-fit"
							>
								<X />
								<span>Cancel</span>
							</Button>
						</Link>
					</div>
				</form>
			</Form>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent className="text-techtona-1">
					<AlertDialogHeader className="mb-4">
						<div className="flex justify-center">
							<CircleHelp className="size-14 bg-techtona-2 p-2 rounded-full" />
						</div>
						<AlertDialogTitle className="text-center">Are you sure?</AlertDialogTitle>
						<AlertDialogDescription className="text-center">
							{`Save new Transaction data? Click Save to proceed.`}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="md:justify-center">
						<AlertDialogCancel disabled={isLoading}>
							<CircleX className="size-4" />
							<span className="font-semibold">Cancel</span>
						</AlertDialogCancel>
						<AlertDialogAction asChild>
							<button
								type="submit"
								onClick={handleSubmit}
								className="bg-techtona-1 hover:bg-techtona-4"
								disabled={isLoading}
							>
								{isLoading ? <LoaderCircle className="animate-spin" /> : <Save />}
								<span>Save</span>
							</button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
