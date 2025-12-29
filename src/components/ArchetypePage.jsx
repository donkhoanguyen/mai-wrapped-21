import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ARCHETYPES = [
  { id: 1, title: "The Main Character", description: "Always iconic, turning every sidewalk into a runway.", color: "from-pink-400 to-rose-500", pos: { x: 180, y: 320 }, z: 30 },
  { id: 2, title: "The Joy Generator", description: "Lighting up every room with that smile.", color: "from-yellow-300 to-orange-400", pos: { x: 620, y: 280 }, z: 50 },
  { id: 3, title: "Professional Overthinker", description: "Calculating every possibility, but we love that brain.", color: "from-blue-300 to-indigo-500", pos: { x: 320, y: 180 }, z: 10 },
  { id: 4, title: "The Sweetest Soul", description: "Kindness that makes the world softer.", color: "from-green-300 to-emerald-500", pos: { x: 480, y: 150 }, z: 40 },
  { id: 5, title: "Adventure Ready", description: "Always down for a spontaneous trip or snack run.", color: "from-orange-300 to-red-500", pos: { x: 400, y: 350 }, z: 60 },
];

const DECORATIVE_FLOWERS = [
  { x: 100, y: 400, z: -10 }, { x: 700, y: 350, z: 20 }, { x: 350, y: 100, z: -5 },
  { x: 550, y: 100, z: 15 }, { x: 400, y: 50, z: -25 }, { x: 250, y: 450, z: 10 },
  { x: 550, y: 450, z: 25 }, { x: 150, y: 200, z: -15 }, { x: 650, y: 150, z: 35 }
];

