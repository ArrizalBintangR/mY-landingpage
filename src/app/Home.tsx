import Image from "next/image";
import wrapText from "./utils/textwiggler";

import sun from "../../public/sun.webp";
import ray from "../../public/ray.webp";
import plane from "../../public/plane.webp";
import cloud3 from "../../public/cloud3.webp";


export default function mainPage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center text-gray-800 z-10">

      <div className="absolute w-[25vw] h-[25vw] md:w-[30vw] md:h-[30vw] left-[-6%] top-[-3%] z-10">
        <Image
          src={sun}
          alt="Sun"
          className="w-full h-full object-contain animate-sun-stiff-jittery"
          quality={80}
        />
        <div className="absolute inset-0 animate-stiff-jittery">
          <Image
            src={ray}
            alt="Ray"
            className="w-full h-full object-contain"
            quality={80}
          />
        </div>
      </div>

      {/* Cloud 3 */}
      <div className="absolute w-[50vw] h-[50vw] md:w-[25vw] md:h-[25vw] left-[60%] md:left-[80%] top-[30%] md:top-[20%] opacity-90 animate-cloud-rotate" style={{ transform: 'rotate(21.58deg)' }}>
        <Image
          src={cloud3}
          alt="Cloud 3"
          quality={80}
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-xl md:text-2xl font-main">
        {wrapText("Hi, I'm")}
      </h2>
      <h1 className="text-3xl md:text-5xl font-bold font-main">
        {wrapText("Arrizal Bintang Ramadhan")}
      </h1>
      <h3 className="text-lg md:text-3xl font-main">
        {wrapText("A Proud Software Engineer")}
      </h3>

      {/* Plane Animation */}
      <div className="absolute left-4 md:left-8 w-[20vw] md:w-[10vw] h-[20vw] md:h-[10vw] animate-stutter-fly"
        style={{ top: 'calc(50% + 6rem)' }}>  {/* Position relative to center + offset to place below text */}
        <Image
          src={plane}
          alt="Plane"
          quality={80}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
