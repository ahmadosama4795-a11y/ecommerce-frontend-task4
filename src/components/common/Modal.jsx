import { useEffect } from "react";

function Modal({
    isOpen,
    onClose,
    title,
    children,
    closeOnOverlay = true,
}) {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (event) => {
        if (closeOnOverlay && event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="presentation"
        >
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="modal-header">
                    <h2 id="modal-title">{title}</h2>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
