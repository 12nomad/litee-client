"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/app/authentication/sign-up/hooks/sign-up.schema";
import useSignUpMutation from "@/app/authentication/sign-up/hooks/use-sign-up.mutation";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";
import ErrorMessage from "@/components/shared/error-message";

function SignUpForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      // confirmPassword: "",
      username: "",
    },
  });
  const { mutateAsync, isPending } = useSignUpMutation(reset);

  const onSubmit = async (data: SignUpFormValues) => {
    await mutateAsync({
      email: data.email,
      password: data.password,
      // confirmPassword: data.confirmPassword,
      username: data.username,
    });
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input {...field} inputId="name" label="Name" type="text" />
        )}
      />
      {errors.username && (
        <ErrorMessage>{errors.username.message}</ErrorMessage>
      )}
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
          />
        )}
      />
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}
      {/* <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
          {...field}
            inputId="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        )}
      />
      {errors.confirmPassword && (
        <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
      )} */}
      <Button variant="primary" type="submit" fullWidth disabled={isPending}>
        <span className="font-bold">Sign up</span>
      </Button>
    </form>
  );
}

export default SignUpForm;
