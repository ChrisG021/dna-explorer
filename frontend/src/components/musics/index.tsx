import "./style.css"
import { FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { VscThumbsupFilled } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
//armazena musicas
interface likedMusic{
    id_music:string,
    name_music:string
}

interface musicProps{
    handlePlaying:(id:string)=>void,
    isPlaying: {
        trackId:string,
        playing:boolean
    },
    musics:{
        items: Array<object>;
        total: number;
        limit: number;
        offset: number;
    }
}

export default function Musics({handlePlaying,isPlaying,musics}:musicProps){
    const MAX = 7;
   
    const [addedMusics,setAddedMusics] = useState<Array<likedMusic>>([])
    const [likedMusics,setLikedMusics] = useState<Array<string>>([])


    const handleAddMusic = (id: string, name: string) => {
        // Verifica se a música já existe
        const exist = addedMusics.some(m => m.id_music === id);
        const isFull = addedMusics.length >= MAX;

        if (!exist && !isFull) {
            //pega o conteudo que ja ta e so adc um novo e tb 
            setAddedMusics(prev => [...prev, { id_music: id, name_music: name }]);
            handleLikedMusics(id);
            console.log("LOG:musica com id ("+id+") foi adicionado");       
            
        } else if(exist){
            //vai fazer uma filtragem e retirar do array aquele que for igual a esse id
            console.log("LOG:musica com id ("+id+") sendo retirada");          
            setAddedMusics(prev => prev.filter(m => m.id_music !== id));

        } else if (isFull) {
            console.warn("Limite máximo de músicas atingido");
        }
    };

    const handleLikedMusics = (id:string)=>{
        const exist = likedMusics.some(i => i === id);
        if(!exist){
            setLikedMusics(prev =>[...prev,id])
            console.log("LOG:musica com id ("+id+") foi curtido");       
        }else {
            console.log("LOG:musica com id ("+id+") retirando curtida");          
            setLikedMusics(prev => prev.filter(i => i !== id));
        }
    }
    

    const MusicCards = ()=>{
        return(
            <ul className="music-cards">
                {/* map  */}
                
                {musics.items.map((music:any,id:any)=>(
                <li key={id} className="bg-amber-50 card-container">
                    <div className="img-card relative overflow-hidden select-none">
                        <div
                            onClick={() => handlePlaying(music.id)}
                            className="absolute  hover:bg-black/30 hover:backdrop-blur-xs
                                    transition-all ease-in
                                    w-full h-full flex justify-center items-center group"
                        >
                            {/* quando id for igual ao da musica , eu coloco pra tocar ou pausar */}
                            {isPlaying.trackId == music.id && isPlaying.playing ? (
                            <button className="hidden group-hover:block text-white text-2xl">
                                <FaPause />
                            </button>
                            ) : (
                            <button className="hidden group-hover:block text-white text-2xl">
                                <FaPlay />
                            </button>
                            )}
                        </div>

                        <img
                            src={music.album.images[0].url}
                            className="w-full h-full object-cover"
                            alt={music.name}
                        />
                    </div>
                    <div className="description">
                        <div className="text">
                            <h3>{music.name}</h3>
                            <p>{music.artists[0].name}</p>
                        </div>
                        <div className="icon">
                            {/* verifica se ta dentro do array para so depois expor no ui */}

                            {addedMusics.some(m => m.id_music === music.id)?(
                                <FaCirclePlus onClick={()=>handleAddMusic(music.id,music.name)} />
                            ):(
                               <CiCirclePlus onClick={()=>handleAddMusic(music.id,music.name)}/>
                            )}
                            
                            <VscThumbsupFilled onClick={()=>handleLikedMusics(music.id)}
                            className={
                                likedMusics.some(likedId => likedId === music.id)
                                ? "liked "
                                : "no-liked"
                            }
                            />
                        </div>
                    </div>
                </li> 
                ))}
            </ul>
        );
    }
    return(

        <div className="w-full">
            {MusicCards()}
        </div>
    );
}