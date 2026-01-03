import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar(){
    const [searchData,setSearchData] = useState<string>("");
    const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      alert(searchData);
    }
  };
    return(
        <div onKeyDown={handleKeyDown} className="flex lg:w-[80%] px-6 py-2 rounded-4xl bg-amber-50 items-center gap-2">
            <input className="w-full outline-none" value={searchData} onChange={(e)=>setSearchData(e.target.value)} type="search" placeholder="Qual nome da música?" />
            <div onClick={()=>alert(searchData)}>
                <FaSearch/>
            </div>
        </div>
    );
}