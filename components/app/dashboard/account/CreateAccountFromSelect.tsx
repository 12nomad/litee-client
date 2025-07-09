import Button from "@/components/app/shared/Button";
import Input from "@/components/app/shared/Input";
import {
  CreateAccountFormValues,
  createAccountSchema,
} from "@/features/app/accounts/createAccount/createAccount.schema";
import useCreateAccountMutation from "@/features/app/accounts/createAccount/useCreateAccount";
import { Account } from "@/features/app/accounts/getAccounts/useGetAccounts";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  accounts: Account[] | undefined;
}

const CreateAccountFromSelect = ({ accounts }: Props) => {
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
    useCreateAccountMutation(reset);

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
