"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Background from "../../components/background";
import HoverNavbar from "../../components/navbar";
import LoadingScreen from "../../components/LoadingComponent";

import Main from "./Home";
import About from "./AboutInterface";
import TechStacks from "./TechstacksInterface";
import Projects from "./ProjectsInterface";

import { createCloudElements, setupCloudAnimations, setupSectionDetection } from "./utils/CloudAnimation";

// Register GSAP plugins for smooth scrolling
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const cloudRefs = useRef([]);
  const cloudContainerRef = useRef(null);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setAssetsLoaded(true);
  };

  // Create cloud elements
  useEffect(() => {
    if (!mounted || !assetsLoaded || typeof window === 'undefined') return;

    const { cloudContainer, cloudRefs: clouds } = createCloudElements();
    cloudContainerRef.current = cloudContainer;
    cloudRefs.current = clouds;

    return () => {
      if (cloudContainer) {
        cloudContainer.style.zIndex = '10';
        if (cloudContainerRef.current && document.body.contains(cloudContainerRef.current)) {
          document.body.removeChild(cloudContainerRef.current);
        }
      }
      cloudRefs.current = [];
    };
  }, [mounted, assetsLoaded]);

  // Setup cloud animations
  useEffect(() => {
    if (!mounted || !assetsLoaded || typeof window === 'undefined' || cloudRefs.current.length === 0) return;

    // Add a small delay to ensure sections are properly rendered
    const setupTimer = setTimeout(() => {
      console.log("Setting up cloud animations with", cloudRefs.current.length, "clouds");
      const cleanup = setupCloudAnimations(cloudRefs.current);
      return cleanup;
    }, 500);

    return () => {
      clearTimeout(setupTimer);
    };
  }, [mounted, assetsLoaded]);

  useEffect(() => {
    setMounted(true);

    // Set up section detection after assets are loaded
    if (typeof window !== 'undefined' && assetsLoaded) {
      // Clean up any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id && trigger.vars.id.startsWith('section-detection')) {
          trigger.kill();
        }
      });

      // Set up section detection with direct navbar update
      const cleanup = setupSectionDetection((sectionId) => {
        console.log(`Detected active section: ${sectionId}`);

        // Update URL hash without scrolling (for bookmarking)
        if (history.pushState && window.location.hash !== `#${sectionId}`) {
          history.pushState(null, '', `#${sectionId}`);
        }

        // Directly update the navbar via a simple custom event
        window.dispatchEvent(new CustomEvent('activeSection', {
          detail: sectionId
        }));
      });

      return cleanup;
    }
  }, [mounted, assetsLoaded]);

  // Prevent scrolling during loading
  useEffect(() => {
    if (!assetsLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [assetsLoaded]);

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />

      <div className={`relative overflow-x-hidden transition-opacity duration-500 ${!assetsLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <HoverNavbar />
        {/* Fixed background with continuous gradient */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#50B8E7] via-[#B9E2F5] to-[#EDF7FC]">
          <Background
            className="absolute inset-0 opacity-20 w-full h-full object-cover"
            style={{ mixBlendMode: "color-burn" }}
          />
        </div>

        {/* Content sections */}
        <div className="relative z-10">
          {/* Home Section */}
          <section id="home" className="section relative h-screen mb-[35rem]">
            <Main />
          </section>

          {/* About Section */}
          <section id="about" className="section relative min-h-screen mb-96">
            <About />
          </section>

          {/* Tech Stacks Section */}
          <section id="techstacks" className="section relative min-h-screen mb-[45rem]">
            <TechStacks />
          </section>

          {/* Projects Section */}
          <section id="projects" className="section relative min-h-screen">
            <Projects />
          </section>
        </div>
      </div>
    </>
  );
}
