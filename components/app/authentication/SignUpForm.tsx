"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/features/app/authentication/sign-up/sign-up.schema";
import useSignUpMutation from "@/features/app/authentication/sign-up/useSignUp.mutation";
import Button from "@/components/app/shared/Button";
import Input from "@/components/app/shared/Input";
import ErrorMessages from "@/components/app/shared/ErrorMessages";

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
          <Input
            {...field}
            inputId="name"
            label="Name"
            placeholder="name..."
            type="text"
          />
        )}
      />
      {errors.username && (
        <ErrorMessages>{errors.username.message}</ErrorMessages>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            inputId="email"
            label="Email Address"
            placeholder="email..."
            type="email"
          />
        )}
      />
      {errors.email && <ErrorMessages>{errors.email.message}</ErrorMessages>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            inputId="password"
            label="Password"
            placeholder="password..."
            type="password"
          />
        )}
      />
      {errors.password && (
        <ErrorMessages>{errors.password.message}</ErrorMessages>
      )}
      {/* <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
          {...field}
            inputId="confirmPassword"
            label="Confirm Password"
            placeholder="password..."
            type="password"
          />
        )}
      />
      {errors.confirmPassword && (
        <ErrorMessages>{errors.confirmPassword.message}</ErrorMessages>
      )} */}
      <Button variant="primary" type="submit" fullWidth disabled={isPending}>
        <span className="font-bold">Sign up</span>
      </Button>
    </form>
  );
}

export default SignUpForm;
