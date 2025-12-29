import React from "react";
import "./style.css";
import Link from "next/link";
import ContactPopup from "../contactPopup";
export default function Hero({setCallPopup}:any) {
    return (
        <div className="relative w-full hero ">
            <div className="hero-title-container flex">
                <span className="hero-name animate-pulse">&lt;CG/&gt;</span>
                <h1 className="hero-title">Desenvolvedor <br />FullStack</h1>
            </div>
            <div data-aos="fade-left" data-aos-delay="200" className=" hero-description-container w-full">
                <div className="hero-description">
                    <p className="hero-description-text">Profissional movido pela paixão em transformar desafios em soluções práticas, combinando criatividade, visão estratégica e o compromisso constante com um código limpo, eficiente e de alta qualidade.</p>
                    <h2 className="hero-description-header">Modelo soluções, <br />não códigos</h2>
                </div>
                <div className="hero-buttons-container">
                    <span className="hero-buttons">
                        <button onClick={()=>setCallPopup(true)} className="button-1 animate">Entre em contato</button>
                        <Link href={'#introduction'} className="text-center h-full button-2 animate">Me conheça</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}