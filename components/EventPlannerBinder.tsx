
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
  caption?: string;
  extraMedia?: { src: string; caption: string; type: 'image' | 'video' }[];
  isCover?: boolean;
}

const Page: React.FC<PageProps & { isBack?: boolean; pageNumber: number; totalPages: number }> = ({ title, content, image, video, note, caption, extraMedia, isCover, isBack, pageNumber, totalPages }) => {
  const renderContent = (text: string) => {
    // Smart Bolding logic
    const boldPhrases = [
      "My boss asked me to plan a private AI networking night.",
      "managed the end-to-end logistics",
      "The concept",
      "two zones",
      "custom lavender-infused french 75 cocktail",
      "seamless execution"
    ];

    let result: (string | React.ReactNode)[] = [text];

    boldPhrases.forEach(phrase => {
      const newResult: (string | React.ReactNode)[] = [];
      result.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          const split = part.split(regex);
          split.forEach((s, i) => {
            if (s.toLowerCase() === phrase.toLowerCase()) {
              newResult.push(<span key={phrase + i} className="font-bold">{s}</span>);
            } else if (s !== '') {
              newResult.push(s);
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });

    return result;
  };

  return (
    <div className="w-full min-h-full bg-[#fdfdfd] relative flex flex-col pb-32">
      {/* Binder Spine Detail (Static) */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center justify-around py-20 z-30 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-zinc-300 shadow-inner border border-black/10" />
        ))}
      </div>

      {/* Gutter / Spine Shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-20" />
      
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-10" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

      <div className="pl-12 pr-10 pt-12 space-y-10 relative z-10">
        {/* Metadata Header */}
        <div className="flex justify-between items-center font-mono text-[10px] text-[#6e6e73] tracking-widest uppercase">
          <div>PAGE {pageNumber} OF {totalPages}</div>
        </div>

        <h2 className="text-[28px] font-bold text-[#1d1d1f] uppercase tracking-tight border-b border-black/10 pb-4">{title}</h2>
        
        <div className="space-y-8">
          {pageNumber === 3 ? (
            <div className="space-y-10">
              <div className="text-[15px] text-[#1d1d1f] font-normal leading-[1.7] whitespace-pre-wrap">
                {renderContent(content.split('\n\nI directed')[0])}
              </div>

              {/* Two-Column Grid for Zones */}
              <div className="grid grid-cols-2 gap-10 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2" />
                
                <div className="space-y-4">
                  <h3 className="font-bold text-[14px] uppercase tracking-wider text-[#1d1d1f]">1. ANALOG STATION</h3>
                  <p className="text-[14px] leading-[1.6] text-[#424245]">
                    A tactile experience featuring the speaker's antique pens. Guests were invited to test vintage nibs and experience the weight of heritage craftsmanship.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-[14px] uppercase tracking-wider text-[#1d1d1f]">2. AI STATION</h3>
                  <p className="text-[14px] leading-[1.6] text-[#424245]">
                    A dedicated space for our team to meet 1:1 with leads to set up their new AI agents in the EQ.app lab environment.
                  </p>
                </div>
              </div>

              <div className="text-[15px] text-[#1d1d1f] font-normal leading-[1.7]">
                {renderContent("My favorite part was the custom lavender-infused french 75 cocktail to match our brand’s purple logo :)")}
              </div>
            </div>
          ) : (
            <p className="text-[15px] text-[#1d1d1f] font-normal leading-[1.7] whitespace-pre-wrap">
              {renderContent(content)}
            </p>
          )}
          
          {note && (
            <div className="bg-zinc-50 border border-black/5 p-6 italic text-[13px] text-[#6e6e73] font-medium rounded-lg shadow-sm leading-[1.6]">
              {note}
            </div>
          )}
        </div>

        {image && !extraMedia && (
          <div className="space-y-4 pt-4">
            <div className="rounded-lg overflow-hidden shadow-2xl border border-white/40 transform hover:scale-[1.01] transition-transform duration-500">
              <img src={image} alt={title} className="w-full h-auto" referrerPolicy="no-referrer" />
            </div>
            {caption && (
              <p className="text-[13px] font-medium text-[#6e6e73] italic leading-[1.6] text-center px-10">
                {caption}
              </p>
            )}
          </div>
        )}

        {video && (
          <div className="rounded-lg overflow-hidden shadow-2xl border border-white/40 bg-black aspect-video mt-6">
            <video src={video} className="w-full h-full object-cover" controls autoPlay loop muted playsInline />
          </div>
        )}

        {extraMedia && (
          <div className="grid grid-cols-2 gap-10 pt-6">
            {extraMedia.map((media, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="rounded-lg overflow-hidden shadow-lg border-4 border-white aspect-square bg-gray-100 relative shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                  {media.type === 'video' ? (
                    <video src={media.src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={media.src} alt={media.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  )}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#6e6e73] text-center">{media.caption}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface EventPlannerBinderProps {
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  startX?: number;
  startY?: number;
}

const EventPlannerBinder: React.FC<EventPlannerBinderProps> = ({ zIndex, onClose, onFocus, startX, startY }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dragControls = useDragControls();

  const pages: PageProps[] = [
    {
      title: "01: The Assignment",
      content: "My boss asked me to plan a private AI networking night.\nThe goal: A high-impact, tactile experience for 20 investors and CEOs in LA.",
      image: "https://i.imgur.com/Jq6Tdpe.png",
      caption: "This is the event layout mockup I pitched to my boss alongside a project brief; it resulted in a green light and a $3,000 budget to bring the concept to life."
    },
    {
      title: "02: Sourcing & Budgeting",
      content: "I managed the end-to-end logistics with a ~$3,000 budget. I scouted and secured 'The Dojo' venue and negotiated a custom contract with 'The Vesbar' - a vintage Italian Vespa sidecar converted into a mobile craft bar.",
      note: "Due to negotiations, I only ended up using $2.2/3k budget",
      image: "https://i.imgur.com/Odiz0U5.png"
    },
    {
      title: "03: Execution & Management",
      content: "The Concept\nMy boss wanted his uncle to speak at our event about his vintage pen company. To make this relevant, I created the \"Analog to AI\" theme to bridge the gap between traditional heritage and our new technology.\n\nI directed the Run-of-Show and split the venue into two zones:\n\n1. The Analog Station: A tactile experience featuring the speaker's antique pens.\n\n2. The EQ Lab: A dedicated space for our team to meet 1:1 with leads to set up their new AI agents.\n\nMy favorite part was the custom lavender-infused french 75 cocktail to match our brand’s purple logo :)",
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
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={onFocus}
      onMouseDown={onFocus}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        zIndex,
        position: 'absolute',
        left: '50%',
        top: '45%',
        translateX: '-50%',
        translateY: '-50%',
        touchAction: 'none',
        width: 750,
        height: '82vh',
      }}
      className="flex items-center justify-center select-none overflow-visible"
    >
      <div className="relative w-full h-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]">
        {/* Binder Content */}
        <div className="absolute inset-0 rounded-xl overflow-hidden border border-black/5 bg-white shadow-2xl overflow-y-auto scroll-window">
           <Page {...pages[currentPage]} pageNumber={currentPage + 1} totalPages={totalPages} />
        </div>

        {/* Drag Handle (The whole binder is draggable) */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="absolute inset-0 z-[5] cursor-grab active:cursor-grabbing pointer-events-none"
        />

        {/* Fixed Navigation Footer */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent z-50 flex items-center justify-between px-12 pointer-events-none">
          <div className="pointer-events-auto flex gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); prevPage(); }}
              className="px-6 py-2 bg-zinc-100 text-zinc-900 text-[11px] font-mono uppercase tracking-widest rounded-md hover:bg-zinc-200 transition-colors border border-black/5 shadow-sm"
            >
              PREV
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextPage(); }}
              className="px-6 py-2 bg-zinc-900 text-white text-[11px] font-mono uppercase tracking-widest rounded-md hover:bg-black transition-colors shadow-lg"
            >
              NEXT
            </button>
          </div>
          
          <div className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
            LEAD PM: ANALOG TO AI
          </div>
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

        <style dangerouslySetInnerHTML={{ __html: `
          .scroll-window::-webkit-scrollbar { width: 4px; }
          .scroll-window::-webkit-scrollbar-track { background: transparent; }
          .scroll-window::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; opacity: 0; transition: opacity 0.3s; }
          .scroll-window:hover::-webkit-scrollbar-thumb { opacity: 1; }
        `}} />
      </div>
    </motion.div>
  );
};

export default EventPlannerBinder;
