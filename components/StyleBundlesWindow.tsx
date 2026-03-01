import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play } from 'lucide-react';

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
      className="flex-shrink-0 w-48 aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-500 relative group cursor-pointer"
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
           <Play size={32} className="text-white opacity-80" fill="currentColor" />
        </div>
      )}
      <button 
        onClick={toggleMute}
        className="absolute bottom-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </div>
  );
};

const StyleBundlesWindow = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'gallery'>('home');
  const constraintsRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'The Gallery' },
  ];

  // Placeholder variables for media
  const processVideo = "https://i.imgur.com/2CHxWWF.mp4";

  const step1Img1 = "https://static.wixstatic.com/media/028ad6_3b19b73efd2f451da797020d19003d71~mv2.jpeg/v1/fill/w_404,h_720,al_c,lg_1,q_80,enc_avif,quality_auto/028ad6_3b19b73efd2f451da797020d19003d71~mv2.jpeg";
  const step1Img2 = "https://static.wixstatic.com/media/028ad6_5962d7a048f842d8b7b28ef290907d77~mv2.jpg/v1/fill/w_404,h_720,al_c,lg_1,q_80,enc_avif,quality_auto/028ad6_5962d7a048f842d8b7b28ef290907d77~mv2.jpg";
  const step2Img = "https://static.wixstatic.com/media/028ad6_cf11b3450e254e128791c2d6bb373fb5~mv2.png/v1/fill/w_332,h_720,al_c,lg_1,q_85,enc_avif,quality_auto/028ad6_cf11b3450e254e128791c2d6bb373fb5~mv2.png";

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
    <div className="flex flex-col h-full bg-[#FAF9F6] text-[#1D1D1F] font-sans overflow-hidden">
      {/* Sub-navigation Bar */}
      <nav className="flex-shrink-0 h-10 border-b border-black/10 flex items-center justify-center gap-6 bg-[#FAF9F6] z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`text-[10px] uppercase tracking-[0.15em] font-semibold transition-all relative py-1 ${
              activeTab === item.id ? 'text-[#1D1D1F]' : 'text-[#1D1D1F]/40 hover:text-[#1D1D1F]/70'
            }`}
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1D1D1F]"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scroll-window">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="p-6 max-w-3xl mx-auto space-y-8"
            >
              {/* Business Description */}
              <section className="space-y-3">
                <h1 className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-40">About my second business:</h1>
                <p className="text-[14px] font-sans leading-relaxed text-black/90 tracking-tight">
                  The "Style Bundles" concept owes its creation to the freedom online school granted me during Covid; thrifting became my escape from Zoom. I advertised my packages of thrifted clothing custom-tailored to each client's preferences, transforming my passion into a side hustle. With a focus on quality and personalization, I successfully delivered over 100 tailored bundles in just one year.
                </p>
                
                <div className="pt-1 space-y-1">
                  <div className="flex items-center gap-1.5 py-0.5">
                    <svg className="w-2 h-2 text-gray-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-[14px] font-semibold text-black/80">Details:</span>
                  </div>
                  <p className="text-[14px] text-black/50 font-normal pl-3.5">
                    2023, $7,500 revenue in 1 year
                  </p>
                </div>
              </section>

              <div className="h-[1px] bg-black/5 w-full" />

              <div className="space-y-6">
                <p className="text-[15px] font-serif italic opacity-80">Here is how it would work...</p>

                {/* Step 1 */}
                <section className="space-y-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[20px] font-serif italic opacity-20">01</span>
                    <h2 className="text-[16px] font-serif italic tracking-tight">Choose your package</h2>
                  </div>
                  <p className="text-[13px] font-light opacity-60 ml-8">Micro or Large?</p>
                  <div className="grid grid-cols-2 gap-3 ml-8">
                    <div className="aspect-[9/16] bg-gray-100 overflow-hidden shadow-sm rounded-lg">
                      <img src={step1Img1} className="w-full h-full object-cover" alt="Micro Package" />
                    </div>
                    <div className="aspect-[9/16] bg-gray-100 overflow-hidden shadow-sm rounded-lg">
                      <img src={step1Img2} className="w-full h-full object-cover" alt="Large Package" />
                    </div>
                  </div>
                </section>

                <div className="h-[1px] bg-black/5 w-full" />

                {/* Step 2 */}
                <section className="space-y-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[20px] font-serif italic opacity-20">02</span>
                    <h2 className="text-[16px] font-serif italic tracking-tight">Fill out customization form</h2>
                  </div>
                  <div className="max-w-[180px] ml-8">
                    <div className="aspect-[9/16] bg-gray-100 overflow-hidden shadow-sm rounded-lg">
                      <img src={step2Img} className="w-full h-full object-cover" alt="Customization Form" />
                    </div>
                  </div>
                </section>

                <div className="h-[1px] bg-black/5 w-full" />

                {/* Step 3 */}
                <section className="space-y-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-[20px] font-serif italic opacity-20">03</span>
                    <h2 className="text-[16px] font-serif italic tracking-tight">Receive your bundle!</h2>
                  </div>
                </section>
              </div>

              {/* Rotating Video Gallery */}
              <section className="pt-4 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[9px] uppercase tracking-[0.15em] font-bold opacity-40">Recent Curations</h3>
                  <div className="flex items-center gap-1.5 opacity-20">
                    <span className="text-[8px] uppercase tracking-widest font-bold">Drag to explore</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
                
                <div ref={constraintsRef} className="relative -mx-6 px-6 overflow-hidden pb-4">
                  <motion.div 
                    drag="x"
                    dragConstraints={constraintsRef}
                    className="flex gap-4 w-max pr-6 cursor-grab active:cursor-grabbing"
                  >
                    {galleryVideos.map((vid, i) => (
                      <VideoItem key={i} src={vid} autoPlay={i === 0} />
                    ))}
                  </motion.div>
                </div>
              </section>
              
              <div className="h-20" />
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="p-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((img, i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden shadow-md rounded-md">
                      <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={`Bundle ${i + 1}`} />
                    </div>
                    <p className="font-serif italic text-[11px] opacity-60">Curated Set {i + 1}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StyleBundlesWindow;
