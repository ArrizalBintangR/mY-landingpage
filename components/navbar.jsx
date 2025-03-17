'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import navbar from '../public/navbar.webp';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HoverNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const triggerRef = useRef(null);
  const navbarRef = useRef(null);

  // Set mounted flag when component mounts on client
  useEffect(() => {
    setIsMounted(true);

    // Check URL hash on initial load
    if (window.location.hash) {
      const initialSection = window.location.hash.substring(1);
      if (['home', 'about', 'techstacks', 'projects'].includes(initialSection)) {
        setActiveSection(initialSection);
      }
    }
  }, []);

  // Register both plugins
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
  }

  // Handle scroll to section
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();

    // Don't do anything if we're already on the section
    if (activeSection === sectionId) return;

    // Get target section
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    // Get the navbar-specific cloud element - if not present, create it
    let navCloud = document.getElementById('navbar-cloud');
    let navCloudContainer = document.getElementById('navbar-cloud-container');

    if (!navCloud) {
      // Create cloud container specific for navbar navigation
      navCloudContainer = document.createElement('div');
      navCloudContainer.className = 'fixed inset-0 w-full h-full z-[99999] pointer-events-none overflow-hidden';
      navCloudContainer.id = 'navbar-cloud-container';

      // Set this to ensure it's above all other elements
      navCloudContainer.style.isolation = 'isolate';
      document.body.appendChild(navCloudContainer);

      // Create cloud element
      navCloud = document.createElement('div');
      navCloud.className = 'absolute';
      navCloud.id = 'navbar-cloud';

      // Size to cover the entire screen
      const width = Math.max(window.innerWidth * 3.0, 2000);
      const height = Math.max(window.innerHeight * 3.0, 2000);

      // Create cloud image
      const cloudImg = document.createElement('img');
      cloudImg.src = '/cloudbox.png';
      cloudImg.alt = 'Cloud';
      cloudImg.className = 'w-full h-full object-contain';

      // Position the cloud
      navCloud.style.width = `${width}px`;
      navCloud.style.height = `${height}px`;
      navCloud.style.left = `${(window.innerWidth - width) / 2}px`;
      navCloud.style.display = 'none'; // Initially hidden
      navCloud.style.zIndex = '99999';

      navCloud.appendChild(cloudImg);
      navCloudContainer.appendChild(navCloud);
    }

    // Create the animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        // Update active section state
        setActiveSection(sectionId);

        // Update URL
        history.pushState({}, '', `#${sectionId}`);

        // Hide the cloud container when animation is complete
        if (navCloudContainer) {
          navCloudContainer.style.display = 'none';
        }
      }
    });

    // Show cloud container
    if (navCloudContainer) {
      timeline.set(navCloudContainer, { display: 'block' }, 0);

      // Re-append to ensure it's on top
      if (document.body.contains(navCloudContainer)) {
        document.body.removeChild(navCloudContainer);
      }
      document.body.appendChild(navCloudContainer);

      // Kill any existing animations
      gsap.killTweensOf(navCloudContainer);
      gsap.killTweensOf(navCloud);

      // Set initial state
      timeline.set(navCloudContainer, {
        display: 'block',
        zIndex: 2147483647
      }, 0);
    }

    // Reset cloud position and make it visible
    timeline.set(navCloud, {
      y: window.innerHeight * 1.2,
      opacity: 1,
      display: 'block'
    });

    // Animate cloud coming in from bottom
    timeline.to(navCloud, {
      y: -100,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Hold briefly at center
    timeline.to(navCloud, {
      opacity: 1,
      duration: 0.3
    });

    // Animate cloud leaving to top
    timeline.to(navCloud, {
      y: -window.innerHeight * 3.5,
      opacity: 1,
      duration: 0.6,
      ease: "power2.in"
    });

    // Scroll to the section - this happens as the cloud is leaving
    timeline.to(window, {
      scrollTo: {
        y: targetSection,
        offsetY: 0
      },
      duration: 0.1,
      ease: "power1.inOut"
    }, "-=0.01");
  };

  // Add this to your component
  useEffect(() => {
    // Cleanup function to remove navbar cloud elements when component unmounts
    return () => {
      const navCloud = document.getElementById('navbar-cloud');
      const navCloudContainer = document.getElementById('navbar-cloud-container');

      if (navCloud && navCloud.parentNode) {
        navCloud.parentNode.removeChild(navCloud);
      }

      if (navCloudContainer && navCloudContainer.parentNode) {
        navCloudContainer.parentNode.removeChild(navCloudContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Simple handler for active section changes
    const handleActiveSectionChange = (e) => {
      if (e.detail) {
        console.log(`Navbar updating active section: ${e.detail}`);
        setActiveSection(e.detail);
      }
    };

    // Check URL hash on initial load
    const checkInitialHash = () => {
      if (window.location.hash) {
        const initialSection = window.location.hash.substring(1);
        if (['home', 'about', 'techstacks', 'projects'].includes(initialSection)) {
          setActiveSection(initialSection);
        }
      }
    };

    // Run initial hash check
    checkInitialHash();

    // Listen for section change events
    window.addEventListener('activeSection', handleActiveSectionChange);

    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && ['home', 'about', 'techstacks', 'projects'].includes(hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('activeSection', handleActiveSectionChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isMounted]);

  // Handle manual hover events
  const handleMouseEnter = () => setIsVisible(true);

  const handleMouseLeave = () => {
    if (isMounted && triggerRef.current && navbarRef.current) {
      try {
        if (!triggerRef.current.matches(':hover') && !navbarRef.current.matches(':hover')) {
          setIsVisible(false);
        }
      } catch (e) {
        console.error("Error in handleMouseLeave:", e);
      }
    }
  };

  useEffect(() => {
    if (!isMounted) return;

    const checkMousePosition = (e) => {
      if (e.clientY <= 50) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mousemove', checkMousePosition);

    return () => {
      document.removeEventListener('mousemove', checkMousePosition);
    };
  }, [isMounted]);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <>
      {/* A thin strip at the top that triggers the navbar */}
      <div
        ref={triggerRef}
        className="fixed top-20 left-0 w-full h-20 z-50 pointer-events-auto opacity-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* The actual navbar with wobbly animation */}
      <div
        ref={navbarRef}
        className={`navbar-container ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-center">
          <nav className="relative">
            {/* Your custom navbar image */}
            <div className="relative">
              <Image
                src={navbar}
                alt="Navigation bar"
                width={500}
                height={60}
                className="opacity-95"
                priority
              />

              {/* Navigation links positioned over the image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ul className="flex justify-between items-center w-3/4 px-4 mx-auto">
                  <li className="px-4">
                    <a
                      href="#home"
                      onClick={(e) => scrollToSection(e, 'home')}
                      className={`font-main text-black hover:underline transition py-1 font-semibold text-sm ${activeSection === 'home' ? 'underline font-bold' : ''
                        }`}
                    >
                      Home
                    </a>
                  </li>
                  <li className="px-4">
                    <a
                      href="#about"
                      onClick={(e) => scrollToSection(e, 'about')}
                      className={`font-main text-black hover:underline transition py-1 font-semibold text-sm ${activeSection === 'about' ? 'underline font-bold' : ''
                        }`}
                    >
                      About
                    </a>
                  </li>
                  <li className="px-4">
                    <a
                      href="#techstacks"
                      onClick={(e) => scrollToSection(e, 'techstacks')}
                      className={`font-main text-black hover:underline transition py-1 font-semibold text-sm ${activeSection === 'techstacks' ? 'underline font-bold' : ''
                        }`}
                    >
                      Tech Stacks
                    </a>
                  </li>
                  <li className="px-4">
                    <a
                      href="#projects"
                      onClick={(e) => scrollToSection(e, 'projects')}
                      className={`font-main text-black hover:underline transition py-1 font-semibold text-sm ${activeSection === 'projects' ? 'underline font-bold' : ''
                        }`}
                    >
                      Projects
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HoverNavbar;
