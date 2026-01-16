import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ToastType = "error" | "success" | "info" | "warning";
//letra minuscula para funcao utilitaria e maiuscula pra component
export function showToast(type: ToastType, message: string) {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
  }
}
