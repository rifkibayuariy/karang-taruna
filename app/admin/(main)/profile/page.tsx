"use client";
import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { Button } from "@/components/admin/ui/button";
import { Calendar } from "@/components/admin/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowUpFromLine, CalendarIcon, Save, Trash2, X, Pencil } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const ProfileFormSchema = z.object({
	name: z.string().min(1, {
		message: "Description must be at least 1 character.",
	}),
	email: z
		.string()
		.min(1, {
			message: "Type must be at least 2 characters.",
		})
		.email("Invalid email address"),
	dateOfBirth: z
		.date({
			required_error: "Date is required",
			invalid_type_error: "Not a valid date",
		})
		.refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid date" }),
	telephone: z.string().min(1, {
		message: "Type must be at least 1 characters.",
	}),
	country: z.string().min(1, {
		message: "Description must be at least 1 character.",
	}),
	city: z.string().min(1, {
		message: "Description must be at least 1 character.",
	}),
	postalCode: z.string().min(1, {
		message: "Description must be at least 1 character.",
	}),
	province: z.string().min(1, {
		message: "Description must be at least 1 character.",
	}),
});

export default function Profile() {
	// Dummy data, replace with real data from API/database
	const profileData = {
		name: "Rifky Bayu Arianto",
		email: "rifkybayuariy@gmail.com",
		dateOfBirth: new Date("2003-09-27"),
		telephone: "08123456789",
		country: "Indonesia",
		city: "Klaten",
		postalCode: "35111",
		province: "Jawa Tengah",
	};

	const [isEditing, setIsEditing] = useState(false);

	const form = useForm({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			name: profileData.name,
			email: profileData.email,
			dateOfBirth: profileData.dateOfBirth,
			telephone: profileData.telephone,
			country: profileData.country,
			city: profileData.city,
			postalCode: profileData.postalCode,
			province: profileData.province,
		},
	});

	return (
		<main className="md:pt-8 pb-12 min-h-screen">
			<div className="w-full">
				<h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold">
					Settings
				</h1>
				<div className="pb-6 md:pt-3">
					<Breadcrumb />
				</div>

				<div className="bg-white shadow rounded-xl p-8 max-w-full">
					<h2 className="text-xl font-semibold mb-6 text-gray-700">
						General Information
					</h2>

					{/* Foto Profil */}
					<div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
						<Image
							src="/images/profile.png"
							alt="Profile"
							className="rounded-full object-cover"
							width={100}
							height={100}
						/>
						<div>
							<p className="font-semibold text-gray-900 text-lg">
								Rifky Bayu Arianto
							</p>
							<p className="text-sm text-gray-500 mb-3">Sekretaris</p>
							<div className="flex flex-col sm:flex-row gap-3">
								<Button
									type="submit"
									className="bg-techtona-1 hover:bg-techtona-4 w-full md:w-fit cursor-pointer"
								>
									<ArrowUpFromLine />
									Upload New
									<span>Photo</span>
								</Button>
								<Button className="bg-red-400 hover:bg-red-500 cursor-pointer">
									<Trash2 className="size-4" />
									<span className="font-semibold">Delete</span>
								</Button>
							</div>
						</div>
					</div>

					<Form {...form}>
						<form className="space-y-6 text-techtona-1">
							<div className="flex justify-end mb-4">
								{!isEditing && (
									<Button
										type="button"
										variant="ghost"
										className="border border-zinc-200 text-techtona-1 hover:bg-techtona-3"
										onClick={() => setIsEditing(true)}
									>
										<Pencil className="mr-2 size-4" />
										Edit
									</Button>
								)}
							</div>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Name"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="Email"
												type="email"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dateOfBirth"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date of Birth</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"pl-3 text-left font-normal bg-zinc-50 shadow-none border-zinc-200 w-full hover:bg-techtona-3",
															!field.value && "text-muted-foreground",
															!isEditing &&
																"pointer-events-none opacity-60"
														)}
														disabled={!isEditing}
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
														field.value
															? new Date(field.value)
															: undefined
													}
													onSelect={(selectedDate) =>
														isEditing && field.onChange(selectedDate)
													}
													disabled={(date) =>
														date > new Date() ||
														date < new Date("1900-01-01")
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
								name="telephone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telephone</FormLabel>
										<FormControl>
											<Input
												placeholder="Telephone"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<FormControl>
											<Input
												placeholder="Country"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input
												placeholder="City"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="postalCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input
												placeholder="Postal Code"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="province"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Province</FormLabel>
										<FormControl>
											<Input
												placeholder="Province"
												{...field}
												disabled={!isEditing}
												className={cn(
													!isEditing && "bg-zinc-100 text-zinc-400"
												)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-4">
								{isEditing ? (
									<>
										<Button
											variant="outline"
											className="border-zinc-200 shadow-none hover:bg-techtona-3 w-full md:w-fit cursor-pointer"
											type="button"
											onClick={() => setIsEditing(false)}
										>
											<X />
											<span>Cancel</span>
										</Button>
										<Button
											type="submit"
											className="bg-techtona-1 hover:bg-techtona-4 w-full md:w-fit cursor-pointer"
										>
											<Save />
											<span>Save</span>
										</Button>
									</>
								) : null}
							</div>
						</form>
					</Form>

					{/* Formulir */}
					{/* <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
						<div>
							<label className="block font-medium mb-2" htmlFor="organization-name">
								Nama Organisasi
							</label>
							<input
								id="organization-name"
								type="text"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="email">
								Alamat Email
							</label>
							<input
								id="email"
								type="email"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="phone-number">
								Nomor HP
							</label>
							<input
								id="phone-number"
								type="text"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="fax">
								Fax
							</label>
							<input
								id="fax"
								type="text"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="country">
								Negara
							</label>
							<select
								id="country"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								defaultValue="Indonesia"
							>
								<option>Indonesia</option>
								<option>Bali</option>
								<option>Jawa</option>
								<option>Lampung</option>
							</select>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="city">
								Kota
							</label>
							<input
								id="city"
								type="text"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="postal-code">
								Kode Pos
							</label>
							<input
								id="postal-code"
								type="text"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block font-medium mb-2" htmlFor="province">
								Provinsi
							</label>
							<input
								id="province"
								type="text"
								className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
					</form> */}

					{/* Button */}
					{/* <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-4">
						<Button
							variant="outline"
							className="border-zinc-200 shadow-none hover:bg-techtona-3 w-full md:w-fit cursor-pointer"
						>
							<X />
							<span>Cancel</span>
						</Button>
						<Button
							type="submit"
							className="bg-techtona-1 hover:bg-techtona-4 w-full md:w-fit cursor-pointer"
						>
							<Save />
							<span>Save</span>
						</Button>
					</div> */}
				</div>
			</div>
		</main>
	);
}
