import { useEffect } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  CreateAccountFormValues,
  createAccountSchema,
} from "@/app/dashboard/accounts/hooks/create-account.schema";
import { Account } from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import useCreateAccountMutation from "@/app/dashboard/accounts/hooks/use-create-account.mutation";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";

interface Props {
  accounts: Account[] | undefined;
  accountId?: string;
  categoryId?: string;
}

const CreateAccountFromSelect = ({
  accounts,
  accountId,
  categoryId,
}: Props) => {
  const {
    control,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutateAsync: createAccount, isPending: isCreateAccountPending } =
    useCreateAccountMutation(
      reset,
      accountId ? +accountId : undefined,
      categoryId ? +categoryId : undefined
    );

  useEffect(() => {
    if (errors.name?.message) toast.error(`${errors.name?.message}.`);
  }, [errors.name?.message]);

  const handleCreate = async () => {
    if (accounts && accounts?.length > 2) {
      toast.error("Sorry you are limited to 3 accounts.");
      return;
    }

    const isOk = await trigger("name");
    if (!isOk) return;

    await createAccount({ name: getValues("name") });
  };

  return (
    <div className="p-2">
      <div className="flex items-center w-full gap-2">
        <div className="w-full">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                inputId="name"
                placeholder="Add new account..."
                type="text"
              />
            )}
          />
        </div>
        <Button
          // variant="ghost"
          type="button"
          disabled={isCreateAccountPending}
          onClick={handleCreate}
        >
          <PlusCircleIcon className="size-5" />
          <span className="font-bold">Add</span>
        </Button>
      </div>
    </div>
  );
};

export default CreateAccountFromSelect;
