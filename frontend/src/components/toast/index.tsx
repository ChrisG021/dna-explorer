import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


type ToastType = "error" | "success" | "info" | "warning"| "promise";
//letra minuscula para funcao utilitaria e maiuscula pra component
export function showToast(
  type: ToastType,
  message: string,
  promise?: Promise<any>
){
  switch (type) {
    case "success":
      toast.success(message,{
        theme:"dark",
        hideProgressBar:true,
        autoClose:500
      });
      break;
    case "error":
      toast.error(message,{
        theme:"dark"
      });
      break;
    case "info":
      toast.info(message,{
        theme:"dark",
        hideProgressBar:true,
        autoClose:500
      });
      break;
    case "warning":
      toast.warning(message,{
        theme:"dark",
        hideProgressBar:true,
      });
      break;
    case "promise":
      if(!promise) return;

      toast.promise(promise,{
        pending: "Enviando Relatório",
        success: "Pronto!",
        error: "OPS! Erro no envio"
      },{
        hideProgressBar:true,
        theme:"dark"
      })
  }
}
