"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/admin/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import { SquarePen, X, Plus, Save } from "lucide-react";
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
import {
  submitLocation,
  LocationSchema,
  LocationSchemaFormData,
} from "../actions";
import { Location } from "@/types/Location";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  mode: "new" | "edit";
  location?: Location;
  children: React.ReactNode;
};

export default function FormLocationDialog({
  mode,
  location,
  children,
}: Props) {
  const [open, setOpen] = useToggle(false);
  const router = useRouter();

  const form = useForm<LocationSchemaFormData>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      location: location?.name || "",
      description: location?.description || "",
    },
  });

  const onSubmit = async (data: LocationSchemaFormData) => {
    try {
      console.log("ke trigger");
      const res = await submitLocation(data, mode);
      if (res.success) {
        router.refresh();
        toast.success("Successs", {
          description: "Monthly Contribution Updated!",
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="text-techtona-1 bg-zinc-50"
      >
        <DialogHeader className="w-full flex-row justify-between">
          <DialogTitle className="flex items-center gap-2">
            {mode == "new" ? (
              <Plus className="size-8 p-2 rounded-lg bg-techtona-2" />
            ) : (
              <SquarePen className="size-8 p-2 rounded-lg bg-techtona-2" />
            )}
            <span>
              {mode == "new" ? "New " : "Edit "}
              Location
            </span>
          </DialogTitle>
          <DialogClose className="cursor-pointer">
            <X className="size-5" />
          </DialogClose>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-6"
          >
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
            <DialogFooter className="mt-4">
              <Button
                type="submit"
                className="bg-techtona-1 hover:bg-techtona-4"
              >
                {mode == "new" ? <Save /> : <SquarePen />}
                <span>{mode == "new" ? "Save" : "Edit"}</span>
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  <X className="size-5" />
                  <span>Cancel</span>
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
