"use client";

import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin/ui/select";
import { Button } from "@/components/admin/ui/button";
import { OrganizationPosition } from "@/types/OrganizationPosition";
import { Plus, LoaderCircle } from "lucide-react";
import { submitPeriodPosition } from "../actions";

export const PeriodPositionSchema = z.object({
  id_organization_position: z.string({
    errorMap: () => ({ message: "Organization Position is required." }),
  }),
});

export type PeriodPositionSchemaFormData = z.infer<typeof PeriodPositionSchema>;

export type PeriodPositionFormInput = z.input<typeof PeriodPositionSchema>;

export default function FormPositionPeriod({
  idPeriod,
  positions,
}: {
  idPeriod: number | null;
  positions: OrganizationPosition[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const form = useForm<PeriodPositionFormInput>({
    resolver: zodResolver(PeriodPositionSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PeriodPositionSchemaFormData) => {
    setIsLoading(true);
    try {
      const res = await submitPeriodPosition(
        Number(idPeriod),
        Number(data.id_organization_position)
      );
      if (res.success) {
        toast.success("Successs", {
          description: "New Position Added!",
          duration: 3000,
        });

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

  const onValidSubmit = (data: PeriodPositionFormInput) => {
    const parsedData = PeriodPositionSchema.parse(data);
    onSubmit(parsedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValidSubmit)}
        className=" text-techtona-1 flex flex-row gap-2"
      >
        <div className="flex-auto">
          <FormField
            control={form.control}
            name="id_organization_position"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-none border-zinc-200 w-full shadow-none">
                      <SelectValue placeholder="Select a Position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {positions.map((p) => {
                      return (
                        <SelectItem
                          key={p.id_organization_position}
                          value={`${p.id_organization_position}`}
                        >
                          {p.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="bg-techtona-1 hover:bg-techtona-4 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : <Plus />}
          <span>Position</span>
        </Button>
      </form>
    </Form>
  );
}
