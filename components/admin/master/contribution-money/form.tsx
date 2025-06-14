"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { RupiahCurrencyInput } from "@/components/admin/ui/input";
import { BanknotesIcon } from "@heroicons/react/24/solid";

import { Save, CircleX, SquarePen } from "lucide-react";

const contributionMoneySchema = z.object({
  nominal: z
    .number({
      required_error: "Nominal is required!",
      invalid_type_error: "Nominal must be a number",
    })
    .min(1, "Nominal must be at least Rp. 1"),
});

type ContributionMoneyFormData = z.infer<typeof contributionMoneySchema>;

export default function FormEditContributionMoney() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContributionMoneyFormData>({
    resolver: zodResolver(contributionMoneySchema),
    defaultValues: { nominal: 5000 },
  });

  const onSubmit = async (data: ContributionMoneyFormData) => {
    try {
      const res = await fetch("/api/contribution-money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed!");
      }
      alert("submitted");
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

  return (
    <div className="w-full md:max-w-148 rounded-xl bg-white shadow-sm p-5 mt-8">
      <div className="flex items-center">
        <BanknotesIcon className="size-6 mr-3" />
        <span className="font-semibold">Current</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center pb-5 pt-8"
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
              className="text-center text-4xl font-bold py-3 focus:outline-0 focus:border-b-2 focus:border-gray-200 w-4/5 lg:w-1/2"
              disabled={!isEdit}
            />
          )}
        ></Controller>
        {errors.nominal && (
          <p className="text-red-500 text-sm mt-2">{errors.nominal.message}</p>
        )}
        <div className="flex gap-2 mt-4">
          <button
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
              isEdit ? "hidden" : "flex"
            } px-4 py-2 bg-gray-800 rounded-xl text-white text-sm items-center justify-center gap-2 cursor-pointer`}
          >
            <SquarePen className="size-4" />
            <span className="font-semibold">Change</span>
          </button>
          <button
            type="submit"
            className={`${
              isEdit ? "flex" : "hidden"
            } px-4 py-2 bg-green-600 rounded-xl text-white text-sm items-center justify-center gap-2 cursor-pointer`}
          >
            <Save className="size-4" />
            <span className="font-semibold">Save</span>
          </button>
          <button
            type="button"
            onClick={() => setEdit(false)}
            className={`${
              isEdit ? "flex" : "hidden"
            } px-4 py-2 bg-red-600 rounded-xl text-white text-sm items-center justify-center gap-2 cursor-pointer`}
          >
            <CircleX className="size-4" />
            <span className="font-semibold">Cancel</span>
          </button>
        </div>
      </form>
    </div>
  );
}
