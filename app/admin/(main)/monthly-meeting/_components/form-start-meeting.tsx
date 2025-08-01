"use client";

import { PlayIcon } from "@heroicons/react/24/solid";
import { LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin/ui/select";
import { Member } from "@/types/Member";
import { Button } from "@/components/admin/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/admin/ui/form";
import { useToggle } from "@/hooks/use-toggle";
import { useRouter } from "next/navigation";
import { startMeeting } from "../actions";
import { ContributionMoney } from "@/types/ContributionMoney";

export const MonthlyMeetingSchema = z.object({
  id_member: z.string({
    errorMap: () => ({ message: "Host is required." }),
  }),
});

export type MonthlyMeetingSchemaFormData = z.infer<typeof MonthlyMeetingSchema>;

export type MonthlyMeetingFormInput = z.input<typeof MonthlyMeetingSchema>;

export default function FormStartMeeting({
  members,
  contributionMoney,
}: {
  members: Member[];
  contributionMoney: ContributionMoney;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const date = new Date();

  const date_formatted = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const form = useForm<MonthlyMeetingFormInput>({
    resolver: zodResolver(MonthlyMeetingSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: MonthlyMeetingSchemaFormData) => {
    setIsLoading(true);
    try {
      const res = await startMeeting(
        Number(data.id_member),
        Number(contributionMoney.id_monthly_contribution)
      );
      if (res.success) {
        toast.success("Success", {
          description: "Meeting Started!",
          duration: 3000,
        });

        router.push(`/admin/monthly-meeting/${res.id_monthly_meeting}/go-on`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onValidSubmit = (data: MonthlyMeetingFormInput) => {
    const parsedData = MonthlyMeetingSchema.parse(data);
    onSubmit(parsedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="border border-zinc-200 rounded-xl py-8 w-full max-w-144 flex flex-col gap-6 px-8"
      >
        <span className="text-center text-lg font-bold text-techtona-1">
          {date_formatted}
        </span>
        <FormField
          control={form.control}
          name="id_member"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-none border-zinc-200 w-full shadow-none focus-visible:ring-techtona-2/20 focus-visible:border-techtona-1/20">
                    <SelectValue placeholder="Select Host" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members.map((m) => {
                    return (
                      <SelectItem key={m.id_member} value={`${m.id_member}`}>
                        <div className="w-full flex gap-3 items-center text-techtona-1">
                          <span>{m.fullname}</span>
                          <span className="text-[10px] px-2 py-1 rounded-lg border border-zinc-200 font-semibold">
                            {m.location_name}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="bg-techtona-2 hover:bg-techtona-1 text-techtona-1 hover:text-white font-bold"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin size-5" />
            ) : (
              <PlayIcon className="size-5" />
            )}
            <span className="text-lg">Meeting</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
