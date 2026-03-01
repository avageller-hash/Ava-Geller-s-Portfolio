
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';
import { windowSpring } from '../constants';

interface PageProps {
  title: string;
  content: string;
  image?: string;
  video?: string;
  note?: string;
  extraMedia?: { src: string; caption: string; type: 'image' | 'video' }[];
  isCover?: boolean;
}

const Page: React.FC<PageProps & { isBack?: boolean }> = ({ title, content, image, video, note, extraMedia, isCover, isBack }) => {
  return (
    <div className="w-full h-full bg-[#fdfdfd] shadow-inner relative overflow-y-auto p-8 flex flex-col">
      {/* Spine Shadow */}
      <div className={`absolute ${isBack ? 'right-0' : 'left-0'} top-0 bottom-0 w-12 bg-gradient-to-${isBack ? 'l' : 'r'} from-black/15 to-transparent pointer-events-none z-20`} />
      
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-10" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

      {isCover ? (
        <div className="absolute inset-0">
          <img src={image} alt="Front Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-end p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <h1 className="text-4xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl leading-none">Ava the Event Planner</h1>
          </div>
        </div>
      ) : (
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight border-b-2 border-black/10 pb-2">{title}</h2>
          
          <div className="space-y-4">
            <p className="text-lg text-black/80 font-medium leading-relaxed whitespace-pre-wrap">
              {content.split(/(\d+%|\$\d+\.?\d*k)/g).map((part, i) => {
                if (part.match(/\d+%|\$\d+\.?\d*k/)) {
                  return <span key={i} className="bg-yellow-200 px-1 rounded font-bold">{part}</span>;
                }
                return part;
              })}
            </p>
            
            {note && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 italic text-sm text-yellow-900 font-medium rounded-r-lg shadow-sm">
                {note}
              </div>
            )}
          </div>

          {image && !extraMedia && (
            <div className="rounded-xl overflow-hidden shadow-xl border border-black/10 transform hover:scale-[1.02] transition-transform duration-500">
              <img src={image} alt={title} className="w-full h-auto" referrerPolicy="no-referrer" />
            </div>
          )}

          {video && (
            <div className="rounded-xl overflow-hidden shadow-xl border border-black/10 bg-black aspect-video">
              <video src={video} className="w-full h-full object-cover" controls autoPlay loop muted playsInline />
            </div>
          )}

          {extraMedia && (
            <div className="grid grid-cols-2 gap-6 pt-4">
              {extraMedia.map((media, idx) => (
                <div key={idx} className="space-y-3 group">
                  <div className="rounded-xl overflow-hidden shadow-lg border border-black/10 aspect-square bg-gray-100 relative">
                    {media.type === 'video' ? (
                      <video src={media.src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                      <img src={media.src} alt={media.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/50 text-center leading-tight">{media.caption}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface EventPlannerBinderProps {
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  initialX?: number;
  initialY?: number;
}

const EventPlannerBinder: React.FC<EventPlannerBinderProps> = ({ zIndex, onClose, onFocus, initialX = 100, initialY = 50 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dragControls = useDragControls();

  const pages: PageProps[] = [
    {
      title: "01: The Assignment",
      content: "My boss asked me to plan a private AI networking night.\nThe goal: A high-impact, tactile experience for 20 Tier-1 investors and CEOs in LA.",
      image: "https://i.imgur.com/Jq6Tdpe.png"
    },
    {
      title: "02: Sourcing & Budgeting",
      content: "I managed the end-to-end logistics with a ~$3,000 budget. I scouted and secured 'The Dojo' venue and negotiated a custom contract with 'The Vesbar' - a vintage Italian Vespa sidecar converted into a mobile craft bar.",
      note: "Due to negotiations, I only ended up using $2.2/3k budget",
      image: "https://i.imgur.com/Odiz0U5.png"
    },
    {
      title: "03: Execution & Management",
      content: "I developed the full Run-of-Show and managed all on-site vendors. I transformed the venue into two zones: an 'Analog' fountain pen station and an 'AI' Intelligence Lab. I personally oversaw guest relations and distribution of the custom cocktail: a lavender-infused french 75 (since our logo is purple) :)",
      extraMedia: [
        { src: "https://i.imgur.com/7hkm2o0.mp4", caption: "my custom cocktail creation", type: 'video' },
        { src: "https://i.imgur.com/HX4G9gH.png", caption: "my boss!", type: 'image' },
        { src: "https://i.imgur.com/n05BJ0A.png", caption: "vintage pen station", type: 'image' },
        { src: "https://i.imgur.com/QUfab3Z.jpeg", caption: "close up of the menu", type: 'image' }
      ]
    },
    {
      title: "04: Impact",
      content: "The event resulted in a seamless execution with 93% attendance from targeted CEOs. Following the summit, we secured strategic follow-ups with high-value leads and captured high-quality content for the EQ.app socials.",
      note: "Project delivered on-time and under budget.",
      image: "https://i.imgur.com/2wICCyn.jpeg"
    }
  ];

  const totalPages = pages.length;

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={onFocus}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={windowSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        zIndex,
        position: 'absolute',
        left: initialX,
        top: initialY,
        touchAction: 'none',
        width: 'auto',
        height: '85vh',
        aspectRatio: '8.5/11',
      }}
      className="flex items-center justify-center select-none overflow-visible"
    >
      <div className="relative w-full h-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]">
        {/* Binder Content */}
        <div className="absolute inset-0 rounded-r-xl overflow-hidden border border-black/5 bg-white shadow-2xl">
           <Page {...pages[currentPage]} />
        </div>

        {/* Binder Spine Detail (Static) */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="absolute -left-6 top-2 bottom-2 w-6 bg-zinc-800 rounded-l-2xl shadow-2xl z-40 flex flex-col items-center justify-around py-10 border-r border-white/10 cursor-grab active:cursor-grabbing"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-zinc-600 shadow-inner border border-black/20" />
          ))}
        </div>

        {/* Drag Handle (The whole binder is draggable) */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="absolute inset-0 z-[5] cursor-grab active:cursor-grabbing"
        />

        {/* Flip Controls */}
        <div className="absolute bottom-6 right-6 z-50 flex gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); prevPage(); }}
            className="px-4 py-2 bg-black/80 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-colors shadow-lg backdrop-blur-sm"
          >
            Prev
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextPage(); }}
            className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors shadow-lg flex items-center gap-2"
          >
            Flip
          </button>
        </div>

        {/* Page Indicator */}
        <div className="absolute bottom-6 left-10 z-50">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>

        {/* Close Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center z-[100] hover:bg-red-50 transition-colors group"
            >
              <X className="w-4 h-4 text-black group-hover:text-red-500" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EventPlannerBinder;
