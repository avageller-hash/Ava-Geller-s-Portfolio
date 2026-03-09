import React, { useState, useMemo } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { windowSpring, entryAnimation } from '../constants';

interface WindowProps {
  id: string;
  title: string;
  type?: 'project' | 'app' | 'folder';
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  startX?: number;
  startY?: number;
  width?: number | string;
  height?: number | string;
  maxHeight?: string | number;
  aspectRatio?: number;
  overflowVisible?: boolean;
  style?: React.CSSProperties;
  noScroll?: boolean;
}

const Window: React.FC<WindowProps> = ({ 
  id,
  title, 
  type = 'project',
  children, 
  onClose, 
  onFocus, 
  zIndex,
  startX,
  startY,
  width,
  height,
  maxHeight,
  aspectRatio,
  overflowVisible = false,
  style: customStyle,
  noScroll = false
}) => {
  const dragControls = useDragControls();
  
  // Base sizes if not provided
  const baseWidth = width || (type === 'project' || type === 'folder' ? 640 : 800);
  const baseHeight = height || (type === 'project' || type === 'folder' ? 540 : 600);

  // Calculate scale factor relative to initial size
  const scaleFactor = typeof baseWidth === 'number' ? Math.max(0.7, baseWidth / 640) : 1;

  // Project windows use the "Information about: " prefix as seen in Finder
  const displayTitle = type === 'project' || type === 'folder' ? `Information about: ${title}` : title;

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
      transition={windowSpring}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={onFocus}
      onMouseDown={onFocus}
      style={{ 
        zIndex,
        left: '50%',
        top: '45%',
        translateX: '-50%',
        translateY: '-50%',
        width: baseWidth,
        height: height ? height : 'fit-content',
        maxWidth: '95vw',
        maxHeight: maxHeight || '75vh',
        position: 'absolute',
        touchAction: 'none',
        overflow: overflowVisible ? 'visible' : 'hidden',
        // Pass scale factor to CSS for dynamic adjustments if needed
        //@ts-ignore
        '--window-scale': scaleFactor,
        ...customStyle
      }}
      className={`flex flex-col rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.45),0_10px_30px_-10px_rgba(0,0,0,0.2)] backdrop-blur-[20px] bg-white/75`}
    >
      {/* Header Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className={`h-12 flex items-center px-4 border-b border-black/40 select-none cursor-default active:cursor-grabbing flex-shrink-0 bg-transparent`}
      >
        <div className="flex gap-2 w-24">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/10 flex items-center justify-center transition-all hover:brightness-90 active:scale-90 group relative"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-950/60 z-10">×</span>
          </button>
        </div>
        
        <div className="flex-1 text-left px-2">
          <span className={`text-[14px] font-medium tracking-tight text-[#1d1d1f]/70`}>
            {displayTitle}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div 
        className={`flex-1 ${overflowVisible ? 'overflow-visible' : 'overflow-hidden'} relative`}
      >
        {!overflowVisible && (
          <style dangerouslySetInnerHTML={{ __html: `
            .scroll-window::-webkit-scrollbar { width: ${Math.max(4, 4 * scaleFactor)}px; height: ${Math.max(4, 4 * scaleFactor)}px; }
            .scroll-window::-webkit-scrollbar-track { background: transparent; }
            .scroll-window::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
          `}} />
        )}
        <div className={`h-full ${noScroll ? '' : 'pb-8'} ${overflowVisible ? 'overflow-visible' : noScroll ? 'overflow-hidden' : 'overflow-y-auto scroll-window'}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;