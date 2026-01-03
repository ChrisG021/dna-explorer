import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css"
//esta captando os dados e guardando o dados da pesquisa
export default function SearchBar(){
    const [results,setResults] = useState<boolean>(false);
    const [searchData,setSearchData] = useState<string>("");
    const handleKeyDown = (e:any) => {
      // vai enviar para o llm os dados de pesquisa
      if (e.key === 'Enter') {
        alert(searchData);
      }
    };
    const showResults = ()=>{
      // vai buscar os dados retornado do llm e expor aqui ate 3 resultados de acordo com oq foi digitado
      //array de resultados...
      //.map dele
      return(
          <ul className="bg-(--background-secondary) results-container">
            <li onClick={()=>setResults(false)}className="results-item">
              <p>Nome da musica</p>
              <span> cantor</span>
            </li>
            <li className="results-item">
              <p>Nome da musica</p>
              <span> cantor</span>
            </li>
            <li className="results-item">
              <p>Nome da musica</p>
              <span> cantor</span>
            </li>
          </ul>
      )
    }
    return(
      <div onKeyDown={handleKeyDown} className="w-full relative flex lg:w-[80%] px-6 py-2 rounded-xl bg-(--background-secondary) items-center gap-2">
        <input className="w-full outline-none" value={searchData} onChange={(e)=>setSearchData(e.target.value)} type="search" placeholder="Qual nome da música?" />
        <div onClick={()=>setResults(true)} className="cursor-pointer">
            <FaSearch/>
        </div>

        <div className={`w-full absolute top-11 left-0 results-wrapper ${results?"show":"none"}`}>
          {showResults()}
        </div>
      </div>

    );
}