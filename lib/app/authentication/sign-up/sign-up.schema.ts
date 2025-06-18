import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(2, "Password must be at least 2 characters long"),
  // confirmPassword: z
  //   .string()
  //   .min(2, "Password must be at least 2 characters long"),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
