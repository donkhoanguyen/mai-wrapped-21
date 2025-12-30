import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import winterBackground from '../../visual_asset/winter_background.png';

const SnowParticle = ({ delay, duration, xStart, size, type }) => (
  <motion.div
    initial={{ y: -50, x: xStart, opacity: 0, rotate: 0 }}
    animate={{ 
      y: "120vh", 
      opacity: [0, 0.8, 0.4, 0],
      rotate: type === '+' ? 180 : 360,
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear",
    }}
    className="absolute text-white pointer-events-none select-none z-0 mix-blend-overlay"
    style={{ 
      left: xStart, 
      fontSize: size, 
    }}
  >
    {type}
  </motion.div>
);

const LoginPage = ({ onLogin }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleStart = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      onLogin("Mai"); 
    }, 2000);
  };

  // Sparkles and magic dust
  const particles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
    xStart: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 2}rem`, 
    type: Math.random() > 0.5 ? '✨' : '+' 
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Winter Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${winterBackground})` }}
      ></div>
      
      {/* Particles Layer */}
      {particles.map((p) => (
        <SnowParticle key={p.id} {...p} />
      ))}

      {/* Spring Bloom Transition */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            className="absolute z-50 rounded-full bg-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 30, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ width: '100px', height: '100px' }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="z-10 flex flex-col items-center justify-center gap-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl text-white font-serif font-bold tracking-wide text-center drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)' }}>
          Happy 21 to em Mai
        </h1>

        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white rounded-full shadow-sm text-slate-900 text-sm font-bold hover:shadow-md transition-all tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Let's begin
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
