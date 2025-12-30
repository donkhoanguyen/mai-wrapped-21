import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import springBackground from '../../visual_asset/spring_background.png';

const ARCHETYPES = [
  { id: 1, title: "The Main Character", description: "Always iconic, turning every sidewalk into a runway.", color: "from-pink-400 to-rose-500", pos: { x: 120, y: 350 }, z: 30 },
  { id: 2, title: "The Joy Generator", description: "Lighting up every room with that smile.", color: "from-yellow-300 to-orange-400", pos: { x: 680, y: 300 }, z: 50 },
  { id: 3, title: "Professional Overthinker", description: "Calculating every possibility, but we love that brain.", color: "from-blue-300 to-indigo-500", pos: { x: 280, y: 150 }, z: 10 },
  { id: 4, title: "The Sweetest Soul", description: "Kindness that makes the world softer.", color: "from-green-300 to-emerald-500", pos: { x: 520, y: 120 }, z: 40 },
  { id: 5, title: "Adventure Ready", description: "Always down for a spontaneous trip or snack run.", color: "from-orange-300 to-red-500", pos: { x: 400, y: 500 }, z: 60 },
];

const DECORATIVE_FLOWERS = [
  { x: 50, y: 450, z: -10 }, { x: 750, y: 400, z: 20 }, { x: 300, y: 80, z: -5 },
  { x: 500, y: 60, z: 15 }, { x: 400, y: 30, z: -25 }, { x: 200, y: 550, z: 10 },
  { x: 600, y: 550, z: 25 }, { x: 100, y: 250, z: -15 }, { x: 700, y: 200, z: 35 },
  { x: 400, y: 380, z: 0 }
];

const Bird = ({ delay, branchPos }) => (
  <motion.g
    initial={{ x: -100, y: -100, opacity: 0, scale: 0.6 }}
    animate={{
      x: [ -100, branchPos.x - 20, branchPos.x, branchPos.x, branchPos.x + 300 ],
      y: [ 100, branchPos.y - 50, branchPos.y - 12, branchPos.y - 12, branchPos.y - 150 ],
      opacity: [0, 1, 1, 1, 0],
      scale: [0.6, 1.1, 1.2, 1.2, 0.6],
    }}
    transition={{
      duration: 12,
      delay: delay,
      times: [0, 0.2, 0.25, 0.8, 1],
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: Math.random() * 10 + 5
    }}
    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
  >
    <circle r="7" fill="#3b82f6" />
    <motion.g
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", delay: 3 }}
    >
      <circle cx="5" cy="-5" r="4" fill="#3b82f6" />
      <path d="M8,-5 L12,-4 L8,-3 Z" fill="#f59e0b" />
    </motion.g>
    <motion.path
      d="M-5,0 Q-12,-12 -2,-2"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      animate={{ d: ["M-5,0 Q-12,-12 -2,-2", "M-5,0 Q-12,12 -2,-2"] }}
      transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
    />
  </motion.g>
);

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

