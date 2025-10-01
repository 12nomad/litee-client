"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionStore } from "@/lib/stores/action.store";
import { TypedActionStore } from "@/interfaces/typed-action-store";
import { MODAL_IDS } from "@/constants/modals";
import { Category } from "@/app/dashboard/categories/hooks/use-get-categories.query";
import useCreateCategoryMutation from "@/app/dashboard/categories/hooks/use-create-category.mutation";
import useUpdateCategoryMutation from "@/app/dashboard/categories/hooks/use-update-category.mutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreateCategoryFormValues,
  createCategorySchema,
} from "@/app/dashboard/categories/hooks/create-category.schema";
import Button from "@/components/shared/button";
import ErrorMessages from "@/components/shared/error-message";
import Input from "@/components/shared/input";

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
    values: {
      name: isEdit ? editData!.name : "",
    },
  });
  const { mutateAsync: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategoryMutation(reset);
  const { mutateAsync: updateCategory, isPending: isUpdateCategoryPending } =
    useUpdateCategoryMutation(reset, editData?.id);

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
