import { FaPause, FaPlay } from "react-icons/fa";
import "./style.css";
import { MdVolumeUp } from "react-icons/md";
import { PlayProps } from "@/types";
import { useRef, useState } from "react";




export default function MusicPlayerPopup({handlePlaying,currentTrack,audioRef}: PlayProps) {
  if (!currentTrack) return null;
  const [currentTime,setCurrentTime] = useState<number>(0)
  const [duration,setDuration] = useState<number>(0)

  
  return (
    <div className="musicPlayerPopup text-white fixed flex flex-col gap-3 bg-black/20 backdrop-blur-sm p-4 rounded-2xl bottom-2 left-2 max-w-[40vw] lg:max-w-[25vw] w-full h-auto z-15">
      <audio 
      autoPlay
        ref={audioRef}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current?.currentTime || 0);
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current?.duration || 0);
        }}
        onEnded={()=>{
          setCurrentTime(0);
          handlePlaying(currentTrack.id);
        }}
      />
      <div className="flex max-md:flex-col gap-3 w-full">
        <div className="w-full md:w-16 md:h-16 shrink-0">
          <img
            src={currentTrack.album.cover_xl}
            className="w-full h-full object-cover rounded-xl"
            alt={currentTrack.title}
          />
        </div>


        <div className="flex flex-col overflow-hidden player-description">
          <h3 className="truncate">
            {currentTrack.title}
          </h3>
          <p className="text-sm opacity-80 truncate">
            {currentTrack.artist.name}
          </p>
        </div>
      </div>

      <div className="w-full">
          <div className="flex justify-between text-xs opacity-70">
            <span>0:{currentTime.toFixed(0)||0}</span>
            <span>0:{duration.toFixed(0)||0}</span>
          </div>
          <div 
            className="progress-bar" 
            style={{"--current-time":currentTime,"--duration":duration}as any}/>
      </div>

      <div className="w-full flex">
        <div onClick={()=>handlePlaying(currentTrack.id)} className=" w-[50%] flex justify-start">
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

