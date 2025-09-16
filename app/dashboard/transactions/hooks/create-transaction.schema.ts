import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z
    .string()
    .min(10, "Descripiton must be at least 10 characters long")
    .max(100, "Descripiton must be at most 100 characters long"),
  amount: z.string().min(1),
  accountId: z.string().min(1, "Please select an account"),
  payee: z.string().min(1, "Payee is required"),
  categoryId: z.string().min(1, "Please select a category"),
  // date: z.date({ message: "Please provide a date" }),
  date: z.string().min(1, "Please select a date"),
});

export type CreateTransactionFormValues = z.infer<
  typeof createTransactionSchema
>;
