import { z } from "zod";

export const MemberSchema = z
  .object({
    id_member: z
      .union([z.string(), z.number()])
      .transform((val) => {
        if (val === "" || val === undefined) return null;
        return typeof val === "string" ? Number(val) : val;
      })
      .nullable(),
    email: z.string().email({
      message: "Invalid email format.",
    }),
    telephone: z.string().nullable(),
    fullname: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    nickname: z.string().min(1, {
      message: "Nickname is required.",
    }),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Please select a gender." }),
    }),
    date_of_birth: z.date().nullable(),
    id_location_detail: z.string({
      errorMap: () => ({ message: "Location detail is required." }),
    }),
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine(({ password, confirm_password, id_member }, ctx) => {
    if (!id_member && !password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required for new members.",
        path: ["password"],
      });
    }

    if (password) {
      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Password must be at least 8 characters.",
          path: ["password"],
        });
      }
      if (password !== confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match.",
          path: ["confirm_password"],
        });
      }
    }
  });

export type MemberFormInput = z.input<typeof MemberSchema>;
export type MemberSchemaFormData = z.infer<typeof MemberSchema>;
