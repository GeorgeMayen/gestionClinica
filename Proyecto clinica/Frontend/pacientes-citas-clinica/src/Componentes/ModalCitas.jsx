import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-10 relative w-700 h-900">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 w-10 h-10"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        {children}
        
      </div>
    </div>
  );
}

export default Modal;
