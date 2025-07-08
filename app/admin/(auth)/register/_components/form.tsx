"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { useActionState } from "react";
import { registerUser } from "@/lib/register";
import {
  CircleUser, LockKeyhole, Mail, Phone,
  Calendar, MapPin, Tag, UserRound,
} from "lucide-react";
import { Toaster } from "@/components/admin/ui/sonner";

interface RegisterFormState {
  message?: string;
  fields?: {
    username?: string;
    email?: string;
    telephone?: string;
    fullname?: string;
    nickname?: string;
    gender?: string;
    date_of_birth?: string;
    id_location_detail?: string;
    password?: string;
  };
}

export default function RegisterForm() {
  const [formState, formAction, isPending] = useActionState(registerUser, {
    message: "",
    fields: {},
  });

  const message = formState?.message;
  const isSuccess = message?.toLowerCase().includes("success");

  return (
    <div className="w-full md:w-140 lg:w-100 2xl:w-132 pb-10">
      <form
        action={formAction}
        className="flex flex-col gap-12 px-12 rounded-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center items-center gap-4 pb-4">
          <Image width={48} height={48} src="/images/logo.png" alt="Logo" />
          <h1 className="font-bold text-4xl text-techtona-1">Register</h1>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-techtona-1">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <CircleUser className="p-0.5 rounded-full bg-techtona-3" />
              <span>Username</span>
            </div>
            <Input
              name="username"
              placeholder="Username"
              defaultValue={String(formState.fields?.username || "")}
              required
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Mail className="p-0.5 rounded-full bg-techtona-3" />
              <span>Email</span>
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={String(formState.fields?.email || "")}
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Phone className="p-0.5 rounded-full bg-techtona-3" />
              <span>Phone</span>
            </div>
            <Input
              name="telephone"
              placeholder="Phone"
              defaultValue={String(formState.fields?.telephone || "")}
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <UserRound className="p-0.5 rounded-full bg-techtona-3" />
              <span>Full Name</span>
            </div>
            <Input
              name="fullname"
              placeholder="Full Name"
              defaultValue={String(formState.fields?.fullname || "")}
              required
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Nickname */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Tag className="p-0.5 rounded-full bg-techtona-3" />
              <span>Nickname</span>
            </div>
            <Input
              name="nickname"
              placeholder="Nickname"
              defaultValue={String(formState.fields?.nickname || "")}
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Calendar className="p-0.5 rounded-full bg-techtona-3" />
              <span>Date of Birth</span>
            </div>
            <Input
              name="date_of_birth"
              type="date"
              placeholder="dd/mm/yyyy"
              defaultValue={String(formState.fields?.date_of_birth || "")}
              required
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Location ID */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <MapPin className="p-0.5 rounded-full bg-techtona-3" />
              <span>Location ID</span>
            </div>
            <Input
              name="id_location_detail"
              type="number"
              placeholder="Location ID"
              defaultValue={String(formState.fields?.id_location_detail || "")}
              required
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <LockKeyhole className="p-0.5 rounded-full bg-techtona-3" />
              <span>Password</span>
            </div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              defaultValue={String(formState.fields?.password || "")}
              required
              className="h-10 py-2 px-4 border-zinc-200 focus-visible:ring-techtona-3"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <UserRound className="p-0.5 rounded-full bg-techtona-3" />
              <span>Gender</span>
            </div>
            <select
              name="gender"
              defaultValue={String(formState.fields?.gender || "")}
              required
              className="h-10 py-2 px-4 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-techtona-3 bg-white text-techtona-1"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`rounded-xl px-5 py-4 ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-500"
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Submit */}
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
