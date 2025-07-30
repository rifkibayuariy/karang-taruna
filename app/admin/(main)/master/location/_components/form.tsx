"use client";

import { SquarePen, X, Save, LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/admin/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitLocation } from "../actions";
import {
  LocationSchema,
  LocationSchemaFormData,
  LocationFormInput,
} from "@/lib/schemas/LocationSchema";
import { Location } from "@/types/Location";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";

import Link from "next/link";

type Props = {
  mode: "new" | "edit";
  location?: Location | null;
};

export default function FormLocation({ mode, location }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const form = useForm<LocationFormInput>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      id_location:
        location?.id_location != null ? `${location.id_location}` : "",
      location: location?.location_name || "",
      description: location?.description || "",
    },
    mode: "onChange",
  });

  const onValidSubmit = (data: LocationFormInput) => {
    const parsedData = LocationSchema.parse(data);
    onSubmit(parsedData);
  };

  const onSubmit = async (data: LocationSchemaFormData) => {
    setIsLoading(true);
    try {
      const res = await submitLocation(data, mode);
      if (res.success) {
        toast.success("Successs", {
          description: `Location ${mode == "new" ? "Added" : "Updated"}!`,
          duration: 3000,
        });

        router.push("/admin/master/location");
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValidSubmit)}
          className="space-y-6 text-techtona-1"
        >
          <FormField
            control={form.control}
            name="id_location"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location Name"
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
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : mode == "new" ? (
                <Save />
              ) : (
                <SquarePen />
              )}
              <span>{mode == "new" ? "Save" : "Update"}</span>
            </Button>
            <Link href="/admin/master/location">
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
    </>
  );
}
