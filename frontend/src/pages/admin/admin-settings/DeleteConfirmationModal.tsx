import { AnimatePresence, motion } from "framer-motion";
import type { BaseUserAccount } from "../../../types/auth.type";
import { useAuthStore } from "../../../store/user.store";
import LoadingSpinner from "../../../components/LoadingSpinner";

interface DeleteConfirmationModalProps {
  showDeleteConfirmationModal: boolean;
  setShowDeleteConfirmationModal: (value: boolean) => void;
  selectedAccount: BaseUserAccount | null;
  onConfirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
  selectedAccount,
  onConfirmDelete,
}) => {
  const { deleteAccountLoading } = useAuthStore();

  if (!selectedAccount) return;

  return (
    <AnimatePresence>
      {showDeleteConfirmationModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirmationModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Admin Account — {selectedAccount.fullname}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the admin account for John Doe?
              This action cannot be undone and will permanently remove all
              administrative access.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirmationModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                disabled={deleteAccountLoading}
              >
                Cancel
              </button>
              <button
                onClick={onConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 transition-colors duration-200"
                disabled={deleteAccountLoading}
              >
                {deleteAccountLoading ? <LoadingSpinner /> : "Delete Account"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;
