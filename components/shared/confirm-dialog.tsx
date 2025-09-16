import Button from "@/components/shared/button";
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
  promise: {
    resolve: (value: boolean) => void;
  } | null;
  handleConfirm: () => void;
  handleCancel: () => void;
}

function ConfirmDialog({
  handleCancel,
  handleConfirm,
  message,
  promise,
  title,
}: Props) {
  return (
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
}

export default ConfirmDialog;
