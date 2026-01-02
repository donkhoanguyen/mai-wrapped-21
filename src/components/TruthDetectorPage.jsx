import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import happyPocoyo from '../../visual_asset/happy_pocoyo.png';
import sadPocoyo from '../../visual_asset/sad_pocoyo.png';
import summerBackground from '../../visual_asset/summer_background.png';

// Rain Particle Component
const RainDrop = ({ delay, duration, xStart }) => (
  <motion.div
    initial={{ y: -20, x: xStart, opacity: 0 }}
    animate={{ 
      y: "110vh", 
      opacity: [0, 0.4, 0.4, 0] 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
    className="absolute w-[1px] h-10 bg-blue-300/40 pointer-events-none z-10"
    style={{ left: xStart }}
  />
);

// Thunder/Lightning Effect
const Lightning = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0, 0.8, 0, 0.5, 0, 0, 0],
    }}
    transition={{ 
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3 + Math.random() * 5
    }}
    className="absolute inset-0 bg-white z-20 pointer-events-none mix-blend-overlay"
  />
);

// Cloud Component
const Cloud = ({ delay, duration, yPos, xStart, scale, isStormy }) => (
  <motion.div
    initial={{ x: xStart, opacity: 0 }}
    animate={{ 
      x: ["-20vw", "120vw"],
      opacity: [0, 1, 1, 0] 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
    className="absolute pointer-events-none z-10"
    style={{ top: yPos }}
  >
    <motion.div 
      animate={{ scale }} 
      className={isStormy ? "text-slate-700" : "text-white"}
    >
      <svg width="300" height="150" viewBox="0 0 120 80" className={isStormy ? "opacity-90" : "opacity-60"}>
        <path d="M100 60c0 11.046-8.954 20-20 20H40c-11.046 0-20-8.954-20-20 0-1.428.15-2.82.434-4.162C8.804 53.684 0 43.865 0 32c0-13.255 10.745-24 24-24 1.745 0 3.428.186 5.048.538C34.42 3.422 44.57 0 56 0c16.32 0 30.137 10.875 34.613 25.75C94.276 25.257 97.054 25 100 25c11.046 0 20 8.954 20 20s-8.954 20-20 20z" fill="currentColor"/>
      </svg>
    </motion.div>
  </motion.div>
);

// Pocoyo Character Component
const Pocoyo = ({ isHappy = false }) => (
  <motion.div
    animate={isHappy ? {
      y: [0, -15, 0],
      rotate: [0, 3, -3, 0],
      scale: [1, 1.05, 1],
    } : {
      x: [0, -3, 3, -3, 3, 0],
      rotate: [0, -1, 1, -1, 1, 0],
    }}
    transition={isHappy ? {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    } : {
      duration: 0.4,
      repeat: Infinity
    }}
  >
    <img
      src={isHappy ? happyPocoyo : sadPocoyo}
      alt={isHappy ? 'Happy Pocoyo' : 'Sad Pocoyo'}
      className="w-44 h-44 md:w-64 md:h-64 object-contain drop-shadow-2xl"
    />
  </motion.div>
);

// Unified Sentence Tray Component
const SentenceTray = ({ val1, val2, isError }) => (
  <div className={`w-full min-h-[100px] flex items-center justify-center px-8 py-6 rounded-[2.5rem] border-2 transition-all duration-700 backdrop-blur-md ${
    isError
      ? 'border-red-500/50 bg-red-900/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
      : 'border-white/40 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
  }`}>
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <span className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${
        !val1 ? 'text-white/20' : isError ? 'text-red-400' : 'text-white'
      }`}>
        {val1 || "..."}
      </span>
      <span className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-500 ${
        !val2 ? 'text-white/20' : isError ? 'text-red-300' : 'text-white'
      }`}>
        {val2 || "..."}
      </span>
    </div>
  </div>
);

// Finite Scrollable Slot Component
const ScrollableSlot = ({ options, value, onChange, isError }) => {
  const [yOffset, setYOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const containerRef = useRef(null);
  const itemHeight = 70;
  const containerHeight = 210;

  const minOffset = -(options.length - 1) * itemHeight;
  const maxOffset = 0;

  const getCurrentIndex = () => {
    const index = Math.round(-yOffset / itemHeight);
    return Math.max(0, Math.min(options.length - 1, index));
  };

  useEffect(() => {
    if (value) {
      const index = options.indexOf(value);
      if (index !== -1) {
        setYOffset(-(index * itemHeight));
      }
    } else if (options.length > 0 && !value) {
      onChange?.(options[0]);
      setYOffset(0);
    }
  }, []);

  const snapToNearest = (currentY) => {
    const index = Math.round(-currentY / itemHeight);
    const clampedIndex = Math.max(0, Math.min(options.length - 1, index));
    const snappedY = -(clampedIndex * itemHeight);
    setYOffset(snappedY);
  };

  const handleStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartOffset(yOffset);
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientY);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientY);
    e.preventDefault();
  };

  const handleMove = (clientY) => {
    if (!isDragging) return;
    const deltaY = clientY - startY;
    let newOffset = startOffset + deltaY;
    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));
    setYOffset(newOffset);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientY);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientY);
    e.preventDefault();
  };

  const handleEnd = () => {
    if (isDragging) {
      snapToNearest(yOffset);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaY) < 10) return;
    e.preventDefault();
    const direction = e.deltaY > 0 ? -1 : 1;
    let newOffset = yOffset + (direction * itemHeight);
    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));
    setYOffset(newOffset);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startY, startOffset, yOffset]);

  useEffect(() => {
    const index = getCurrentIndex();
    onChange?.(options[index]);
  }, [yOffset, options]);

  const currentIndex = getCurrentIndex();
  const sidePadding = (containerHeight - itemHeight) / 2;

  return (
    <div
      ref={containerRef}
      className={`relative h-[210px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-[2.5rem] border-2 transition-all duration-700 backdrop-blur-md touch-none ${
        isError
          ? 'border-red-500/50 bg-red-900/20 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
          : 'border-white/40 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
      }`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <div className={`absolute top-1/2 left-0 right-0 h-[70px] -translate-y-1/2 border-y z-10 pointer-events-none transition-colors duration-700 ${
        isError ? 'bg-red-500/10 border-red-500/30' : 'bg-white/10 border-white/20'
      }`} />
      
      <motion.div
        className="flex flex-col"
        animate={{ y: yOffset }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
        style={{ 
          paddingTop: `${sidePadding}px`,
          paddingBottom: `${sidePadding}px`
        }}
      >
        {options.map((option, index) => {
          const isSelected = index === currentIndex;
          return (
            <motion.div
              key={option}
              className={`flex items-center justify-center h-[70px] px-6 transition-all duration-300 ${
                isSelected 
                  ? (isError ? 'text-red-200 font-bold' : 'text-white font-bold') 
                  : (isError ? 'text-red-900/40' : 'text-white/20')
              }`}
              animate={isSelected ? { scale: 1.1 } : { scale: 0.9 }}
            >
              <span className="text-center text-lg md:text-xl tracking-wide">{option}</span>
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent z-20 pointer-events-none" />
    </div>
  );
};



const TruthDetectorPage = ({ onNext }) => {
  const [slot1Value, setSlot1Value] = useState(null);
  const [slot2Value, setSlot2Value] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const slot1Options = ["xin lỗi em chỉ là", "anh thích em là"];
  const slot2Options = [
    "cô bé thít trà sữa",
    "em bé của anh",
    "cô gái hơi đành hanh",
    "cô bé hay dỗi",
    "cô bé muốn ăn nhìu",
    "em bé mai",
    "cô bé bị đói bụm",
    "ngọc mia",
    "lúp pi má xệ"
  ];

  const isWrong = slot1Value === "xin lỗi em chỉ là";
  const isPocoyoHappy = slot1Value === "anh thích em là";
  const isComplete = slot1Value && slot2Value;

  const rainParticles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 0.4 + Math.random() * 0.4,
    xStart: `${Math.random() * 100}%`
  }));

  const stormClouds = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    yPos: `${(i % 5) * 20}%`,
    xStart: `${(i * 15) % 100}%`,
    scale: 1.5 + Math.random() * 2
  }));

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={isExiting ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background with color shift */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        animate={{
          filter: isWrong ? "grayscale(80%) brightness(40%)" : "grayscale(0%) brightness(100%)",
        }}
        style={{ backgroundImage: `url(${summerBackground})` }}
      />

      {/* Dramatic Storm for "Wrong" state */}
      <AnimatePresence>
        {isWrong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
            {stormClouds.map(c => <Cloud key={c.id} {...c} isStormy={true} />)}
            {rainParticles.map(p => <RainDrop key={p.id} {...p} />)}
            <Lightning />
            
            <motion.div 
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-red-900/20 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sun/Shiny effect for "Happy" state */}
      <AnimatePresence>
        {isPocoyoHappy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <motion.div 
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-yellow-100/30 mix-blend-overlay shadow-[inset_0_0_100px_rgba(255,255,255,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
        <motion.div 
          className="w-full max-w-5xl flex flex-col gap-8 md:gap-12 items-center"
          animate={isWrong ? {
            x: [0, -4, 4, -4, 4, 0],
          } : {}}
          transition={{ duration: 0.4, repeat: isWrong ? Infinity : 0 }}
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-serif italic"
              animate={isWrong ? { color: "#ef4444" } : { color: "#ffffff" }}
            >
              The Truth Detector
            </motion.h2>
            <div className="flex items-center justify-center gap-3">
              <span className={`h-[1px] w-8 md:w-16 bg-white/40`} />
              <p className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase drop-shadow-md">
                {isWrong ? "Critical Integrity Failure" : "Neural Sync Active"}
              </p>
              <span className={`h-[1px] w-8 md:w-16 bg-white/40`} />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left: Interactive Input Area */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ScrollableSlot
                  options={slot1Options}
                  value={slot1Value}
                  onChange={setSlot1Value}
                  isError={isWrong}
                />
                <ScrollableSlot
                  options={slot2Options}
                  value={slot2Value}
                  onChange={setSlot2Value}
                  isError={isWrong}
                />
              </div>
            </div>

            {/* Right: Visualization Area */}
            <div className="flex flex-col items-center gap-10">
              <SentenceTray 
                val1={slot1Value} 
                val2={slot2Value} 
                isError={isWrong}
              />

              <div className="relative group">
                <Pocoyo isHappy={isPocoyoHappy} />
                <AnimatePresence>
                  {isPocoyoHappy && (
                    <motion.div 
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ 
                        scale: [1, 1.3, 1], 
                        opacity: 1, 
                        y: 0,
                        rotate: [0, 15, -15, 0]
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-6 -right-6 text-6xl drop-shadow-2xl"
                    >
                      💝
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Verification Status & Navigation */}
          <div className="h-16 flex items-center justify-center">
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <p className={`text-xl md:text-2xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] italic ${isPocoyoHappy ? 'text-blue-200' : 'text-red-400'}`}>
                  {isPocoyoHappy 
                    ? "Exactly! Lúc nào anh cũng yêu em" 
                    : "Error detected: Đâu lúc nào anh không yêu em ????"}
                </p>
                
                {isPocoyoHappy && (
                  <motion.button
                    onClick={() => {
                      setIsExiting(true);
                      setTimeout(onNext, 800);
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(255,255,255,1)",
                      boxShadow: "0 0 30px rgba(255,255,255,0.6)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-white/90 text-blue-900 rounded-full font-black text-lg shadow-2xl transition-all uppercase tracking-widest"
                  >
                    Next Season
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


export default TruthDetectorPage;
