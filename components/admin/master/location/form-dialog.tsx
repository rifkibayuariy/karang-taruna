"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/admin/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/admin/ui/button";
import { SquarePen, X, Plus, Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/admin/ui/form";
import { Input } from "@/components/admin/ui/input";

import { Location } from "@/components/admin/master/location/columns";

const FormSchema = z.object({
  location: z.string().min(2, {
    message: "Location Name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 characters.",
  }),
});

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
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: location?.name || "",
      description: location?.description || "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(data.location);
  }

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
              {mode
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}{" "}
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
