'use client'
import Header from "@/components/header";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "@/components/hero";
import { useEffect, useState } from "react";
import About from "@/components/about";
import Technology from "@/components/tech";
import Projects from "@/components/projects";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';


import './style.css';
import Introduction from "@/components/introduction";
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [language, setLanguage] = useState<"pt" | "en">("pt")
  const calcIndex= (index:number,direction:string)=>{
    if(direction=="right" && index<2){
      console.log(index,direction);
      setCurrentIndex(index+=1);
    }    
    if(direction=="left" && index>0){
      console.log(index,direction);
      setCurrentIndex(index-=1);
    }

  }
  useEffect(() => {
    AOS.init({
      easing: "ease",
      duration: 400,
      delay: 0,
    });
  }, []);
  return (
    <div className="flex flex-col w-full max-md:gap-y-10 overflow-hidden">

      {/* home */}
      <div className="p-5 lg:p-8">
        <Header language={language} setLanguage={setLanguage} />
        <Hero/>
      </div>

      <div className="p-5 lg:p-8">
        <Introduction/>
      </div>
      {/* about/projects/ tecnologias */}
      <div className="flex"  id="about">
          <Swiper
          initialSlide={1}//segundo slide
          navigation={true}
          modules={[Navigation]}
            style={{
              "--swiper-navigation-size": "25px",
            }}
          >
            <SwiperSlide  className="overflown-hidden min-w-screen">            
                <Projects/>
            </SwiperSlide>
            <SwiperSlide className="overflown-hidden  min-w-screen p-5 lg:p-8">
                {/* CHECK e responsivo */}
                <About/>
                </SwiperSlide>
            <SwiperSlide className="overflown-hidden  min-w-screen">
                {/* CHECK E RESPONSIVO */}
                <Technology/>
            </SwiperSlide>
          </Swiper> 
      </div>

      {/* Porque fazer seu projeto comigo */}s

      {/* Contato */}
      
    </div>
  );
}
