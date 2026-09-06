import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Button from "./Button";
import styles from "./Modal.module.css";

function Modal({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
}) {
  //   Using a "ref" to act as a direct pointer to the <dialog> element to call the showModal/close
  const dialogRef = useRef(null);

  //   Anytime isOpen changes the dialog element will open or close using the useEffect
  useEffect(() => {
    const d = dialogRef.current;
    if (isOpen) {
      d.showModal();
    } else {
      d.close();
    }
  }, [isOpen]);
  return (
    //    Native dialog methods should also change the state correctly to be true
    <dialog
      ref={dialogRef}
      className={className}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      {showCloseButton && (
        <Button
          className={`btn-coral ${styles["btn-close"]}`}
          text="X"
          onClick={onClose}
        />
      )}
      {children}
    </dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
};

export default Modal;
