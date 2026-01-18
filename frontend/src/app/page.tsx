'use client'
import ReportInput from "@/components/generateReport";
import MusicPlayerPopup from "@/components/musicPlayerPopup";
import Musics from "@/components/musics";
import SearchBar from "@/components/searchBar";
import { showToast } from "@/components/toast";
import { MusicAdd, Track } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
export default function app() {
  const BASE_URL = " https://dna-explorer.onrender.com/api";
  const [similarMusics,setSimilarMusics] = useState<Track[]>([]);
  const [addedMusics,setAddedMusics] = useState<Array<MusicAdd>>([]);
  const [likedMusics,setLikedMusics] = useState<Array<number>>([]);
  const [loadingMusics,setLoadingMusics]  = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track>();

  const MAX = 7;
  let tracks:Track[] = [];
  
  // grava qual id e utilizo para o toggle
  const [isPlaying, setIsPlaying] = useState({ trackId:0, playing: false });

  // utiliza id acima para pegar os dados da faixa que vai ser tocada
  const trackFound = similarMusics.find((m) => m.id === isPlaying.trackId);

  //musica selecionada para o player

  //ideia descartada
  //   if(!trackFound){
  //    currentTrack = selectedTrack && {...selectedTrack,isPlaying:isPlaying.playing};
  // }else{
  //    currentTrack = trackFound && { ...trackFound, isPlaying: isPlaying.playing };
  // }
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

  const handleAddMusics = (music:Track) => {
    // Verifica se a música já existe
    const exist = addedMusics.some(m => m.id_music === music.id);
    const isFull = addedMusics.length >= MAX;

    if (!exist && !isFull) {
      //pega o conteudo que ja ta e so adc um novo e tb 
      setAddedMusics(prev => [...prev, { id_music: music.id, name_music: music.title, artist:music.artist.name,img_url:music.album.cover_xl}]);
      handleLikedMusics(music.id,music);
      console.log("LOG:musica com id ("+music.id+") foi adicionado");       
        
    } else if(exist){
      //vai fazer uma filtragem e retirar do array aquele que for igual a esse id
      console.log("LOG:musica com id ("+music.id+") sendo retirada");          
      setAddedMusics(prev => prev.filter(m => m.id_music !== music.id));

    } else if (isFull) {
      showToast("warning","Limite máximo de 7 músicas ");
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
   setLoadingMusics(true)
   window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    try {
      if(quantity == 7){
        setLikedMusics([])
        //musicas sem tratamento algum
        tracks = []
        //musicas a serem exibidas apos serem tratadas
        setSimilarMusics([])
      }
      //busca as top 30 musicas do radio do artista da musica pesquisa, nesse radio tem tanto musicas dele como tb semelhante em genero
      const response = (await axios.get(BASE_URL+"/deezer/artist/"+music.artist.id+"/radio&order=RANKING&limit=30")).data;

      let index = 0;
      while(tracks.length < quantity){
        //filtro
        const exist = likedMusics.some(i => i === response.data[index].id) || similarMusics.some((music)=> music.id === response.data[index].id);

        if(!exist){
          console.log("LOG: buscando id no array liked music\nresultado: ",exist);
          tracks.push(response.data[index]);
        }else{
          console.log("LOG: Retirando musica repetida (",response.data[index],")");
        }
        index+=1;
      }

      setSimilarMusics(prev=> [...prev,...tracks]);
      setLoadingMusics(false);
    } catch (error) {
      showToast("error","Erro na busca de músicas similares");
      console.error(error)
    }
  }

  //atualiza a instancia do audioTag com base na mudanca de valor do currentTrack
  useEffect(()=>{
    if (!currentTrack?.preview) return;
    showToast("info","Carregando a musica")
    if (!audioRef.current) {
      const audio = new Audio();
      audio.volume = 0.5; 
      audio.src = currentTrack.preview;
      audioRef.current = audio;
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = currentTrack.preview;
      audioRef.current.volume = 0.5; 
    }
  },[currentTrack?.id])

  // useEffect(()=>{
  //   //toda vez que mudar a musica selecionada ele atualiza as musicas mostradas
  //   console.log("MUSICA SELECIONADA NA PESQUISA:",selectedTrack);
  //   console.log("SIMILAR MUSICS ARRAY",similarMusics);

  // },[selectedTrack,similarMusics])

  //Tracking para saber oq ta tocando e qual estar
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
                  
                  <div className="relative shrink-0 w-10 md:w-16 h-15 md:h-18 overflow-hidden rounded-lg bg-white">
                    {/* <div
                        onClick={() => handlePlaying(selectedTrack.id)}
                        className="absolute  hover:bg-black/30 hover:backdrop-blur-xs
                                transition-all ease-in
                                w-full h-full flex justify-center items-center group"
                    > */}
                        {/* quando id for igual ao da musica , eu coloco pra tocar ou pausar */}
                        {/* {isPlaying.trackId == selectedTrack.id && isPlaying.playing ? (
                        <button className="hidden group-hover:block text-white text-2xl">
                            <FaPause />
                        </button>
                        ) : (
                        <button className="hidden group-hover:block text-white text-2xl">
                            <FaPlay />
                        </button>
                        )}
                    </div> */}
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
          <Musics loadingMusics={loadingMusics} addedMusics={addedMusics} handleAddMusics={handleAddMusics} handleLikedMusics={handleLikedMusics} likedMusics={likedMusics}  handlePlaying={handlePlaying} isPlaying={isPlaying} musics={similarMusics}/>
          {loadingMusics&& similarMusics.length!=0&&(
            <div className="mt-7.5">
              <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          )}
        </main>
      </div>
    <MusicPlayerPopup audioRef={audioRef} handlePlaying={handlePlaying} currentTrack={currentTrack} />
    <ReportInput BASE_URL={BASE_URL} addedMusics={addedMusics}/>
    <ToastContainer/>
    </div>
  );

}
