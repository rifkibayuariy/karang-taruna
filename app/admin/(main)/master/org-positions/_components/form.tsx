"use client";

import { OrganizationPosition } from "@/types/OrganizationPosition";
import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";
import { submitOrganizationPosition } from "../actions";
import {
  OrganizationPositionSchema,
  OrganizationPositionSchemaFormData,
  OrganizationPositionFormInput,
} from "@/lib/schemas/OrganizationPositionSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/admin/ui/form";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { SquarePen, X, Save, LoaderCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  mode: "new" | "edit";
  orgPos?: OrganizationPosition | null;
};

export default function FormOrganizationPosition({ mode, orgPos }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const form = useForm<OrganizationPositionFormInput>({
    resolver: zodResolver(OrganizationPositionSchema),
    defaultValues: {
      id_organization_position:
        orgPos?.id_organization_position != null
          ? `${orgPos.id_organization_position}`
          : "",
      name: orgPos?.name || "",
      description: orgPos?.description || "",
    },
    mode: "onChange",
  });

  const onValidSubmit = (data: OrganizationPositionFormInput) => {
    const parsedData = OrganizationPositionSchema.parse(data);
    onSubmit(parsedData);
  };

  const onSubmit = async (data: OrganizationPositionSchemaFormData) => {
    setIsLoading(true);
    try {
      const res = await submitOrganizationPosition(data, mode);
      if (res.success) {
        toast.success("Successs", {
          description: `Organization Position ${
            mode == "new" ? "Added" : "Updated"
          }!`,
          duration: 3000,
        });

        router.push("/admin/master/org-positions");
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
            name="id_organization_position"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Position Name"
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
            <Link href="/admin/master/org-positions">
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
