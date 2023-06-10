import React, { ReactNode, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>      
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
