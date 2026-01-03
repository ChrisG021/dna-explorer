'use client'
import SearchBar from "@/components/searchBar";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      <div className="container bg-red-300 lg:max-w-[70vw] w-full min-h-screen lg:p-20 p-10">
        <header className="flex justify-center items-center">
            <SearchBar/>
        </header>
        <main>

        </main>
      </div>
    </div>
  );
}
