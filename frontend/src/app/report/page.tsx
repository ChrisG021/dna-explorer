'use client'
import { useState } from "react";
import "./style.css";

export default function ReportPage(){
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        //salva qual e  elemento base do movimento com base na classe tracking
        const card = e.currentTarget.querySelector(".tracking") as HTMLElement;
        if (!card) return;

        const rect = card.getBoundingClientRect();

        //calculo para evitar que ele se movimente mais que o necessario e de maneira centralizada

        //x mouse - coordenada do x do objeto da esquerda dele
        const x = e.clientX - rect.left;
        //y mouse - coordenada do y do objeto
        const y = e.clientY - rect.top;

        //centro do objeto
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        //quanto  ele deve rotacionar com base no centro
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const maxMotion = 4; // inclinação máxima em graus

        //mesma coisa do style{{"--rx":${percentX*maxMotion}deg}}
        card.style.setProperty("--rx", `${percentX * maxMotion}deg`);
        card.style.setProperty("--ry", `${-percentY * maxMotion}deg`);
    }
    return(
        <div className="report-page flex justify-center items-center w-full min-h-screen" onMouseMove={handleMouseMove}>
            <section className="tracking flex flex-col justify-between items-center py-20   max-md:w-[90vw] max-md w-[60vw] h-[80vh]">
                <div className="flex flex-col justify-center items-center px-10" >
                    <h1 className="text-3xl font-semibold">relatório enviado</h1>
                    <p className="mt-4 ">Eviamos ao seu email um relatório completo sobre seu DNA musical com base nas músicas de sua escolha</p>
    
                </div>
                <a href="/"  className="bg-white text-black px-10 py-6 rounded-2xl active:translate-y-1 ease-in transition-all">
                    Voltar ao início
                </a>
            </section>
        </div>
    );
}