import React from "react";
import { FaGithub, FaInstagram, FaLine } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import "./style.css"
import { CiGlobe } from "react-icons/ci";
import { HiOutlineBars3 } from "react-icons/hi2";
import Link from "next/link";

interface HeaderProps {
  language: "en" | "pt";
  setLanguage: React.Dispatch<React.SetStateAction<"en" | "pt">>;
}

export default function Header({language,setLanguage}:HeaderProps) {
    const toogleLanguage = (language: string) => {
        return language == "pt"?"en":"pt"
    }
    return (
        <nav className="flex justify-between  lg:h-[5vh]">
            <ul className="flex social-medias bounce-in-top">
                <Link href={""} className="social-medias-items  animate-e">
                    <FaInstagram className="social-medias-icons" />
                </Link>
                <Link href={"https://github.com/ChrisG021"} className="social-medias-items  animate-m">
                    <FaGithub className="social-medias-icons" />
                </Link>
                <Link href={"https://www.linkedin.com/in/christophe-gabriel-83b2a3248"} className="social-medias-items  animate-d">
                    <FaLinkedin className="social-medias-icons" />
                </Link>
            </ul>

            {/*  onClick={() => setLanguage(toogleLanguage(language))} */}
            <div className=" bounce-in-top flex language max-md:hidden">
                <div className="language-item">
                    <CiGlobe className="language-icon" />
                </div>
                <p className="language-text">{language}</p>

            </div>
        </nav>
    )
}