"use client"
import React, { useEffect, useRef, useState } from "react";
import "./style.css"
export default function VsCodeComponent(){
    const [history , setHistory] = useState([
        {type:"output",text:"Welcome to my terminal"},
        {type:"output",text:'Type "help" for available commands'} 
    ]);
    const [currentInput, setCurrentInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    const commands = {
        help:()=>[
            'Comandos disponiveis:',
            '• about - sobre mim',
            '• curious - Curiosidades',
            '• soft - Soft skills',
            '• clear - limpa o terminal',
        ],
        about:()=>[
            'CHRISTOPHE GUERRA',
            '',
            'Teresina, Píaui',
            'Sou estudante de Ciência da Computação e desenvolvedor de software em constante evolução, com experiência prática tanto em frontend quanto em backend. Ao longo da minha formação, venho desenvolvendo projetos que envolvem desde a criação de interfaces funcionais e responsivas até a construção de APIs e sistemas bem estruturados, sempre buscando escrever código limpo, organizado e de fácil manutenção.',
            'Sou uma pessoa curiosa, disciplinada e comprometida com a melhoria constante, valorizando o trabalho em equipe, a troca de conhecimento e a construção de soluções eficientes. Busco oportunidades que me permitam crescer como desenvolvedor, aprofundar meus conhecimentos e gerar impacto positivo por meio da tecnologia.'
        ],
        soft:()=>[
            '-- SOFT SKILLS -- ',
            '',
            '-> Liderança',
            '-> Boa oratória e dialética ',
            '-> Trabalho em equipe',
            '-> Sensibilidade e empatia com os colegas de trabalho',
            '-> Ágil e direto em resolução de demandas'
        ],
        curious:()=>[
            '-- CURIOSIDADES -- ',
            "",
            '-> Programador fullStack  +2 anos ',
            '-> Músico e cantor nas horas vagas',
            '-> Eterno apaixonado por motos',
            '-> Cristão em tempo integral ✝'
        ],
        clear:()=>{
            setHistory([]);
            return [];
        },
        cls:()=>{
            setHistory([]);
            return [];
        },
    };
    const executeCommand= (cmd)=>{
        const trimmed = cmd.trim().toLowerCase();
        const [command,...args] = trimmed.split(' ');

        if(command =="echo") {
            return [args.join(' ')||''];
        }
        if(commands[command]){
            //pegando comando e ligando o comando é isso
            return commands[command]();
        }
        return [`command not found: ${command}. Type "help" for available commands.`]
    }

    const handleInputChange= (e)=>{
        setCurrentInput(e.target.value);
        
    };
    const handleSubmit= (e)=>{
        if(e&&e.preventDefault) e.preventDefault();
        if(!currentInput.trim()) return;

        setIsTyping(true);
        const trimmed= currentInput.trim().toLowerCase();
        if(trimmed == "clear"){
        setTimeout(()=>{
            setHistory([]);
            setCurrentInput("");
            setIsTyping(false);
        },400)
        return;
        }
        const newHistory = [...history,{type:"input",text:currentInput}];

        const output = executeCommand(currentInput);
        const outputEntries = output.map(line =>({type:"output",text:line}));
        setTimeout(()=>{
            setHistory([...newHistory,...outputEntries]);
            setCurrentInput("");
            setIsTyping(false);
        },400)
    }
    useEffect(()=>{
        if(terminalRef.current){
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    },[history])

    return(
        <div className="flex relative items-center justify-center  rounded-2xl">
          {/*background pattern    */}
            <div className="absolute inset-0 ]"></div>

            <div className="relative w-full lg:max-w-4xl">
                {/* terminal window */}

            <div className="bg-linear-to-r from-[#020617] to-[#0F172A] border border-white/10 rounded-2xl overflow-hidden">
                {/* title bar */}
                <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors duration-500 cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors duration-500 cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors duration-500 cursor-pointer"></div>        
                    </div>
                    <div className="flex-1 text-center">
                        <span className="text-white/70 text-sm font-medium">Terminal</span>
                    </div>    
                    <div className="w-14"></div>
                </div>

                {/* terminal content */}
                <div ref={terminalRef} className="terminal-content custom-scrollbar p-6  overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
                    {/* command history */} 
                    <div className="space-y-2 font-mono text-sm">
                        {history.map((entry, index)=>(
                            <div key={index} className="flex">
                                {entry.type =="input"?(
                                    <div className="flex w-full">
                                        <span className="text-green-400 mr-2 select-none">➜</span>
                                        <span className="text-blue-400 mr-2 select-none">~</span>                                    
                                        <span className="text-white">{entry.text}</span>
                                    </div>
                                ):(
                                    <div className="text-gray-300 pl-6">{entry.text}</div>
                                )}
                            </div>
                        ))}

                        {/* current input line */}
                        <div className="flex w-full ">
                            <span className="text-green-400 mr-2 select-none">➜</span>
                            <span className="text-blue-400 mr-2 select-none">~</span>                                    
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={handleInputChange}
                                onKeyDown={(e)=>e.key == 'Enter' && handleSubmit(e)}
                                className="flex-1 bg-tranparent text-white outline-none font-mono placeholder:text-gray-500"
                                placeholder={isTyping?"Processing...":"Type a command..."}
                                disabled={isTyping}
                            />
                        </div>
                    </div>
                </div>


                {/* status bar */}
                <div className="bg-white/5 border-t border-white/10 px-4 py-2 flex justify-between items-center text-xs text-white/60">
                    <div>Christophe Guerra v1.0</div>
                    <div className="flex items-center gap-4">
                        <div className=" flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>Online</span>
                        </div>
                        {/* <div>{new Date().toLocaleTimeString()}</div> */}
                    </div>
                </div>
            </div>

                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-purple-600/5 rounded-2xl blur-xl -z-10"></div>
            </div>

        </div>  
    );
}