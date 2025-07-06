import { JSX, useState } from "react";
import Button from "@/components/app/shared/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  title: string;
  message: string;
}

function useConfirm({
  message,
  title,
}: Props): [() => Promise<unknown>, () => JSX.Element] {
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

  const ConfirmDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">{title}</DialogTitle>
          <DialogDescription className="text-black">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="base" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [confirm, ConfirmDialog];
}

export default useConfirm;
