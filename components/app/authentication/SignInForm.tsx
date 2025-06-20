"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  SignInFormValues,
} from "@/lib/app/authentication/sign-in/sign-in.schema";
import useSignInMutation from "@/lib/app/authentication/sign-in/useSignIn.mutation";
import Button from "@/components/app/shared/Button";
import Input from "@/components/app/shared/Input";
import ErrorMessages from "@/components/app/shared/ErrorMessages";

function SignInForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync } = useSignInMutation();

  const onSubmit = async (data: SignInFormValues) => {
    await mutateAsync({ email: data.email, password: data.password });
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            inputId="email"
            label="Email Address"
            placeholder="email..."
            type="email"
            {...field}
          />
        )}
      />
      {errors.email && <ErrorMessages>{errors.email.message}</ErrorMessages>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            inputId="password"
            label="Password"
            placeholder="password..."
            type="password"
            withForgotPassword
            {...field}
          />
        )}
      />
      {errors.password && (
        <ErrorMessages>{errors.password.message}</ErrorMessages>
      )}
      <Button variant="primary" type="submit" fullWidth>
        <span className="font-bold">Sign in</span>
      </Button>
    </form>
  );
}

export default SignInForm;
