import React from "react";
import "../styles/Toast.css";

const Toast = ({ message, type = "success", onClose, isClosing = false }) => {
  return (
    <div className={`toast toast-${type} ${isClosing ? 'toast-exiting' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;