import Image from "next/image";
import wrapText from "./utils/textwiggler";

import cloud1 from "../../public/cloud1.webp";


export default function About() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-gray-800 z-10 p-8">

      {/* Cloud 1 above the About text */}
      <div className="absolute top-[-15%] left-[25%] md:left-[20%] lg:left-[5%] transform -translate-x-1/2 opacity-90 animate-cloud-inbetween-move w-[250px] sm:w-[300px] md:w-[350px] lg:w-[500px]">
        <Image
          src={cloud1}
          alt="Cloud 1"
          quality={80}
          width={450}
          height={450}
          className="w-full h-auto object-contain"
          priority={true}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-center w-full max-w-4xl space-x-8">
        <div className="md:w-1/4 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 md:mb-0 headline">{wrapText("Who Am I?")}</h2>
          <div className="mt-4 md:mt-0 md:ml-[0.3em]">
            <button className="text-xl bg-white hover:bg-black opacity-0 hover:opacity-100 text-white font-bold py-1 px-2 rounded">
              Download CV
            </button>
          </div>
        </div>
        <div className="md:w-3/4">
          <p className="text-lg md:text-2xl font-explanation">
            Hello! I&apos;m a passionate tech geek and computer science student, with a keen interest in cloud computing, software engineering, and the dynamic world of Web3 and cryptocurrency. Always on the lookout for the latest tech trends, I&#39;m your go-to person for staying ahead of the curve.
            <br /><br />
            When not immersed in code or exploring new technological frontiers, I dream big. My ultimate goal is to create groundbreaking products that make a significant impact on people&#39;s lives. Whether it&#39;s a sleek new app or a revolutionary platform, I&#39;m dedicated to turn innovative ideas into reality.
          </p>
        </div>
      </div>
    </div>
  )
}
