
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { iconSpring } from '../constants';

interface DesktopIconProps {
  id: string;
  index?: number;
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

interface Trajectory {
  start: { x: number; y: number; rotate: number };
  w1: { x: number; y: number; rotate: number };
  w2: { x: number; y: number; rotate: number };
  w3: { x: number; y: number; rotate: number };
}

const ENTRANCE_TRAJECTORIES: Trajectory[] = [
  // 0: Sneex Video Campaign (x: 31, y: 29) - floats in from top-left
  {
    start: { x: 18, y: -22, rotate: -12 },
    w1: { x: 35, y: 36, rotate: 6 },
    w2: { x: 26, y: 25, rotate: -3 },
    w3: { x: 33, y: 31, rotate: 1 },
  },
  // 1: Sneex Editorial (x: 52, y: 31) - floats in from top
  {
    start: { x: 49, y: -22, rotate: -8 },
    w1: { x: 47, y: 38, rotate: 6 },
    w2: { x: 56, y: 26, rotate: -3 },
    w3: { x: 50, y: 33, rotate: 1 },
  },
  // 2: Style Bundles Business (x: 71, y: 28) - floats in from top-right
  {
    start: { x: 108, y: 12, rotate: 12 },
    w1: { x: 65, y: 35, rotate: -7 },
    w2: { x: 76, y: 23, rotate: 4 },
    w3: { x: 68, y: 30, rotate: -1 },
  },
  // 3: Sneex Guerilla Marketing PM (x: 42, y: 47) - floats in from left
  {
    start: { x: -18, y: 43, rotate: -10 },
    w1: { x: 49, y: 41, rotate: 6 },
    w2: { x: 37, y: 52, rotate: -4 },
    w3: { x: 44, y: 45, rotate: 1 },
  },
  // 4: UGC & Video Content Portfolio (folder) (x: 61, y: 44) - floats in from top-right
  {
    start: { x: 80, y: -20, rotate: 10 },
    w1: { x: 55, y: 51, rotate: -6 },
    w2: { x: 66, y: 39, rotate: 3 },
    w3: { x: 58, y: 46, rotate: -1 },
  },
  // 5: Concept Movie Trailer (x: 83, y: 45) - floats in from right
  {
    start: { x: 120, y: 42, rotate: -12 },
    w1: { x: 76, y: 50, rotate: 6 },
    w2: { x: 88, y: 41, rotate: -3 },
    w3: { x: 81, y: 47, rotate: 1 },
  },
  // 6: Lead PM: Analog to AI (x: 29, y: 63) - floats in from bottom-left
  {
    start: { x: -20, y: 88, rotate: -14 },
    w1: { x: 36, y: 56, rotate: 7 },
    w2: { x: 24, y: 68, rotate: -4 },
    w3: { x: 31, y: 60, rotate: 2 },
  },
  // 7: The 04 Brand (x: 51, y: 61) - floats in from bottom
  {
    start: { x: 52, y: 122, rotate: 9 },
    w1: { x: 45, y: 54, rotate: -6 },
    w2: { x: 56, y: 66, rotate: 4 },
    w3: { x: 48, y: 58, rotate: -1 },
  },
  // 8: Contract Consultant for Draper Associates (x: 71, y: 63) - floats in from bottom-right
  {
    start: { x: 112, y: 92, rotate: 12 },
    w1: { x: 65, y: 57, rotate: -6 },
    w2: { x: 76, y: 68, rotate: 4 },
    w3: { x: 68, y: 60, rotate: -1 },
  },
];

const getTrajectory = (idx: number, targetX: number, targetY: number): Trajectory => {
  if (idx < ENTRANCE_TRAJECTORIES.length) {
    return ENTRANCE_TRAJECTORIES[idx];
  }
  const fromLeft = targetX < 50;
  const fromTop = targetY < 50;
  return {
    start: { x: fromLeft ? -20 : 120, y: fromTop ? -20 : 120, rotate: fromLeft ? -10 : 10 },
    w1: { x: targetX + (fromLeft ? 8 : -8), y: targetY + (fromTop ? 8 : -8), rotate: 5 },
    w2: { x: targetX + (fromLeft ? -4 : 4), y: targetY + (fromTop ? -4 : 4), rotate: -3 },
    w3: { x: targetX + (fromLeft ? 2 : -2), y: targetY + (fromTop ? 2 : -2), rotate: 1 },
  };
};

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
  index = 0,
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
  const [hasSettled, setHasSettled] = useState(false);

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

  const trajectory = getTrajectory(index, x, y);
  const baseScale = isProminent ? 1.18 : 1;

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
      
      // Floating Entry Animation and Settled State
      initial={{ 
        left: `${trajectory.start.x}%`, 
        top: `${trajectory.start.y}%`,
        opacity: 0,
        scale: 0.6,
        rotate: trajectory.start.rotate,
      }}
      animate={
        hasSettled
          ? { 
              left: `${x}%`, 
              top: `${y}%`,
              opacity: isDimmed ? 0.4 : 1,
              filter: isDimmed ? 'grayscale(0.5) blur(1px)' : 'grayscale(0) blur(0px)',
              scale: isProminent ? 1.18 : 1,
              rotate: 0,
              zIndex: zIndex
            }
          : {
              left: [
                `${trajectory.start.x}%`,
                `${trajectory.w1.x}%`,
                `${trajectory.w2.x}%`,
                `${trajectory.w3.x}%`,
                `${x}%`
              ],
              top: [
                `${trajectory.start.y}%`,
                `${trajectory.w1.y}%`,
                `${trajectory.w2.y}%`,
                `${trajectory.w3.y}%`,
                `${y}%`
              ],
              rotate: [
                trajectory.start.rotate,
                trajectory.w1.rotate,
                trajectory.w2.rotate,
                trajectory.w3.rotate,
                0
              ],
              scale: [0.6, baseScale * 1.08, baseScale * 0.97, baseScale * 1.02, baseScale],
              opacity: [0, 1, 1, 1, isDimmed ? 0.4 : 1],
              zIndex: zIndex
            }
      }
      transition={
        hasSettled
          ? {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 1
            }
          : {
              duration: 2.5,
              delay: 0.1 + (index * 0.14),
              times: [0, 0.42, 0.68, 0.88, 1],
              ease: "easeInOut"
            }
      }
      onAnimationComplete={() => {
        if (!hasSettled) {
          setHasSettled(true);
        }
      }}
      whileHover="hovered"
      
      // Variants for the Parent
      variants={{
        hovered: { 
          scale: isProminent ? 1.23 : 1.05,
          zIndex: 4000 
        }
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
