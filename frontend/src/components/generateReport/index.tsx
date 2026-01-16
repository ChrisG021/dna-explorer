import { useState } from "react";
import "./style.css"
import axios from "axios";
import { MusicAdd, Track } from "@/types";
interface reportProps{
    BASE_URL:string
    addedMusics:Array<MusicAdd>
}
//check tb
export default function ReportInput({BASE_URL,addedMusics}:reportProps){
    const [email,setEmail] = useState<string>();
    const postEmail= async ()=>{
        try{
            const res = await axios.post(`${BASE_URL}/email`,{
                musics:addedMusics,
                email:email,
            })
            if(res.status==200){
                window.location.href = '/report'
            }
            console.log(res)
        }catch(e){
            //dps e prra gerar o card com o erro la no topo
            console.error(e)
        }

    }
    return(
        <div className="fixed bottom-2 right-2 max-md:w-[40vw] w-[20vw]">
            {/* o gatilho para ir à pagina deve ser dado apartir da respostas da api que envia o email */}
            {/* 200 -> envia, qualquer outro gera um popup no alto da pagina indicando o erro */}

            <div  className="report-container">
                <input placeholder="Digite seu email" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className={`z-20 report-input ${email&&("show")}`} />
                <button onClick={postEmail}  className={`z-15 report-button `}>Gerar relatório</button>
            </div>
        </div>
    );
}