import { useState } from "react";
import "./style.css"

export default function ReportInput(){
    const [isTyping,setIsTyping] = useState<boolean>(false)
    return(
        <div className="fixed bottom-2 right-2 max-md:w-[40vw] w-[20vw]">
            {/* o gatilho para ir à pagina deve ser dado apartir da respostas da api que envia o email */}
            {/* 200 -> envia, qualquer outro gera um popup no alto da pagina indicando o erro */}
            <form action="/report" className="report-container">
                <input placeholder="Digite seu email" onChange={()=>setIsTyping(true)} type="email" className={`z-20 report-input ${isTyping&&("show")}`} />
                <button className={`z-19 report-button `}>Gerar relatório</button>
            </form>
        </div>
    );
}