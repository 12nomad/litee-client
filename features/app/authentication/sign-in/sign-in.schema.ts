import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(2, "Password must be at least 2 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
