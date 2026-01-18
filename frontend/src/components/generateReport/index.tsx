import { useState } from "react";
import "./style.css"
import axios from "axios";
import { showToast } from "../toast";
import { reportProps } from "../../types/index"
//check tb
export default function ReportInput({BASE_URL,addedMusics}:reportProps){
    const [email,setEmail] = useState<string>();
    const postEmail= async ()=>{
        try{
            const request = axios.post(`${BASE_URL}/email`, {
                musics: addedMusics,
                email: email,
            });

            showToast("promise", "Enviando e-mail...", request);

            const res = await request;
            
            if(res.status==200){
                setTimeout(()=>{
                    window.location.href = '/report';
                },500);
            }
            console.log(res);
        }catch(e){
            console.error(e);
        }

    }
    return(
        <div className="fixed bottom-2 right-2 max-md:w-[40vw] w-[20vw]">
            <div  className="report-container">
                <input placeholder="Digite seu email" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className={`z-20 report-input ${email&&("show")}`} />
                <button onClick={postEmail}  className={`z-15 report-button `}>Gerar relatório</button>
            </div>
        </div>
    );
}