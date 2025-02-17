import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";
import { ExternalClassnames } from "@/types/components";

type ModalProps = {
  children: React.ReactNode | React.ReactNode[];
  show: boolean;
  onClose: () => void;
  ariaLabel: string;
  hideCloseBtn?: true;
  outsideToClose?: true;
} & ExternalClassnames;

export const Modal: React.FC<ModalProps> = ({ children, show, onClose, externalClassnames, ariaLabel, hideCloseBtn, outsideToClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [show]);

  // listener for clicking outside, i already have modal ref

  return createPortal(
    <dialog tabIndex={-1} aria-label={ariaLabel} ref={modalRef} onCancel={onClose} onClose={onClose} className={`modal ${externalClassnames ?? ""}`}>
      {!hideCloseBtn && (
        <button onClick={() => modalRef.current?.close()} className='modal__close'>
          X
        </button>
      )}
      {children}
    </dialog>,
    document.body
  );
};
Modal.displayName = "Modal";
