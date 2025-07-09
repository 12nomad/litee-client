"use client";

import CreateCategoryModal from "@/components/app/dashboard/category/CreateCategoryModal";
// import Button from "@/components/app/shared/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteCategoryMutation from "@/features/app/categories/deleteCategory/useDeleteCategory";
import { Category } from "@/features/app/categories/get-categories/useGetCategories";
import { MODAL_IDS } from "@/features/constants/modals";
import useConfirm from "@/features/hooks/useConfirm";
import { useActionStore } from "@/lib/stores/action.store";
import {
  EllipsisHorizontalCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  categoryData: Category | null;
}

function CategoryHeader({ categoryData }: Props) {
  const [confirm, ConfirmDialog] = useConfirm({
    message:
      "Are you sure you want to delete this category? This action cannot be undone.",
    title: "Delete category?",
  });
  const { mutateAsync: deleteCategoryAsync } = useDeleteCategoryMutation(
    categoryData?.id || 0
  );
  const { setAction } = useActionStore();

  const handleEdit = () => {
    setAction({
      isOpen: true,
      isEdit: true,
      editData: categoryData || null,
      modalId: MODAL_IDS.CREATE_CATEGORY,
    });
  };

  const handleDelete = async () => {
    const canProceed = await confirm();
    if (!canProceed) return;

    await deleteCategoryAsync();
  };

  return (
    <header>
      <ConfirmDialog />
      <CreateCategoryModal />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{categoryData?.name} Category</h1>
          <p>Transaction history related to this category.</p>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="cursor-pointer">
            <EllipsisHorizontalCircleIcon className="size-7" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white text-black"
            align="start"
            side="left"
          >
            <DropdownMenuLabel>Category Details</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEdit}>
                Edit category
                <DropdownMenuShortcut>
                  <PencilSquareIcon className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                Delete category
                <DropdownMenuShortcut>
                  <TrashIcon className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <div className="flex items-center gap-2">
        <Button variant="secondary" rounded onClick={handleEdit}>
          <PencilSquareIcon className="size-5" />
          <p>Edit category</p>
        </Button>
        <Button variant="danger" rounded onClick={handleDelete}>
          <TrashIcon className="size-5" />
          <p>Delete category</p>
        </Button>
      </div> */}
      </div>
    </header>
  );
}

export default CategoryHeader;
