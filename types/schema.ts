import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "The field e-mail is required")
    .email("Invalid e-mail"),
  password: z.string().min(1, "The field password is required"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
