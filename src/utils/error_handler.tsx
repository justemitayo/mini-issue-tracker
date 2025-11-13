import { toast, ToastOptions } from "react-toastify";
import axios from "axios";

interface ToastHandlerOptions {
  Msg?: string;        
  toastOptions?: ToastOptions;   
  logError?: boolean;            
  onCallback?: () => void;        
}


export function handleApiError(error: unknown, options?: ToastHandlerOptions) {
  const { Msg = "Something went wrong", toastOptions, logError = true, onCallback } = options || {};

  let message = Msg;

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || error.response?.data?.error || error.message || Msg;
  } else if (typeof error === "object" && error !== null) {
    message = "message" in error ? (error as any).message : JSON.stringify(error);
  } else if (typeof error === "string") {
    message = error;
  }

  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...toastOptions,
  });

  if (logError) console.error(error);
  if (onCallback) onCallback();
}


export function handleApiSuccess(message: string, options?: ToastHandlerOptions) {
  const { toastOptions, onCallback } = options || {};

  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...toastOptions,
  });

  if (onCallback) onCallback();
}





