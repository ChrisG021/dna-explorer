import { SiCss3, SiDocker, SiFirebase, SiHtml5, SiJavascript, SiNestjs, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiSpringboot, SiSupabase, SiTailwindcss, SiTypescript } from "react-icons/si";
import "./style.css";
import { DiJava } from "react-icons/di";
import { GrMysql } from "react-icons/gr";

interface cardProps {
    icon: any,
    order: number,
    title: string,
}

export default function Technology() {
    const CardCarrousel = ({ icon, order, title }: cardProps) => {
        return (
            <div className="flex  w-full justify-center gap-2 items-center">
                <div className="p-1">
                    {icon}
                </div>
                <div className="flex gap-2">
                    <span >.{order}</span>
                    <p className="font-bold">{title}</p>
                </div>

            </div>
        );
    }
    return (
        <div className="tech flex flex-col min-h-screen w-full text-(--primary-color) justify-center items-center gap-15 overflow-hidden">
            <h2>Minhas tecnologias</h2>
            <div className="flex flex-col w-full gap-5 ">
                <h3 className="ml-2">FrontEnd</h3>
                <div className="carrousel">
                    <div aria-hidden className="group" >
                        <div className="carrousel-item"><CardCarrousel icon={<SiReact className="lg:text-4xl  text-(--accent-3) " />} order={1} title="React" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiNextdotjs className="lg:text-4xl  text-(--accent-3) " />} order={2} title="NextJS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiHtml5 className="lg:text-4xl  text-(--accent-3) " />} order={3} title="HTML" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiCss3 className="lg:text-4xl  text-(--accent-3) " />} order={4} title="CSS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiTailwindcss className="lg:text-4xl  text-(--accent-3) " />} order={5} title="Tailwind" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiJavascript className="lg:text-4xl  text-(--accent-3) " />} order={6} title="JavaScript" /></div>
                    </div>
                    <div aria-hidden className="group" >
                        <div className="carrousel-item"><CardCarrousel icon={<SiReact className="lg:text-4xl  text-(--accent-3) " />} order={1} title="React" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiNextdotjs className="lg:text-4xl  text-(--accent-3) " />} order={2} title="NextJS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiHtml5 className="lg:text-4xl  text-(--accent-3) " />} order={3} title="HTML" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiCss3 className="lg:text-4xl  text-(--accent-3) " />} order={4} title="CSS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiTailwindcss className="lg:text-4xl  text-(--accent-3) " />} order={5} title="Tailwind" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiJavascript className="lg:text-4xl  text-(--accent-3) " />} order={6} title="JavaScript" /></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full gap-5">
                <h3>BackEnd</h3>
                <div className="carrousel">
                    <div aria-hidden className="group backend" >
                        <div className="carrousel-item"><CardCarrousel icon={<SiNodedotjs className="lg:text-4xl  text-(--accent-3) " />} order={1} title="NodeJS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiNestjs className="lg:text-4xl  text-(--accent-3) " />} order={2} title="NestJS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiPython className="lg:text-4xl  text-(--accent-3) " />} order={3} title="Python" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<DiJava className="lg:text-4xl  text-(--accent-3) " />} order={4} title="Java" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiSpringboot className="lg:text-4xl  text-(--accent-3) " />} order={5} title="Spring Boot" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiTypescript className="lg:text-4xl  text-(--accent-3) " />} order={5} title="TypeScript" /></div>
                    </div>
                    <div aria-hidden className="group backend" >
                        <div className="carrousel-item"><CardCarrousel icon={<SiNodedotjs className="lg:text-4xl  text-(--accent-3) " />} order={1} title="NodeJS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiNestjs className="lg:text-4xl  text-(--accent-3) " />} order={2} title="NestJS" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiPython className="lg:text-4xl  text-(--accent-3) " />} order={3} title="Python" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<DiJava className="lg:text-4xl  text-(--accent-3) " />} order={4} title="Java" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiSpringboot className="lg:text-4xl  text-(--accent-3) " />} order={5} title="Spring Boot" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiTypescript className="lg:text-4xl  text-(--accent-3) " />} order={5} title="TypeScript" /></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full gap-5">
                <h3>Banco de Dados</h3>
                <div className="carrousel">
                    <div aria-hidden className="group database" >
                        <div className="carrousel-item"><CardCarrousel icon={<SiPostgresql className="lg:text-4xl  text-(--accent-3) " />} order={1} title="PostgreSQL" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<GrMysql className="lg:text-4xl  text-(--accent-3) " />} order={2} title="Mysql" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiFirebase className="lg:text-4xl  text-(--accent-3) " />} order={3} title="Firebase" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiSupabase className="lg:text-4xl  text-(--accent-3) " />} order={4} title="Supabase" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiDocker className="lg:text-4xl  text-(--accent-3) " />} order={5} title="Docker" /></div>
                    </div>
                    <div aria-hidden className="group database" >
                        <div className="carrousel-item"><CardCarrousel icon={<SiPostgresql className="lg:text-4xl  text-(--accent-3) " />} order={1} title="PostgreSQL" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<GrMysql className="lg:text-4xl  text-(--accent-3) " />} order={2} title="Mysql" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiFirebase className="lg:text-4xl  text-(--accent-3) " />} order={3} title="Firebase" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiSupabase className="lg:text-4xl  text-(--accent-3) " />} order={4} title="Supabase" /></div>
                        <div className="carrousel-item"><CardCarrousel icon={<SiDocker className="lg:text-4xl  text-(--accent-3) " />} order={5} title="Docker" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}