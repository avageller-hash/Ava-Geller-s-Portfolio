import React, { useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { windowSpring, PAIR_OF_ACES_VIDEO_URL } from '../constants';

interface MovieTrailerWindowProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex: number;
  startX?: number;
  startY?: number;
  videoUrl?: string;
}

export const MOVIE_TRAILER_THUMBNAIL = 'https://i.imgur.com/tV0k98O.png';

const MovieTrailerWindow: React.FC<MovieTrailerWindowProps> = ({
  onClose,
  onFocus,
  zIndex,
  startX,
  startY,
  videoUrl,
}) => {
  const dragControls = useDragControls();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = videoUrl || PAIR_OF_ACES_VIDEO_URL;

  // Automatically start playback as soon as window mounts/opens
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may wait for direct user interaction or unmuted audio policy
      });
    }
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.2,
      x: startX !== undefined ? startX - window.innerWidth / 2 : 0,
      y: startY !== undefined ? startY - window.innerHeight / 2 : 0,
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
      transition: { duration: 0.2 },
    },
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
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        width: 800,
        maxWidth: '94vw',
        maxHeight: '84vh',
        position: 'absolute',
        touchAction: 'none',
      }}
      className="flex flex-col rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.45),0_10px_30px_-10px_rgba(0,0,0,0.2)] bg-white border border-black/10 overflow-hidden pointer-events-auto"
    >
      {/* Title Bar */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="h-11 flex items-center px-4 border-b border-black/15 bg-[#F6F6F6] select-none cursor-default active:cursor-grabbing flex-shrink-0"
      >
        <div className="flex gap-2 w-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/10 flex items-center justify-center transition-all hover:brightness-90 active:scale-90 group relative"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-950/60 z-10">
              ×
            </span>
          </button>
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black/10" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black/10" />
        </div>

        <div className="flex-1 text-center px-2 pr-20 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-[13px] font-medium tracking-tight text-[#1d1d1f]/80">
            I made a trailer for a movie that doesn't exist yet.
          </span>
        </div>
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto scroll-window flex flex-col bg-white">
        {/* The Direct Video Player */}
        <div className="w-full bg-black relative aspect-video flex items-center justify-center overflow-hidden flex-shrink-0">
          <video
            ref={videoRef}
            src={videoSrc}
            poster="https://i.imgur.com/tV0k98O.png"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* The Text Box Underneath the Video */}
        <div className="p-8 sm:p-10 bg-white flex flex-col gap-6">
          <div className="bg-[#f8f9fa] border border-black/10 rounded-xl p-6 sm:p-7 shadow-sm">
            <p className="text-[17px] text-[#1d1d1f] font-normal leading-[1.65] tracking-[-0.01em]">
              To pitch a book-to-screen adaptation of the novel &ldquo;A Pair of Aces&rdquo; at Hello Sunshine, I created a concept movie trailer built entirely from scratch. I scoured 200+ hours of period-piece media to strategically &lsquo;cast&rsquo; lead actors, piecing together separate footage into a seamless, cinematic narrative designed to sell executives on an{' '}
              <mark className="bg-[#FFE58F] text-[#1d1d1f] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                unmade film
              </mark>
              .
            </p>

            <div className="mt-5 pt-4 border-t border-black/10 flex items-center gap-2 text-[14px] text-[#6e6e73] font-medium">
              <span>- video/sound design on davinci resolve (industry standard software)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieTrailerWindow;
