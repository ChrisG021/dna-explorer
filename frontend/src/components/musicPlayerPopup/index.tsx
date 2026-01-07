import { FaPause, FaPlay } from "react-icons/fa";
import "./style.css";
import { MdVolumeUp } from "react-icons/md";

interface PlayProps {
  handlePlaying: (id:string) => void;
  currentTrack?: Track;
}

interface Track {
    id: string; 
    name: string; 
    duration_ms: number; 
    popularity: number; 
    explicit: boolean; 
    album: { id: string; 
      name: string; 
      release_date: string; 
      images: { url: string }[]; }; 
    artists: { id: string; name: string }[]; 
    isPlaying:boolean
}

export default function MusicPlayerPopup({handlePlaying,currentTrack,}: PlayProps) {
  if (!currentTrack) return null;
  
  return (
    <div className="musicPlayerPopup text-white fixed flex flex-col gap-3 bg-black/60 backdrop-blur-sm p-4 rounded-2xl bottom-2 left-2 max-w-[40vw] lg:max-w-[25vw] w-full h-auto z-15">
      
      <div className="flex max-md:flex-col gap-3 w-full">
        <div className="w-full md:w-18 md:h-18 ">
          <img
            src={currentTrack.album.images[0].url}
            className="w-full h-full object-cover rounded-xl"
            alt={currentTrack.name}
          />
        </div>

        <div className="flex flex-col overflow-hidden player-description">
          <h3 className="truncate">
            {currentTrack.name}
          </h3>
          <p className="text-sm opacity-80 truncate">
            {currentTrack.artists[0].name}
          </p>
        </div>
      </div>

      <div className="w-full">
          <div className="flex justify-between text-xs opacity-70">
            <span>1:50</span>
            <span>3:30</span>
          </div>
          <div className="progress-bar" />
      </div>

      <div className="w-full flex">
        <div onClick={()=>handlePlaying(currentTrack.id)} className=" w-[50%] flex justify-center">
          <button className=" text-white text-xl cursor-pointer">
        {currentTrack.isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
          </button>
        </div>

        <div className="w-[50%] flex justify-end text-white text-xl ">
          <MdVolumeUp />
        </div>
      </div>

      
    </div>
  );
}

