
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LetterboxdWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  startX?: number;
  startY?: number;
}

const LetterboxdWindow: React.FC<LetterboxdWindowProps> = ({ onClose, onFocus, zIndex, startX, startY }) => {
  const baseWidth = 420;
  const baseHeight = 260;
  const [size, setSize] = useState({ width: baseWidth, height: baseHeight });

  const scale = useMemo(() => {
    return size.width / baseWidth;
  }, [size.width]);

  // Animation variants
  const variants = {
    initial: {
      opacity: 0,
      scale: 0.2,
      x: startX !== undefined ? startX - (window.innerWidth / 2) : 0,
      y: startY !== undefined ? startY - (window.innerHeight / 2) : 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      drag
      dragMomentum={false}
      onMouseDown={onFocus}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ 
        zIndex, 
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: size.width,
        height: size.height,
        position: 'absolute' 
      }}
      className="pointer-events-auto rounded-[14px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-[#14181c] flex flex-col border border-white/10 cursor-grab active:cursor-grabbing"
    >
      {/* Header */}
      <div 
        className="bg-[#1a2128] flex items-center justify-between border-b border-black/50 flex-shrink-0 select-none pointer-events-none"
        style={{ height: `${32 * scale}px`, padding: `0 ${12 * scale}px` }}
      >
        <div className="flex items-center" style={{ gap: `${6 * scale}px` }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="rounded-full bg-[#ff4d4d] border border-black/10 hover:brightness-90 transition-all pointer-events-auto"
              style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }}
            />
            <div className="rounded-full bg-[#ffb142] border border-black/10" style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }} />
            <div className="rounded-full bg-[#00e054] border border-black/10" style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }} />
        </div>
        <span className="text-gray-400 font-black tracking-widest uppercase" style={{ fontSize: `${10 * scale}px` }}>Favorites</span>
        <div style={{ width: `${32 * scale}px` }} />
      </div>

      {/* Body - Scaling handled by max-w/max-h full and flex items-center */}
      <div className="flex-1 p-6 bg-[#14181c] select-none pointer-events-none overflow-hidden relative" style={{ padding: `${24 * scale}px` }}>
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="https://i.imgur.com/vgNQxlL.png" 
            alt="Letterboxd Favorites" 
            className="max-w-full max-h-full object-contain rounded-sm shadow-lg ring-1 ring-white/5"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LetterboxdWindow;
