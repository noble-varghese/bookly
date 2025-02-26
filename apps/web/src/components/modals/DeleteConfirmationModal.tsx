// src/components/modals/DeleteConfirmationModal.tsx
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false
}: DeleteConfirmationModalProps) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Delete Confirmation</DialogTitle>

        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-bookly-brown mb-2">{title}</h2>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-bookly-brown hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="text-white" size="sm" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;