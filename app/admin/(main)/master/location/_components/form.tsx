"use client";

import { useState } from "react";
import {
  SquarePen,
  X,
  Save,
  CircleHelp,
  CircleX,
  LoaderCircle,
} from "lucide-react";
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
import { submitLocation, LocationSchemaFormData } from "../actions";
import { Location } from "@/types/Location";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";

import Link from "next/link";

type Props = {
  mode: "new" | "edit";
  location?: Location;
};

const LocationSchema = z.object({
  id_location: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === "" || val === undefined) return null;
      return typeof val === "string" ? Number(val) : val;
    })
    .nullable(),
  location: z.string().min(2, {
    message: "Location Name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

type LocationFormInput = z.input<typeof LocationSchema>;

export default function FormLocation({ mode, location }: Props) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useToggle();
  const [validData, setValidData] = useState<LocationSchemaFormData | null>(
    null
  );
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
    setValidData(parsedData);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (validData) {
      onSubmit(validData);
    }
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

        setIsDialogOpen(false);
        setTimeout(() => {
          router.push("/admin/master/location");
        }, 500);
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
            >
              {mode == "new" ? <Save /> : <SquarePen />}
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

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="text-techtona-1">
          <AlertDialogHeader className="mb-4">
            <div className="flex justify-center">
              <CircleHelp className="size-14 bg-techtona-2 p-2 rounded-full" />
            </div>
            <AlertDialogTitle className="text-center">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {`${mode == "new" ? "Save new" : "Update"} location data? click ${
                mode == "new" ? "Save" : "Update"
              } to proceed`}
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
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : mode == "new" ? (
                  <Save />
                ) : (
                  <SquarePen />
                )}
                <span>{mode == "new" ? "Save" : "Update"}</span>
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
