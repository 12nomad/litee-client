"use client";

import CreateAccountModal from "@/components/app/dashboard/accounts/CreateAccountModal";
import Button from "@/components/app/shared/Button";
import useDeleteAccountMutation from "@/features/app/accounts/deleteAccount/useDeleteAccount";
import { Account } from "@/features/app/accounts/getAccounts/useGetAccounts";
import useConfirm from "@/features/hooks/useConfirm";
import { useActionStore } from "@/lib/stores/action.store";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  accountData?: Account;
}

function AccountHeader({ accountData }: Props) {
  const [confirm, ConfirmDialog] = useConfirm({
    message:
      "Are you sure you want to delete this account? This action cannot be undone.",
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
    });
  };

  const handleDelete = async () => {
    const canProceed = await confirm();
    if (!canProceed) return;

    await deleteAccountAsync();
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <ConfirmDialog />
      <CreateAccountModal />
      <h1 className="text-2xl font-medium mb-4">{accountData?.name} Account</h1>
      <div className="flex items-center gap-2">
        <Button variant="primary" rounded onClick={handleEdit}>
          <PencilSquareIcon className="size-5" />
          <p>Edit account</p>
        </Button>
        <Button variant="danger" rounded onClick={handleDelete}>
          <TrashIcon className="size-5" />
          <p>Delete account</p>
        </Button>
      </div>
    </header>
  );
}

export default AccountHeader;
