import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "The field e-mail is required")
    .email("Invalid e-mail"),
  password: z.string().min(1, "The field password is required"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const createAccountSchema = z.object({
  name: z.string().min(1, "The field name is required"),
  email: z
    .string()
    .min(1, "The field e-mail is required")
    .email("Invalid e-mail"),
  password: z
    .string()
    .min(1, "The field password is required")
    .refine((value) => /[A-z]/.test(value), {
      message: "The password must contain at leat on capital letter",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value), {
      message: "The password must have at least one special character",
    }),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export const transactionsFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  accounts: z.array(z.string()).optional(),
  industries: z.array(z.string()).optional(),
  states: z.array(z.string()).optional(),
});

export type TransactionsFilterFormData = z.infer<
  typeof transactionsFilterSchema
>;
