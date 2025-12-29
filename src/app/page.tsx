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
import ContactPopup from "@/components/contactPopup";
import ScrollPage from "@/components/scroll/scroll";
import ThreeGallery from "@/components/gallery";
import ContactSection from "@/components/contactSection";

import Footer from "@/components/footer";
export default function Home() {
  const [callPopup, setCallPopup] = useState<boolean>(false);
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  useEffect(() => {
    AOS.init({
      easing: "ease",
      duration: 400,
      delay: 0,
    });
  }, []);
  return (
    // flex flex-col w-full max-md:gap-y-10 overflow-hidden
    <div className="flex flex-col w-full max-md:gap-y-10">

      {/* home */}
      <div className=" p-5 lg:p-8" id="home">
        {/* CHECK e responsivo */}
        <Header language={language} setLanguage={setLanguage} />

        {/* CHECK e responsivo */}
        <Hero setCallPopup={setCallPopup} />
      </div>

      <div className="p-5 lg:p-8" id="introduction">
        <Introduction />
      </div>

      {/* about/projects/ tecnologias */}
      <div className="flex" id="about">
        <Swiper
          initialSlide={1}//segundo slide
          navigation={true}
          modules={[Navigation]}
          style={{
            "--swiper-navigation-size": "25px",
          }}
        >
          <SwiperSlide className="overflown-hidden min-w-screen">
            {/* CHECK e responsivo */}
            <Projects />
          </SwiperSlide>
          <SwiperSlide className="overflown-hidden  min-w-screen p-5 lg:p-8">
            {/* CHECK e responsivo */}
            <About />
          </SwiperSlide>
          <SwiperSlide className="overflown-hidden  min-w-screen">
            {/* CHECK E RESPONSIVO */}
            <Technology />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-full min-h-screen relative">
        <ScrollPage />
      </div>

      {/* Contato */}
      <div id="contact">
        <ContactSection/>
      </div>

      <div>
        <Footer />
      </div>
      {/* contactPopup */}
      {callPopup && (<ContactPopup setCallPopup={setCallPopup} />)}
    </div>
  );
}
