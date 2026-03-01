import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface AdobeErrorProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  initialX?: number;
  initialY?: number;
}

const AdobeError: React.FC<AdobeErrorProps> = ({ onClose, onFocus, zIndex, initialX = 100, initialY = 100 }) => {
  const baseWidth = 260;
  const baseHeight = 125;
  const [size, setSize] = useState({ width: baseWidth, height: baseHeight });

  const scale = useMemo(() => {
    return size.width / baseWidth;
  }, [size.width]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onMouseDown={onFocus}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ 
        zIndex, 
        left: initialX, 
        top: initialY, 
        width: size.width,
        height: size.height,
        position: 'absolute' 
      }}
      className="pointer-events-auto rounded-[12px] overflow-hidden shadow-[0_15px_35px_-8px_rgba(0,0,0,0.6)] bg-[#2C2C2C] flex flex-col border border-white/5 cursor-grab active:cursor-grabbing relative"
    >
      {/* Header */}
      <div 
        className="bg-[#3B3B3B] flex items-center justify-center border-b border-black/20 flex-shrink-0 select-none pointer-events-none"
        style={{ height: `${24 * scale}px` }}
      >
        <span className="text-gray-400 font-sans tracking-tight" style={{ fontSize: `${9 * scale}px` }}>Adobe Error</span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-between select-none" style={{ padding: `${14 * scale}px` }}>
        <div className="flex items-start gap-3 pointer-events-none" style={{ gap: `${12 * scale}px` }}>
          <div className="flex-shrink-0 pt-0.5">
            <div style={{ width: `${28 * scale}px`, height: `${28 * scale}px` }}>
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <path 
                  d="M50 15 L88 82 C90 86 88 90 84 90 L16 90 C12 90 10 86 12 82 L50 15 Z" 
                  fill="#FFCC00" 
                  stroke="#FFCC00"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <rect x="46.5" y="42" width="7" height="26" rx="3.5" fill="#1D1D1F" />
                <circle cx="50" cy="80" r="4.5" fill="#1D1D1F" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col text-white pt-0.5 overflow-hidden">
            <p className="leading-tight font-normal text-white truncate" style={{ fontSize: `${10 * scale}px` }}>
              College student positioned for work.
            </p>
            <p className="leading-tight font-normal text-white truncate" style={{ fontSize: `${10 * scale}px` }}>
              Missing variable = start date.
            </p>
          </div>
        </div>

        <div className="flex justify-end pointer-events-auto">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="bg-[#3E63DD] hover:bg-[#4E73ED] text-white flex items-center justify-center rounded-md font-medium transition-colors shadow-lg active:scale-95 cursor-default flex-shrink-0"
            style={{ 
              width: `${90 * scale}px`, 
              height: `${26 * scale}px`, 
              fontSize: `${9 * scale}px`,
              borderRadius: `${6 * scale}px`
            }}
          >
            Solve for X
          </button>
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
        className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-50 flex items-end justify-end p-1 group"
      >
        <div className="w-1 h-1 border-r border-b border-white/20 group-hover:border-white/40 transition-colors" />
      </motion.div>
    </motion.div>
  );
};

export default AdobeError;