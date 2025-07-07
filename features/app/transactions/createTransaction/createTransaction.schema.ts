import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z
    .string()
    .min(10, "Descripiton must be at least 10 characters long")
    .max(100, "Descripiton must be at most 100 characters long"),
  amount: z.coerce.number(),
  accountId: z.number().min(1, "An accountId is required"),
});

export type CreateTransactionFormValues = z.infer<
  typeof createTransactionSchema
>;
