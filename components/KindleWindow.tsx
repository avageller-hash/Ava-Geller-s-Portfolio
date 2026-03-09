
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, MoreVertical, Filter, ListFilter, CheckCircle2, ChevronDown } from 'lucide-react';

interface KindleWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  startX?: number;
  startY?: number;
}

const BookCover = ({ title, author, badge, progress, image, scale = 1, contain = false }: { title: string, author?: string, badge?: string, progress?: string, image?: string, scale?: number, contain?: boolean }) => (
  <div className="flex flex-col gap-1 relative group cursor-pointer" style={{ gap: `${scale * 0.25}rem` }}>
    <div className="aspect-[3/4] bg-white shadow-md border border-black/5 rounded-sm overflow-hidden relative">
      {image ? (
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full ${contain ? 'object-contain p-1.5' : 'object-cover'} brightness-110 contrast-[1.2] mix-blend-multiply`} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add('bg-gray-100');
          }}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex flex-col p-2 justify-center items-center text-center bg-gray-50">
          <span className="font-black leading-tight uppercase tracking-tighter" style={{ fontSize: `${scale * 10}px` }}>{title}</span>
          {author && <span className="text-gray-500 mt-1 uppercase" style={{ fontSize: `${scale * 7}px` }}>{author}</span>}
        </div>
      )}
      
      {badge === 'Read' && (
        <div className="absolute top-0 right-0 overflow-hidden" style={{ width: `${scale * 48}px`, height: `${scale * 48}px` }}>
          <div 
            className="absolute bg-black text-white font-black uppercase rotate-45 shadow-sm text-center"
            style={{ 
              top: `${scale * 6}px`, 
              right: `-${scale * 14}px`, 
              fontSize: `${scale * 7}px`,
              padding: `${scale * 2}px ${scale * 16}px`
            }}
          >
            Read
          </div>
        </div>
      )}

      {progress && (
        <div 
          className="absolute bg-black/85 text-white rounded-sm font-bold shadow-sm"
          style={{ 
            top: `${scale * 4}px`, 
            right: `${scale * 4}px`, 
            fontSize: `${scale * 7}px`,
            padding: `${scale * 2}px ${scale * 6}px`
          }}
        >
          {progress}
        </div>
      )}

      <div className="absolute bg-white rounded-full p-[0.5px]" style={{ bottom: `${scale * 4}px`, left: `${scale * 4}px` }}>
        <CheckCircle2 size={Math.max(8, 12 * scale)} className="text-black" fill="white" strokeWidth={3} />
      </div>

      <div className="absolute bg-white/80 rounded-sm p-[0.5px]" style={{ bottom: `${scale * 4}px`, right: `${scale * 4}px` }}>
        <MoreVertical size={Math.max(8, 12 * scale)} className="text-black" strokeWidth={3} />
      </div>
    </div>
  </div>
);

const KindleWindow: React.FC<KindleWindowProps> = ({ onClose, onFocus, zIndex, startX, startY }) => {
  const baseWidth = 440;
  const baseHeight = 620;
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
      className="pointer-events-auto flex flex-col items-center group/kindle"
    >
      {/* MacOS Close Button */}
      <div className="absolute -top-4 -left-4 z-50">
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-6 h-6 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <span className="text-black font-bold text-sm">×</span>
        </button>
      </div>

      {/* Kindle Hardware Bezel */}
      <div className="w-full h-full bg-[#1a1a1a] rounded-[44px] p-2 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.1)] flex flex-col items-center cursor-grab active:cursor-grabbing relative">
        
        {/* Screen Area */}
        <div 
          className="w-[90%] h-[84%] bg-[#f5f5f5] mt-6 rounded-[4px] overflow-hidden flex flex-col select-none pointer-events-none shadow-inner border border-black/5"
          style={{ marginTop: `${Math.max(12, 24 * scale)}px` }}
        >
          
          {/* Status Bar */}
          <div 
            className="px-6 flex items-center justify-between text-black font-medium flex-shrink-0"
            style={{ height: `${40 * scale}px`, px: `${24 * scale}px` }}
          >
            <span style={{ fontSize: `${11 * scale}px` }}>10:17 AM</span>
            <div className="flex items-center gap-2" style={{ gap: `${8 * scale}px` }}>
              <svg style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              <svg style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6.5 6.5h11l-5.5 11z"/></svg>
              <svg style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/></svg>
              <div className="flex items-center gap-1">
                <span style={{ fontSize: `${10 * scale}px` }}>10 %</span>
                <div 
                  className="border-2 border-black/30 rounded-sm relative p-0.5"
                  style={{ width: `${24 * scale}px`, height: `${12 * scale}px`, borderWidth: `${Math.max(1, 2 * scale)}px` }}
                >
                  <div className="h-full bg-black/60 w-1/4 rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Header */}
          <div className="px-6 py-2 flex flex-col gap-4 flex-shrink-0" style={{ gap: `${16 * scale}px`, padding: `${8 * scale}px ${24 * scale}px` }}>
            <div className="flex items-center gap-4" style={{ gap: `${16 * scale}px` }}>
              <div 
                className="flex-1 bg-white rounded-full border border-black/10 flex items-center px-4 gap-3 shadow-sm"
                style={{ height: `${40 * scale}px`, px: `${16 * scale}px`, gap: `${12 * scale}px` }}
              >
                <Search size={16 * scale} className="text-black/40" />
                <span className="text-black/40 font-medium" style={{ fontSize: `${14 * scale}px` }}>Search Kindle</span>
              </div>
              <ShoppingCart size={20 * scale} className="text-black" />
              <MoreVertical size={20 * scale} className="text-black" />
            </div>

            <div className="flex items-center justify-between py-1 border-b border-black/5" style={{ padding: `${4 * scale}px 0` }}>
              <Filter size={18 * scale} className="text-black" />
              <ListFilter size={18 * scale} className="text-black" />
            </div>
          </div>

          {/* Library Grid */}
          <div 
            className="flex-1 px-6 pt-2 overflow-y-auto grid grid-cols-3 content-start relative"
            style={{ 
              padding: `${8 * scale}px ${24 * scale}px`,
              gap: `${16 * scale}px`,
              columnGap: `${24 * scale}px`
            }}
          >
            <BookCover 
              title="A People's History of the United States" 
              author="Howard Zinn" 
              badge="Read" 
              scale={scale}
              image="https://m.media-amazon.com/images/I/71IW7f9kpLL._AC_UF1000,1000_QL80_.jpg"
            />
            <BookCover 
              title="The Dead Zone" 
              author="Stephen King"
              progress="25%" 
              scale={scale}
              image="https://m.media-amazon.com/images/I/71Zb-D8NaGL._AC_UF1000,1000_QL80_.jpg"
            />
            <BookCover 
              title="A Little Life" 
              author="Hanya Yanagihara" 
              progress="5%" 
              scale={scale}
              image="https://m.media-amazon.com/images/I/71EthOFfhAL._AC_UF1000,1000_QL80_.jpg"
            />
            <BookCover 
              title="Vacationland" 
              author="John Hodgman" 
              scale={scale}
              image="https://m.media-amazon.com/images/I/914EiU2QImL._AC_UF1000,1000_QL80_.jpg"
            />
            <BookCover 
              title="Moonglow" 
              author="Michael Chabon" 
              badge="Read"
              scale={scale}
              image="https://m.media-amazon.com/images/I/71FvtJvTkRL._AC_UF1000,1000_QL80_.jpg"
            />
            <BookCover 
              title="A Gentleman In Moscow" 
              author="Amor Towles" 
              progress="50%" 
              scale={scale}
              image="https://m.media-amazon.com/images/I/51zU0Zk9zLL._AC_UF1000,1000_QL80_.jpg"
            />

            {/* Scroll Bar Indicator */}
            <div className="absolute right-2 top-4 bottom-4 w-1 bg-black/5 rounded-full overflow-hidden">
              <div className="w-full h-1/3 bg-black/20 rounded-full mt-4" />
            </div>
          </div>

          {/* Bottom Nav */}
          <div 
            className="border-t border-black/10 grid grid-cols-3 items-center flex-shrink-0"
            style={{ height: `${64 * scale}px` }}
          >
            <button className="font-bold text-black uppercase tracking-widest" style={{ fontSize: `${14 * scale}px` }}>Home</button>
            <div className="flex justify-center">
               <div 
                 className="bg-white border border-black/10 shadow-md p-1 scale-90 translate-y-[-10%] rounded-[1px] relative overflow-hidden"
                 style={{ width: `${40 * scale}px`, height: `${56 * scale}px`, padding: `${4 * scale}px` }}
               >
                 <img src="https://m.media-amazon.com/images/I/71IW7f9kpLL._AC_UF1000,1000_QL80_.jpg" className="w-full h-full object-cover opacity-80" alt="mini-cover" />
               </div>
            </div>
            <button className="font-bold text-black uppercase tracking-widest relative" style={{ fontSize: `${14 * scale}px` }}>
              Library
              <div 
                className="absolute left-1/2 -translate-x-1/2 bg-black" 
                style={{ bottom: `-${10 * scale}px`, width: `${32 * scale}px`, height: `${2 * scale}px` }}
              />
            </button>
          </div>
        </div>

        {/* Kindle Hardware Logo */}
        <div className="flex-1 w-full flex items-center justify-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_Kindle_logo.svg/2560px-Amazon_Kindle_logo.svg.png" 
            className="opacity-20 grayscale brightness-0 invert select-none pointer-events-none"
            style={{ height: `${18 * scale}px`, objectFit: 'contain' }}
            alt="kindle logo"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default KindleWindow;
