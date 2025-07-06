"use client";

import Button from "@/components/app/shared/Button";
import { useActionStore } from "@/lib/stores/action.store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

function CreateAccountFromButton() {
  const { setAction } = useActionStore();

  const handleClick = () => setAction({ isEdit: false, isOpen: true });

  return (
    <Button variant="primary" rounded onClick={handleClick}>
      <PlusCircleIcon className="size-5" />
      <p>Add new account</p>
    </Button>
  );
}

export default CreateAccountFromButton;
