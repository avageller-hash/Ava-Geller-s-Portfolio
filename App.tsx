
import React, { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Dock from './components/Dock';
import AdobeError from './components/AdobeError';
import LetterboxdWindow from './components/LetterboxdWindow';
import KindleWindow from './components/KindleWindow';
import PhotosWindow from './components/PhotosWindow';
import InDesignWindow from './components/InDesignWindow';
import StyleBundlesWindow from './components/StyleBundlesWindow';
import The04BrandWindow from './components/The04BrandWindow';
import EventPlannerBinder from './components/EventPlannerBinder';
import { DESKTOP_ICONS } from './constants';
import { WindowData } from './types';
import { ChevronLeft } from 'lucide-react';

// Section Header for Finder Style (used in Project Layouts)
const SectionHeader = ({ title, isOpen = true }: { title: string, isOpen?: boolean, children?: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 py-1 group cursor-pointer">
    <svg 
      className={`w-2.5 h-2.5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={4}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    <span className="text-[14px] font-semibold text-black">{title}</span>
  </div>
);

// High-fidelity Notes Checklist Item matching the reference screenshot
const NotesCheckItem = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-start gap-3 py-0.5 group">
    <div className="mt-[3px] flex-shrink-0 w-[18px] h-[18px] rounded-full overflow-hidden relative shadow-sm border border-[#E6A600]">
      <div className="absolute inset-0 bg-[#FFB800] flex items-center justify-center">
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1.5 4.2L4 6.7L8.5 2.2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <div className="text-[14px] text-black font-normal leading-[1.3] tracking-tight">
      {children}
    </div>
  </div>
);

// Vertical Information Layout for Projects (Desktop Files)
const ProjectInformationLayout = ({ 
  title, 
  subtitle = "Various projects", 
  thumbnail, 
  description,
  videoUrl,
  images,
  grid = false,
  details = "Type: Portfolio Item > Case Study"
}: { 
  title: string, 
  subtitle?: string, 
  thumbnail?: string, 
  description?: string,
  videoUrl?: string,
  images?: string[],
  grid?: boolean,
  details?: React.ReactNode
}) => {
  const defaultDesc = `I worked across three departments at ${title}, primarily within ${title}.radio, where I was responsible for creating graphics for music show covers, podcasts, and online articles.`;

  return (
    <div className="flex flex-col min-h-full bg-white overflow-x-hidden">
      {/* Padded Content Section */}
      <div className="p-6 pb-2 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-14 bg-gray-200 rounded overflow-hidden shadow-sm flex-shrink-0 border border-black/10">
            <img src={thumbnail || `https://picsum.photos/seed/${title}-thumb/300/200`} className="w-full h-full object-cover" alt="thumbnail" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col pt-1">
            <h2 className="text-[14px] font-bold text-black leading-tight uppercase tracking-tight">{title}</h2>
            <p className="text-[12px] text-gray-600 font-normal">{subtitle}</p>
          </div>
        </div>
        
        <div className="h-[1px] bg-black/20 w-full" />
        
        <div className="space-y-4">
          <p className="text-[14px] leading-relaxed text-black/80 font-normal whitespace-pre-wrap">{description || defaultDesc}</p>
        </div>
        
        <div className="space-y-1">
          <SectionHeader title="Details:" />
          <div className="pl-4">
            <div className="text-[14px] text-black font-normal">{details}</div>
          </div>
        </div>

        <div className="pt-2">
          <SectionHeader title="Preview:" />
        </div>
      </div>

      {/* Full-Width Edge-to-Edge Container for Video/Preview Section */}
      <div className="w-full mt-4 relative bg-transparent pb-10">
        {videoUrl ? (
          <div className="flex justify-center w-full">
            <video 
              src={videoUrl} 
              className="w-[75%] h-auto block rounded-2xl shadow-2xl border border-black/5" 
              controls
              autoPlay
              loop
              playsInline
            />
          </div>
        ) : images ? (
          <div className={`px-6 ${grid ? 'grid grid-cols-2 gap-4' : 'space-y-6'}`}>
            {images.map((img, idx) => (
              <div key={idx} className="w-full rounded-lg overflow-hidden border border-black/10 shadow-sm">
                <img src={img} className="w-full h-auto object-cover" alt={`preview-${idx}`} referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 pb-6">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-black/10 shadow-sm">
              <img src={thumbnail || `https://picsum.photos/seed/${title}-preview/1200/675`} className="w-full h-full object-cover" alt="preview" referrerPolicy="no-referrer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Folder Layout
const FolderLayout = ({ title, items, videoMapping }: { title: string; items?: string[]; videoMapping?: Record<string, string> }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const defaultItems = items || [...Array(6)].map((_, i) => `Item ${i + 1}`);

  if (selectedVideo) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="flex items-center px-4 py-2 border-b border-black/10 bg-gray-50/50">
          <button 
            onClick={() => { setSelectedVideo(null); setSelectedTitle(null); }}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-black/60 hover:text-black transition-colors"
          >
            <ChevronLeft size={14} />
            Back to {title}
          </button>
          <div className="flex-1 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-black/40">{selectedTitle}</span>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-black/5">
          <video 
            src={selectedVideo} 
            className="max-w-full max-h-full rounded-xl shadow-2xl border border-black/10" 
            controls
            autoPlay
            loop
            playsInline
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full bg-white">
      <div className="grid grid-cols-4 gap-6">
        {defaultItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => {
              if (videoMapping && videoMapping[item]) {
                setSelectedVideo(videoMapping[item]);
                setSelectedTitle(item);
              }
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-16 h-12 bg-[#7cc8ff] rounded-[2px] relative shadow-sm group-hover:brightness-110 transition-all">
               <div className="absolute left-0 -top-1 w-6 h-1.5 bg-[#7cc8ff] rounded-t-[1px]" />
            </div>
            <span className="text-[10px] font-normal text-black/80 uppercase text-center group-hover:text-black transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotesApp = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'cv' | 'interests'>('about');

  const SidebarItem = ({ label, id, count }: { label: string, id: typeof activeTab, count: string | number }) => (
    <div 
      onClick={() => setActiveTab(id)}
      className={`flex items-center justify-between px-3 py-1.5 cursor-default select-none transition-colors border-b border-black/10 w-full ${
        activeTab === id ? 'bg-black/10 text-black' : 'text-black/60 hover:bg-black/5'
      }`}
    >
      <span className="text-[14px] font-normal tracking-tight pr-4">{label}</span>
      <span className="text-[13px] text-[#8E8E93] font-normal">{count}</span>
    </div>
  );

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar - Recessed feel with light grey bg */}
      <div className="w-[125px] bg-[#F3F3F3]/80 border-r border-black/20 flex flex-col flex-shrink-0 shadow-inner">
        <div className="flex flex-col">
          <SidebarItem label="About me" id="about" count={13} />
          <SidebarItem label="CV" id="cv" count={6} />
          <SidebarItem label="Interests" id="interests" count="∞" />
        </div>
      </div>

      {/* Main Content Area - Clean raised bright white */}
      <div className="flex-1 overflow-y-auto bg-white flex flex-col">
        <div className="px-10 py-8 max-w-2xl w-full flex flex-col h-fit">
          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <p className="text-[15px] text-black font-normal leading-[1.3] tracking-tight">
                Studying cognitive science @ UCLA, but don’t let that confuse you -my real passion lies in strategizing and creating- whether it be for VC, startups, or brand storytelling. +Avid Letterboxd user and frozen yogurt connoisseur.
              </p>
              
              <div className="space-y-1">
                <div className="text-[16px] text-black font-normal tracking-[-0.01em] mb-1">I can do…</div>
                <div className="flex flex-col">
                  <NotesCheckItem>Anything you give me a couple hours to master</NotesCheckItem>
                  <NotesCheckItem>Brand storytelling</NotesCheckItem>
                  <NotesCheckItem>UI/UX</NotesCheckItem>
                  <NotesCheckItem>Creative/campaign strategy</NotesCheckItem>
                  <NotesCheckItem>GTM strategy</NotesCheckItem>
                  <NotesCheckItem>Competitive analysis</NotesCheckItem>
                  <NotesCheckItem>Video editing</NotesCheckItem>
                  <NotesCheckItem>Event production</NotesCheckItem>
                  <NotesCheckItem>Foundational C, C++, Python, professional vibe coder</NotesCheckItem>
                  <NotesCheckItem>Data analysis</NotesCheckItem>
                  <NotesCheckItem>Financial modeling</NotesCheckItem>
                  <NotesCheckItem>Pitch decks</NotesCheckItem>
                  <NotesCheckItem>Graphic design</NotesCheckItem>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cv' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <div className="text-[16px] text-black font-normal tracking-[-0.01em] mb-1">Experience</div>
                <div className="flex flex-col">
                  <NotesCheckItem>UI/growth intern @ EQ.app [ai agent startup] (winter ’26)</NotesCheckItem>
                  <NotesCheckItem>Finance Intern for Sara Blakely (summer ’25)</NotesCheckItem>
                  <NotesCheckItem>Contract consultant for Draper Associates (Fall ’24)</NotesCheckItem>
                  <NotesCheckItem>Senior Analyst for Bruin Ventures</NotesCheckItem>
                  <NotesCheckItem>2x founder [The 04 Brand + Style Bundles by Ava] (2021/2022)</NotesCheckItem>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-[16px] text-black font-normal tracking-[-0.01em] mb-1">Education</div>
                <div className="flex flex-col">
                  <NotesCheckItem>UCLA - Cognitive Science B.S. (2023-2027)</NotesCheckItem>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interests' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="text-[16px] text-black font-normal tracking-[-0.01em] mb-1">Obsessions</div>
              <div className="flex flex-col">
                <NotesCheckItem>Startups and entrepreneurship</NotesCheckItem>
                <NotesCheckItem>Independent cinema (A24/ Neon)</NotesCheckItem>
                <NotesCheckItem>Venture capital landscape</NotesCheckItem>
                <NotesCheckItem>Psychological thriller genre</NotesCheckItem>
                <NotesCheckItem>Snowboarding (in progress)</NotesCheckItem>
                <NotesCheckItem>Consumer psychology</NotesCheckItem>
                <NotesCheckItem>Mental hygiene</NotesCheckItem>
              </div>
            </div>
          )}
          <div className="h-24 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([]);
  const zIndexRef = useRef(100);
  const desktopRef = useRef<HTMLDivElement>(null);
  const placementIndexRef = useRef(0);

  const getNextZ = useCallback(() => {
    zIndexRef.current += 1;
    return zIndexRef.current;
  }, []);

  const handleFocusWindow = useCallback((id: string) => {
    const nextZ = getNextZ();
    setOpenWindows(windows => 
      windows.map(w => w.id === id ? { ...w, zIndex: nextZ } : w)
    );
  }, [getNextZ]);

  const getStaggeredPosition = useCallback((winWidth: number, winHeight: number) => {
    const quadrants = [
      { x: 0.15, y: 0.1 },
      { x: 0.45, y: 0.15 },
      { x: 0.25, y: 0.25 },
      { x: 0.1, y: 0.3 },
      { x: 0.5, y: 0.05 },
    ];
    
    const quad = quadrants[placementIndexRef.current % quadrants.length];
    placementIndexRef.current += 1;

    const jitterX = (Math.random() - 0.5) * 60;
    const jitterY = (Math.random() - 0.5) * 40;

    let posX = (window.innerWidth * quad.x) + jitterX;
    let posY = (window.innerHeight * quad.y) + jitterY;

    const maxX = window.innerWidth - winWidth - 40;
    const maxY = window.innerHeight - winHeight - 120;

    return {
      x: Math.max(40, Math.min(posX, maxX)),
      y: Math.max(40, Math.min(posY, maxY))
    };
  }, []);

  const handleOpenDesktopFile = useCallback((id: string, title: string) => {
    setOpenWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const nextZ = getNextZ();

      if (existing) {
        return prev.map(w => w.id === id ? { ...w, zIndex: nextZ } : w);
      }

      const icon = DESKTOP_ICONS.find(i => i.id === id);
      
      let content;
      let winType: 'project' | 'folder' = 'project';
      
      if (icon?.type === 'folder') {
        if (id === 'projekty') {
          const videoMapping = {
            "rolling loud miami": "https://i.imgur.com/rxEFoOK.mp4",
            "fun mix": "https://i.imgur.com/Rcd2OVL.mp4",
            "my fav band, the backseat lovers": "https://i.imgur.com/29e6kaW.mp4"
          };
          content = <FolderLayout title={title} items={Object.keys(videoMapping)} videoMapping={videoMapping} />;
        } else {
          content = <FolderLayout title={title} />;
        }
        winType = 'folder';
      } else {
        // Handle custom content for specific project IDs
        if (id === 'ramowka') {
          content = (
            <ProjectInformationLayout 
              title={title} 
              subtitle="Marketing Internship"
              thumbnail="https://i.imgur.com/ao97oFf.jpeg"
              description="Marketing reel i created during my internship that was personally selected by Spanx founder/shark tank investor Sara Blakely to be turned into a paid Instagram and Facebook promotion that has been actively running as a boosted ad for the past 5 months."
              videoUrl="https://i.imgur.com/2CHxWWF.mp4"
              details="~170K combined reach (insta + tik tok) to date."
            />
          );
        } else if (id === 'sneex-editorial') {
          content = (
            <ProjectInformationLayout 
              title={title} 
              subtitle="Lead Creative / Photographer"
              thumbnail="https://i.imgur.com/zjtRYmQ.jpeg"
              description={`Lead Creative / Photographer capturing the intersection of high-performance sneakers and luxury stilettos.\n\nOutcome: Visual assets for web, social media, and brand identity.`}
              images={[
                "https://i.imgur.com/zjtRYmQ.jpeg",
                "https://i.imgur.com/8NGzojs.jpeg",
                "https://i.imgur.com/s5ErHUS.jpeg",
                "https://i.imgur.com/uBkgdBv.jpeg",
                "https://i.imgur.com/pQBz4OU.jpeg"
              ]}
              grid={true}
              details={
                <span>
                  Role: Lead Creative / Photographer for <a href="https://sneex.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sneex</a>
                </span>
              }
            />
          );
        } else if (id === 'nyc-mission') {
          content = (
            <ProjectInformationLayout 
              title="48 Hours, 115 Strangers, and One Billionaire Founder: Leading the Sneex NYC Guerilla Research Mission" 
              subtitle="Hand-picked by Sara Blakely to lead a team of 5 in a 48-hour trip to NYC through real-world consumer feedback."
              thumbnail="https://i.imgur.com/yAOeIiF.png"
              description={`- Conducted 115 cold-approach interviews on the streets of NYC, managing team logistics, morale, and data integrity under a 2-day deadline.\n\n- Interviewed high-profile targets including Nicole Scherzinger (Lead singer of The Pussycat Dolls) and 2 professional WNBA players, proving the product's appeal to elite athletes and global icons.\n\n- Served as the Lead Director and Editor, distilling ~20 hours of raw street footage into a high-energy narrative and analyzing qualitative data to provide actionable product insights.`}
              videoUrl="https://i.imgur.com/Itcd7qH.mp4"
            />
          );
        } else if (id === 'event-planner') {
          content = <EventPlannerBinder />;
        } else if (id === 'love') {
          content = <StyleBundlesWindow />;
        } else if (id === 'szept') {
          content = <The04BrandWindow />;
        } else {
          content = <ProjectInformationLayout title={title} thumbnail={icon?.iconSrc} />;
        }
        winType = 'project';
      }

      let winWidth = 640;
      let winHeight = 540;

      if (id === 'ramowka' || id === 'nyc-mission') {
        winWidth = window.innerWidth * 0.47;
        winHeight = window.innerHeight * 0.92;
      } else if (id === 'sneex-editorial') {
        winWidth = window.innerWidth * 0.47;
        winHeight = window.innerHeight * 0.92;
      } else if (id === 'event-planner') {
        // Calculate size based on 8.5/11 ratio, max 90vh
        winHeight = window.innerHeight * 0.9;
        winWidth = winHeight * (8.5 / 11);
        if (winWidth > window.innerWidth * 0.8) {
          winWidth = window.innerWidth * 0.8;
          winHeight = winWidth * (11 / 8.5);
        }
      } else if (id === 'love' || id === 'szept') {
        winWidth = window.innerWidth * 0.85;
        winHeight = window.innerHeight * 0.85;
      }

      const pos = getStaggeredPosition(winWidth, winHeight);

      // Specific side-by-side placement for Sneex windows to prevent overlap
      if (id === 'ramowka') {
        pos.x = window.innerWidth * 0.02;
        pos.y = window.innerHeight * 0.04;
      } else if (id === 'sneex-editorial') {
        pos.x = window.innerWidth * 0.51;
        pos.y = window.innerHeight * 0.04;
      }

      const newWindow: WindowData = {
        id,
        title,
        type: winType === 'folder' ? 'folder' : 'project',
        content,
        zIndex: nextZ,
        initialX: pos.x,
        initialY: pos.y,
        aspectRatio: id === 'event-planner' ? 8.5 / 11 : undefined,
        overflowVisible: id === 'event-planner',
      };

      return [...prev, newWindow];
    });
  }, [getNextZ, getStaggeredPosition]);

  const handleOpenDockApp = useCallback((id: string, title: string) => {
    if (id === 'linkedin') {
      window.open('https://www.linkedin.com/in/ava-geller', '_blank');
      return;
    }

    if (id === 'mail') {
      window.location.href = 'mailto:avageller@ucla.edu?subject=Strategist%20Internship%20Inquiry';
      setOpenWindows(prev => {
        if (prev.find(w => w.id === 'mail')) return prev.filter(w => w.id !== 'mail');
        return [...prev, { id: 'mail', title: 'Mail', type: 'media', content: null, zIndex: -1 }];
      });
      setTimeout(() => {
        setOpenWindows(prev => prev.filter(w => w.id !== 'mail'));
      }, 1000);
      return;
    }

    setOpenWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        return prev.filter(w => w.id !== id);
      }
      
      const nextZ = getNextZ();

      let content: React.ReactNode = null;
      let type: WindowData['type'] = 'media';

      if (id === 'notes') {
        content = <NotesApp />;
        type = 'app';
      }
      else if (id === 'trash') {
        content = (
          <div className="h-full bg-white flex flex-col items-center p-8 overflow-y-auto">
            <div className="w-full max-w-2xl space-y-6">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-black/10">
                <img 
                  src="https://i.imgur.com/GO4UOap.jpeg" 
                  alt="Pitching to Tim Draper" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[14px] text-black/80 font-normal leading-relaxed text-center italic">
                me pitching an investment memo to Tim Draper, founder of <a href="https://www.draper.vc/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline font-bold">Draper Associates</a> known for his early-stage bets on Tesla, SpaceX, Skype, and Baidu
              </p>
            </div>
          </div>
        );
        type = 'media';
      }
      else if (id === 'error' || id === 'letterboxd' || id === 'kindle' || id === 'photos' || id === 'id') type = 'media';
      else content = <div className="p-10 text-center text-black font-normal uppercase tracking-widest leading-relaxed bg-white">Workspace is currently undergoing maintenance.</div>;

      let winWidth = 800;
      let winHeight = 600;
      if (id === 'error') { winWidth = 260; winHeight = 125; }
      if (id === 'letterboxd') { winWidth = 420; winHeight = 220; }
      if (id === 'kindle') { winWidth = 440; winHeight = 620; }
      if (id === 'photos') { winWidth = 500; winHeight = 600; }
      if (id === 'notes') { winWidth = 840; winHeight = 600; }
      if (id === 'id') { winWidth = 800; winHeight = 540; }
      
      const pos = getStaggeredPosition(winWidth, winHeight);

      const newWindow: WindowData = {
        id,
        title,
        type,
        content,
        zIndex: nextZ,
        initialX: pos.x,
        initialY: pos.y,
      };

      return [...prev, newWindow];
    });
  }, [getNextZ, getStaggeredPosition]);

  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div ref={desktopRef} className="w-screen h-screen overflow-hidden relative">
      <img 
        src="https://i.imgur.com/i5C34Bj.jpeg" 
        alt="Background"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, objectFit: 'cover', filter: 'blur(10px) brightness(1.1)', scale: '1.05' }} 
      />
      <div className="fixed inset-0 bg-white/40 pointer-events-none z-[1]" />
      
      <div className="absolute inset-0 z-[10] pointer-events-none">
        <div className="absolute inset-0 z-[30] pointer-events-none">
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon
              key={icon.id}
              title={icon.title}
              iconSrc={icon.iconSrc}
              x={icon.x}
              y={icon.y}
              orientation={icon.orientation}
              type={icon.type}
              isProminent={icon.isProminent}
              onClick={() => handleOpenDesktopFile(icon.id, icon.title)}
              onFocus={() => handleFocusWindow(icon.id)}
              zIndex={30}
              containerRef={desktopRef}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-[40] pointer-events-none">
          <AnimatePresence>
            {openWindows.map((win) => (
              <div key={win.id} className="pointer-events-auto">
                {win.id === 'error' ? (
                  <AdobeError 
                    zIndex={win.zIndex || 100} 
                    onClose={() => handleCloseWindow(win.id)} 
                    onFocus={() => handleFocusWindow(win.id)}
                    initialX={win.initialX}
                    initialY={win.initialY}
                  />
                ) : win.id === 'letterboxd' ? (
                  <LetterboxdWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    initialX={win.initialX}
                    initialY={win.initialY}
                  />
                ) : win.id === 'kindle' ? (
                  <KindleWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    initialX={win.initialX}
                    initialY={win.initialY}
                  />
                ) : win.id === 'photos' ? (
                  <PhotosWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    initialX={win.initialX}
                    initialY={win.initialY}
                  />
                ) : win.id === 'id' ? (
                  <InDesignWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    initialX={win.initialX}
                    initialY={win.initialY}
                  />
                ) : win.id === 'event-planner' ? (
                  <EventPlannerBinder 
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    initialX={win.initialX}
                    initialY={win.initialY}
                  />
                ) : (
                  win.content && (
                    <Window
                      id={win.id}
                      title={win.title === 'Notes' ? 'Ava Geller, avageller@ucla.edu' : win.title}
                      type={win.type === 'project' || win.type === 'folder' || win.id === 'notes' ? 'project' : 'app'}
                      zIndex={win.zIndex || 10}
                      onClose={() => handleCloseWindow(win.id)}
                      onFocus={() => handleFocusWindow(win.id)}
                      initialX={win.initialX}
                      initialY={win.initialY}
                      aspectRatio={win.aspectRatio}
                      overflowVisible={win.overflowVisible}
                    >
                      {win.content}
                    </Window>
                  )
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dock 
        onOpen={handleOpenDockApp} 
        openIds={openWindows.map(w => w.id)} 
      />

      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply z-[5000]" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
    </div>
  );
};

export default App;
