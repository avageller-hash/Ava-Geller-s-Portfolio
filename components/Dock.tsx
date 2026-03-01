import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';

/**
 * ICON COMPONENTS WITH PROVIDED IMAGE SOURCES
 */

const KindleIcon = () => (
  <div className="w-full h-full bg-[#000000] flex items-center justify-center rounded-xl shadow-inner border border-white/10 overflow-hidden relative">
    <img 
      src="https://www.beatle.net/wp-content/uploads/kindle-icon.jpg" 
      alt="Kindle" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none z-10" />
  </div>
);

const InDesignIcon = () => (
  <div className="w-full h-full bg-[#49021f] flex items-center justify-center rounded-xl shadow-inner border border-white/10 overflow-hidden relative">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Adobe_InDesign_CC_icon.svg/3840px-Adobe_InDesign_CC_icon.svg.png" 
      alt="InDesign" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none z-10" />
  </div>
);

const LetterboxdIcon = () => (
  <div className="w-full h-full bg-[#14181c] flex items-center justify-center rounded-xl shadow-inner border border-white/10 overflow-hidden relative">
    <img 
      src="https://play-lh.googleusercontent.com/PFcm5Ne2otuXxkCNgql_XtpHjYrlhIGGQRFaz9XLFg2wikmMP5YCv_OsvFe1PLDAvGg" 
      alt="Letterboxd" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none z-10" />
  </div>
);

const ErrorIcon = () => (
  <div className="w-full h-full flex items-center justify-center relative p-[5%] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
      {/* Outer Glow/Border for the rounded triangle */}
      <path 
        d="M50 15 L88 82 C90 86 88 90 84 90 L16 90 C12 90 10 86 12 82 L50 15 Z" 
        fill="white"
        stroke="white"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      {/* Inner Color */}
      <path 
        d="M50 15 L88 82 C90 86 88 90 84 90 L16 90 C12 90 10 86 12 82 L50 15 Z" 
        fill="#FFCC00" 
        stroke="#FFCC00"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="46.5" y="42" width="7" height="26" rx="3.5" fill="white" />
      <circle cx="50" cy="80" r="4.5" fill="white" />
    </svg>
  </div>
);

const NotesIcon = () => (
  <div className="w-full h-full bg-white flex items-center justify-center rounded-xl shadow-inner border border-white/10 overflow-hidden relative">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Notes_icon.svg/3840px-Apple_Notes_icon.svg.png" 
      alt="Notes" 
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none z-10" />
  </div>
);

const PhotosIcon = () => (
  <div className="w-full h-full bg-white flex items-center justify-center rounded-xl shadow-inner border border-white/10 overflow-hidden relative p-[5%]">
    <img 
      src="https://iconape.com/wp-content/files/gv/283379/svg/283379.svg" 
      alt="Photos" 
      className="w-full h-full object-contain"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none z-10" />
  </div>
);

const LinkedInIcon = () => (
  <div className="w-full h-full bg-[#0077b5] flex items-center justify-center rounded-xl shadow-inner border border-white/10 overflow-hidden relative p-[5%]">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" 
      alt="LinkedIn" 
      className="w-full h-full object-contain"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-xl pointer-events-none z-10" />
  </div>
);

const MailIcon = () => (
  <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden relative">
    <img 
      src="https://support.apple.com/content/dam/edam/applecare/images/en_US/psp/psp_heroes/mini-hero-mail.png" 
      alt="Mail" 
      className="w-full h-full object-cover"
    />
  </div>
);

const TrashIcon = () => (
  <div className="w-full h-full flex items-center justify-center relative p-[6%] drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="trash-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.25)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
        </linearGradient>
        <linearGradient id="rim-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      
      <ellipse cx="50" cy="22" rx="28" ry="7" fill="rgba(200, 200, 200, 0.3)" />

      <path d="M42 85 L58 88 L55 70 Z" fill="rgba(255, 255, 255, 0.6)" transform="rotate(5, 50, 85)" />
      <path d="M48 88 L60 85 L58 75 Z" fill="rgba(255, 255, 255, 0.4)" transform="rotate(-10, 50, 85)" />

      <path 
        d="M22 22 L78 22 L72 90 C71 94 68 96 64 96 L36 96 C32 96 29 94 28 90 L22 22 Z" 
        fill="url(#trash-body)"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="1"
      />

      {[32, 41, 50, 59, 68].map((x, i) => (
        <line 
          key={i}
          x1={x} 
          y1="25" 
          x2={x + (x - 50) * 0.1} 
          y2="92" 
          stroke="rgba(255, 255, 255, 0.35)" 
          strokeWidth="1.2" 
        />
      ))}

      <ellipse cx="50" cy="22" rx="28" ry="7" fill="none" stroke="url(#rim-grad)" strokeWidth="2.5" />
      <ellipse cx="50" cy="22" rx="27.5" ry="6.5" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="0.5" />
      
      <path d="M24 24 L30 85" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

