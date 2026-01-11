'use client'
import ReportInput from "@/components/generateReport";
import MusicPlayerPopup from "@/components/musicPlayerPopup";
import Musics from "@/components/musics";
import SearchBar from "@/components/searchBar";
import { MusicAdd, Track } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
export default function app() {
  const BASE_URL = "http://localhost:8000/api";
  const [similarMusics,setSimilarMusics] = useState<Track[]>([])
  const [addedMusics,setAddedMusics] = useState<Array<MusicAdd>>([])
  const [likedMusics,setLikedMusics] = useState<Array<number>>([])
  const MAX = 7;
  let tracks:Track[] = [];
  
  // grava qual id e utilizo para o toggle
  const [isPlaying, setIsPlaying] = useState({ trackId:0, playing: false });

  // utiliza id acima para pegar os dados da faixa que vai ser tocada
  const trackFound = similarMusics.find((m) => m.id === isPlaying.trackId);
  const [selectedTrack, setSelectedTrack] = useState<Track>();

  //musica selecionada para o player
  const currentTrack = trackFound && { ...trackFound, isPlaying: isPlaying.playing };
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handlePlaying = (id: number) => {
    if (isPlaying.trackId === id) {
      // toggle play/pause for the same id
      setIsPlaying({ trackId: id, playing: !isPlaying.playing });
      if(isPlaying.playing){
        audioRef.current?.pause();
      }else{
        audioRef.current?.play();
      }

    } else {
      // switch to new id and play
      audioRef.current?.pause();
      // audioRef?.current.currentTime = 0;

      setIsPlaying({ trackId: id, playing: true });
      audioRef.current?.play();
    }
  };

  const handleAddMusics = (id: number, name: string,music:Track) => {
    // Verifica se a música já existe
    const exist = addedMusics.some(m => m.id_music === id);
    const isFull = addedMusics.length >= MAX;

    if (!exist && !isFull) {
      //pega o conteudo que ja ta e so adc um novo e tb 
      setAddedMusics(prev => [...prev, { id_music: id, name_music: name }]);
      handleLikedMusics(id,music);
      console.log("LOG:musica com id ("+id+") foi adicionado");       
        
    } else if(exist){
      //vai fazer uma filtragem e retirar do array aquele que for igual a esse id
      console.log("LOG:musica com id ("+id+") sendo retirada");          
      setAddedMusics(prev => prev.filter(m => m.id_music !== id));

    } else if (isFull) {
      console.warn("Limite máximo de músicas atingido");
    }
  };

  const handleLikedMusics = (id:number,music:Track)=>{
      const exist = likedMusics.some(i => i === id);
      if(!exist){
          setLikedMusics(prev =>[...prev,id])
          fetchSimilarMusics(music,3)
          console.log("LOG:musica com id ("+id+") foi curtido");       
      }else {
          console.log("LOG:musica com id ("+id+") retirando curtida");          
          setLikedMusics(prev => prev.filter(i => i !== id));
      }
  }
  // 7 musicas para o inicial e 3 para musicas curtidas

  const fetchSimilarMusics = async (music:Track,quantity:number)=>{
    /*
      Funcao busca musicas similares tendo como base 
      music-> musica que serve como parametro ppara geracaco de musicas similares
      quantity-> quantidade de musicas que serão geradas
      ps: TODAS as musicas geradas passam por um filtro apartir das musicas que foram curtidas e que estao sendo exibidas para evitar repeticoes

    */
  
    if(quantity == 7){
      setLikedMusics([])
      //musicas sem tratamento algum
      tracks = []
      //musicas a serem exibidas apos serem tratadas
      setSimilarMusics([])
    }
    //busca as top 30 musicas do radio do artista da musica pesquisa, nesse radio tem tanto musicas dele como tb semelhante em genero
    const response = (await axios.get(BASE_URL+"/artist/"+music.artist.id+"/radio&order=RANKING&limit=30")).data;

    let index = 0;
    while(tracks.length < quantity){
      const exist = likedMusics.some(i => i === response.data[index].id) || similarMusics.some((music)=> music.id === response.data[index].id);
        //filtra pra saber se ja foi curtido ou se ja esta sendo exibido
      // ta passando direto pelo fiultro
      if(!exist){
        console.log("buscando id no array liked music\nresultado: ",exist);
        tracks.push(response.data[index]);
      }else{
        console.log("LOG: Retirando musica repetida",response.data[index]);
      }
      index+=1;
    }

    setSimilarMusics(prev=> [...prev,...tracks]);

  }

  //atualiza a instancia do audioTag com base na mudanca de valor do currentTrack
  useEffect(()=>{
    if(!currentTrack?.preview) return;
    if(!audioRef.current){
      //liga 
      audioRef.current = new Audio(currentTrack.preview);
      audioRef.current.volume = 0.2;//nots working
      // n resolvi o b.o que ele n inicia direto a musica
    }else{
      audioRef.current.src = currentTrack.preview;
    }
  },[currentTrack?.id])

  useEffect(()=>{
    //toda vez que mudar a musica selecionada ele atualiza as musicas mostradas
    console.log("MUSICA SELECIONADA NA PESQUISA:",selectedTrack);
    console.log("SIMILAR MUSICS ARRAY",similarMusics);

  },[selectedTrack,similarMusics])

  //me orienta para saber oq ta tocando e qual estar
  useEffect(()=>{
    console.log("STATE ATUALIZADO:", isPlaying);
    console.log("TRACK ATUAL:", currentTrack);
  },[isPlaying.playing,currentTrack?.id]);


  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col container lg:max-w-[70vw] w-full min-h-screen lg:p-20 p-10 gap-10">
        <header className="flex flex-col justify-center items-center gap-1">
            <SearchBar BASE_URL={BASE_URL} setSelectedTrack={setSelectedTrack} fetchSimilarMusics={fetchSimilarMusics}/>
            {selectedTrack&&(
              <div className="flex flex-row justify-center items-center gap-5 mt-5 md:max-w-[80%] w-full text-white ">
                <div className="flex flex-row items-center gap-4 bg-gray-800/80 p-4 rounded-2xl w-full md:max-w-xl">
                  
                  <div className="shrink-0 w-10 md:w-16 h-15 md:h-18 overflow-hidden rounded-lg bg-white">
                    <img
                      src={selectedTrack?.album?.cover}
                      alt={selectedTrack?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-bold">{selectedTrack?.title}</h3>
                    <p className="text-sm ">{selectedTrack?.artist?.name}</p>
                  </div>

                </div>
              </div>
            )}
        </header>
        <main>
          <Musics addedMusics={addedMusics} handleAddMusics={handleAddMusics} handleLikedMusics={handleLikedMusics} likedMusics={likedMusics}  handlePlaying={handlePlaying} isPlaying={isPlaying} musics={similarMusics}/>
        </main>
      </div>
    <MusicPlayerPopup audioRef={audioRef} handlePlaying={handlePlaying} currentTrack={currentTrack} />
    <ReportInput/>
    </div>
  );
}
