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
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  aspectRatio?: number;
  overflowVisible?: boolean;
}

const Window: React.FC<WindowProps> = ({ 
  title, 
  type = 'project',
  children, 
  onClose, 
  onFocus, 
  zIndex,
  initialX = 200,
  initialY = 100,
  initialWidth,
  initialHeight,
  aspectRatio,
  overflowVisible = false
}) => {
  const dragControls = useDragControls();
  
  // Base sizes for ratio calculation
  const baseWidth = type === 'project' || type === 'folder' ? 640 : 800;
  const baseHeight = type === 'project' || type === 'folder' ? 540 : 600;

  const [size, setSize] = useState({ 
    width: initialWidth || baseWidth, 
    height: initialHeight || baseHeight 
  });

  // Calculate scale factor relative to initial size
  const scaleFactor = useMemo(() => {
    return Math.max(0.7, size.width / baseWidth);
  }, [size.width, baseWidth]);

  // Project windows use the "Information about: " prefix as seen in Finder
  const displayTitle = type === 'project' || type === 'folder' ? `Information about: ${title}` : title;

  return (
    <motion.div
      {...entryAnimation}
      transition={windowSpring}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={onFocus}
      onMouseDown={onFocus}
      style={{ 
        zIndex,
        left: initialX,
        top: initialY,
        width: size.width,
        height: size.height,
        position: 'absolute',
        touchAction: 'none',
        overflow: overflowVisible ? 'visible' : 'hidden',
        aspectRatio: aspectRatio ? `${aspectRatio}` : 'auto',
        // Pass scale factor to CSS for dynamic adjustments if needed
        //@ts-ignore
        '--window-scale': scaleFactor
      }}
      className={`flex flex-col rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.35)] border border-black/40 ring-[0.5px] ring-black/10 backdrop-blur-[20px] bg-white/75`}
    >
      {/* Header Bar */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className={`h-10 flex items-center px-4 border-b border-black/40 select-none cursor-default active:cursor-grabbing flex-shrink-0 bg-transparent`}
      >
        <div className="flex gap-2 w-24">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 flex items-center justify-center transition-all hover:brightness-90 active:scale-90 group relative"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-950/60 z-10">×</span>
          </button>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
        </div>
        
        <div className="flex-1 text-left px-2">
          <span className={`text-[13px] font-normal tracking-tight text-[#1D1D1F]/70`}>
            {displayTitle}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div 
        className={`flex-1 ${overflowVisible ? 'overflow-visible' : 'overflow-hidden'} relative`}
        style={{ fontSize: `${scaleFactor * 100}%` }}
      >
        {!overflowVisible && (
          <style dangerouslySetInnerHTML={{ __html: `
            .scroll-window::-webkit-scrollbar { width: ${Math.max(4, 4 * scaleFactor)}px; height: ${Math.max(4, 4 * scaleFactor)}px; }
            .scroll-window::-webkit-scrollbar-track { background: transparent; }
            .scroll-window::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
          `}} />
        )}
        <div className={`h-full ${overflowVisible ? 'overflow-visible' : 'overflow-y-auto scroll-window'}`}>
          {children}
        </div>
      </div>

      {/* Resize Handle */}
      <motion.div
        drag
        dragMomentum={false}
        onDrag={(e, info) => {
          setSize(prev => ({
            width: Math.max(300, prev.width + info.delta.x),
            height: Math.max(200, prev.height + info.delta.y)
          }));
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 flex items-end justify-end p-1 group"
      >
        <div className="w-2 h-2 border-r-[1px] border-b-[1px] border-black/40 rounded-br-[2px] group-hover:border-black/60 transition-colors" />
      </motion.div>
    </motion.div>
  );
};

export default Window;