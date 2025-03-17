import Image from "next/image";
import Background from "../../components/background";
import graybox2 from "../../public/graybox2new.webp";
import githubsmaller from "../../public/githubsmaller.webp";
import wrapText from "./utils/textwiggler";

import regather from "../../public/projects_image/regather.webp";
import gizisight from "../../public/projects_image/gizisight.webp";
import nirmalavitalis from "../../public/projects_image/nirmalavitalis.webp";

//Footer Assets
import trees from "../../public/trees.webp";
import grass from "../../public/grass.webp";
import flower1 from "../../public/flower1.webp";
import flower2 from "../../public/flower2.webp";
import logs from "../../public/logs.webp";
import gravel from "../../public/gravel.webp";
import fossil from "../../public/fossil.webp";
import gmail from "../../public/gmail.webp";
import x from "../../public/x.webp";
import linkedin from "../../public/linkedin.webp";


export default function Projects() {
  return (
    <div className="relative flex flex-col items-center justify-between text-gray-800 z-10 min-h-screen w-full">

      <div className="relative z-1 w-full flex-grow flex flex-col items-center">
        <div className="w-full p-8 flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-8 headline">{wrapText("Projects I've been on :D")}</h2>

          {/* Projects Grid */}
          <div className="flex flex-wrap justify-center gap-32 w-full max-w-7xl">
            {/* Project A */}
            <a
              href="https://github.com/HekatonWeb3/Regather"
              target="_blank"
              rel="noopener noreferrer"
              className="w-80 h-[30rem] bg-cover opacity-95 bg-center flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${graybox2.src})`, textDecoration: 'none' }}
            >
              <div className="flex-grow flex items-center justify-center">
                <Image
                  src={regather}
                  alt="Regather project"
                  width={220}
                  height={220}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative bg-white bg-opacity-95 p-6">
                <Background
                  className="absolute inset-0 opacity-100 z-0"
                  style={{ mixBlendMode: "color-burn", objectFit: "cover" }}
                />
                <div className="relative z-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 headline">Regather</h3>
                  <p className="text-sm text-gray-600 line-clamp-4 font-main">
                    Developed the backend services for a Decentralized Creative Collaborator Platform Built on top of Typescript and Motoko.
                  </p>
                </div>
              </div>
            </a>

            {/* Project B */}
            <a
              href="https://github.com/ArrizalBintangR/chatbot-capstone"
              target="_blank"
              rel="noopener noreferrer"
              className="w-80 h-[30rem] bg-cover opacity-95 bg-center flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${graybox2.src})`, textDecoration: 'none' }}
            >
              <div className="flex-grow flex items-center justify-center">
                <Image
                  src={nirmalavitalis}
                  alt="Nirmala Vitalis"
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative bg-white bg-opacity-95 p-6">
                <Background
                  className="absolute inset-0 opacity-100 z-0"
                  style={{ mixBlendMode: "color-burn", objectFit: "cover" }}
                />
                <div className="relative z-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 headline">Nirmala Vitalis</h3>
                  <p className="text-sm text-gray-600 line-clamp-4 font-main">
                    Designed a Highly Available and Scalable Chatbot using AWS Services, Implemented RAG with designated knowledge using Claude 3.5 Sonnet.
                  </p>
                </div>
              </div>
            </a>

            {/* Project C */}
            <a
              href="https://github.com/ArrizalBintangR/chatbot-capstone"
              target="_blank"
              rel="noopener noreferrer"
              className="w-80 h-[30rem] bg-cover opacity-95 bg-center flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
              style={{ backgroundImage: `url(${graybox2.src})`, textDecoration: 'none' }}
            >
              <div className="flex-grow flex items-center justify-center">
                <Image
                  src={gizisight}
                  alt="Gizisight"
                  width={110}
                  height={110}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative bg-white bg-opacity-95 p-6">
                <Background
                  className="absolute inset-0 opacity-100 z-0"
                  style={{ mixBlendMode: "color-burn", objectFit: "cover" }}
                />
                <div className="relative z-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 headline">GiziSight</h3>
                  <p className="text-sm text-gray-600 line-clamp-4 font-main">
                    Architected a Highly Available and Scalable Microservices Architecture for a Nutritionist Platform using GCP.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/* More Projects Button */}
          <a
            href="https://github.com/arrizalbintangr"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full max-w-xl mt-8 flex items-center justify-center bg-white py-2 px-4 rounded-full border-2 border-black overflow-hidden cursor-pointer"
          >
            <Background
              style={{ mixBlendMode: "darken", objectFit: "cover" }}
              className="absolute w-full h-96 opacity-25"
            />
            <div className="text-xl font-explanation text-black flex items-center">
              <p className="mt-2">{wrapText("MORE PROJECTS ON ")}</p>
              <Image src={githubsmaller} alt="GitHub logo" width={32} height={32} />
            </div>
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-grow min-h-[20vh]"></div>
      </div>

      {/* Footer Section - Now full width */}
      <div className="w-full relative z-2">
        {/* Decorative elements container */}
        <div className="relative w-full h-[150px]">
          <Image
            src={trees}
            alt="Trees image"
            className="absolute bottom-[-4.2vh] left-0 w-41 max-w-[250px] h-41 max-h-[250px] z-20"
            loading="lazy"
          />
          <Image
            src={grass}
            alt="Bush steps"
            className="absolute bottom-[-4vh] left-[23vw] w-[300px] h-[150px] z-20"
            loading="lazy"

          />
          <Image
            src={flower1}
            alt="mixed flowers 1"
            className="absolute bottom-[-3vh] left-[50vw] w-[100px] h-[50px] z-20"
            loading="lazy"

          />
          <Image
            src={flower2}
            alt="mixed flowers 2"
            className="absolute bottom-[-4vh] left-[60vw] w-[100px] h-[45px] z-20"
            loading="lazy"

          />
          <Image
            src={logs}
            alt="A log."
            className="absolute bottom-[-4vh] left-[80vw] w-[150px] h-[80px] z-20"
            loading="lazy"

          />
        </div>

        {/* Footer content */}
        <footer className="w-full">
          <div className="relative overflow-hidden bg-grass w-full h-10">
            <Background
              style={{ mixBlendMode: 'lighten', objectFit: 'cover' }}
              className="absolute w-full h-96 opacity-10"
            />
          </div>
          <div className="w-full h-2 bg-lightdirt"></div>
          <div className="w-full h-[40vh] bg-brown-800 flex flex-col justify-center overflow-hidden relative">
            <Background
              style={{ mixBlendMode: 'darken', objectFit: 'cover' }}
              className="absolute w-full h-96 opacity-10 z-0"
            />

            {/* Decorative underground elements */}
            <div className="absolute inset-0 z-[1] overflow-hidden">
              {/* Left side gravel cluster */}
              <Image
                src={gravel}
                alt="Small rocks"
                className="absolute top-[15%] left-[20%] w-[65px] h-auto opacity-40 rotate-12 transform scale-75 md:scale-100"
                loading="lazy"

              />
              <Image
                src={gravel}
                alt="Small rocks cluster"
                className="absolute bottom-[20%] left-[21%] w-[45px] h-auto opacity-30 -rotate-6 transform scale-75 md:scale-100"
              />

              {/* Center area - fossil */}
              <Image
                src={fossil}
                alt="Buried fossil"
                className="absolute bottom-[5%] left-[45%] w-[120px] h-auto opacity-20 -rotate-12 transform scale-75 md:scale-100"
                loading="lazy"
              />

              {/* Right side gravel */}
              <Image
                src={gravel}
                alt="Small rocks"
                className="absolute top-[20%] right-[15%] w-[55px] h-auto opacity-35 rotate-45 transform scale-75 md:scale-100 hidden sm:block"
                loading="lazy"
              />
              <Image
                src={gravel}
                alt="Small rocks cluster"
                className="absolute top-[50%] right-[5%] w-[80px] h-auto opacity-25 -rotate-12 transform scale-75 md:scale-100 hidden sm:block"
                loading="lazy"
              />
            </div>
            <div className="relative z-10 flex justify-center space-x-4 mb-2">
              <a href="mailto:arrizalbramadhan09@gmail.com">
                <Image src={gmail} alt="Gmail logo" width={32} height={32} />
              </a>
              <a href="https://www.linkedin.com/in/arrizalbintangramadhan/" className="hover:underline">
                <Image src={linkedin} alt="LinkedIn logo" width={32} height={32} />
              </a>
              <a href="https://x.com/arrizalrx">
                <Image src={x} alt="X logo" width={32} height={32} />
              </a>
            </div>
            <div className="relative z-10 text-center mb-2">
              <a href="#about" className="hover:underline footer-text">about</a> |
              <a href="#techstacks" className="hover:underline footer-text"> tech stack</a> |
              <a href="#projects" className="hover:underline footer-text"> projects</a> |
              <a href="/cv.pdf" className="hover:underline footer-text"> download cv</a>
            </div>
            <p className="relative z-10 text-sm footer-text text-center">Arrizal Bintang Ramadhan</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
