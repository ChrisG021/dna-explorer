

//tipagens

import React from "react";

export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: "artist";
}
export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: "album";
}


export interface Track {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: "track";
}

export interface SearchResponse {
  data: Track[];
  total: number;
  next?: string;
}
export interface MusicAdd{
    id_music:number,
    name_music:string
}

//props 
export interface searchProp{
  BASE_URL:string;
  fetchSimilarMusics:(music:Track,quantity:number)=>void;
  //tipagem para a funcao que poem valor no useState no caso com valor track or undefined
  setSelectedTrack:React.Dispatch<React.SetStateAction<Track | undefined>>;
}

export interface musicProps{
    handlePlaying:(id:number)=>void,
    isPlaying: {
        trackId:number,
        playing:boolean
    },
    handleAddMusics:(id:number,name:string,music:Track)=>void;
    handleLikedMusics:(id:number,music:Track)=>void;
    likedMusics:number[];
    addedMusics:MusicAdd[];
    musics:Array<Track>
}
export interface PlayProps {
  handlePlaying: (id:number) => void;
  audioRef:React.RefObject<HTMLAudioElement|null>
  currentTrack?: any;
}
