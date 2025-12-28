import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import image_profile from "../../../public/image_profile.jpg"
import "./style.css"
import { useState } from "react";
import VsCodeComponent from "../VsCodeComponent";
export default function About(){
    const [fromMove,setFromMove] = useState("")
    return(
        <div className={`about ${fromMove} flex flex-row max-md:flex-col gap-10 min-h-screen text-(--primary-color) justify-center items-center`}>
            

            {/* imagem dentro terminal */}
            {/* <div  className="image-side flex flex-col justify-center lg:items-center lg:max-w-[50%] w-full">
                <div className="terminal-img font-mono">
                    <ul className="circles">
                        <li className="circle"></li>
                        <li className="circle"></li>
                        <li className="circle"></li>
                    </ul>
                    <div className="line"></div>
                    <p className="text-white">
                    <span className="text-green-400">chris@portfolio</span>:
                    <span className="text-blue-400">~</span>$ 
                    &lt;<span className="text-blue-300">image</span>&gt;
                    </p>                    
                    <img className="ml-5 rounded-4xl mb-10 max-md:w-[100px] lg:w-[200px] " draggable={false} src={"/image_profile.jpg"} alt="" />
                </div>
            </div> 
             <div>
                <VsCodeComponent/>
            </div>
            <div className="text-side  lg:max-w-[50%] w-full gap-2 justify-center items-center">
                <div className="flex flex-col gap-2 container max-w-[600px] w-full">
                    <h2>Sobre mim</h2>
                    <span>Teresina, Píaui</span>
                    <p className="max-md:text-xs">Me chamo Christophe Guerra, sou estudante de Ciência da Computação e desenvolvedor de software em constante evolução, com experiência prática tanto em frontend quanto em backend. Ao longo da minha formação, venho desenvolvendo projetos que envolvem desde a criação de interfaces funcionais e responsivas até a construção de APIs e sistemas bem estruturados, sempre buscando escrever código limpo, organizado e de fácil manutenção.<br/> <br/>Sou uma pessoa curiosa, disciplinada e comprometida com a melhoria constante, valorizando o trabalho em equipe, a troca de conhecimento e a construção de soluções eficientes. Busco oportunidades que me permitam crescer como desenvolvedor, aprofundar meus conhecimentos e gerar impacto positivo por meio da tecnologia.</p>
                </div>
            </div> */}
            <div className="   w-full">
                <VsCodeComponent/>
            </div>
            <div className="text-side  lg:max-w-[50%] w-full gap-2 justify-center items-center">
                <div className="flex flex-col gap-2 container max-w-[600px] w-full">
                    <h2>Sobre mim</h2>
                    <p className="max-md:text-sm">Apenas um jovem eternamente apaixonado por transformar linhas de código em soluções <span>práticas</span>, <span>responsivas</span> e <span>ágeis</span>. Movido pela curiosidade e pelo desejo constante de evolução, encaro cada desafio como uma oportunidade de aprendizado, independentemente da complexidade ou da demanda estabelecida. Acredito que a tecnologia deve simplificar problemas reais, gerar impacto positivo e entregar valor através de soluções bem estruturadas, eficientes e pensadas para o usuário.</p>
                    <span    className="max-md:text-sm">Para saber mais, recomendo dar uma olhada no terminal...</span>
                </div>
            </div>
        </div>
    );
}