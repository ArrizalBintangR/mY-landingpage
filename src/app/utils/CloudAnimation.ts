import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function createCloudElements() {
  // Remove any existing cloud elements first
  const existingCloud = document.getElementById('scroll-cloud');
  if (existingCloud && existingCloud.parentNode) {
    existingCloud.parentNode.removeChild(existingCloud);
  }

  const existingContainer = document.getElementById('cloud-container');
  if (existingContainer && existingContainer.parentNode) {
    existingContainer.parentNode.removeChild(existingContainer);
  }

  // Create cloud container with higher z-index
  const cloudContainer = document.createElement('div');
  cloudContainer.className = 'fixed inset-0 w-full h-full z-20 pointer-events-none overflow-hidden';
  cloudContainer.id = 'cloud-container';
  document.body.appendChild(cloudContainer);

  const cloudRefs = [];

  // Create a single large cloud that covers the screen
  const cloud = document.createElement('div');
  cloud.className = 'absolute';
  cloud.id = 'scroll-cloud';

  // Size EXTRA large to cover the entire screen with no gaps
  const width = Math.max(window.innerWidth * 3.0, 2000); // Increased width multiplier
  const height = Math.max(window.innerHeight * 3.0, 2000); // Increased height multiplier

  // Create an img element for the cloudbox.png
  const cloudImg = document.createElement('img');
  cloudImg.src = '/cloudbox.png';
  cloudImg.alt = 'Cloud';
  cloudImg.className = 'w-full h-full object-contain'; // Changed from contain to cover

  // Position the cloud - centered to ensure it covers the entire screen
  cloud.style.width = `${width}px`;
  cloud.style.height = `${height}px`;
  cloud.style.left = `${(window.innerWidth - width) / 2}px`; // Center horizontally
  cloud.style.bottom = `-${height}px`; // Start below screen

  cloud.appendChild(cloudImg);
  cloudContainer.appendChild(cloud);
  cloudRefs.push(cloud);

  return { cloudContainer, cloudRefs };
}

export function setupCloudAnimations(cloudRefs: HTMLElement[]) {
  if (typeof window === 'undefined' || cloudRefs.length === 0) {
    console.error("Cloud refs not available");
    return;
  }

  // Kill all existing ScrollTriggers to prevent duplicates
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  // Get all sections
  const sections = document.querySelectorAll('.section');
  const cloud = cloudRefs[0];

  gsap.set(cloud, {
    y: window.innerHeight * 2, // Position far below to start
  });

  console.log("Cloud initial setup:", {
    width: cloud.offsetWidth,
    height: cloud.offsetHeight,
    sections: sections.length
  });

  // Create transitions between each pair of sections
  for (let i = 0; i < sections.length - 1; i++) {
    const currentSection = sections[i];
    const nextSection = sections[i + 1];

    console.log(`Creating transition between ${currentSection.id} and ${nextSection.id}`);

    // Create a direct animation timeline for this transition
    const tl = gsap.timeline({
      scrollTrigger: {
        id: `transition-${currentSection.id}-to-${nextSection.id}`,
        trigger: currentSection,
        start: "bottom bottom+=100", // Start earlier
        end: "bottom top-=100", // End later
        scrub: 1.5, // Faster response
        onEnter: () => console.log(`Entering transition from ${currentSection.id} to ${nextSection.id}`),
        onLeaveBack: () => console.log(`Leaving transition from ${currentSection.id} to ${nextSection.id} (back)`)
      }
    });

    // Add animation keyframes to timeline
    const fullScreenHeight = window.innerHeight + cloud.offsetHeight;

    // First half: coming into view
    tl.fromTo(cloud,
      { y: fullScreenHeight, opacity: 0.5 },
      { y: 0, opacity: 0.9, duration: 0.5, ease: "none" }
    );

    // Second half: leaving view
    tl.to(cloud,
      { y: -fullScreenHeight, opacity: 3, duration: 0.5, ease: "none" }
    );
  }


  return () => {
    // Clean up all ScrollTriggers when component unmounts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}

export function setupSectionDetection(updateActiveSection: (sectionId: string) => void) {
  if (typeof window === 'undefined') return;

  // Clean up any existing section detection ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.id && trigger.vars.id.startsWith('section-detection')) {
      trigger.kill();
    }
  });

  const sections = document.querySelectorAll('.section');
  
  // Set initial section based on URL hash or default to first section
  if (window.location.hash) {
    const initialSection = window.location.hash.substring(1);
    const sectionExists = Array.from(sections).some(section => section.id === initialSection);
    
    if (sectionExists) {
      updateActiveSection(initialSection);
    }
  } else if (sections.length > 0) {
    updateActiveSection(sections[0].id);
  }

  // Create ScrollTriggers for each section
  sections.forEach((section) => {
    ScrollTrigger.create({
      id: `section-detection-${section.id}`,
      trigger: section as Element,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        console.log(`Scrolled into section: ${section.id}`);
        updateActiveSection(section.id);
        
        // Update URL without triggering scroll
        if (history.pushState && window.location.hash !== `#${section.id}`) {
          history.pushState(null, '', `#${section.id}`);
        }
      },
      onEnterBack: () => {
        console.log(`Scrolled back into section: ${section.id}`);
        updateActiveSection(section.id);
        
        // Update URL without triggering scroll
        if (history.pushState && window.location.hash !== `#${section.id}`) {
          history.pushState(null, '', `#${section.id}`);
        }
      },
      markers: false
    });
  });

  // Return cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id && trigger.vars.id.startsWith('section-detection')) {
        trigger.kill();
      }
    });
  };
}
