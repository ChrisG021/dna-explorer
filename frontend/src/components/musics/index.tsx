import "./style.css"
import { FaPause, FaPlay } from "react-icons/fa";
import { VscThumbsupFilled } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { musicProps, Track } from "@/types";
//armazena musicas


export default function Musics({handlePlaying,isPlaying,musics,handleAddMusics,handleLikedMusics,likedMusics,addedMusics}:musicProps){
    const MusicCards = ()=>{
        return(
            <ul className="music-cards">
                {/* map  */}
                
                {musics.map((music:Track,id:number)=>(
                <li key={id} className=" card-container">
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
                            src={music.album.cover_xl}
                            className="w-full h-full object-cover"
                            alt={music.title}
                        />
                    </div>
                    <div className="description">
                        <div className="text">
                            <h3 className="">{music.title}</h3>
                            <p className="">{music.artist.name}</p>
                        </div>
                        <div className="icon">
                            {/* verifica se ta dentro do array para so depois expor no ui */}

                            {addedMusics.some(m => m.id_music === music.id)?(
                                <FaCirclePlus onClick={()=>handleAddMusics(music.id,music.title,music)} />
                            ):(
                               <CiCirclePlus onClick={()=>handleAddMusics(music.id,music.title,music)}/>
                            )}
                            
                            <VscThumbsupFilled onClick={()=>handleLikedMusics(music.id,music)}
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