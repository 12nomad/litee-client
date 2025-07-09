import Button from "@/components/app/shared/Button";
import Input from "@/components/app/shared/Input";
import {
  CreateCategoryFormValues,
  createCategorySchema,
} from "@/features/app/categories/create-category/createCategory.schema";
import useCreateCategoryMutation from "@/features/app/categories/create-category/useCreateCategory";
import { Category } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  categories: Category[] | undefined;
}

const CreateCategoryFromSelect = ({ categories }: Props) => {
  const {
    control,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });
  const { mutateAsync: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategoryMutation(reset);

  useEffect(() => {
    if (errors.name?.message) toast.error(`${errors.name?.message}.`);
  }, [errors.name?.message]);

  const handleCreate = async () => {
    if (categories && categories?.length > 5) {
      toast.error("Sorry you are limited to 6 categories.");
      return;
    }

    const isOk = await trigger("name");
    if (!isOk) return;

    await createCategory({ name: getValues("name") });
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
                placeholder="Add new category..."
                type="text"
              />
            )}
          />
        </div>
        <Button
          // variant="ghost"
          type="button"
          disabled={isCreateCategoryPending}
          onClick={handleCreate}
        >
          <PlusCircleIcon className="size-5" />
          <span className="font-bold">Add</span>
        </Button>
      </div>
    </div>
  );
};

export default CreateCategoryFromSelect;
