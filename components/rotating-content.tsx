"use client"

import { useState, useEffect } from "react"
import { ErrorService } from "../services/error-service"

const componentId = "RotatingContent";
ErrorService.registerLogging(componentId, { enabled: true, verbose: false });

interface RotatingContentProps {
  imageSrc: string;
  phrases: string[];
  displayDuration?: number; // in milliseconds
  transitionDuration?: number; // in milliseconds
}

export default function RotatingContent({
  imageSrc,
  phrases,
  displayDuration = 3000, // 3 seconds default
  transitionDuration = 500, // 0.5 seconds default
}: RotatingContentProps) {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 means show the image
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    ErrorService.logInfo("Initializing rotating content", { 
      operation: "initialize", 
      details: { 
        phraseCount: phrases.length,
        displayDuration,
        transitionDuration,
        timestamp: Date.now()
      }
    }, componentId);
    
    const rotationInterval = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, change content and fade in
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex >= phrases.length - 1 ? -1 : prevIndex + 1;
          ErrorService.logInfo("Rotating to next content", { 
            operation: "rotate", 
            details: { 
              prevIndex, 
              nextIndex,
              content: nextIndex === -1 ? "image" : phrases[nextIndex],
              timestamp: Date.now()
            }
          }, componentId, true);
          return nextIndex;
        });
        setIsVisible(true);
      }, transitionDuration);
      
    }, displayDuration + transitionDuration);
    
    return () => {
      clearInterval(rotationInterval);
      ErrorService.logInfo("Cleaning up rotating content", { 
        operation: "cleanup", 
        details: { timestamp: Date.now() }
      }, componentId);
    };
  }, [phrases, displayDuration, transitionDuration]);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="transition-opacity duration-500 flex items-center justify-center"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transitionDuration: `${transitionDuration}ms`
        }}
      >
        {currentIndex === -1 ? (
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : (
          <div className="text-white text-3xl md:text-4xl font-bold text-center">
            {phrases[currentIndex]}
          </div>
        )}
      </div>
    </div>
  );
}
