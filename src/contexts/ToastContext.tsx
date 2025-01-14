import { createContext, useContext, useCallback } from 'react';
import { useToastStore } from '../stores/toast';

interface ToastContextType {
  toast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const addToast = useToastStore((state) => state.addToast);

  const toast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      addToast({
        id: Math.random().toString(36).substring(7),
        message,
        type,
      });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}