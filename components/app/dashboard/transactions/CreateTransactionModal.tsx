"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionStore } from "@/lib/stores/action.store";
import { TypedActionStore } from "@/features/interfaces/TypedActionStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/app/shared/Button";
import ErrorMessages from "@/components/app/shared/ErrorMessages";
import Input from "@/components/app/shared/Input";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import {
  CreateTransactionFormValues,
  createTransactionSchema,
} from "@/features/app/transactions/createTransaction/createTransaction.schema";
import useCreateTransactionMutation from "@/features/app/transactions/createTransaction/useCreateTransaction";
import useUpdateTransactionMutation from "@/features/app/transactions/updateTransaction/useUpdateTransaction";
import { MODAL_IDS } from "@/features/constants/modals";

function CreateTransactionModal() {
  const {
    action: { editData, isEdit, isOpen, modalId },
    resetAction,
  } = useActionStore() as TypedActionStore<Transaction>;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: 0,
      description: "",
      accountId: editData?.accountId,
    },
    values: {
      amount: editData?.amount || 0,
      description: editData?.description || "",
      accountId: editData?.accountId || 0,
    },
  });
  const {
    mutateAsync: createTransaction,
    isPending: isCreateTransactionPending,
  } = useCreateTransactionMutation(reset);
  const {
    mutateAsync: updateTransaction,
    isPending: isUpdateTransactionPending,
  } = useUpdateTransactionMutation(reset, editData?.id || 0);

  const onSubmit = async (data: CreateTransactionFormValues) => {
    await (isEdit ? updateTransaction : createTransaction)({
      accountId: data.accountId,
      amount: data.amount,
      description: data.description,
    });
  };

  return (
    <Dialog
      open={isOpen && modalId === MODAL_IDS.CREATE_TRANSACTION}
      onOpenChange={resetAction}
    >
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">
            {isEdit ? "Edit transaction" : "New transaction"}
          </DialogTitle>
          <DialogDescription className="text-black">
            {isEdit
              ? "Update you transaction details."
              : "Create a new transaction and start tracking your transactions"}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                inputId="description"
                label="Description"
                placeholder="e.g. Monthly gym membership fee"
                type="text"
                {...field}
              />
            )}
          />
          {errors.description && (
            <ErrorMessages>{errors.description.message}</ErrorMessages>
          )}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                inputId="amount"
                label="Amount"
                placeholder="0.00"
                type="number"
                step=".01"
                {...field}
              />
            )}
          />
          {errors.amount && (
            <ErrorMessages>{errors.amount.message}</ErrorMessages>
          )}
          <Button
            variant="primary"
            type="submit"
            fullWidth
            disabled={isCreateTransactionPending || isUpdateTransactionPending}
          >
            <span className="font-bold">
              {isEdit ? "Update transaction" : "Create transaction"}
            </span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTransactionModal;
