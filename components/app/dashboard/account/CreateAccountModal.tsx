"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Account } from "@/features/app/accounts/getAccounts/useGetAccounts";
import { useActionStore } from "@/lib/stores/action.store";
import { TypedActionStore } from "@/features/interfaces/TypedActionStore";
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
import Button from "@/components/app/shared/Button";
import ErrorMessages from "@/components/app/shared/ErrorMessages";
import Input from "@/components/app/shared/Input";
import useCreateAccountMutation from "@/features/app/accounts/createAccount/useCreateAccount";
import useUpdateAccountMutation from "@/features/app/accounts/updateAccount/useUpdateAccount";
import { MODAL_IDS } from "@/features/constants/modals";
import { useEffect } from "react";
import { redirect } from "next/navigation";

function CreateAccountModal() {
  const {
    action: { editData, isEdit, isOpen, modalId },
    resetAction,
  } = useActionStore() as TypedActionStore<Account>;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutateAsync: createAccount, isPending: isCreateAccountPending } =
    useCreateAccountMutation(reset);
  const { mutateAsync: updateAccount, isPending: isUpdateAccountPending } =
    useUpdateAccountMutation(reset, editData?.id || 0);

  useEffect(() => {
    if (isEdit) setValue("name", editData?.name ? editData?.name : "");
  }, [isEdit]);

  const handleResetModal = () => {
    reset();
    resetAction();
  };

  const onSubmit = async (data: CreateAccountFormValues) => {
    const response = await (isEdit ? updateAccount : createAccount)({
      name: data.name,
    });

    if (!isEdit) redirect("/dashboard/accounts/" + response.id);
  };

  return (
    <Dialog
      open={isOpen && modalId === MODAL_IDS.CREATE_ACCOUNT}
      onOpenChange={handleResetModal}
    >
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">
            {isEdit ? "Edit account" : "New account"}
          </DialogTitle>
          <DialogDescription className="text-black">
            {isEdit
              ? "Update you account details."
              : "Create a new account and start tracking your transactions"}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                inputId="name"
                label="Name"
                placeholder="e.g. Personal, Business"
                type="text"
              />
            )}
          />
          {errors.name && <ErrorMessages>{errors.name.message}</ErrorMessages>}
          <Button
            variant="primary"
            type="submit"
            fullWidth
            disabled={isCreateAccountPending || isUpdateAccountPending}
          >
            <span className="font-bold">
              {isEdit ? "Update account" : "Create account"}
            </span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccountModal;
