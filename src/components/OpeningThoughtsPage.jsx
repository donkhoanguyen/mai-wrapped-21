import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OpeningThoughtsPage = ({ onNext }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Short delay to let the snow cover settle
    const timer = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setIsExiting(true);
    setTimeout(onNext, 1800); 
  };

  return (
    <motion.div 
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Enhanced Snow Canvas Texture - Collection of Accumulated Chunks */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base snow color */}
        <div className="absolute inset-0 bg-[#f8fafc]" />
        
        {/* Grainy Snow Filter */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20 mix-blend-overlay">
          <filter id="snow-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#snow-texture)" />
        </svg>

        {/* Thick Snow Drifts with Soft Edges */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/80 rounded-[40%] blur-[60px] opacity-40"
            style={{
              width: `${40 + Math.random() * 50}%`,
              height: `${40 + Math.random() * 50}%`,
              left: `${-20 + Math.random() * 120}%`,
              top: `${-20 + Math.random() * 120}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              boxShadow: "0 0 100px 50px rgba(255,255,255,0.8), inset 0 0 80px rgba(203,213,225,0.3)"
            }}
          />
        ))}

        {/* Silver Sparkling Ice Crystals */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute flex items-center justify-center"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {/* The "Silver" Glint */}
            <motion.div
              className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_2px_rgba(192,192,192,0.9)]"
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 90, 180]
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            />
            {/* Horizontal Flare */}
            <motion.div
              className="absolute w-4 h-[0.5px] bg-gradient-to-r from-transparent via-silver-200 to-transparent opacity-40"
              style={{ backgroundColor: "#C0C0C0" }}
              animate={{ opacity: [0, 0.6, 0], scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 10 }}
            />
            {/* Vertical Flare */}
            <motion.div
              className="absolute h-4 w-[0.5px] bg-gradient-to-b from-transparent via-silver-200 to-transparent opacity-40"
              style={{ backgroundColor: "#C0C0C0" }}
              animate={{ opacity: [0, 0.6, 0], scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 10 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bloom Transition Overlay (to Spring) */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            className="absolute z-50 rounded-full bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 45, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ width: '100px', height: '100px' }}
          />
        )}
      </AnimatePresence>

      <div className="z-10 max-w-3xl px-8 text-center space-y-16">
        <AnimatePresence>
          {showText && (
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="space-y-6 mb-12"
              >
                <h2 className="text-3xl md:text-5xl text-slate-800 font-serif italic tracking-wide leading-tight drop-shadow-sm">
                  "I woke up feeling so lucky that I get to spend another one of your birthdays by your side."
                </h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-[2px] bg-slate-300 mx-auto" 
                />
              </motion.div>

              <div className="space-y-10">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed font-sans"
                >
                  Today isn't just another day. It's a celebration of every smile you've shared, 
                  every challenge you've conquered, and the beautiful person you continue to become.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 2.2 }}
                  className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed font-sans"
                >
                  Before we look ahead to your 21st year, I wanted to take a moment 
                  to tell you exactly why this journey with you means everything to me.
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
                onClick={handleContinue}
                whileHover={{ scale: 1.05, letterSpacing: "0.3em" }}
                whileTap={{ scale: 0.95 }}
                className="mt-20 px-12 py-5 border-b-2 border-slate-200 text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all text-xs tracking-[0.2em] uppercase font-black"
              >
                Enter the Garden
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Very subtle falling snow on the canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
            initial={{ 
              left: Math.random() * 100 + "%", 
              top: "-5%", 
              opacity: 0 
            }}
            animate={{ 
              top: "105%",
              opacity: [0, 0.4, 0],
              x: [0, 20, -20, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default OpeningThoughtsPage;
