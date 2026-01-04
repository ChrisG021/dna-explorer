import "./style.css"
import { FaPause, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { VscThumbsupFilled } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";

export default function Musics(){
    const [isPlaying, setIsPlaying] = useState({ id: 0, playing: false });
    const handlePlaying = (id: number) => {
        if (isPlaying.id === id) {
            // toggle play/pause for the same id
            setIsPlaying({ id: id, playing: !isPlaying.playing });
        } else {
            // switch to new id and play
            setIsPlaying({ id: id, playing: true });
        }
    };
const musics= {
      items: [
        {
          id: "track_001",
          name: "Sunshine - Ao Vivo",
          duration_ms: 214000,
          popularity: 78,
          explicit: false,
          album: {
            id: "album_001",
            name: "Delacruz Ao Vivo",
            release_date: "2023-09-15",
            images: [{ url: "https://picsum.photos/640?1" }]
          },
          artists: [{ id: "artist_001", name: "Delacruz" }]
        },
        {
          id: "track_002",
          name: "Afrodite",
          duration_ms: 198000,
          popularity: 82,
          explicit: false,
          album: {
            id: "album_002",
            name: "Nonsense, Vol. 1",
            release_date: "2022-05-10",
            images: [{ url: "https://picsum.photos/640?2" }]
          },
          artists: [{ id: "artist_002", name: "BK'" }]
        },
        {
          id: "track_003",
          name: "Teu Popô",
          duration_ms: 176000,
          popularity: 75,
          explicit: true,
          album: {
            id: "album_003",
            name: "Ladrão",
            release_date: "2019-09-13",
            images: [{ url: "https://picsum.photos/640?3" }]
          },
          artists: [{ id: "artist_003", name: "Djonga" }]
        },
        {
          id: "track_004",
          name: "Amor Pra Depois",
          duration_ms: 203000,
          popularity: 69,
          explicit: false,
          album: {
            id: "album_004",
            name: "Amor Pra Depois",
            release_date: "2021-02-14",
            images: [{ url: "https://picsum.photos/640?4" }]
          },
          artists: [{ id: "artist_004", name: "Giulia Be" }]
        },
        {
          id: "track_005",
          name: "Leão",
          duration_ms: 189000,
          popularity: 88,
          explicit: false,
          album: {
            id: "album_005",
            name: "Ouro",
            release_date: "2020-11-20",
            images: [{ url: "https://picsum.photos/640?5" }]
          },
          artists: [{ id: "artist_005", name: "Marília Mendonça" }]
        },
        {
          id: "track_006",
          name: "Várias Queixas",
          duration_ms: 221000,
          popularity: 90,
          explicit: false,
          album: {
            id: "album_006",
            name: "Tim Maia",
            release_date: "1981-01-01",
            images: [{ url: "https://picsum.photos/640?6" }]
          },
          artists: [{ id: "artist_006", name: "Tim Maia" }]
        },
        {
          id: "track_007",
          name: "Idiota",
          duration_ms: 194000,
          popularity: 84,
          explicit: false,
          album: {
            id: "album_007",
            name: "Idiota",
            release_date: "2023-04-07",
            images: [{ url: "https://picsum.photos/640?7" }]
          },
          artists: [{ id: "artist_007", name: "Jão" }]
        }
      ],
      total: 7,
      limit: 7,
      offset: 0
    };
    const MusicCards = ()=>{
        return(
            <ul className="music-cards">
                {/* map  */}
                
                {musics.items?.map((music:any,id:any)=>(
                <li key={id} className="bg-amber-50 card-container">
                    <div className="img-card relative overflow-hidden">
                        <div
                            onClick={() => handlePlaying(0)}
                            className="absolute  hover:bg-black/30 hover:backdrop-blur-xs
                                    transition-all ease-in
                                    w-full h-full flex justify-center items-center group"
                        >
                            {/* quando id for igual ao da musica , eu coloco pra tocar ou pausar */}
                            {isPlaying.id == 0 && isPlaying.playing ? (
                            <div className="hidden group-hover:block text-white text-2xl">
                                <FaPause />
                            </div>
                            ) : (
                            <div className="hidden group-hover:block text-white text-2xl">
                                <FaPlay />
                            </div>
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
                            <CiCirclePlus />
                            <VscThumbsupFilled />
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