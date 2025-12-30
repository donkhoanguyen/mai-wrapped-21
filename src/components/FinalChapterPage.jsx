import React from 'react';
import { motion } from 'framer-motion';

import springImg from '../../visual_asset/spring_background.png';
import summerImg from '../../visual_asset/summer_background.png';
import fallImg from '../../visual_asset/fall_background.png';
import winterImg from '../../visual_asset/winter_background.png';

const Polaroid = ({ img, title, delay, rotation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation - 10 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ 
        duration: 1, 
        delay: delay,
        type: "spring",
        stiffness: 70,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0, 
        zIndex: 50,
        transition: { duration: 0.3 } 
      }}
      className="bg-white p-3 pb-12 shadow-[-8px_15px_30px_rgba(0,0,0,0.12)] relative w-48 md:w-60 lg:w-64 flex-shrink-0 border border-slate-100"
    >
      <div className="bg-slate-200 aspect-square overflow-hidden relative border border-slate-200">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 shadow-[inner_0_0_40px_rgba(0,0,0,0.08)] pointer-events-none" />
      </div>
      <div className="absolute bottom-3 left-0 right-0 text-center px-3">
        <div className="flex justify-between items-center text-[8px] md:text-[10px] text-slate-400 font-mono mb-1 px-1 opacity-50">
          <span>{title.toUpperCase()}</span>
          <span>2021-2025</span>
        </div>
        <p 
          className="text-slate-700 text-base md:text-xl lg:text-2xl"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Mùa {title === "Spring" ? "Xuân" : title === "Summer" ? "Hạ" : title === "Fall" ? "Thu" : "Đông"} rạng rỡ
        </p>
      </div>
    </motion.div>
  );
};

const FinalChapterPage = () => {
  const polaroids = [
    { img: springImg, title: "Spring", rotation: -3 },
    { img: summerImg, title: "Summer", rotation: 2 },
    { img: fallImg, title: "Fall", rotation: -1 },
    { img: winterImg, title: "Winter", rotation: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex flex-col items-center justify-center bg-[#fcfaf7] overflow-hidden"
    >
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      <div className="z-10 w-full px-4 flex flex-col items-center justify-center max-h-screen">
        {/* Polaroids Container */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 max-w-6xl">
          {polaroids.map((p, i) => (
            <Polaroid 
              key={i}
              img={p.img}
              title={p.title}
              delay={0.5 + i * 0.2}
              rotation={p.rotation}
            />
          ))}
        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="text-center relative"
        >
          <h1 
            className="text-3xl md:text-5xl lg:text-6xl text-slate-800 mb-4"
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              textShadow: "1px 1px 4px rgba(0,0,0,0.05)"
            }}
          >
            Mừng em mai 21 tuổi và<br />
            Khoa yêu Mai qua mọi mùa hoa
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 3, duration: 1.5 }}
            className="h-[1px] bg-slate-300 mx-auto mt-6"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            className="text-slate-400 font-mono text-[10px] tracking-[0.5em] mt-6 uppercase opacity-40"
          >
            For Pham Ngoc Mai only
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinalChapterPage;

