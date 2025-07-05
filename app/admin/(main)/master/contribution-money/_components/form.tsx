"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { RupiahCurrencyInput } from "./input-currency";
import { Button } from "@/components/admin/ui/button";
import { Alert, AlertTitle } from "@/components/admin/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog";
import {
  Save,
  CircleX,
  SquarePen,
  CircleHelp,
  CircleAlert,
} from "lucide-react";
import { toast } from "sonner";

import { ContributionMoneyFormData, submitContributionMoney } from "../actions";

const contributionMoneySchema = z.object({
  nominal: z
    .number({
      required_error: "Nominal is required!",
      invalid_type_error: "Nominal must be a number",
    })
    .min(1000, "Nominal must be at least Rp. 1.000"),
});

export default function FormEditContributionMoney({
  currentNominal,
}: {
  currentNominal?: number;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContributionMoneyFormData>({
    resolver: zodResolver(contributionMoneySchema),
    defaultValues: { nominal: currentNominal },
  });

  const router = useRouter();

  const onSubmit = async (data: ContributionMoneyFormData) => {
    try {
      const res = await submitContributionMoney(data);
      if (res.success) {
        router.refresh();
        setEdit(false);
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

  const [isEdit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    reset({ nominal: currentNominal });
  }, [currentNominal, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center mb-6"
    >
      <Controller
        name="nominal"
        control={control}
        render={({ field }) => (
          <RupiahCurrencyInput
            ref={inputRef}
            value={field.value}
            onChange={(val) => {
              const numeric = Number(val.replace(/\D/g, ""));
              field.onChange(numeric);
            }}
            className="text-center text-4xl text-techtona-1 font-bold py-3 focus:outline-0 focus:border-b-2 focus:border-techtona-7 w-4/5 lg:w-1/2"
            disabled={!isEdit}
          />
        )}
      ></Controller>

      {errors.nominal && (
        <Alert variant="destructive" className="border-0 flex justify-center">
          <CircleAlert />
          <AlertTitle>{errors.nominal.message}</AlertTitle>
        </Alert>
      )}
      <div className="flex gap-2 mt-2">
        <Button
          type="button"
          onClick={() => {
            setEdit(true);
            setTimeout(() => {
              inputRef.current?.focus();
              const len = inputRef.current?.value.length ?? 0;
              inputRef.current?.setSelectionRange(len, len);
            }, 0);
          }}
          className={`${
            isEdit && "hidden"
          } bg-techtona-1 cursor-pointer hover:bg-techtona-4`}
        >
          <SquarePen className="size-4" />
          <span className="font-semibold">Change</span>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className={`${
                !isEdit && "hidden"
              } bg-techtona-2 text-techtona-1 cursor-pointer hover:bg-techtona-5`}
            >
              <Save className="size-4" />
              <span className="font-semibold">Save</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="text-techtona-1">
            <AlertDialogHeader className="mb-4">
              <div className="flex justify-center">
                <CircleHelp className="size-14 bg-techtona-2 p-2 rounded-full" />
              </div>
              <AlertDialogTitle className="text-center">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                This action cannot be undone. This action will update the
                contribution money and add to the history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="md:justify-center">
              <AlertDialogCancel>
                <CircleX className="size-4" />
                <span className="font-semibold">Cancel</span>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  type="submit"
                  onClick={() => handleSubmit(onSubmit)()}
                  className="bg-techtona-1 hover:bg-techtona-4"
                >
                  <Save className="size-4" />
                  <span className="font-semibold">Save</span>
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          type="button"
          onClick={() => {
            reset();
            setEdit(false);
          }}
          className={`${
            isEdit ? "flex" : "hidden"
          } bg-red-400 text-white cursor-pointer hover:bg-red-500`}
        >
          <CircleX className="size-4" />
          <span className="font-semibold">Cancel</span>
        </Button>
      </div>
    </form>
  );
}
