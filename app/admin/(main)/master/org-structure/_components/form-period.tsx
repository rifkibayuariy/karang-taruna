"use client";

import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationPeriod } from "@/types/OrganizationPeriod";
import {
  OrganizationPeriodSchema,
  OrganizationPeriodSchemaFormData,
  OrganizationPeriodFormInput,
} from "@/lib/schemas/OrganizationPeriodSchema";
import { toast } from "sonner";
import { submitNewPeriod } from "../actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/admin/ui/form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/admin/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/admin/ui/popover";
import { Button } from "@/components/admin/ui/button";
import { Textarea } from "@/components/admin/ui/textarea";
import { Save, LoaderCircle, CalendarIcon, SquarePen } from "lucide-react";

type Props = {
  mode: "new" | "edit";
  orgPeriod?: OrganizationPeriod | null;
  onSuccess?: () => void;
};

export default function FormPeriod({ mode, orgPeriod, onSuccess }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const form = useForm<OrganizationPeriodFormInput>({
    resolver: zodResolver(OrganizationPeriodSchema),
    defaultValues: {
      id_organization_periode:
        orgPeriod?.id_organization_periode != null
          ? `${orgPeriod.id_organization_periode}`
          : "",
      start_periode: orgPeriod?.start_periode
        ? new Date(orgPeriod.start_periode)
        : undefined,
      end_periode: orgPeriod?.end_periode
        ? new Date(orgPeriod.end_periode)
        : undefined,
      description: orgPeriod?.description || "",
    },
    mode: "onChange",
  });

  const { isDirty, isValid } = form.formState;
  const isSubmittable = mode == "new" ? isValid : isDirty && isValid;

  const onSubmit = async (data: OrganizationPeriodSchemaFormData) => {
    setIsLoading(true);
    try {
      const res = await submitNewPeriod(data, mode);
      if (res.success) {
        toast.success("Successs", {
          description: `New Period ${mode == "new" ? "Added" : "Updated"}!`,
          duration: 3000,
        });

        onSuccess?.();
        router.refresh();
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

  const onValidSubmit = (data: OrganizationPeriodFormInput) => {
    const parsedData = OrganizationPeriodSchema.parse(data);
    onSubmit(parsedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className="space-y-4 text-techtona-1"
      >
        <FormField
          control={form.control}
          name="id_organization_periode"
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
        <div className="flex flex-row gap-4">
          <div className="flex-1/2">
            <FormField
              control={form.control}
              name="start_periode"
              render={({ field }) => (
                <FormItem>
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
                            <span>Start Period Date</span>
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
          </div>
          <div className="flex-1/2">
            <FormField
              control={form.control}
              name="end_periode"
              render={({ field }) => (
                <FormItem>
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
                            <span>End Period Date</span>
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
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field: { value, ...restOfField } }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  value={value ?? ""}
                  className="shadow-none border-zinc-200 focus-visible:ring-techtona-3 focus-visible:border-zinc-300"
                  {...restOfField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={`mt-6 ${mode == "edit" && !isSubmittable ? "hidden" : ""}${
            mode == "edit" ? " mb-4" : ""
          }`}
        >
          <Button
            type="submit"
            className="bg-techtona-1 hover:bg-techtona-4 w-full"
            disabled={isLoading || !isSubmittable}
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : mode == "new" ? (
              <Save />
            ) : (
              <SquarePen />
            )}
            <span>{mode == "new" ? "Add New Period" : "Update Period"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
