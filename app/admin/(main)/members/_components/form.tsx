"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/admin/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/admin/ui/radio-group";
import { Member } from "@/types/Member";
import { Location } from "@/types/Location";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/admin/ui/input";
import { Button } from "@/components/admin/ui/button";
import { SquarePen, X, Save, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/admin/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/admin/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin/ui/select";

import { submitMember } from "../actions";

type Props = {
  mode: "new" | "edit";
  locations: Location[];
  member?: Member;
};

const MemberSchema = z
  .object({
    id_member: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (val === "" || val === undefined) return null;
        return typeof val === "string" ? Number(val) : val;
      })
      .nullable(),
    email: z.string().email({
      message: "Invalid email format.",
    }),
    telephone: z.string().nullable(),
    fullname: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    nickname: z.string().min(1, {
      message: "Nickname is required.",
    }),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Please select a gender." }),
    }),
    date_of_birth: z.date().nullable(),
    id_location_detail: z.string({
      errorMap: () => ({ message: "Location detail is required." }),
    }),
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm_password: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type MemberFormInput = z.input<typeof MemberSchema>;

export default function FormMember({ mode, locations, member }: Props) {
  const router = useRouter();
  const form = useForm<MemberFormInput>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      id_member: member?.id_member != null ? `${member.id_member}` : "",
      email: member?.email || "",
      telephone: member?.telephone || null,
      fullname: member?.fullname || "",
      nickname: member?.nickname || "",
      gender: member?.gender || "male",
      date_of_birth: member?.date_of_birth || null,
      id_location_detail: member?.id_location_detail || "",
      username: member?.username || "",
      password: "",
      confirm_password: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const parsed = MemberSchema.parse(data);

    const member: Member = {
      id_member: parsed.id_member,
      email: parsed.email,
      telephone: parsed.telephone,
      fullname: parsed.fullname,
      nickname: parsed.nickname,
      gender: parsed.gender,
      date_of_birth: parsed.date_of_birth,
      id_location_detail: parsed.id_location_detail,
      username: parsed.username,
      password: parsed.password,
      request_date: null,
      is_active: true,
      status: "approved",
      status_activation_date: null,
      creation_date: null,
      created_by: 1,
      last_update_date: null,
      last_update_by: null,
      location_name: null,
    };

    return onSubmit(member);
  });

  const onSubmit = async (data: Member) => {
    try {
      const res = await submitMember(data, mode);
      if (res.success) {
        toast.success(
          `Member ${mode == "new" ? "added" : "updated"} successfully!`
        );
        router.push("/admin/members");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 text-techtona-1">
        <FormField
          control={form.control}
          name="id_member"
          render={({ field }) => (
            <FormControl>
              <input
                type="hidden"
                {...field}
                value={
                  field.value !== null && field.value !== undefined
                    ? field.value
                    : ""
                }
              />
            </FormControl>
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
                  placeholder="example@domain.com"
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                  {...field}
                />
              </FormControl>
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
                  placeholder="081234567891"
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Fullname"
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nickname"
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col mt-2"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
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
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
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
          name="id_location_detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-none border-zinc-200 w-full shadow-none">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations.map((l) => {
                    return (
                      <SelectItem
                        key={l.id_location}
                        value={`${l.id_location}`}
                      >
                        {l.location_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
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
            {mode == "new" ? <Save /> : <SquarePen />}
            <span>{mode == "new" ? "Save" : "Edit"}</span>
          </Button>
          <Link href="/admin/members">
            <Button
              type="button"
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
  );
}
