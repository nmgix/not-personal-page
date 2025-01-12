import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

interface IModal {
  children: React.ReactNode;
  show: boolean;
  closeModal: () => void;
  label: string;
  externalClassnames?: string | string[];
}

export const Modal: React.FC<IModal> = ({ children, show, closeModal, externalClassnames, label }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [show]);

  return createPortal(
    <dialog
      tabIndex={-1}
      aria-label={label}
      ref={modalRef}
      onCancel={closeModal}
      onClose={closeModal}
      className={`modal ${externalClassnames ?? ""}`}>
      <button onClick={() => modalRef.current?.close()} className='modal__close'>
        X
      </button>
      {children}
    </dialog>,
    document.body
  );
};