const SakuraPetal = ({ delay }) => (
  <motion.div
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{ 
      y: "110vh", 
      opacity: [0, 1, 1, 0], 
      rotate: 360,
      x: [0, 50, -50, 25, 0]
    }}
    transition={{ 
      duration: 10 + Math.random() * 5, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
    className="absolute w-2 h-2 bg-pink-100 rounded-full blur-[1px] pointer-events-none opacity-40 z-0"
    style={{ left: `${Math.random() * 100}%` }}
  />
);

const FlowerSVG = ({ isInteractive, onClick, color = "#f9a8d4", size = 1 }) => {
  const petals = Array.from({ length: 10 }).map((_, i) => (
    <path
      key={i}
      d="M0,0 C-15,-25 0,-40 15,-25 Z"
      fill={isInteractive ? "white" : "#fce7f3"}
      stroke={color}
      strokeWidth="0.5"
      transform={`rotate(${(i * 36)}) scale(${size})`}
    />
  ));

  return (
    <motion.g
      whileHover={isInteractive ? { scale: 1.3 } : {}}
      className={isInteractive ? "cursor-pointer" : "pointer-events-none"}
      onClick={onClick}
    >
      <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))">
        {petals}
        {/* Inner petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M0,0 C-10,-18 0,-30 10,-18 Z"
            fill={color}
            opacity="0.6"
            transform={`rotate(${(i * 45) + 22}) scale(${size * 0.7})`}
          />
        ))}
        <circle r={6 * size} fill="#fde047" stroke="#facc15" strokeWidth="1" />
      </g>
      {isInteractive && (
        <>
          <motion.circle
            r={35 * size}
            fill="rgba(249, 168, 212, 0.2)"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle r={50 * size} fill="transparent" />
        </>
      )}
    </motion.g>
  );
};

const ArchetypePage = () => {
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [zoomingArchetype, setZoomingArchetype] = useState(null);

  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#fdf2f8] via-[#fff1f2] to-[#f0f9ff]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <SakuraPetal key={i} delay={i * 0.2} />
        ))}
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center pt-6">
        <div className="text-center z-10 mb-2 select-none pointer-events-none">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl text-pink-500/70 font-serif tracking-[0.2em] drop-shadow-sm"
          >
            MAI'S GARDEN
          </motion.h2>
          <motion.p className="text-xs text-slate-400 mt-2 font-sans tracking-[0.5em] uppercase font-light">Archetype Discovery • 2025</motion.p>
        </div>

        {/* 3D Scene Wrapper - Now everything is inside SVG for perfect sticking */}
        <motion.div 
          className="relative w-full max-w-6xl h-[85vh] flex items-center justify-center"
          animate={selectedArchetype || zoomingArchetype ? {
            scale: 2.5,
            // Accurate percentage translation to bring flower to center
            x: `${(400 - (selectedArchetype || zoomingArchetype).pos.x) / 8}%`,
            y: `${(350 - (selectedArchetype || zoomingArchetype).pos.y) / 8}%`,
          } : {
            scale: 1,
            x: 0,
            y: 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible drop-shadow-2xl">
            <defs>
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d1b10" />
                <stop offset="50%" stopColor="#4a2c2a" />
                <stop offset="100%" stopColor="#2d1b10" />
              </linearGradient>
            </defs>

            <g transform="translate(0, 50)" style={{ transformStyle: "preserve-3d" }}>
              {/* Massive Detailed Trunk */}
              <motion.path
                d="M400,780 C400,680 370,500 400,350 C430,200 400,100 400,20"
                stroke="url(#trunkGrad)"
                strokeWidth="45"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{ transform: "translateZ(-30px)" }}
              />

              {/* Recursive Branching System */}
              {[
                // Primary branches (start growing as trunk passes their start point)
                { id: 'b1', d: "M400,450 C300,450 220,380 180,320", sw: 28, z: -10, delay: 1.0, dur: 1.2, end: 2.2, target: {x: 180, y: 320} },
                { id: 'b2', d: "M400,400 C500,400 600,350 620,280", sw: 24, z: -10, delay: 1.2, dur: 1.2, end: 2.4, target: {x: 620, y: 280} },
                { id: 'b3', d: "M400,300 C360,250 340,200 320,180", sw: 20, z: -20, delay: 1.5, dur: 1.0, end: 2.5, target: {x: 320, y: 180} },
                { id: 'b4', d: "M400,250 C440,220 480,180 480,150", sw: 18, z: 10, delay: 1.7, dur: 1.0, end: 2.7, target: {x: 480, y: 150} },
                { id: 'b5', d: "M400,550 C450,530 520,500 550,450", sw: 16, z: 15, delay: 0.8, dur: 1.0, end: 1.8, target: {x: 550, y: 450} },
                { id: 'b6', d: "M400,500 C350,500 300,480 250,450", sw: 14, z: -5, delay: 0.9, dur: 1.0, end: 1.9, target: {x: 250, y: 450} },
                { id: 'b7', d: "M400,355 L402,348", sw: 14, z: 0, delay: 1.3, dur: 0.5, end: 1.8, target: {x: 400, y: 350} },
                { id: 'b8', d: "M400,250 C400,200 400,120 400,50", sw: 14, z: 5, delay: 1.7, dur: 1.0, end: 2.7, target: {x: 400, y: 50} },

                // Secondary branches (start growing after primary finishes)
                { id: 's1', d: "M180,320 C140,360 120,380 100,400", sw: 12, z: 0, delay: 2.2, dur: 0.8, end: 3.0, target: {x: 100, y: 400} },
                { id: 's2', d: "M180,320 C165,260 155,230 150,200", sw: 10, z: 0, delay: 2.2, dur: 0.8, end: 3.0, target: {x: 150, y: 200} },
                { id: 's3', d: "M620,280 C670,300 690,320 700,350", sw: 14, z: 10, delay: 2.4, dur: 0.8, end: 3.2, target: {x: 700, y: 350} },
                { id: 's4', d: "M620,280 C635,220 645,180 650,150", sw: 12, z: 25, delay: 2.4, dur: 0.8, end: 3.2, target: {x: 650, y: 150} },
                { id: 's5', d: "M320,180 C335,140 345,120 350,100", sw: 10, z: -5, delay: 2.5, dur: 0.8, end: 3.3, target: {x: 350, y: 100} },
                { id: 's6', d: "M480,150 C515,125 540,110 550,100", sw: 12, z: 15, delay: 2.7, dur: 0.8, end: 3.5, target: {x: 550, y: 100} },
              ].map((b, i) => (
                <motion.path
                  key={b.id}
                  d={b.d}
                  stroke="url(#trunkGrad)"
                  strokeWidth={b.sw}
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    pathLength: { duration: b.dur, delay: b.delay, ease: "easeInOut" },
                    opacity: { duration: 0.01, delay: b.delay }
                  }}
                  style={{ transform: `translateZ(${b.z}px)` }}
                />
              ))}

              {/* Foliage/Blooms Backdrop */}
              {DECORATIVE_FLOWERS.map((pos, i) => (
                <g key={`cloud-${i}`} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z - 5}px)` }}>
                  <circle r="40" fill="#fbcfe8" opacity="0.2" filter="blur(25px)" />
                </g>
              ))}

              {/* Decorative Flowers (Static) */}
              {DECORATIVE_FLOWERS.map((f, i) => {
                // Find timing for bloom
                const timings = [
                  { x: 100, y: 400, end: 3.0 }, { x: 700, y: 350, end: 3.2 }, { x: 350, y: 100, end: 3.3 },
                  { x: 550, y: 100, end: 3.5 }, { x: 400, y: 50, end: 2.7 }, { x: 250, y: 450, end: 1.9 },
                  { x: 550, y: 450, end: 1.8 }, { x: 150, y: 200, end: 3.0 }, { x: 650, y: 150, end: 3.2 },
                  { x: 400, y: 350, end: 1.8 }
                ];
                const timing = timings.find(p => p.x === f.x && p.y === f.y);
                const bloomDelay = (timing?.end || 3.5) + 0.1;

                return (
                  <g key={`dec-${i}`} style={{ transform: `translate3d(${f.x}px, ${f.y}px, ${f.z}px)` }}>
                    <motion.g 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: bloomDelay, duration: 0.8, ease: "backOut" }}
                    >
                      <FlowerSVG isInteractive={false} size={0.6 + Math.random() * 0.4} />
                    </motion.g>
                  </g>
                );
              })}

              {/* Interactive Archetype Flowers - Perfectly Locked in SVG */}
              {ARCHETYPES.map((arch, index) => {
                const branchEndTimes = { 1: 2.2, 2: 2.4, 3: 2.5, 4: 2.7, 5: 1.8 };
                const bloomDelay = (branchEndTimes[arch.id] || 3.0) + 0.1;

                return (
                  <g key={arch.id} style={{ transform: `translate3d(${arch.pos.x}px, ${arch.pos.y}px, ${arch.z + 10}px)` }}>
                    <motion.g 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={(zoomingArchetype?.id === arch.id || selectedArchetype?.id === arch.id) ? {
                        scale: 1.5,
                        opacity: 1,
                      } : {
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{ 
                        scale: { duration: 0.8, ease: "easeInOut" },
                        opacity: { delay: bloomDelay, duration: 0.5 },
                        default: { delay: bloomDelay, duration: 0.8, ease: "backOut" }
                      }}
                    >
                      <FlowerSVG 
                        isInteractive={true} 
                        onClick={() => {
                          setZoomingArchetype(arch);
                          setTimeout(() => {
                            setSelectedArchetype(arch);
                          }, 800);
                        }} 
                        size={1.2}
                      />
                    </motion.g>
                  </g>
                );
              })}
            </g>
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedArchetype && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedArchetype(null);
              setZoomingArchetype(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-12 max-w-sm w-full text-center border border-white/60 relative"
            >
              <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${selectedArchetype.color}`} />
              <div className="w-24 h-24 bg-pink-50 rounded-full mx-auto mb-8 flex items-center justify-center text-5xl">🌸</div>
              <h3 className="text-3xl font-serif text-slate-800 mb-4">{selectedArchetype.title}</h3>
              <p className="text-slate-500 font-sans leading-relaxed text-lg italic">"{selectedArchetype.description}"</p>
              <button onClick={() => {
                setSelectedArchetype(null);
                setZoomingArchetype(null);
              }} className={`mt-10 px-12 py-4 bg-gradient-to-r ${selectedArchetype.color} text-white rounded-full font-medium shadow-xl`}>Wonderful</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArchetypePage;
