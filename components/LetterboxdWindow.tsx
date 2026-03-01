
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface LetterboxdWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  initialX?: number;
  initialY?: number;
}

const LetterboxdWindow: React.FC<LetterboxdWindowProps> = ({ onClose, onFocus, zIndex, initialX = 150, initialY = 150 }) => {
  const baseWidth = 420;
  const baseHeight = 260;
  const [size, setSize] = useState({ width: baseWidth, height: baseHeight });

  const scale = useMemo(() => {
    return size.width / baseWidth;
  }, [size.width]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      onMouseDown={onFocus}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ 
        zIndex, 
        left: initialX, 
        top: initialY, 
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

      {/* Resize Handle */}
      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => {
          setSize(prev => ({
            width: Math.max(200, prev.width + info.delta.x),
            height: Math.max(100, prev.height + info.delta.y)
          }));
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 flex items-end justify-end p-1 group"
      >
        <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-white/10 group-hover:border-white/30 transition-colors" />
      </motion.div>
    </motion.div>
  );
};

export default LetterboxdWindow;
