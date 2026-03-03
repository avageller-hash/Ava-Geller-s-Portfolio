import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, ChevronDown, ChevronUp } from 'lucide-react';

const VideoItem: React.FC<{ src: string; autoPlay?: boolean }> = ({ src, autoPlay = false }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      onClick={togglePlay}
      className="aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-500 relative group cursor-pointer border border-black/5"
    >
      <video 
        ref={videoRef}
        src={src} 
        className="w-full h-full object-cover" 
        autoPlay={autoPlay}
        loop 
        muted={isMuted}
        playsInline 
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/30">
           <Play size={48} className="text-white opacity-80" fill="currentColor" />
        </div>
      )}
      <button 
        onClick={toggleMute}
        className="absolute bottom-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};

const StyleBundlesWindow = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'gallery'>('home');

  const galleryImages = [
    "https://static.wixstatic.com/media/028ad6_4bcd68e7ca534fd88ca3f395a83cfd90~mv2.png/v1/crop/x_0,y_368,w_2811,h_3388/fill/w_718,h_864,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_4bcd68e7ca534fd88ca3f395a83cfd90~mv2.png",
    "https://static.wixstatic.com/media/028ad6_92db6d4339a84f1dbe795f5ab801e7b1~mv2.png/v1/crop/x_0,y_567,w_2934,h_3345/fill/w_900,h_1026,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_92db6d4339a84f1dbe795f5ab801e7b1~mv2.png",
    "https://static.wixstatic.com/media/028ad6_6324a9d0a220449983e036fbb49b08d5~mv2.jpg/v1/fill/w_898,h_1200,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_6324a9d0a220449983e036fbb49b08d5~mv2.jpg",
    "https://static.wixstatic.com/media/028ad6_e24752fcabc24b44b83bea84256a7ec7~mv2.png/v1/crop/x_0,y_720,w_3024,h_3171/fill/w_730,h_766,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_e24752fcabc24b44b83bea84256a7ec7~mv2.png",
    "https://static.wixstatic.com/media/028ad6_4e87a5ec663d40c8811671f3b888ff3f~mv2.png/v1/fill/w_898,h_1200,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_4e87a5ec663d40c8811671f3b888ff3f~mv2.png",
    "https://static.wixstatic.com/media/028ad6_305046e052694e63865189e49e79632b~mv2.jpg/v1/crop/x_0,y_714,w_2789,h_3013/fill/w_898,h_970,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_305046e052694e63865189e49e79632b~mv2.jpg",
    "https://static.wixstatic.com/media/028ad6_f4535aa4ff404970ba79d0d04cb6bb0a~mv2.jpg/v1/crop/x_0,y_364,w_2516,h_2999/fill/w_898,h_1070,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_f4535aa4ff404970ba79d0d04cb6bb0a~mv2.jpg",
    "https://static.wixstatic.com/media/028ad6_68b72c640e404cd98283951981f63784~mv2.png/v1/fill/w_672,h_898,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/028ad6_68b72c640e404cd98283951981f63784~mv2.png"
  ];

  const galleryVideos = [
    "https://i.imgur.com/F4wd1oq.mp4",
    "https://i.imgur.com/pDkue6j.mp4",
    "https://i.imgur.com/wf0nXPJ.mp4",
    "https://i.imgur.com/ikaRdZj.mp4",
    "https://i.imgur.com/qFVbRJn.mp4"
  ];

  return (
    <div className="flex flex-col bg-white/80 backdrop-blur-xl text-[#1d1d1f] font-sans h-full overflow-hidden">
      {/* Global Sub-navigation Bar */}
      <nav className="flex-shrink-0 h-14 border-b border-black/10 flex items-center justify-center gap-12 bg-transparent z-10">
        {[
          { id: 'home', label: 'Home' },
          { id: 'gallery', label: 'The Gallery' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`text-[13px] uppercase tracking-[0.15em] font-semibold transition-all relative py-1 ${
              activeTab === item.id ? 'text-[#1d1d1f]' : 'text-[#1d1d1f]/30 hover:text-[#1d1d1f]/60'
            }`}
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTabStyle"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1d1d1f]"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div
              key="home-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-row h-full"
            >
              {/* Left Column: Context (55%) */}
              <div className="w-[55%] h-full overflow-y-auto overscroll-contain scroll-window p-12 border-r border-black/10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-12"
                >
                  {/* Business Description */}
                  <section className="space-y-6">
                    <h1 className="text-[14px] uppercase tracking-[0.2em] font-bold text-[#6e6e73]">About my second business:</h1>
                    <p className="text-[18px] font-normal leading-[1.6] text-[#1d1d1f] tracking-tight w-full">
                      The "Style Bundles" concept owes its creation to the freedom online school granted me during Covid; thrifting became my escape from Zoom. I advertised my <span className="font-bold">packages of thrifted clothing</span> custom-tailored to each client's preferences, transforming my passion into a side hustle. With a focus on quality and personalization, I successfully delivered over 100 tailored bundles in just one year.
                    </p>
                    
                    {/* Details Section (Always Open) */}
                    <div className="pt-2 border-t border-black/5">
                      <div className="flex items-center gap-2 py-2">
                        <span className="text-[16px] font-bold text-[#1d1d1f] uppercase tracking-wider">Details</span>
                      </div>
                      <div className="overflow-hidden">
                        <ul className="pl-6 py-2 space-y-2">
                          <li className="text-[16px] text-[#6e6e73] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            Launched in 2023
                          </li>
                          <li className="text-[16px] text-[#6e6e73] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            <span className="font-bold">$7,500 revenue in 1 year</span>
                          </li>
                          <li className="text-[16px] text-[#6e6e73] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                            100+ unique bundles delivered
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </motion.div>
              </div>

              {/* Right Column: Proof (45%) */}
              <div className="w-[45%] h-full overflow-y-auto overscroll-contain scroll-window p-12 pl-[60px]">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-2 gap-6"
                >
                  {galleryVideos.map((vid, i) => (
                    <VideoItem key={i} src={vid} autoPlay={i === 0} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery-layout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="h-full overflow-y-auto overscroll-contain scroll-window p-12"
            >
              <div className="grid grid-cols-3 gap-8">
                {galleryImages.map((img, i) => (
                  <div key={i} className="group space-y-3">
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden shadow-md rounded-xl border border-black/5">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-1" 
                        alt={`Bundle ${i + 1}`} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#6e6e73] opacity-60 text-center">Curated Set {i + 1}</p>
                  </div>
                ))}
              </div>
              {/* Extra spacing at bottom */}
              <div className="h-12" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StyleBundlesWindow;
