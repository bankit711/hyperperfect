"use client"

import { useState, useEffect } from "react"
import { ErrorService } from "../services/error-service"

const componentId = "RotatingContent";

// Only register logging on client-side
if (typeof window !== 'undefined') {
  ErrorService.registerLogging(componentId, { enabled: true, verbose: false });
}

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
    // Safe logging that works on both server and client
    const logInfo = (message: string, context: any, isVerbose = false) => {
      if (typeof window !== 'undefined') {
        ErrorService.logInfo(message, context, componentId, isVerbose);
      }
    };
    
    logInfo("Initializing rotating content", { 
      operation: "initialize", 
      details: { 
        phraseCount: phrases.length,
        displayDuration,
        transitionDuration,
        timestamp: Date.now()
      }
    });
    
    const rotationInterval = setInterval(() => {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, change content and fade in
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex >= phrases.length - 1 ? -1 : prevIndex + 1;
          if (typeof window !== 'undefined') {
            logInfo("Rotating to next content", { 
              operation: "rotate", 
              details: { 
                prevIndex, 
                nextIndex,
                content: nextIndex === -1 ? "image" : phrases[nextIndex],
                timestamp: Date.now()
              }
            }, true);
          }
          return nextIndex;
        });
        setIsVisible(true);
      }, transitionDuration);
      
    }, displayDuration + transitionDuration);
    
    return () => {
      clearInterval(rotationInterval);
      if (typeof window !== 'undefined') {
        logInfo("Cleaning up rotating content", { 
          operation: "cleanup", 
          details: { timestamp: Date.now() }
        });
      }
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
