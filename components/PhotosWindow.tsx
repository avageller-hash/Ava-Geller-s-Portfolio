import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface PhotosWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  startX?: number;
  startY?: number;
}

const PhotosWindow: React.FC<PhotosWindowProps> = ({ onClose, onFocus, zIndex, startX, startY }) => {
  const baseWidth = 500;
  const baseHeight = 600;
  const [size, setSize] = useState({ width: baseWidth, height: baseHeight });

  const scale = useMemo(() => {
    return size.width / baseWidth;
  }, [size.width]);

  // Gallery content: rendered top-to-bottom in a 2-column grid.
  // Items appearing later in the array will be placed lower in the scroll view.
  const media = [
    { type: 'image', src: 'https://i.imgur.com/8sAxRcF.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/qzKcurm.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/sx2YCK8.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/EYLEXmO.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/Aq8dRaF.jpeg' }, // Swapped from last position (formerly index 15)
    { type: 'image', src: 'https://i.imgur.com/w5ViSXA.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/F7T0qVI.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/CWsV25W.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/0KDptbJ.jpeg' },
    { type: 'video', src: 'https://i.imgur.com/LYRiXGs.mp4' },
    { type: 'image', src: 'https://i.imgur.com/o25xjTA.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/s48mFIX.jpeg' },
    { type: 'video', src: 'https://i.imgur.com/HQF10Fw.mp4' },
    { type: 'image', src: 'https://i.imgur.com/oFaNPrP.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/2QlrhU2.jpeg' },
    { type: 'image', src: 'https://i.imgur.com/1Y6CVDD.jpeg' }, // Swapped from 3rd row left (formerly index 4)
  ];

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
      className="pointer-events-auto rounded-[14px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] bg-white flex flex-col border border-black/10 cursor-grab active:cursor-grabbing"
    >
      {/* Header */}
      <div 
        className="bg-gray-50/80 backdrop-blur-md flex items-center px-4 border-b border-black/5 flex-shrink-0 select-none"
        style={{ height: `${36 * scale}px` }}
      >
        <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 hover:brightness-90 transition-all pointer-events-auto"
              style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }}
            />
            <div className="rounded-full bg-[#FFBD2E] border border-black/10" style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }} />
            <div className="rounded-full bg-[#27C93F] border border-black/10" style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }} />
        </div>
        <div className="flex-1 text-center pr-12">
           <span className="text-black/60 font-semibold tracking-tight" style={{ fontSize: `${12 * scale}px` }}>Recents</span>
        </div>
      </div>

      {/* Scrollable Gallery - 2 Columns per row */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#F5F5F7] custom-scroll">
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        `}} />
        <div className="grid grid-cols-2 gap-3">
          {media.map((item, idx) => (
            <div key={idx} className="aspect-square bg-white rounded-lg shadow-sm border border-black/5 overflow-hidden flex items-center justify-center">
              {item.type === 'image' ? (
                <img src={item.src} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
              ) : (
                <video 
                  src={item.src} 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PhotosWindow;