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
import useGetCategories from "@/features/app/categories/get-categories/useGetCategories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateCategoryFromSelect from "@/components/app/dashboard/category/CreateCategoryFromSelect";
import DatePicker from "@/components/app/shared/DatePicker";
import CurrencyInput from "@/components/app/shared/CurrencyInput";
import { useEffect, useState } from "react";
import { formatToYMD, fromMiliUnits, toMiliUnits } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useGetAccounts from "@/features/app/accounts/getAccounts/useGetAccounts";
import CreateAccountFromSelect from "@/components/app/dashboard/account/CreateAccountFromSelect";

const ACCOUNTID_REGEX = /^\/dashboard\/accounts\/(\d+)$/;
const CATEGORYID_REGEX = /^\/dashboard\/categories\/(\d+)$/;

function CreateTransactionModal() {
  const pathname = usePathname();
  const matchAccount = pathname.match(ACCOUNTID_REGEX);
  const matchCategory = pathname.match(CATEGORYID_REGEX);
  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { data: categories } = useGetCategories();
  const { data: accounts } = useGetAccounts(!accountId);
  const {
    action: { editData, isEdit, isOpen, modalId },
    resetAction,
  } = useActionStore() as TypedActionStore<Transaction>;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<CreateTransactionFormValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: "",
      description: "",
      accountId: accountId,
      payee: "",
      categoryId: "",
      date: "",
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

  useEffect(() => {
    if (matchAccount) {
      const value = matchAccount[1];
      setAccountId(value);
      setValue("accountId", value);
    }
  }, [pathname, matchAccount]);

  useEffect(() => {
    if (matchCategory) {
      const value = matchCategory[1];
      setCategoryId(value);
      setValue("categoryId", value);
    }
  }, [pathname, matchCategory]);

  useEffect(() => {
    if (isEdit) {
      setValue(
        "amount",
        editData?.amount ? fromMiliUnits(editData.amount)?.toString() : ""
      );
      setValue("description", editData?.description || "");
      setValue("payee", editData?.payee || "");
      setValue("categoryId", editData?.categoryId?.toString() || "");
      setValue("accountId", editData?.accountId?.toString() || "");
      setValue("date", editData?.date || "");
    }
  }, [isEdit]);

  const handleResetModal = () => {
    reset();
    resetAction();
  };

  const onSubmit = async (data: CreateTransactionFormValues) => {
    await (isEdit ? updateTransaction : createTransaction)({
      accountId: data.accountId,
      amount: toMiliUnits(+data.amount)?.toString(),
      description: data.description,
      date: formatToYMD(data.date),
      payee: data.payee,
      categoryId: data.categoryId,
    });
  };

  return (
    <Dialog
      open={isOpen && modalId === MODAL_IDS.CREATE_TRANSACTION}
      onOpenChange={handleResetModal}
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
          <div className="space-y-2">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  inputId="description"
                  label="Description"
                  placeholder="e.g. Monthly gym membership fee"
                  type="text"
                />
              )}
            />
            {errors.description && (
              <ErrorMessages>{errors.description.message}</ErrorMessages>
            )}
          </div>
          <div className="space-y-2">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Amount
            </label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <CurrencyInput {...field} onValueChange={field.onChange} />
              )}
            />
            {errors.amount && (
              <ErrorMessages>{errors.amount.message}</ErrorMessages>
            )}
          </div>
          <div className="space-y-2">
            <Controller
              name="payee"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  inputId="payee"
                  label="Payee"
                  placeholder="e.g. Jirama"
                />
              )}
            />
            {errors.payee && (
              <ErrorMessages>{errors.payee.message}</ErrorMessages>
            )}
          </div>

          {!categoryId && (
            <div className="space-y-2">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                Category
              </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        {categories?.map((c) => (
                          <SelectItem key={c?.name} value={c?.id?.toString()}>
                            {c?.name}
                          </SelectItem>
                        ))}
                        {categories && categories?.length === 0 && (
                          <SelectLabel className="text-center">
                            Oops! No category has been found, add some below
                          </SelectLabel>
                        )}
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup className="w-full">
                        <CreateCategoryFromSelect
                          categories={categories}
                          accountId={getValues("accountId")}
                          categoryId={getValues("categoryId")}
                        />
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <ErrorMessages>{errors.categoryId.message}</ErrorMessages>
              )}
            </div>
          )}

          {!accountId && (
            <div className="space-y-2">
              <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
                Account
              </label>
              <Controller
                name="accountId"
                control={control}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an account..." />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        {accounts?.map((a) => (
                          <SelectItem key={a?.name} value={a?.id?.toString()}>
                            {a?.name}
                          </SelectItem>
                        ))}
                        {accounts && accounts?.length === 0 && (
                          <SelectLabel className="text-center">
                            Oops! No account has been found, add some below
                          </SelectLabel>
                        )}
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup className="w-full">
                        <CreateAccountFromSelect
                          accounts={accounts}
                          accountId={getValues("accountId")}
                          categoryId={getValues("categoryId")}
                        />
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.accountId && (
                <ErrorMessages>{errors.accountId.message}</ErrorMessages>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
              Date
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => <DatePicker field={field} />}
            />
            {errors.date && (
              <ErrorMessages>{errors.date.message}</ErrorMessages>
            )}
          </div>
          {errors.accountId && (
            <ErrorMessages>{errors.accountId.message}</ErrorMessages>
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
