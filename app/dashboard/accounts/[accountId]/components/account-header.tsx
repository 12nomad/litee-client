"use client";

import useConfirm from "@/components/shared/hooks/useConfirm";
import { MODAL_IDS } from "@/constants/modals";
import { useActionStore } from "@/lib/stores/action.store";
import { Account } from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import useDeleteAccountMutation from "@/app/dashboard/accounts/hooks/use-delete-account.mutation";
import CreateAccountModal from "@/app/dashboard/accounts/components/create-account-modal";
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
import {
  EllipsisHorizontalCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
// import Button from "@/components/app/shared/Button";

interface Props {
  accountData: Account | null;
}

function AccountHeader({ accountData }: Props) {
  const [confirm, ConfirmDialog] = useConfirm({
    message:
      "Are you sure you want to delete this account? All transactions linked to this account will be deleted too.",
    title: "Delete account?",
  });
  const { mutateAsync: deleteAccountAsync } = useDeleteAccountMutation(
    accountData?.id || 0
  );
  const { setAction } = useActionStore();

  const handleEdit = () => {
    setAction({
      isOpen: true,
      isEdit: true,
      editData: accountData || null,
      modalId: MODAL_IDS.CREATE_ACCOUNT,
    });
  };

  const handleDelete = async () => {
    const canProceed = await confirm();
    if (!canProceed) return;

    await deleteAccountAsync();
  };

  return (
    <header>
      <ConfirmDialog />
      <CreateAccountModal />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{accountData?.name} Account</h1>
          <p>Here is your transaction history.</p>
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
            <DropdownMenuLabel>Account Details</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEdit}>
                Edit account
                <DropdownMenuShortcut>
                  <PencilSquareIcon className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                Delete account
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
          <p>Edit account</p>
        </Button>
        <Button variant="danger" rounded onClick={handleDelete}>
          <TrashIcon className="size-5" />
          <p>Delete account</p>
        </Button>
      </div> */}
      </div>
    </header>
  );
}

export default AccountHeader;
