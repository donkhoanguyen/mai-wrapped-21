import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ARCHETYPES = [
  {
    id: 1,
    title: "The Main Character",
    description: "Always iconic, turning every sidewalk into a runway.",
    color: "bg-pink-400",
    pos: { x: 220, y: 320 }
  },
  {
    id: 2,
    title: "The Joy Generator",
    description: "Lighting up every room with that smile.",
    color: "bg-yellow-400",
    pos: { x: 580, y: 280 }
  },
  {
    id: 3,
    title: "Professional Overthinker",
    description: "Calculating every possibility, but we love that brain.",
    color: "bg-blue-400",
    pos: { x: 320, y: 220 }
  },
  {
    id: 4,
    title: "The Sweetest Soul",
    description: "Kindness that makes the world softer.",
    color: "bg-green-400",
    pos: { x: 480, y: 200 }
  },
  {
    id: 5,
    title: "Adventure Ready",
    description: "Always down for a spontaneous trip or snack run.",
    color: "bg-orange-400",
    pos: { x: 400, y: 400 }
  }
];

const SakuraPetal = ({ delay }) => (
  <motion.div
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{ 
      y: "100vh", 
      opacity: [0, 1, 0], 
      rotate: 360,
      x: [0, 20, -20, 10, 0]
    }}
    transition={{ 
      duration: 8 + Math.random() * 5, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
    className="absolute w-2 h-2 bg-pink-200 rounded-full blur-[0.5px] pointer-events-none opacity-40"
    style={{ left: `${Math.random() * 100}%` }}
  />
);

const ArchetypePage = () => {
  const [selectedArchetype, setSelectedArchetype] = useState(null);

  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#e0f2fe] via-[#fdf2f8] to-[#f0fdf4]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <SakuraPetal key={i} delay={i * 0.25} />
        ))}
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center pt-20">
        {/* Title */}
        <div className="text-center z-10 mb-8">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl text-pink-600 font-serif tracking-widest drop-shadow-sm"
          >
            THE GARDEN OF MAI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-slate-400 mt-2 font-sans tracking-widest uppercase"
          >
            Find the hidden flowers on her tree
          </motion.p>
        </div>

        {/* The Tree Container */}
        <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center px-4">
          <svg viewBox="0 0 800 800" className="w-full h-full drop-shadow-2xl overflow-visible">
            {/* Artistic Tree Trunk & Branches */}
            <g className="tree-base">
              {/* Trunk with more detail */}
              <motion.path
                d="M400,750 C400,650 370,550 400,450 C430,350 400,300 400,200"
                stroke="#4a2c2a"
                strokeWidth="28"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.path
                d="M400,750 C410,650 380,550 410,450"
                stroke="#5d4037"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              />
              
              {/* Branches branching out to positions */}
              {/* Branch to 1 */}
              <motion.path
                d="M400,450 C350,450 300,400 220,320"
                stroke="#4a2c2a"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M280,380 C260,360 240,340 220,320"
                stroke="#5d4037"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />

              {/* Branch to 2 */}
              <motion.path
                d="M400,400 C450,400 550,350 580,280"
                stroke="#4a2c2a"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              {/* Branch to 3 */}
              <motion.path
                d="M400,300 C380,280 340,250 320,220"
                stroke="#4a2c2a"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              {/* Branch to 4 */}
              <motion.path
                d="M400,250 C420,230 460,220 480,200"
                stroke="#4a2c2a"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
              {/* Branch to 5 */}
              <motion.path
                d="M400,500 C420,480 430,420 400,400"
                stroke="#4a2c2a"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
              />

              {/* Decorative Small Branches / Twigs */}
              <motion.path d="M400,600 C350,580 320,550 300,520" stroke="#4a2c2a" strokeWidth="6" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }} />
              <motion.path d="M400,520 C450,500 480,450 500,420" stroke="#4a2c2a" strokeWidth="4" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.6 }} />
              <motion.path d="M250,350 C230,380 210,400 180,420" stroke="#4a2c2a" strokeWidth="4" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.7 }} />
            </g>

            {/* Decorative Leaves/Buds (Non-interactive) */}
            {[
              { x: 300, y: 520 }, { x: 500, y: 420 }, { x: 180, y: 420 },
              { x: 420, y: 650 }, { x: 380, y: 350 }, { x: 450, y: 300 }
            ].map((leaf, i) => (
              <motion.circle
                key={i}
                cx={leaf.x}
                cy={leaf.y}
                r="4"
                fill="#fbcfe8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + (i * 0.1) }}
              />
            ))}

            {/* Interactive Flowers - Perfectly Anchored */}
            {ARCHETYPES.map((arch, index) => (
              <g key={arch.id} transform={`translate(${arch.pos.x}, ${arch.pos.y})`}>
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + (index * 0.2), type: "spring" }}
                  whileHover={{ scale: 1.2 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedArchetype(arch)}
                >
                  {/* Flower Graphic */}
                  {/* Petals */}
                  {[0, 72, 144, 216, 288].map((rot) => (
                    <ellipse
                      key={rot}
                      rx="15"
                      ry="22"
                      fill="#f9a8d4"
                      transform={`rotate(${rot}) translate(0, -18)`}
                      className="opacity-90"
                    />
                  ))}
                  {/* Center */}
                  <circle r="8" fill="#fde047" />
                  
                  {/* Hidden Hit Area (Transparent Circle) */}
                  <circle r="40" fill="transparent" />
                </motion.g>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedArchetype && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArchetype(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative overflow-hidden text-center"
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${selectedArchetype.color}`} />
              
              <div className="w-24 h-24 bg-pink-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-inner">
                🌸
              </div>

              <h3 className="text-3xl font-serif text-slate-800 mb-4">{selectedArchetype.title}</h3>
              <p className="text-slate-500 font-sans leading-relaxed text-lg italic">
                "{selectedArchetype.description}"
              </p>

              <button 
                onClick={() => setSelectedArchetype(null)}
                className="mt-10 px-10 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-pink-200"
              >
                Lovely!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ArchetypePage;
