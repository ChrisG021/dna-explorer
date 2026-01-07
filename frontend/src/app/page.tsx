'use client'
import ReportInput from "@/components/generateReport";
import MusicPlayerPopup from "@/components/musicPlayerPopup";
import Musics from "@/components/musics";
import SearchBar from "@/components/searchBar";
import { Track } from "@/types";
import { useEffect, useState } from "react";
import "./styles.css"
export default function app() {
  const BASE_URL = "http://localhost:8000/api";
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
            },
        ],
        total: 7,
        limit: 7,
        offset: 0
  };


  // grava qual id e utilizo para o toggle
  const [isPlaying, setIsPlaying] = useState({ trackId: "", playing: false });

  // utiliza id acima para pegar os dados da faixa que vai ser tocada
  const trackFound = musics.items.find((m) => m.id === isPlaying.trackId);

  //musica selecionada para o player
  const currentTrack = trackFound 
    && { ...trackFound, isPlaying: isPlaying.playing } ;

  const [selectedTrack, setSelectedTrack] = useState<Track>();

  const handlePlaying = (id: string) => {
    if (isPlaying.trackId === id) {
        // toggle play/pause for the same id
        setIsPlaying({ trackId: id, playing: !isPlaying.playing });
    } else {
        // switch to new id and play
        setIsPlaying({ trackId: id, playing: true });
    }
  };
  // 7 musicas para o inicial e 3 para musicas curtidas
  // https://api.deezer.com/track/{id}/related

  const fetchSimilarMusics = ()=>{
    // vai buscar as musicas
    //vai dar adc ao array

    // dados ficticios
    return {}
  }

  useEffect(()=>{
    //colocar o fetch similar musicc aqui dentro tb
    //toda vez que mudar a msucia selecionada ele atualiza as msuicas mostradas
    console.log("MUSICA SELECIONADA NA PESQUISA:",selectedTrack);
  },[selectedTrack])

  //me orienta para saber oq ta tocando e qual estar
  useEffect(()=>{
    console.log("STATE ATUALIZADO:", isPlaying);
    console.log("TRACK ATUAL:", currentTrack);
  },[isPlaying.playing,currentTrack?.id]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col container lg:max-w-[70vw] w-full min-h-screen lg:p-20 p-10 gap-2">
        <header className="flex flex-col justify-center items-center gap-1">
            <SearchBar BASE_URL={BASE_URL} setSelectedTrack={setSelectedTrack}/>
            <div className="flex max-w-[80%] w-full ">
              <h2>Musica selecionada</h2>
              {/* card da musica selecionada */}
              <div className="w-full bg-black text-white">
                <div className="img-card">
                  <img      
                  src={selectedTrack?.album?.cover}
                  className="w-full h-full object-cover"
                  alt={selectedTrack?.title} />
                </div>
                <div className="description">
                  <h3 className="text">Leao</h3>
                  <p>Marilia Mendonca</p>
                </div>
              </div>
            </div>
        </header>
        <main>
          <Musics handlePlaying={handlePlaying} isPlaying={isPlaying} musics={musics}/>
        </main>
      </div>
    <MusicPlayerPopup handlePlaying={handlePlaying} currentTrack={currentTrack} />
    <ReportInput/>
    </div>
  );
}
