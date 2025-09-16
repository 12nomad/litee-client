import ConfirmDialog from "@/components/shared/confirm-dialog";
import { JSX, useState } from "react";

interface Props {
  title: string;
  message: string;
}

const useConfirm = ({
  message,
  title,
}: Props): [() => Promise<unknown>, () => JSX.Element] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const confirmDialog = () => (
    <ConfirmDialog
      handleCancel={handleCancel}
      handleConfirm={handleConfirm}
      message={message}
      title={title}
      promise={promise}
    />
  );

  return [confirm, confirmDialog];
};

export default useConfirm;
