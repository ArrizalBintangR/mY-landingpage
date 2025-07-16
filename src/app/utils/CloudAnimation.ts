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

    // Create a ScrollTrigger for direct position updates
    ScrollTrigger.create({
      id: `transition-${currentSection.id}-to-${nextSection.id}`,
      trigger: currentSection,
      start: "bottom bottom", 
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        const fullScreenHeight = window.innerHeight + cloud.offsetHeight;
        
        // Direct position calculation based on scroll progress
        const yPosition = fullScreenHeight - (progress * fullScreenHeight * 2);
        // Increased opacity range: starts at 0.7, peaks at 1.0
        const opacity = 0.7 + (progress * 0.3);
        
        // Apply transform directly without GSAP animation
        gsap.set(cloud, {
          y: yPosition,
          opacity: Math.min(opacity, 1.0), // Allow full opacity
          immediateRender: true,
          force3D: true
        });
      },
      onEnter: () => console.log(`Entering transition from ${currentSection.id} to ${nextSection.id}`),
      onLeaveBack: () => console.log(`Leaving transition from ${currentSection.id} to ${nextSection.id} (back)`)
    });
  }

  return () => {
    // Clean up all ScrollTriggers when component unmounts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}

export function setupSectionDetection(updateActiveSection: (sectionId: string) => void) {
  if (typeof window === 'undefined') return;

  console.log('Setting up section detection...');

  // Clean up any existing section detection ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.id && trigger.vars.id.startsWith('section-detection')) {
      trigger.kill();
    }
  });

  const sections = document.querySelectorAll('.section');
  console.log(`Found ${sections.length} sections:`, Array.from(sections).map(s => s.id));
  
  // Set initial section based on scroll position
  const setInitialSection = () => {
    const scrollY = window.scrollY;
    let currentSection = sections[0]?.id || 'home';
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const sectionMiddle = sectionTop + rect.height / 2;
      
      if (scrollY + window.innerHeight / 2 >= sectionMiddle) {
        currentSection = section.id;
      }
    });
    
    console.log(`Initial section based on scroll position: ${currentSection}`);
    updateActiveSection(currentSection);
  };

  // Set initial section
  setInitialSection();

  // Create ScrollTriggers for each section with better configuration
  sections.forEach((section) => {
    const trigger = ScrollTrigger.create({
      id: `section-detection-${section.id}`,
      trigger: section as Element,
      start: 'top 50%',  // Section becomes active when its top reaches viewport center
      end: 'bottom 50%', // Section stays active until its bottom leaves viewport center
      onToggle: (self) => {
        // Only update if entering the trigger area
        if (self.isActive) {
          console.log(`Section ${section.id} is now active (direction: ${self.direction})`);
          updateActiveSection(section.id);
          
          // Update URL without triggering scroll
          if (history.pushState && window.location.hash !== `#${section.id}`) {
            history.pushState(null, '', `#${section.id}`);
          }
        }
      },
      markers: false, // Set to true temporarily for debugging if needed
      refreshPriority: 1
    });
    
    console.log(`Created ScrollTrigger for section ${section.id}`, {
      start: trigger.start,
      end: trigger.end
    });
  });

  // Refresh ScrollTrigger after a short delay to ensure proper positioning
  setTimeout(() => {
    console.log('Refreshing ScrollTrigger...');
    ScrollTrigger.refresh();
    
    // Double-check the current section after refresh
    setInitialSection();
  }, 200);

  // Also refresh on window resize
  const handleResize = () => {
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id && trigger.vars.id.startsWith('section-detection')) {
        trigger.kill();
      }
    });
  };
}
