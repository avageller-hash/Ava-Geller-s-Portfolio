
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { iconSpring } from '../constants';

interface DesktopIconProps {
  id: string;
  title: string;
  iconSrc: string;
  x: number; // percentage
  y: number; // percentage
  orientation?: 'vertical' | 'horizontal';
  type?: 'file' | 'folder';
  isProminent?: boolean;
  onClick: (startX: number, startY: number) => void;
  onFocus?: () => void;
  onDragEnd?: (id: string, newX: number, newY: number) => void;
  zIndex?: number;
  containerRef: React.RefObject<HTMLDivElement>;
  isDimmed?: boolean;
  isViewed?: boolean;
}

const FolderIconGraphic = () => (
  <div className="w-full h-full relative flex items-center justify-center p-2">
    {/* Base of folder */}
    <div className="absolute inset-x-2 bottom-3 top-5 bg-[#7cc8ff] rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
    {/* Tab of folder */}
    <div className="absolute left-2 top-3 w-10 h-3 bg-[#7cc8ff] rounded-t-[2px]" />
    {/* Front panel of folder */}
    <div className="absolute inset-x-2 bottom-2 top-6 bg-gradient-to-b from-[#9dd5ff] to-[#5fb8ff] rounded-[2px] shadow-[0_4px_8_rgba(0,0,0,0.2)] border-t border-white/40" />
  </div>
);

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  id,
  title, 
  iconSrc, 
  x, 
  y, 
  orientation = 'vertical',
  type = 'file',
  isProminent = false,
  onClick, 
  onFocus,
  onDragEnd,
  zIndex = 30,
  containerRef,
  isDimmed = false,
  isViewed = false
}) => {
  const isDragging = useRef(false);

  const handleLaunch = () => {
    if (isDragging.current) return;
    onClick(x, y);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = (event: any, info: any) => {
    if (onDragEnd && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = ((info.point.x - rect.left) / rect.width) * 100;
      const newY = ((info.point.y - rect.top) / rect.height) * 100;
      onDragEnd(id, newX, newY);
    }

    // Tiny delay to ensure onTap doesn't fire if it was a drag
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  // Dimensions based on orientation/type
  const baseWidth = type === 'folder' ? 110 : (orientation === 'vertical' ? 95 : 135);
  const baseHeight = type === 'folder' ? 100 : (orientation === 'vertical' ? 125 : 95);
  
  const scaleFactor = isProminent ? 1.18 : 1;
  const width = baseWidth * scaleFactor;
  const height = baseHeight * scaleFactor;

  return (
    <motion.div
      // Logic triggers
      drag
      dragConstraints={containerRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseDown={onFocus}
      onTap={handleLaunch}
      
      // Animation & State
      initial={false}
      animate={{ 
        left: `${x}%`, 
        top: `${y}%`,
        opacity: isDimmed ? 0.4 : 1,
        filter: isDimmed ? 'grayscale(0.5) blur(1px)' : 'grayscale(0) blur(0px)',
        scale: isProminent ? 1.18 : 1,
        zIndex: zIndex
      }}
      whileHover="hovered"
      
      // Variants for the Parent
      variants={{
        hovered: { 
          scale: isProminent ? 1.23 : 1.05,
          zIndex: 4000 
        }
      }}
      
      // Specific transition for the growth effect
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 1
      }}
      
      // Interaction Styles
      whileTap={{ scale: 0.95 }}
      whileDrag={{ 
        scale: isProminent ? 1.25 : 1.1, 
        zIndex: 5000, 
        cursor: 'grabbing',
        opacity: 1,
        filter: 'grayscale(0) blur(0px)'
      }}
      
      style={{ 
        translateX: '-50%',
        translateY: '-50%',
        position: 'absolute',
        touchAction: 'none'
      }}
      className="flex flex-col items-center gap-3 cursor-pointer select-none group pointer-events-auto transition-opacity duration-500"
    >
      {/* Icon Container */}
      <div 
        className="relative"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* The Ghost Frame (Border) - Sharper edges rounded-sm */}
        <motion.div 
          className="absolute -inset-1 border-white/40 border-[1px] rounded-sm pointer-events-none"
          variants={{
            initial: { opacity: 0 },
            hovered: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Viewed State Dot */}
        {!isViewed && (
          <div className="absolute -top-1 -right-1 z-50">
            <div className="w-3 h-3 bg-[#007AFF] rounded-full shadow-[0_0_8px_rgba(0,122,255,0.8)] animate-pulse border border-white/40" />
          </div>
        )}
        
        {/* Icon Content Area */}
        {type === 'folder' ? (
          <div className="w-full h-full">
            <FolderIconGraphic />
          </div>
        ) : (
          <div className="relative w-full h-full p-[1px] shadow-[0_8px_20px_rgba(0,0,0,0.2)] rounded-[2px] bg-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[2px] border border-white/40 shadow-inner" />
            <div className="relative w-full h-full overflow-hidden bg-gray-50 rounded-[1px] pointer-events-none">
              <img 
                src={iconSrc} 
                alt={title} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[2px] pointer-events-none z-10" />
          </div>
        )}
      </div>

      {/* The Blue Label Pop */}
      <div className="flex justify-center w-[220px] pointer-events-none">
        <motion.span 
          className="font-bold text-white uppercase tracking-[0.12em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-2 py-0.5 rounded-[2px]"
          style={{ fontSize: isProminent ? '12px' : '10px' }}
          variants={{
            initial: { 
              backgroundColor: 'rgba(0,122,255,0)',
            },
            hovered: { 
              backgroundColor: '#007AFF',
            }
          }}
          transition={{
            backgroundColor: { duration: 0 }
          }}
        >
          {title}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default DesktopIcon;
