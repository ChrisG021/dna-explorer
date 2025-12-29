import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import image_profile from "../../../public/image_profile.jpg"
import "./style.css"
import { useState } from "react";
import VsCodeComponent from "../VsCodeComponent";
export default function About(){

    return(
        <div className={`about  flex flex-row max-md:flex-col gap-10 min-h-screen text-(--primary-color) justify-center items-center`}>
            <div className="w-full">
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