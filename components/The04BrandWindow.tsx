
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Bookmark, UserSquare2, ChevronLeft, MoreHorizontal, Settings, UserPlus, ChevronDown } from 'lucide-react';

const The04BrandWindow: React.FC = () => {
  const [gridCols, setGridCols] = useState<1 | 2 | 4>(4);

  const storeImages = [
    "https://i.imgur.com/s8mQEaS.jpeg",
    "https://i.imgur.com/hAp7fOS.jpeg",
    "https://i.imgur.com/uMNAMZz.jpeg",
    "https://i.imgur.com/VjnKIup.jpeg",
    "https://i.imgur.com/ebcv3iq.jpeg",
    "https://i.imgur.com/j5J1ych.jpeg",
    "https://i.imgur.com/AkNhbCX.png",
    "https://i.imgur.com/B7q90x2.png",
    "https://i.imgur.com/NugGcuB.png",
    "https://i.imgur.com/vPUiOVO.png",
    "https://i.imgur.com/Ph1035p.png",
    "https://i.imgur.com/r4XF0hg.jpeg",
  ];

  return (
    <div className="flex flex-col bg-white text-[#1d1d1f] font-sans overflow-hidden">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scroll-window">
        <motion.div
          key="home"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="p-0"
        >
          {/* Hero Image */}
          <section className="w-full aspect-[16/10] overflow-hidden">
            <img 
              src="https://i.imgur.com/oHsENFP.jpeg" 
              className="w-full h-full object-cover" 
              alt="The 04 Brand Home" 
            />
          </section>

          <div className="p-8 max-w-3xl mx-auto space-y-10">
            {/* Business Description */}
            <section className="space-y-4">
              <h1 className="text-[14px] uppercase tracking-[0.1em] font-medium text-[#6e6e73]">About my first business(/passion project):</h1>
              <p className="text-[16px] font-sans leading-[1.6] text-[#1d1d1f] tracking-tight">
                When I was 15, I Founded and managed my own custom loungewear brand, producing 100+ pieces all out of my bedroom and achieving 75 sales in 7 months. Self-taught in design techniques, handled inventory, and drove website and social media growth to build an engaged online community.
              </p>
              
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 py-1">
                  <svg className="w-3 h-3 text-gray-400 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-[16px] font-medium text-[#1d1d1f]">Details:</span>
                </div>
                <p className="text-[16px] text-[#6e6e73] font-normal pl-5">
                  Net profit: $2,000
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <p className="text-[16px] font-medium text-[#1d1d1f]">the website my 15 yr-old self made:</p>
                <a 
                  href="https://the04brand.wixsite.com/mysite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[16px] text-blue-600 hover:underline break-all font-medium"
                >
                  https://the04brand.wixsite.com/mysite
                </a>
              </div>
            </section>

            <div className="h-[1px] bg-black/5 w-full" />

            {/* Store Archive */}
            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <h3 className="text-[14px] uppercase tracking-[0.1em] font-medium text-[#6e6e73]">Store Archive</h3>
                
                {/* Grid Toggle */}
                <div className="flex gap-2 bg-black/5 p-1.5 rounded-lg">
                  {[1, 2, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGridCols(num as any)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md transition-all ${
                        gridCols === num ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black/60'
                      }`}
                    >
                      <div className={`grid gap-0.5 ${
                        num === 1 ? 'grid-cols-1' : num === 2 ? 'grid-cols-2' : 'grid-cols-2'
                      }`}>
                        {[...Array(num === 4 ? 4 : num)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-current rounded-[1px]" />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`grid gap-4 transition-all duration-500 ${
                gridCols === 1 ? 'grid-cols-1' : gridCols === 2 ? 'grid-cols-2' : 'grid-cols-4'
              }`}>
                {storeImages.map((img, i) => (
                  <div key={i} className="group">
                    <div className="aspect-[2/3] bg-gray-100 overflow-hidden rounded-lg shadow-sm">
                      <img 
                        src={img} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt={`Product ${i + 1}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="h-20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default The04BrandWindow;
