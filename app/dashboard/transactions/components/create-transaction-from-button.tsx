"use client";

import { MODAL_IDS } from "@/constants/modals";
import { useActionStore } from "@/lib/stores/action.store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/shared/button";

function CreateTransactionFromButton() {
  const { setAction } = useActionStore();

  const handleClick = () =>
    setAction({
      isEdit: false,
      isOpen: true,
      editData: null,
      modalId: MODAL_IDS.CREATE_TRANSACTION,
    });

  return (
    <Button variant="primary" rounded onClick={handleClick}>
      <PlusCircleIcon className="size-5" />
      <p>Add new transaction</p>
    </Button>
  );
}

export default CreateTransactionFromButton;
