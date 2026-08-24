import Button from "./Button";
import Modal from "./Modal";

function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p>{message}</p>

            <div className="modal-actions">
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    {cancelText}
                </Button>

                <Button
                    variant="danger"
                    onClick={onConfirm}
                    loading={loading}
                >
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
}

export default ConfirmDialog;