const ArchetypePage = ({ onNext }) => {
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const [zoomingArchetype, setZoomingArchetype] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [clickedArchetypes, setClickedArchetypes] = useState(new Set());

  const handleNext = () => {
    setIsExiting(true);
    setTimeout(() => {
      onNext?.();
    }, 800);
  };

  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isExiting ? { 
        opacity: 0, 
        scale: 0.95,
        y: 20
      } : { 
        opacity: 1,
        scale: 1,
        y: 0
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Spring Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${springBackground})` }}
      ></div>
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
              <filter id="roughBranch">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            <g transform="translate(0, 50)" style={{ transformStyle: "preserve-3d" }}>
              {/* Massive Detailed Trunk */}
              <motion.path
                d="M400,780 C400,680 380,550 400,400 C420,250 400,100 400,20"
                stroke="url(#trunkGrad)"
                strokeWidth="35"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{ transform: "translateZ(-30px)", filter: "url(#roughBranch)" }}
              />

              {/* Recursive Branching System */}
              {[
                // Primary branches (start growing as trunk passes their start point)
                { id: 'b1', d: "M400,500 C250,500 180,420 120,350", sw: 18, z: -10, delay: 1.0, dur: 1.2, end: 2.2 },
                { id: 'b2', d: "M400,450 C550,450 620,380 680,300", sw: 16, z: -10, delay: 1.2, dur: 1.2, end: 2.4 },
                { id: 'b3', d: "M400,300 C340,250 300,200 280,150", sw: 12, z: -20, delay: 1.5, dur: 1.0, end: 2.5 },
                { id: 'b4', d: "M400,250 C460,200 500,160 520,120", sw: 10, z: 10, delay: 1.7, dur: 1.0, end: 2.7 },
                { id: 'b5', d: "M400,650 C480,630 550,600 600,550", sw: 14, z: 15, delay: 0.6, dur: 1.0, end: 1.6 },
                { id: 'b6', d: "M400,600 C320,600 250,580 200,550", sw: 12, z: -5, delay: 0.8, dur: 1.0, end: 1.8 },
                { id: 'b7', d: "M400,420 Q410,400 400,380", sw: 8, z: 0, delay: 1.3, dur: 0.5, end: 1.8 },
                { id: 'b8', d: "M400,200 C400,150 400,80 400,30", sw: 10, z: 5, delay: 1.9, dur: 1.0, end: 2.9 },
                { id: 'b9', d: "M400,550 C450,550 420,520 400,500", sw: 14, z: 10, delay: 0.9, dur: 1.0, end: 1.9 },

                // Secondary branches (even more delicate)
                { id: 's1', d: "M120,350 C80,380 60,420 50,450", sw: 6, z: 0, delay: 2.2, dur: 0.8, end: 3.0 },
                { id: 's2', d: "M120,350 C110,300 105,270 100,250", sw: 4, z: 0, delay: 2.2, dur: 0.8, end: 3.0 },
                { id: 's3', d: "M680,300 C720,330 740,360 750,400", sw: 6, z: 10, delay: 2.4, dur: 0.8, end: 3.2 },
                { id: 's4', d: "M680,300 C690,260 695,230 700,200", sw: 4, z: 25, delay: 2.4, dur: 0.8, end: 3.2 },
                { id: 's5', d: "M280,150 C290,120 295,100 300,80", sw: 3, z: -5, delay: 2.5, dur: 0.8, end: 3.3 },
                { id: 's6', d: "M520,120 C510,90 505,75 500,60", sw: 3, z: 15, delay: 2.7, dur: 0.8, end: 3.5 },
                { id: 's7', d: "M520,120 C600,130 630,140 650,150", sw: 5, z: 20, delay: 2.7, dur: 0.8, end: 3.5 },
                { id: 's8', d: "M280,150 C200,160 170,180 150,200", sw: 5, z: 0, delay: 2.5, dur: 0.8, end: 3.3 },
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
                  style={{ transform: `translateZ(${b.z}px)`, filter: "url(#roughBranch)" }}
                />
              ))}

              {/* Animated Birds */}
              <Bird delay={5} branchPos={{ x: 120, y: 350 }} />
              <Bird delay={8} branchPos={{ x: 280, y: 150 }} />
              <Bird delay={12} branchPos={{ x: 680, y: 300 }} />
              <Bird delay={15} branchPos={{ x: 400, y: 30 }} />
              <Bird delay={18} branchPos={{ x: 600, y: 550 }} />
              <Bird delay={22} branchPos={{ x: 520, y: 120 }} />
              <Bird delay={25} branchPos={{ x: 200, y: 550 }} />
              <Bird delay={28} branchPos={{ x: 400, y: 500 }} />

              {/* Foliage/Blooms Backdrop */}
              {DECORATIVE_FLOWERS.map((pos, i) => (
                <g key={`cloud-${i}`} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z - 5}px)` }}>
                  <circle r="30" fill="#fbcfe8" opacity="0.15" filter="blur(20px)" />
                </g>
              ))}

              {/* Decorative Flowers (Static) */}
              {DECORATIVE_FLOWERS.map((f, i) => {
                // Timing lookup for the new spaced out coordinates
                const timings = [
                  { x: 50, y: 450, end: 3.0 }, { x: 750, y: 400, end: 3.2 }, { x: 300, y: 80, end: 3.3 },
                  { x: 500, y: 60, end: 3.5 }, { x: 400, y: 30, end: 2.9 }, { x: 200, y: 550, end: 1.8 },
                  { x: 600, y: 550, end: 1.6 }, { x: 100, y: 250, end: 3.0 }, { x: 700, y: 200, end: 3.2 },
                  { x: 400, y: 380, end: 1.8 }, { x: 400, y: 500, end: 1.9 }
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
                      <FlowerSVG isInteractive={false} size={0.5 + Math.random() * 0.3} />
                    </motion.g>
                  </g>
                );
              })}

              {/* Interactive Archetype Flowers */}
              {ARCHETYPES.map((arch, index) => {
                const branchEndTimes = { 1: 2.2, 2: 2.4, 3: 2.5, 4: 2.7, 5: 1.9 };
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
                            setClickedArchetypes(prev => new Set([...prev, arch.id]));
                          }, 800);
                        }} 
                        size={1.1}
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

      {/* Next Button - Only shows when all 5 archetypes have been clicked */}
      {clickedArchetypes.size === 5 && (
        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-1/2 -translate-x-1/2 z-40 px-4 py-2 bg-white/80 backdrop-blur-sm text-pink-600 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 border border-pink-200/50"
          style={{ bottom: '5%' }}
        >
          <span className="text-xs">Continue</span>
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ArchetypePage;
