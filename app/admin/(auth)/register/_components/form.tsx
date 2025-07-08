"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { useActionState } from "react";
import { registerUser, RegisterResponse } from "@/lib/register";
import {
  CircleUser,
  LockKeyhole,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react";
import { Toaster } from "@/components/admin/ui/sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [formState, formAction, isPending] = useActionState<RegisterResponse, FormData>(
    registerUser,
    { message: "", fields: {} }
  );

  const message = formState?.message;
  const isSuccess = message?.toLowerCase().includes("success");

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/admin/login");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  return (
    <div className="w-full md:w-140 lg:w-100 2xl:w-132 pb-10">
      <form action={formAction} className="flex flex-col gap-12 px-12 rounded-2xl">
        <div className="flex justify-center items-center gap-4 pb-4">
          <Image width={48} height={48} src="/images/logo.png" alt="Logo" />
          <h1 className="font-bold text-4xl text-techtona-1">Register</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-techtona-1">
          <InputField icon={<CircleUser />} name="username" label="Username" defaultValue={formState.fields?.username} required />
          <InputField icon={<Mail />} name="email" label="Email" type="email" defaultValue={formState.fields?.email} />
          <InputField icon={<Phone />} name="telephone" label="Phone" defaultValue={formState.fields?.telephone} />
          <InputField icon={<UserRound />} name="fullname" label="Full Name" defaultValue={formState.fields?.fullname} required />
          <InputField icon={<Tag />} name="nickname" label="Nickname" defaultValue={formState.fields?.nickname} />
          <InputField icon={<Calendar />} name="date_of_birth" label="Date of Birth" type="date" defaultValue={formState.fields?.date_of_birth} required />
          <InputField icon={<MapPin />} name="id_location_detail" label="Location ID" type="number" defaultValue={formState.fields?.id_location_detail} required />
          <InputField icon={<LockKeyhole />} name="password" label="Password" type="password" defaultValue={formState.fields?.password} required />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <UserRound className="p-0.5 rounded-full bg-techtona-3" />
              <span>Gender</span>
            </div>
            <select
              name="gender"
              defaultValue={formState.fields?.gender || ""}
              required
              className="h-10 py-2 px-4 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-techtona-3 bg-white text-techtona-1"
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {message && (
          <div className={`rounded-xl px-5 py-4 ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <Button
            size="lg"
            type="submit"
            className="bg-techtona-1 hover:bg-techtona-4 w-full text-md"
            aria-disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
          <h2 className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-techtona-1 underline">
              Login
            </Link>
          </h2>
        </div>
      </form>
      <Toaster position="top-center" richColors />
    </div>
  );
}

function InputField({
  icon,
  name,
  label,
  type = "text",
  defaultValue,
  required = false,
}: {
  icon: React.ReactNode;
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="p-0.5 rounded-full bg-techtona-3">{icon}</div>
        <span>{label}</span>
      </div>
      <Input
        name={name}
        type={type}
        placeholder={label}
        defaultValue={defaultValue || ""}
        required={required}
        className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
      />
    </div>
  );
}
