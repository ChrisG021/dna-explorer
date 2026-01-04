'use client'
import Musics from "@/components/musics";
import SearchBar from "@/components/searchBar";

export default function Home() {
  const BASE_URL_SPOTIFY = `jejejejejejeje${process.env.NEXT_PUBLIC_API_KEY_SPOTIFY}`
  const fetchSimilarMusics = ()=>{
    // vai buscar as musicas
    //vai dar adc ao array

    // dados ficticios
    return {}
  }


  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col container lg:max-w-[70vw] w-full min-h-screen lg:p-20 p-10 gap-2">
        <header className="flex justify-center items-center">
            <SearchBar BASE_URL_SPOTIFY={BASE_URL_SPOTIFY}/>
        </header>
        <main>
          <Musics />
        </main>
      </div>
    </div>
  );
}
