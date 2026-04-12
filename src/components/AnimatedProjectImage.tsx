"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedProjectImageProps {
  image?: string;
  images?: string[];
  alt: string;
}

export default function AnimatedProjectImage({ image, images, alt }: AnimatedProjectImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If we only have a single image, use that. If multiple, use the array.
  const displayImages = images && images.length > 0 ? images : image ? [image] : [];
  const multiple = displayImages.length > 1;

  useEffect(() => {
    if (!multiple) return;
    
    // Cycle every 3 seconds if multiple images exist
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [multiple, displayImages.length]);

  if (displayImages.length === 0) return null;

  if (!multiple) {
    return (
      <img 
        src={displayImages[0]} 
        alt={alt} 
        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300 relative z-10" 
      />
    );
  }

  // 3D Animated Showcase
  return (
    <div className="relative w-full h-full perspective-[1000px] flex items-center justify-center pointer-events-none">
      <AnimatePresence mode="popLayout" initial={false}>
        {displayImages.map((img, i) => {
          // Calculate distance from current index
          const offset = i - currentIndex;
          const isCurrent = offset === 0;
          
          if (!isCurrent) return null; // We'll just show current for a clean crossfade with motion, or we can do a stack!
          
          return (
            <motion.img
              key={i}
              src={img}
              alt={`${alt} ${i + 1}`}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotateY: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full h-full object-contain filter group-hover:brightness-110 z-10"
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
