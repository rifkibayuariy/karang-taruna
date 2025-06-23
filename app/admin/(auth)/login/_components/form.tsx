"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { CircleUser, LockKeyhole } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UserSchema = z.object({
  username: z.string().min(5, {
    message: "Location Name must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Description must be at least 8 characters.",
  }),
});

type UserFormInput = z.input<typeof UserSchema>;

export default function LoginForm() {
  const form = useForm<UserFormInput>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <div className="w-full md:w-140 lg:w-100 2xl:w-132 pb-10">
      <Form {...form}>
        <form
          onSubmit={() => {}}
          className="flex flex-col gap-12 px-12 rounded-2xl"
        >
          <div className="flex justify-center items-center gap-4 pb-4">
            <Image width={48} height={48} src="/images/logo.png" alt="Logo" />
            <h1 className="font-bold text-4xl text-techtona-1">Techtona</h1>
          </div>
          <div className="space-y-6 text-techtona-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-techtona-1">
                    <CircleUser className="p-0.5 rounded-full bg-techtona-3" />
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="md:text-md h-10 py-2 px-4 shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-techtona-1">
                    <LockKeyhole className="p-0.5 rounded bg-techtona-3" />
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      className="md:text-md h-10 py-2 px-4 shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Button
              size="lg"
              type="submit"
              className="bg-techtona-1 hover:bg-techtona-4 w-full text-md"
            >
              Login
            </Button>
            <h2 className="text-center text-sm">
              Don't have account?{" "}
              <Link
                href="/admin/register"
                className="text-techtona-1 underline"
              >
                Register
              </Link>
            </h2>
          </div>
        </form>
      </Form>
    </div>
  );
}
