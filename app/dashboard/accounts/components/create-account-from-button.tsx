"use client";

import { useActionStore } from "@/lib/stores/action.store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { MODAL_IDS } from "@/constants/modals";
import Button from "@/components/shared/button";

function CreateAccountFromButton() {
  const { setAction } = useActionStore();

  const handleClick = () =>
    setAction({
      isEdit: false,
      isOpen: true,
      editData: null,
      modalId: MODAL_IDS.CREATE_ACCOUNT,
    });

  return (
    <Button variant="primary" rounded onClick={handleClick}>
      <PlusCircleIcon className="size-5" />
      <p>Add new account</p>
    </Button>
  );
}

export default CreateAccountFromButton;