interface DockProps {
  onOpen: (id: string, title: string) => void;
  openIds: string[];
}

interface DockIconItemProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const DockIconItem: React.FC<DockIconItemProps> = ({ title, children, isActive, onClick }) => {
  const [isBouncing, setIsBouncing] = useState(false);

  // Fixed size to prevent "bouncing around" on hover
  const iconSize = 54;

  const handleIconClick = () => {
    setIsBouncing(true);
    onClick();
    setTimeout(() => setIsBouncing(false), 600);
  };

  return (
    <div className="flex flex-col items-center justify-end h-full pb-2">
      <motion.div
        style={{ width: iconSize, height: iconSize, y: isBouncing ? -15 : 0 }}
        onClick={handleIconClick}
        animate={isBouncing ? {
          y: [-15, 0, -8, 0],
          transition: { duration: 0.6, times: [0, 0.4, 0.7, 1] }
        } : { y: 0 }}
        className="flex items-center justify-center relative group cursor-pointer"
      >
        <div className="w-full h-full flex items-center justify-center pointer-events-none drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]">
          {children}
        </div>
        
        <AnimatePresence>
          <motion.div 
            className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-800/90 backdrop-blur-md text-white text-[12px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl"
          >
            {title}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800/90 rotate-45" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Active Indicator Dot */}
      <div className="h-1 flex items-center justify-center">
        <motion.div 
           animate={{ opacity: isActive ? 1 : 0 }}
           className="w-1 h-1 rounded-full bg-gray-800/80 shadow-[0_0_2px_rgba(0,0,0,0.2)]" 
        />
      </div>
    </div>
  );
};

type DockAppItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  type?: 'app';
};

type DockDividerItem = {
  id: string;
  type: 'divider';
  title?: undefined;
  icon?: undefined;
};

type DockItem = DockAppItem | DockDividerItem;

const Dock: React.FC<DockProps> = ({ onOpen, openIds }) => {
  const DOCK_ITEMS: DockItem[] = [
    { id: 'kindle', title: 'Kindle', icon: <KindleIcon /> },
    { id: 'id', title: 'InDesign', icon: <InDesignIcon /> },
    { id: 'letterboxd', title: 'Letterboxd', icon: <LetterboxdIcon /> },
    { id: 'error', title: 'Error', icon: <ErrorIcon /> },
    { id: 'divider-1', type: 'divider' },
    { id: 'notes', title: 'Notes', icon: <NotesIcon /> },
    { id: 'photos', title: 'Photos', icon: <PhotosIcon /> },
    { id: 'divider-2', type: 'divider' },
    { id: 'linkedin', title: 'LinkedIn', icon: <LinkedInIcon /> },
    { id: 'mail', title: 'Mail', icon: <MailIcon /> },
    { id: 'divider-3', type: 'divider' },
    { id: 'trash', title: 'bin of stuff', icon: <TrashIcon /> },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center items-center pointer-events-none z-[9999]">
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="pointer-events-auto"
      >
        <motion.div 
          className="px-3 flex gap-1 items-end h-[74px] rounded-[24px] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)]"
        >
          {DOCK_ITEMS.map((item) => {
            if (item.type === 'divider') {
              return (
                <div key={item.id} className="w-[1px] h-[55%] bg-black/5 mx-1 mb-[18px]" style={{ alignSelf: 'center' }} />
              );
            }
            const appItem = item as DockAppItem;
            return (
              <DockIconItem 
                key={appItem.id} 
                title={appItem.title} 
                isActive={openIds.includes(appItem.id)}
                onClick={() => onOpen(appItem.id, appItem.title)}
              >
                {appItem.icon}
              </DockIconItem>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dock;