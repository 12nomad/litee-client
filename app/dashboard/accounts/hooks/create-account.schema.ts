import { z } from "zod";

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;
