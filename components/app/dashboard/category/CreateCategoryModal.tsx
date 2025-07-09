"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
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
import { MODAL_IDS } from "@/features/constants/modals";
import { Category } from "@/features/app/categories/get-categories/useGetCategories";
import {
  CreateCategoryFormValues,
  createCategorySchema,
} from "@/features/app/categories/create-category/createCategory.schema";
import useCreateCategoryMutation from "@/features/app/categories/create-category/useCreateCategory";
import useUpdateCategoryMutation from "@/features/app/categories/updateCategory/useUpdateCategory";

function CreateCategoryModal() {
  const {
    action: { editData, isEdit, isOpen, modalId },
    resetAction,
  } = useActionStore() as TypedActionStore<Category>;
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
    values: {
      name: isEdit ? editData!.name : "",
    },
  });
  const { mutateAsync: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategoryMutation(reset);
  const { mutateAsync: updateCategory, isPending: isUpdateCategoryPending } =
    useUpdateCategoryMutation(reset, editData?.id || 0);

  useEffect(() => {
    if (isEdit) {
      setValue("name", editData?.name ? editData?.name : "");
    }
  }, [isEdit]);

  const handleResetModal = () => {
    reset();
    resetAction();
  };

  const onSubmit = async (data: CreateCategoryFormValues) => {
    const response = await (isEdit ? updateCategory : createCategory)({
      name: data.name,
    });

    if (!isEdit) redirect("/dashboard/categorys/" + response.id);
  };

  return (
    <Dialog
      open={isOpen && modalId === MODAL_IDS.CREATE_CATEGORY}
      onOpenChange={handleResetModal}
    >
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">
            {isEdit ? "Edit category" : "New category"}
          </DialogTitle>
          <DialogDescription className="text-black">
            {isEdit
              ? "Update you category details."
              : "Create a new category and start tracking your transactions"}
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
            disabled={isCreateCategoryPending || isUpdateCategoryPending}
          >
            <span className="font-bold">
              {isEdit ? "Update category" : "Create category"}
            </span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryModal;
