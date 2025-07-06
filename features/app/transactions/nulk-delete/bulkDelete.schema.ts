import { z } from "zod";

export const bulkDeleteSchema = z.object({
  transactionIds: z
    .array(z.number(), {
      message: "Transaction IDs must be an array of numbers",
    })
    .min(1, "At least one transaction ID is required"),
});

export type BulkDeleteFormValues = z.infer<typeof bulkDeleteSchema>;
