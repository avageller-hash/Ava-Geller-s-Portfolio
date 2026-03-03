import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, MousePointer2, Type, Square, Eraser, PenTool, Hand, ZoomIn, Layers, Files, Settings2, Maximize2 } from 'lucide-react';

interface InDesignWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  startX?: number;
  startY?: number;
}

const InDesignWindow: React.FC<InDesignWindowProps> = ({ onClose, onFocus, zIndex, startX, startY }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isAutoFlipping, setIsAutoFlipping] = useState(false);
  // Reduced default size from 1200x800 to 900x650
  const [containerSize, setContainerSize] = useState({ width: 900, height: 650 });

  const rawPages = [
    'https://i.imgur.com/8FJaFIQ.png', // cover (0) - Updated cover image per request
    'https://i.imgur.com/4tBfHQc.png',  // p1 (1)
    'https://i.imgur.com/9EuVgvc.png',  // p2 (2)
    'https://i.imgur.com/Oetlv4D.jpeg', // p3 (3)
    'https://i.imgur.com/ebhD06v.jpeg', // p4 (4)
    'https://i.imgur.com/1Z9cZXR.jpeg', // p5 (5)
    'https://i.imgur.com/Wbz2l5u.jpeg', // p6 (6)
    'https://i.imgur.com/Wel9xWA.jpeg', // p7 (7)
    'https://i.imgur.com/l10G572.jpeg', // p8 (8)
    'https://i.imgur.com/rp6CAdX.jpeg', // p9 (9)
    'https://i.imgur.com/BBRHeXn.jpeg', // p10 (10)
  ];

  const spreads = useMemo(() => [
    { left: null, right: rawPages[0], label: "Cover" },
    { left: rawPages[1], right: rawPages[2], label: "Spread 1-2" },
    { left: rawPages[3], right: rawPages[4], label: "Spread 3-4" },
    { left: rawPages[5], right: rawPages[6], label: "Spread 5-6" },
    { left: rawPages[7], right: rawPages[8], label: "Spread 7-8" },
    { left: rawPages[9], right: rawPages[10], label: "Back Cover" },
  ], [rawPages]);

  const handleNext = () => {
    if (currentSpread < spreads.length - 1) {
      setCurrentSpread(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      setCurrentSpread(prev => prev - 1);
    }
  };

  const isCover = !spreads[currentSpread].left;
  const isBack = !spreads[currentSpread].right;

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
      style={{ 
        zIndex, 
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: containerSize.width,
        height: containerSize.height,
        position: 'absolute',
      }}
      className="pointer-events-auto flex flex-col rounded-xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] bg-[#2c2c2c] border border-white/10 group/indesign cursor-default"
    >
      {/* Top Application Bar */}
      <div className="h-9 bg-[#3c3c3c] border-b border-black flex items-center justify-between px-3 select-none">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 mr-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 hover:brightness-110" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
          </div>
          <div className="flex items-center gap-3 text-[10px] font-medium text-gray-300 tracking-wide">
            <span className="text-white">InDesign 2024</span>
            <span className="opacity-40 hover:opacity-100 cursor-pointer hidden sm:inline">File</span>
            <span className="opacity-40 hover:opacity-100 cursor-pointer hidden sm:inline">Edit</span>
            <span className="opacity-40 hover:opacity-100 cursor-pointer hidden md:inline">Layout</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-1.5 py-0.5 rounded bg-black/20 border border-white/5 flex items-center">
             <span className="text-[9px] text-blue-400 font-bold uppercase tracking-tighter">GPU</span>
           </div>
           <button onClick={() => setIsAutoFlipping(!isAutoFlipping)} className="text-gray-400 hover:text-white">
              {isAutoFlipping ? <Pause size={12} /> : <Play size={12} />}
           </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar - Compact */}
        <div className="w-9 bg-[#3c3c3c] border-r border-black flex flex-col items-center py-3 gap-3 text-gray-400">
           <MousePointer2 size={14} className="text-blue-500 bg-blue-500/10 p-1 rounded box-content" />
           <PenTool size={14} />
           <Type size={14} />
           <Square size={14} />
           <div className="w-5 h-px bg-white/5 my-1" />
           <Hand size={14} />
           <ZoomIn size={14} />
        </div>

        {/* Central Editing Pane (Pasteboard) */}
        <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden flex flex-col">
          {/* Rulers */}
          <div className="h-5 w-full bg-[#3c3c3c] border-b border-black flex items-end px-1 relative">
             <div className="absolute top-0 left-0 w-5 h-5 bg-[#3c3c3c] border-r border-black z-10" />
             <div className="flex-1 h-2 flex justify-between px-2 text-[7px] text-gray-500 font-mono overflow-hidden">
                {Array.from({length: 12}).map((_, i) => <span key={i}>{i * 100}</span>)}
             </div>
          </div>
          <div className="absolute left-0 top-5 bottom-0 w-5 bg-[#3c3c3c] border-r border-black flex flex-col items-end py-2 text-[7px] text-gray-500 font-mono">
              {Array.from({length: 12}).map((_, i) => <span key={i} className="-rotate-90 my-6">{i * 100}</span>)}
          </div>

          {/* The Magazine Spread Stage - Reduced Padding p-20 to p-10 */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
             
             {/* Center Caption */}
             <div className="mb-6 text-center max-w-md">
               <h3 className="text-xl font-medium text-white/90 tracking-tight leading-tight">
                 magazine i created based on my time studying abroad in paris
               </h3>
               <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-2 animate-pulse">
                 Click pages to flip
               </p>
             </div>

             {/* Instant Magazine Viewer */}
             <div 
                className="relative flex items-center justify-center"
                style={{
                  width: isCover || isBack ? '45%' : '85%',
                  height: '80%',
                }}
             >
                {/* Interaction Hotspots for Prev/Next */}
                <div 
                  onClick={() => { handlePrev(); setIsAutoFlipping(false); }} 
                  className={`absolute -left-16 inset-y-0 w-16 z-[200] cursor-pointer group/prev flex items-center justify-center ${currentSpread === 0 ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
                >
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/prev:opacity-100">
                      <Play size={12} className="rotate-180" />
                    </div>
                </div>
                <div 
                  onClick={() => { handleNext(); setIsAutoFlipping(false); }} 
                  className={`absolute -right-16 inset-y-0 w-16 z-[200] cursor-pointer group/next flex items-center justify-center ${currentSpread === spreads.length - 1 ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
                >
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/next:opacity-100">
                      <Play size={12} />
                    </div>
                </div>

                {/* Magazine Body */}
                <div 
                  className="w-full h-full flex relative cursor-pointer"
                  onClick={() => { handleNext(); setIsAutoFlipping(false); }}
                >
                  {spreads[currentSpread].left && (
                    <div className="flex-1 h-full relative overflow-hidden shadow-[15px_0_40px_rgba(0,0,0,0.7)] rounded-l-[1px]">
                      <img src={spreads[currentSpread].left!} className="w-full h-full object-cover select-none" alt="Left" />
                      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 via-transparent to-transparent" />
                    </div>
                  )}
                  {spreads[currentSpread].right && (
                    <div className={`flex-1 h-full relative overflow-hidden shadow-[-15px_0_40px_rgba(0,0,0,0.7)] ${spreads[currentSpread].left ? 'rounded-r-[1px]' : 'rounded-[1px]'}`}>
                      <img src={spreads[currentSpread].right!} className="w-full h-full object-cover select-none" alt="Right" />
                      {spreads[currentSpread].left && <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 via-transparent to-transparent" />}
                    </div>
                  )}
                  {!isCover && !isBack && <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[0.5px] bg-black/60 z-[90]" />}
                </div>
             </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="h-5 bg-[#3c3c3c] border-t border-black px-3 flex items-center justify-between text-[8px] text-gray-400 font-medium">
             <div className="flex items-center gap-3">
                <span>100% Zoom</span>
                <span>Spread {currentSpread + 1}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-green-500/80">● Correct</span>
             </div>
          </div>
        </div>

        {/* Right Panels - Compacted w-60 to w-48 */}
        <div className="w-48 bg-[#3c3c3c] border-l border-black flex flex-col">
           {/* Panel Headers */}
           <div className="flex bg-[#2c2c2c] p-0.5 gap-0.5">
              <div className="flex-1 h-7 bg-[#3c3c3c] flex items-center px-2 text-[9px] text-white font-bold border-t-2 border-blue-500">Info</div>
              <div className="flex-1 h-7 flex items-center px-2 text-[9px] text-gray-400 font-medium hover:bg-white/5">Pages</div>
           </div>
           
           {/* Properties Content */}
           <div className="p-3 space-y-5 overflow-y-auto custom-scroll-dark">
              <div className="space-y-2">
                 <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                    <Settings2 size={10} /> Transform
                 </div>
                 <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-black/20 p-1.5 border border-white/5 rounded">
                       <div className="text-[7px] text-gray-500 uppercase leading-none mb-1">W</div>
                       <div className="text-[10px] text-gray-300">210mm</div>
                    </div>
                    <div className="bg-black/20 p-1.5 border border-white/5 rounded">
                       <div className="text-[7px] text-gray-500 uppercase leading-none mb-1">H</div>
                       <div className="text-[10px] text-gray-300">297mm</div>
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                    <Files size={10} /> Spreads
                 </div>
                 <div className="grid grid-cols-2 gap-1.5">
                    {spreads.map((s, i) => (
                      <div 
                        key={i} 
                        onClick={() => { setCurrentSpread(i); setIsAutoFlipping(false); }}
                        className={`aspect-square bg-black/40 border-[1.5px] rounded cursor-pointer flex items-center justify-center relative overflow-hidden ${currentSpread === i ? 'border-blue-500' : 'border-white/5'}`}
                      >
                         <img src={s.right!} className="w-full h-full object-cover opacity-50" alt={`p${i}`} />
                         <span className="absolute text-[8px] font-bold text-white z-10">{i + 1}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                    <Layers size={10} /> Layers
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center justify-between px-1.5 py-1 bg-blue-500/10 rounded border border-blue-500/20 text-[9px] text-blue-300">
                       <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>Layout</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        .custom-scroll-dark::-webkit-scrollbar { width: 3px; }
        .custom-scroll-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll-dark::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
      `}</style>
    </motion.div>
  );
};

export default InDesignWindow;