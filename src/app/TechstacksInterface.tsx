"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Background from "../../components/background";
import wrapText from "./utils/textwiggler";

import cloud2 from "../../public/cloud2.webp";
import plane2 from "../../public/plane2.webp";

// Tech Stack Assets
import html from "../../public/tech_logo/html.webp";
import css from "../../public/tech_logo/css.webp";
import javascript from "../../public/tech_logo/javascript.webp";
import react from "../../public/tech_logo/react.webp";
import nodejs from "../../public/tech_logo/nodejs.webp";
import github from "../../public/tech_logo/github.webp";
import python from "../../public/tech_logo/python.webp";
import aws from "../../public/tech_logo/aws.webp";
import gcp from "../../public/tech_logo/gcp.webp";
import flutter from "../../public/tech_logo/flutter.webp";
import odoo from "../../public/tech_logo/odoo.webp";
import tailwindcss from "../../public/tech_logo/tailwindcss.webp";
import nextjs from "../../public/tech_logo/nextjs.webp";

export default function TechStack() {
  const techStackAssets = useMemo(() => [
    { src: html, alt: "HTML" },
    { src: css, alt: "CSS" },
    { src: javascript, alt: "JavaScript" },
    { src: react, alt: "React" },
    { src: nodejs, alt: "Node.js" },
    { src: nextjs, alt: "Next.js" },
    { src: python, alt: "Python" },
    { src: github, alt: "Github" },
    { src: aws, alt: "AWS" },
    { src: gcp, alt: "Google Cloud" },
    { src: flutter, alt: "Flutter" },
    { src: tailwindcss, alt: "Tailwind CSS" },
    { src: odoo, alt: "Odoo" },
  ], []);

  // State to control hover behavior
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center text-center text-gray-800 h-screen z-10 p-8 overflow-hidden">
      <h2 className="text-3xl font-bold mb-8 headline">{wrapText("My Tech Stacks")}</h2>
      {/* First Cloud - Sticks to Left Bezel, Moved Nearer */}
      <Image
        src={cloud2}
        alt="Clouds"
        className="absolute top-[34vh] w-96 h-96 object-cover z-20 -rotate-90 sm:left-[calc(50%-32rem-10rem)] left-[calc(50%-32rem-6rem)]"
        priority={true}
      />

      {/* Second Cloud - Sticks to Right Bezel, Moved Nearer */}
      <Image
        src={cloud2}
        alt="Clouds"
        className="absolute top-[32vh] w-96 h-96 object-cover z-20 rotate-90 sm:right-[calc(50%-32rem-10rem)] right-[calc(50%-32rem-6rem)]"
        priority={true}
      />

      {/* Single Carousel Container */}
      <div className="relative w-full max-w-4xl bg-white p-6 rounded-xl shadow-md overflow-hidden">
        {/* Background - Behind Both Marquees */}
        <Background className="absolute inset-0 w-full h-full opacity-10 z-0 object-cover" />

        {/* First Marquee */}
        <Marquee
          speed={15}
          gradient={false}
          pauseOnHover={isHovered}
          className="display-flex relative z-10 overflow-hidden mb-4"
        >
          {techStackAssets.slice(0, 7).map((asset, index) => (
            <div
              key={index}
              className={`mx-8 w-28 h-28 flex items-center justify-center overflow-hidden ${index % 2 === 0 ? "img-wiggle-left-right" : "img-wiggle-right-left"
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image src={asset.src} alt={asset.alt} loading="lazy" width={96} height={96} className="w-24 h-24 object-contain" />
            </div>
          ))}
        </Marquee>

        {/* Second Marquee - On a New Line */}
        <Marquee
          speed={15}
          gradient={false}
          direction="right"
          pauseOnHover={isHovered}
          className="display-flex relative z-10 overflow-hidden"
        >
          {techStackAssets.slice(7).map((asset, index) => (
            <div
              key={index}
              className={`mx-8 w-28 h-28 flex items-center justify-center overflow-hidden ${index % 2 === 0 ? "img-wiggle-left-right" : "img-wiggle-right-left"
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image src={asset.src} alt={asset.alt} loading="lazy" width={96} height={96} className="w-32 h-32 object-contain" />
            </div>
          ))}
        </Marquee>
      </div>

            {/* Plane with stutter animation - positioned below carousel */}
            <div className="absolute bottom-[2vh] left-0 w-[20vw] md:w-[10vw] h-[20vh] md:h-[25vh] animate-stutter-fly2">
          <Image
            src={plane2}
            alt="Flying Plane"
            width={75}
            height={75}
            className="w-full h-full object-contain"
          />
      </div>
    </div>
  );
}
