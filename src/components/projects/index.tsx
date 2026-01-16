import { useState } from "react";
import "./style.css"
import Link from "next/link";
interface cardProps{
    title:string,
    description:string,
    tech:Array<string>,
    url:string,
}
export default function Projects(){
    const CardProjects = ({title,description,tech,url}:cardProps)=>{
        return(
            <div className="flex  card flex-col bg-(--primary-color) text-(--accent-3) w-full h-full text-xs">
                    <div className="flex flex-row header-card">
                    </div>

                    <div className="flex flex-col justify-between px-4 py-3 h-full">
                        <div className="flex flex-col gap-5">
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <div className="flex gap-1 flex-wrap">
                            {tech.map((value,i)=>(
                                <span className="text-xs" key={i}>{value}</span>
                            ))}
                            </div>
                        </div>

                        <Link  href={url} className=" bg-(--accent-3) w-fit px-8 py-1 rounded-4xl text-(--primary-color)">
                            <p>ver mais</p>
                        </Link>
                    </div>
            </div>
        );
    }
    return(
        <div className="flex flex-col projects min-h-screen w-full justify-center items-center text-(--primary-color) overflow-hidden pt-50">
            <h2>Meus projetos</h2>
            <div className="banner">
                <div className="slider flex" style={{"--quantity":6}as any}>
                        <div style={{"--i":1}as any} className="item">
                        <CardProjects
                        url="https://github.com/ChrisG021/i-like-cinema" 
                        title="I like cinema" 
                        description="WebSite para explorar filmes com uma interface moderna e responsiva. Ideal para quem quer descobrir títulos, conferir detalhes e salvar favoritos para assistir depois."
                        tech={["React","Next","Tailwind","Firebase"]}
                        /></div>
                        <div style={{"--i":2}as any} className="item">
                        <CardProjects
                        url="https://github.com/ChrisG021/dna-explorer" 
                        title="Musical Explorer" 
                        description="Webapp onde as pessoas podem explorar músicas e receber um relatório personalizado sobre o gosto musical delas."
                        tech={["React","Next","Deezer Api","Tailwind","Python","Gemini AI"]}
                        /></div>
                        <div style={{"--i":3}as any} className="item">
                        <CardProjects
                        url="https://github.com/ChrisG021/glassmorphism-design-app" 
                        title="Glassmorphism app Design" 
                        description="Um aplicativo moderno com design Glassmorphism, focado em interface limpa, elegante e responsiva.O projeto utiliza React e conceitos modernos de UI/UX, com efeitos de vidro (blur, transparência e gradientes)."
                        tech={["React","Vite","CSS"]}
                        /></div>
                        <div style={{"--i":4}as any} className="item">
                        <CardProjects 
                        url="https://portifolio-seven-omega-55.vercel.app/"
                        title="Portifolio" 
                        description="Portifolio de Christophe Guerra ,estudante de Ciência da Computação e desenvolvedor de software, focado em criar soluções modernas, funcionais e bem estruturadas, unindo front-end e back-end com boas práticas e aprendizado contínuo."
                        tech={["React","Next","Tailwind","CSS"]}
                        /></div>
                        <div style={{"--i":5}as any} className="item">
                        <CardProjects 
                        url=""
                        title="Em  breve" 
                        description="Logo mais terá mais projetos."
                        tech={[""]}
                        /></div>
                        <div style={{"--i":6}as any} className="item">
                        <CardProjects 
                        url=""
                        title="Em  breve" 
                        description="Logo mais terá mais projetos."
                        tech={[""]}
                        /></div>

                </div>
            </div>
        </div>
    );
}