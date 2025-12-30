import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fallBackground from '../../visual_asset/fall_background.png';
import fallTrekHug from '../../visual_asset/fall_trek_hug.png';

const ActiveWish = ({ wish, x, y }) => {
  return (
    <motion.div
      initial={{ scale: 0, x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        y: `${y}vh`,
        x: `${x}vw`
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="absolute z-30 pointer-events-none whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
      style={{ left: 0, top: 0 }}
    >
      <span 
        className="text-white font-bold text-xl md:text-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] block"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {wish}
      </span>
    </motion.div>
  );
};

const AllMyWishesPage = ({ onNext }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [activeWishes, setActiveWishes] = useState([]);
  const [wishIndex, setWishIndex] = useState(0);

  const wishesPool = [
    "mãi luôn xinh đẹp",
    "rạng rỡ mỗi ngày",
    "được ăn ngon nhìu",
    "hạnh phúc bên anh",
    "học tập thật tốt",
    "không bị stress nhen",
    "du lịch muôn nơi",
    "ngủ ngon mỗi đêm",
    "cười thật nhìu nha",
    "vạn sự may mắn",
    "luôn là chính mình",
    "mãi yêu anh nhé",
    "luôn bình an",
    "sức khỏe dồi dào",
    "thành công rực rỡ"
  ];

  const handleContainerClick = (e) => {
    if (wishIndex >= wishesPool.length) return;
    if (e.target.tagName === 'BUTTON') return;

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    const newWish = {
      id: Date.now(),
      text: wishesPool[wishIndex],
      x,
      y
    };
    
    setActiveWishes(prev => [...prev, newWish]);
    setWishIndex(prev => prev + 1);
  };

  const isComplete = wishIndex >= wishesPool.length;

  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden font-sans ${!isComplete ? 'cursor-crosshair' : ''}`}
      initial={{ opacity: 0 }}
      animate={isExiting ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={handleContainerClick}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fallBackground})` }}
      />

      {/* Active Wishes (Clicked) */}
      {activeWishes.map((w) => (
        <ActiveWish 
          key={w.id} 
          wish={w.text} 
          x={w.x} 
          y={w.y} 
        />
      ))}

      {/* Main Visual Asset - Bottom Centered */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-serif italic text-white/90 drop-shadow-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            All My Wishes
          </h2>
          <div className="h-0.5 w-24 bg-white/40 mx-auto rounded-full" />
        </motion.div>

        <motion.img
          src={fallTrekHug}
          alt="Fall Trek Hug"
          className="max-h-[40vh] w-auto object-contain block"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Click Hint */}
      {!isComplete && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-10 left-1/2 -translate-x-1/2 text-white/70 font-serif italic text-sm pointer-events-none"
        >
          Click anywhere to reveal my wishes for you...
        </motion.div>
      )}

      {/* Final Chapter Button - Only shows when all wishes revealed */}
      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 right-8 z-50"
          >
            <motion.button
              onClick={() => {
                setIsExiting(true);
                setTimeout(onNext, 800);
              }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)", color: "#c2410c" }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/10 hover:bg-white backdrop-blur-md text-white px-8 py-3 rounded-full border border-white/40 transition-all text-sm font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              Final Chapter
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllMyWishesPage;

