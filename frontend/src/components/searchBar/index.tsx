import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css"
import axios from "axios";
import { searchProp, SearchResponse, Track } from "@/types";
import { showToast } from "../toast";

//NOTA MENTAL: lembrar de antes de utilizar o toast , tem quue haver o ToastContainer
//esta captando os dados e guardando o dados da pesquisa CHECK
export default function SearchBar({BASE_URL,setSelectedTrack,fetchSimilarMusics}:searchProp){
  const [loading, setLoading] = useState(false);
  const [bar,setBar] = useState(false);
  const [resultData,setResultData] = useState<SearchResponse>();
  const [searchData,setSearchData] = useState<string>("");
  
  const handleKeyDown = (e:any) => {
    // vai enviar para o llm os dados de pesquisa
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async() => {
    setLoading(true);
    try{

      if (!searchData.trim()) {
        showToast("info", "Digite algo para pesquisar");
        setLoading(false);
        return;
      }

      const response = (await axios.get(`${BASE_URL}/deezer/search/track?q=${searchData}&strict=on&order=RANKING`)).data;

      setResultData(response);
      setLoading(false);
      setBar(true);

    }catch (e){
      console.error(e);
      showToast("error","OPS! Houve um erro no servidor");
      setLoading(false);
    }
  };

  const handleBar =(music:Track)=>{
    fetchSimilarMusics(music,7);
    setSelectedTrack(music);
    setBar(false);
  }
  
  const showResults = ()=>{
    //array de resultados...
    return(
      <>
        {loading?(
          <div className="loading w-full absolute top-13 left-0 z-10 p-2.5 bg-(--background-primary) border border-white/10 results-container">
            <p>Buscando</p>
            <div className="loader">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        ):(
          <div className={`w-full absolute top-11 left-0 results-wrapper z-10 ${bar?"show":"none"}`}>
            <ul className="bg-(--background-primary) border border-white/10 results-container">
                {resultData?.data?.map((music) => (
                  <li
                    key={music.id}
                    className="results-item"
                    onClick={()=>handleBar(music)}
                  >
                    <p>{music.title}</p>
                    <span>{music.artist.name}</span>
                  </li>
                ))}
            </ul>
          </div>
        )} 
      </>
    )
  }


  return(
    <>
      <div onKeyDown={handleKeyDown} className="w-full relative flex lg:w-[80%] px-6 py-2 rounded-xl bg-(--background-secondary) items-center gap-2">
        <input className="w-full outline-none text-white" value={searchData} onChange={(e)=>setSearchData(e.target.value)} type="text" placeholder="Qual nome da música?" />
        <div onClick={handleSearch} className="cursor-pointer text-white">
            <FaSearch/>
        </div>
          {showResults()}
      </div>
    </>
  );
}