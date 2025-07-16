import Image from "next/image";
import wrapText from "./utils/textwiggler";
import cloud1 from "../../public/cloud1.webp";

export default function About() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-gray-800 z-10 p-4 sm:p-8">
      {/* Cloud 1 above the About text */}
      <div className="absolute lg:top-[-8%] max-sm:top-[-15%] max-sm:left-[-5%] sm:left-[15%] md:left-[20%] lg:left-[5%] transform -translate-x-1/2 opacity-90 animate-cloud-inbetween-move w-[230px] sm:w-[280px] md:w-[350px] lg:w-[500px] z-0">
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
      <div className="flex flex-col md:flex-row items-center md:justify-center w-full max-w-4xl space-y-4 md:space-y-0 md:space-x-8 relative z-10">
        <div className="md:w-1/4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-0 headline">{wrapText("Who Am I?")}</h2>
          <div className="mt-4 md:mt-0 md:ml-[0.3em]">
            <a href="/cv.pdf" download>
              <button className="text-lg sm:text-xl bg-white hover:bg-black opacity-0 hover:opacity-100 text-white font-bold py-1 px-2 rounded">
                Download CV
              </button>
            </a>
          </div>
        </div>
        <div className="md:w-3/4">
          <p className="text-base sm:text-lg md:text-2xl font-explanation">
            Selamat Datang ! I&apos;m a passionate tech geek and (graduated) computer science student, with a keen interest in cloud computing, software engineering, Web3 and cryptocurrency. My favorite work lies on doing something that works perfectly behind the scenes, creating and maintaining a scalable system that are resilient, secure, and efficient.
            <br /><br />
            I’m currently exploring new opportunities and focusing on growing my skills and portfolio. Applying for jobs and taking on projects that challenge me to learn and improve are my top priorities right now. I&apos;m looking forward for professional growth and teams where I can make a meaningful impact.
          </p>
        </div>
      </div>
    </div>
  )
}
