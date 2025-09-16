import { useEffect } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCategoryFormValues,
  createCategorySchema,
} from "@/app/dashboard/categories/hooks/create-category.schema";
import { Category } from "@/app/dashboard/categories/hooks/use-get-categories.query";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import useCreateCategoryMutation from "@/app/dashboard/categories/hooks/use-create-category.mutation";
import Button from "@/components/shared/button";
import Input from "@/components/shared/input";

interface Props {
  categories: Category[] | undefined;
  accountId?: string;
  categoryId?: string;
}

const CreateCategoryFromSelect = ({
  categories,
  accountId,
  categoryId,
}: Props) => {
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
    useCreateCategoryMutation(reset, accountId, categoryId);

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
