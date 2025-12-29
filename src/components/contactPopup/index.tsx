import { FaX } from "react-icons/fa6";
import "./style.css";
import { FaPaperPlane } from "react-icons/fa";
export default function ContactPopup({setCallPopup}:any){

    return(
        <div className="fixed flex justify-center items-center w-full h-screen  bg-(--primary-color) z-1000 ">
            <div className="flex flex-col contactpopup ">
                <div className="flex w-full items-center justify-between ">
                    <div>
                        <p className="text-(--foreground) opacity-10">&lt;CG/&gt;</p>
                    </div>
                    <div onClick={()=>setCallPopup(false)} className="cursor-pointer border border-(--foreground) p-3 text-xs">
                        <FaX/>
                    </div>
                </div>

                <div className="flex flex-col p-2.5 gap-10">
                    {/* titulo */}
                    <h1>Entre em contato</h1>
                    
                    {/* description */}
                    <p></p>
                    <div className="flex flex-col gap-10">
                    {/* os input
                    */}
                        <div>
                            <p>Seu nome</p>
                            <div className="input-container">
                                <input type="text" placeholder="Como posso te chamar?" />
                            </div>
                        </div>
                        <div>
                            <p>Seu email</p>
                            <div className="input-container">
                                <input type="text" placeholder="seu@gmail.com" />
                            </div>
                        </div>
                        <div>
                            <p>Mensagem</p>
                            <div className="input-container">
                                {/* <input type="text" placeholder="" /> */}
                                <textarea className="w-full outline-none" name="" id="" placeholder="Me conte um pouco mais sobre sua ideia..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>setCallPopup(false)} className="flex items-center gap-5 border px-5 py-3 lg:px-8 lg:py-4 border-(--foreground) transition-all ease-in  hover:bg-(--foreground) hover:text-(--primary-color)">
                            <span>enviar mensagem</span>
                            <FaPaperPlane/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}