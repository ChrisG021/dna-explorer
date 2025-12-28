import { SiSpeedtest } from "react-icons/si";
import "./style.css"
import { RiComputerLine } from "react-icons/ri";
import { GiMagicBroom, GiThreeFriends } from "react-icons/gi";
import { FaCircle } from "react-icons/fa6";

export default function Introduction(){
    const Card =({title,icon}:any)=>(
        <div className="card-intro flex items-center justify-center">
            <div className="flex flex-row gap-5 justify-center px-3 items-center max-md:text-sm text-2xl">
                {icon}
                <p>{title}</p>
            </div>

        </div>
    );
    const fadeText = (title: string) => 
    title.split("").map((letter, index) => (
        <span key={index}
        data-aos="fade-up"
        data-aos-delay={index * 50}>
        {letter}
        </span>
  ));

    // ideia A : texto + 3/4 cards
    return(
        
        <div className="flex flex-col introduction max-w-screen w-full  text-(--primary-color) justify-center items-center gap-20">
            <div className="max-md:min-h-[70vh] lg:min-h-[80vh] flex justify-center items-center">
                <h2>{fadeText("Antes de qualquer competência, gostaria de te mostrar o porquê  trabalhar comigo")}</h2>
            </div>
            <div className="relative flex min-h-screen w-full justify-center items-cente">
                <ul className="cards-container flex flex-col lg:w-[70%]">
                    <li data-aos="fade-right" data-aos-delay="0" data-aos-duration="800" className="lg:mr-9  z-2">
                            <Card title="Busco soluções ágeis" icon ={<SiSpeedtest className="text-xl" />}/>
                            <div className="max-md:hidden">
                            <FaCircle />
                            </div>
                    </li>
                    <li data-aos="fade-left" data-aos-delay="200" data-aos-duration="800" className="lg:ml-9 z-2">
                            <div className="max-md:hidden">
                            <FaCircle />
                            </div>
                            <Card title="Interfaces modernas e intuitiva"  icon ={<RiComputerLine className="text-xl"/>}/>
                    </li>
                    <li data-aos="fade-right" data-aos-delay="400" data-aos-duration="800" className="lg:mr-9 z-2">
                            <Card title="Código limpo e organizado"  icon ={<GiMagicBroom className="text-xl"/>}/>
                            <div className="max-md:hidden">
                            <FaCircle />
                            </div>
                    </li>
                    <li data-aos="fade-left" data-aos-delay="600" data-aos-duration="800" className="lg:ml-9 z-2">
                            <div className="max-md:hidden">
                            <FaCircle />
                            </div>
                            <Card title="Comunicação clara durante todo o processo"  icon ={<GiThreeFriends className="text-xl"/>}/>

                    </li>
                </ul> 
            <div className="max-md:hidden absolute bg-linear-to-b from-(--background) from-10% to-(--primary-color) to-30%    w-1  h-full rounded-4xl"/> 
            </div>

        </div>
    );
}