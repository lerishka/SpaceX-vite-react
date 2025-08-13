import type { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const modalElement = document.getElementById("modal-root")!;

const Modal = ({ children, onClose }: ModalProps) => {
  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} role="modal">
        {children}
      </div>
    </div>,
    modalElement
  );
};

export default Modal;
