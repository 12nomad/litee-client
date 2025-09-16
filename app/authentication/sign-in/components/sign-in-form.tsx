"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  SignInFormValues,
} from "@/app/authentication/sign-in/hooks/sign-in.schema";
import useSignInMutation from "@/app/authentication/sign-in/hooks/use-sign-in.mutation";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import ErrorMessage from "@/components/shared/error-message";

function SignInForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = useSignInMutation(reset);

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
            {...field}
            inputId="email"
            label="Email Address"
            type="email"
          />
        )}
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            inputId="password"
            label="Password"
            type="password"
            withForgotPassword
          />
        )}
      />
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}
      <Button variant="primary" type="submit" fullWidth disabled={isPending}>
        <span className="font-bold">Sign in</span>
      </Button>
    </form>
  );
}

export default SignInForm;
