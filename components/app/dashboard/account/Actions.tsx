import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import useDeleteTransactionMutation from "@/features/app/transactions/delete/useDeleteTransaction";
import { Transaction } from "@/features/app/transactions/getTransactions/useGetTransactions";
import { MODAL_IDS } from "@/features/constants/modals";
import useConfirm from "@/features/hooks/useConfirm";
import { useActionStore } from "@/lib/stores/action.store";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Row } from "@tanstack/react-table";

interface Props {
  row: Row<Transaction>;
}

function Actions({ row }: Props) {
  const { setAction } = useActionStore();
  const {
    mutateAsync: deleteTransactionMutation,
    isPending: deleteTransactionPending,
  } = useDeleteTransactionMutation(
    row.original.id,
    row.original.accountId,
    row.original.categoryId
  );
  const [confirm, ConfirmDialog] = useConfirm({
    message:
      "Are you sure you want to delete this transaction? This action cannot be undone.",
    title: "Delete transaction?",
  });

  const handleRowEdit = () => {
    setAction({
      isOpen: true,
      isEdit: true,
      editData: row.original || null,
      modalId: MODAL_IDS.CREATE_TRANSACTION,
    });
  };

  const handleRowDelete = async () => {
    const canProceed = await confirm();
    if (!canProceed) return;

    await deleteTransactionMutation();
  };

  return (
    <div className="text-right flex items-center gap-2">
      <ConfirmDialog />
      <Tooltip>
        <TooltipTrigger
          onClick={handleRowEdit}
          disabled={deleteTransactionPending}
        >
          <PencilSquareIcon className="size-4 cursor-pointer text-caribbean" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit transaction</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          disabled={deleteTransactionPending}
          onClick={handleRowDelete}
        >
          <TrashIcon className="size-4 cursor-pointer text-crimson" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete transaction</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default Actions;
