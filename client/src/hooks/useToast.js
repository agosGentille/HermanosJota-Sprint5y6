import { useState, useCallback, useEffect } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const activeToasts = toasts.filter(toast => !toast.isClosing);
    if (activeToasts.length === 0) return;

    const timers = activeToasts.map(toast => {
      return setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, toast.duration);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts]);

  const showToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { 
      id, 
      message, 
      type, 
      duration,
      isClosing: false 
    };
    
    setToasts(prevToasts => [...prevToasts, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, isClosing: true } : toast
    ));
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  return {
    toasts,
    showToast,
    removeToast
  };
};

export default useToast;