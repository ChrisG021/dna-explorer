import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css"
import axios from "axios";
import { searchProp, SearchResponse, Track } from "@/types";


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
  // ta faltando o handle search
  const handleSearch = async() => {
    setBar(true);
    setLoading(true);
    try{
      const response = (await axios.get(`${BASE_URL}/deezer/search/track?q=${searchData}&strict=on&order=RANKING`)).data;
      setResultData(response);
      console.log(resultData);
      setLoading(false);
    }catch (e){
      console.error("LOG:"+e);
    }
  };

  

  const handleBar =(music:Track)=>{
    fetchSimilarMusics(music,7);
    setSelectedTrack(music);
    setBar(false);
  }
  
  const showResults = ()=>{
    // vai buscar os dados retornado do llm e expor aqui ate 3 resultados de acordo com oq foi digitado
    //array de resultados...
    //.map dele
    return(
        <>
          {loading?(
            <>
            <div className="loading">
              <p>Buscando</p>
              <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
              </div>
            </div>
            </>
          ):(
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

      <div className={`w-full absolute top-11 left-0 results-wrapper z-10 ${bar?"show":"none"}`}>
        {showResults()}
      </div>
    </div>
    </>
  );
}