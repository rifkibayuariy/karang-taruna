"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { CircleUser, LockKeyhole } from "lucide-react";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { Toaster } from "@/components/admin/ui/sonner";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="w-full md:w-140 lg:w-100 2xl:w-132 pb-10">
      <form
        action={formAction}
        className="flex flex-col gap-12 px-12 rounded-2xl"
      >
        <div className="flex justify-center items-center gap-4 pb-4">
          <Image width={48} height={48} src="/images/logo.png" alt="Logo" />
          <h1 className="font-bold text-4xl text-techtona-1">Techtona</h1>
        </div>
        <div className="space-y-6 text-techtona-1">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <CircleUser className="p-0.5 rounded-full bg-techtona-3" />
              <span>Username</span>
            </div>
            <Input
              name="username"
              placeholder="Username"
              className="md:text-md h-10 py-2 px-4 shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <LockKeyhole className="p-0.5 rounded bg-techtona-3" />
              <span>Password</span>
            </div>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              className="md:text-md h-10 py-2 px-4 shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
            />
          </div>
          {errorMessage && (
            <div className="bg-red-100 rounded-xl px-5 py-4">
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <Button
            size="lg"
            type="submit"
            className="bg-techtona-1 hover:bg-techtona-4 w-full text-md"
            aria-disabled={isPending}
          >
            Login
          </Button>
          <h2 className="text-center text-sm">
            <span>Don&apos;t have account? </span>
            <Link href="/admin/register" className="text-techtona-1 underline">
              Register
            </Link>
          </h2>
        </div>
      </form>
      <Toaster position="top-center" richColors />
    </div>
  );
}
