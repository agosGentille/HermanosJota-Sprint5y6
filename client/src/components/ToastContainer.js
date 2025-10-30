import React from "react";
import Toast from "./Toast";
import "../styles/Toast.css";

const ToastContainer = ({ toasts, removeToast }) => {
  const visibleToasts = toasts.slice(-3);

  if (visibleToasts.length === 0) return null;

  return (
    <div className="toast-container">
      {visibleToasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          isClosing={toast.isClosing}
        />
      ))}
    </div>
  );
};

export default ToastContainer;