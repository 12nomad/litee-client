"use client";

import Button from "@/components/app/shared/Button";
import ErrorMessages from "@/components/app/shared/ErrorMessages";
import Input from "@/components/app/shared/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreateAccountFormValues,
  createAccountSchema,
} from "@/features/app/accounts/createAccount/createAccount.schema";
import useCreateAccountMutation from "@/features/app/accounts/createAccount/useCreateAccount";
import { useActionStore } from "@/lib/stores/action.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

function CreateAccountModal() {
  const {
    action: { isOpen },
    resetAction,
  } = useActionStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutateAsync, isPending } = useCreateAccountMutation(reset);

  const onSubmit = async (data: CreateAccountFormValues) => {
    await mutateAsync({
      name: data.name,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAction}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">New account</DialogTitle>
          <DialogDescription className="text-black">
            Create a new account and start tracking your transactions
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                inputId="name"
                label="Name"
                placeholder="e.g. Personal, Business"
                type="text"
                {...field}
              />
            )}
          />
          {errors.name && <ErrorMessages>{errors.name.message}</ErrorMessages>}
          <Button
            variant="primary"
            type="submit"
            fullWidth
            disabled={isPending}
          >
            <span className="font-bold">Create account</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccountModal;
