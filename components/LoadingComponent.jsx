"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start with a minimum progress value
    setProgress(10);

    // Array of image paths to preload - add all important images from your site
    const imagesToPreload = [
      '/cloudbox.png',
      '/sun.webp',
      '/ray.webp',
      '/cloud3.webp',
      '/cloud4.webp',
      '/plane.webp',
      '/navbar.webp',
      '/cloud1.webp',
      '/cloud2.webp',
      '/flower1.webp',
      '/flower2.webp',
      '/logs.webp',
      '/tech_logo/html.webp',
      '/tech_logo/css.webp',
      '/tech_logo/javascript.webp',
      '/tech_logo/react.webp',
      '/tech_logo/nodejs.webp',
      '/tech_logo/nextjs.webp',
      '/projects_image/regather.webp',
      '/projects_image/gizisight.webp',
      '/projects_image/nirmalavitalis.webp',
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    // Function to preload images
    const preloadImages = async () => {
      const preloadImage = (src) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            // Update progress (reserve 30% for initial load, 60% for images)
            const newProgress = Math.floor(10 + (loadedCount / totalImages * 60));
            setProgress(newProgress);
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to preload image: ${src}`);
            loadedCount++;
            resolve(); // Continue even if an image fails to load
          };
        });
      };

      try {
        // Preload all images in parallel
        await Promise.all(imagesToPreload.map(preloadImage));
        
        // Finish loading with animation
        setProgress(80);
        setTimeout(() => setProgress(100), 500);
        
        // Set complete after a short delay
        setTimeout(() => {
          setIsComplete(true);
          onComplete();
        }, 1000);
      } catch (error) {
        console.error("Error preloading images:", error);
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          onComplete();
        }, 500);
      }
    };

    preloadImages();

    // Simulate initial loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 10) return prev;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#50B8E7] transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-32 h-32 mb-8 relative animate-bounce">
        <Image 
          src="/cloud4.webp" 
          alt="Loading"
          width={128}
          height={128}
          priority={true}
        />
      </div>
      
      <div className="w-64 h-3 bg-white/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-white font-medium font-main">
        Loading... {progress}%
      </p>
    </div>
  );
};

export default LoadingScreen;
