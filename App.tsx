
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Dock from './components/Dock';
import AdobeError from './components/AdobeError';
import LetterboxdWindow from './components/LetterboxdWindow';
import DraperWindow from './components/DraperWindow';
import MovieTrailerWindow from './components/MovieTrailerWindow';
import KindleWindow from './components/KindleWindow';
import PhotosWindow from './components/PhotosWindow';
import InDesignWindow from './components/InDesignWindow';
import StyleBundlesWindow from './components/StyleBundlesWindow';
import The04BrandWindow from './components/The04BrandWindow';
import EventPlannerBinder from './components/EventPlannerBinder';
import { DESKTOP_ICONS } from './constants';
import { WindowData } from './types';
import { ChevronLeft, X, Search } from 'lucide-react';

// Section Header for Finder Style (used in Project Layouts)
const SectionHeader = ({ title, isOpen = true }: { title: string, isOpen?: boolean, children?: React.ReactNode }) => (
  <div className="flex items-center gap-1.5 py-2 group cursor-pointer">
    <svg 
      className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={4}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    <span className="text-[14px] font-medium text-[#6e6e73] tracking-tight uppercase">{title}</span>
  </div>
);

// High-fidelity Notes Checklist Item matching the reference screenshot
const NotesCheckItem = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-start gap-3 py-1 group">
    <div className="mt-[4px] flex-shrink-0 w-[20px] h-[20px] rounded-full overflow-hidden relative shadow-sm border border-[#E6A600]">
      <div className="absolute inset-0 bg-[#FFB800] flex items-center justify-center">
        <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
          <path d="M1.5 4.2L4 6.7L8.5 2.2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <div className="text-[16px] text-[#1d1d1f] font-normal leading-[1.6] tracking-tight">
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
  details = "Type: Portfolio Item > Case Study",
  sideBySide = false,
  noThumbnail = false,
  titleCase = false
}: { 
  title: string, 
  subtitle?: string, 
  thumbnail?: string, 
  description?: string,
  videoUrl?: string,
  images?: string[],
  grid?: boolean,
  details?: React.ReactNode,
  sideBySide?: boolean,
  noThumbnail?: boolean,
  titleCase?: boolean
}) => {
  const defaultDesc = `I worked across three departments at ${title}, primarily within ${title}.radio, where I was responsible for creating graphics for music show covers, podcasts, and online articles.`;

  const mediaSection = (
    <div className={`${sideBySide ? 'w-[40%] flex items-center justify-center p-8 pr-0 h-full' : 'w-full mt-6 pb-10'} relative bg-transparent`}>
      {videoUrl ? (
        <div className="flex justify-center w-full h-full">
          <div className="relative w-full h-full">
            <video 
              src={videoUrl} 
              className={`${sideBySide ? 'w-full h-full object-contain' : 'w-[80%] h-auto'} block rounded-xl shadow-2xl border border-black/5`} 
              controls
              autoPlay
              loop
              playsInline
            />
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
          </div>
        </div>
      ) : images ? (
        <div className={`px-8 ${grid ? 'grid grid-cols-2 gap-6' : 'space-y-8'}`}>
          {images.map((img, idx) => (
            <div key={idx} className="w-full rounded-xl overflow-hidden border border-black/10 shadow-sm">
              <img src={img} className="w-full h-auto object-cover" alt={`preview-${idx}`} referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
      ) : (
        <div className="px-8 pb-8">
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-black/10 shadow-sm">
            <img src={thumbnail || `https://picsum.photos/seed/${title}-preview/1200/675`} className="w-full h-full object-cover" alt="preview" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}
    </div>
  );
  const textSection = (
    <div className={`${sideBySide ? 'w-[60%] flex flex-col justify-center p-8 pl-[60px]' : 'w-full p-8 pb-2'} space-y-8`}>
      <div className="flex items-start gap-6">
        {!noThumbnail && (
          <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden shadow-sm flex-shrink-0 border border-black/10">
            <img src={thumbnail || `https://picsum.photos/seed/${title}-thumb/300/200`} className="w-full h-full object-cover" alt="thumbnail" referrerPolicy="no-referrer" />
          </div>
        )}
        <div className="flex flex-col pt-1">
          <h2 className={`text-[24px] font-bold text-[#1d1d1f] leading-tight ${titleCase ? '' : 'uppercase'} tracking-[-0.01em]`}>{title}</h2>
          <p className={`text-[18px] text-[#6e6e73] font-semibold tracking-[-0.01em]`}>{subtitle}</p>
        </div>
      </div>
      
      <div className="h-[1px] bg-black/10 w-full" />
      
      <div className="space-y-6 max-w-xl">
        <div className="text-[16px] leading-[1.6] text-[#1d1d1f] font-normal whitespace-pre-wrap flex flex-col gap-6">
          {(description || defaultDesc).split('\n\n').map((para, i) => {
            const lines = para.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            const isList = lines.every(l => l.startsWith('-'));
            
            if (isList && lines.length > 0) {
              return (
                <ul key={i} className="list-disc list-inside space-y-2">
                  {lines.map((line, j) => (
                    <li key={j} className="pl-1">
                      {line.replace(/^- \s*/, '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>
      </div>
      
      <div className="space-y-2">
        <SectionHeader title="Details:" />
        <div className="pl-4">
          <div className="text-[16px] text-[#1d1d1f] font-normal leading-[1.6]">{details}</div>
        </div>
      </div>

      {!sideBySide && (
        <div className="pt-4">
          <SectionHeader title="Preview:" />
        </div>
      )}
    </div>
  );

  return (
    <div className={`flex ${sideBySide ? 'flex-row items-stretch' : 'flex-col'} h-fit bg-white overflow-x-hidden pb-8`}>
      {sideBySide ? (
        <>
          {mediaSection}
          <div className="w-[1px] h-[70%] bg-black/10 mx-[30px]" />
          {textSection}
        </>
      ) : (
        <>
          {textSection}
          {mediaSection}
        </>
      )}
    </div>
  );
};
const SneexGuerillaWindow = ({ 
  title, 
  subtitle, 
  description,
  videoUrl,
}: { 
  title: string, 
  subtitle: string, 
  description: React.ReactNode,
  videoUrl: string,
}) => {
  return (
    <div className="flex flex-row items-stretch h-full bg-white overflow-hidden">
      {/* Left Column: Auto-Adjusting Width based on Video Aspect Ratio */}
      <div className="h-full w-auto relative bg-black flex-shrink-0">
        <video 
          src={videoUrl} 
          className="h-full w-auto block" 
          controls
          autoPlay
          loop
          playsInline
          style={{ aspectRatio: 'auto' }}
        />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]" />
      </div>

      {/* Right Column: Scrolling Text */}
      <div className="flex-1 h-full overflow-y-auto p-16 scroll-window">
        <div className="min-h-full flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[28px] font-bold text-[#1d1d1f] leading-tight tracking-[-0.01em] uppercase whitespace-nowrap">{title}</h2>
            <p className="text-[18px] text-[#6e6e73] font-semibold tracking-[-0.01em]">{subtitle}</p>
          </div>
          
          <div className="h-[1px] bg-black/10 w-full" />
          
          <div className="text-[16px] leading-[1.6] text-[#1d1d1f] font-normal">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

const SneexVideoCampaignWindow = ({ 
  title, 
  subtitle, 
  description,
  videoUrl,
  details,
}: { 
  title: string, 
  subtitle?: string, 
  description: React.ReactNode,
  videoUrl: string,
  details?: string,
}) => {
  return (
    <div className="flex flex-row items-stretch h-full bg-white overflow-hidden font-sans">
      {/* Left Column: Auto-Adjusting Width based on Video Aspect Ratio */}
      <div className="h-full w-auto relative bg-black flex-shrink-0">
        <video 
          src={videoUrl} 
          className="h-full w-auto block" 
          controls
          autoPlay
          loop
          playsInline
          style={{ aspectRatio: 'auto' }}
        />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]" />
      </div>

      {/* Right Column: Scrolling Text */}
      <div className="flex-1 h-full overflow-y-auto p-16 scroll-window">
        <div className="min-h-full flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-[28px] font-bold text-[#1d1d1f] leading-tight tracking-[-0.01em] uppercase whitespace-nowrap">{title}</h2>
            {subtitle && <p className="text-[18px] text-[#6e6e73] font-semibold tracking-[-0.01em]">{subtitle}</p>}
          </div>
          
          <div className="h-[1px] bg-black/10 w-full" />
          
          <div className="text-[16px] leading-[1.6] text-[#1d1d1f] font-normal">
            {description}
          </div>

          {details && (
            <div className="mt-4">
              <SectionHeader title="Details:" />
              <div className="pl-4 mt-2">
                <div className="text-[16px] text-[#1d1d1f] font-normal leading-[1.6]">{details}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SneexEditorialLookbookWindow = ({ 
  title, 
  subtitle, 
  description, 
  images, 
  details,
  onEnlarge
}: { 
  title: string, 
  subtitle: string, 
  description: string, 
  images: string[], 
  details?: React.ReactNode,
  onEnlarge: (url: string, type: 'image' | 'video') => void
}) => {
  const heroImage = images[0];
  const galleryImages = images.slice(1);

  return (
    <div className="flex flex-row items-stretch h-full bg-white overflow-hidden font-sans gap-[60px]">
      {/* Left Column: Fixed Hero Image */}
      <div 
        className="w-[45%] h-full relative flex-shrink-0 cursor-zoom-in"
        onClick={() => onEnlarge(heroImage, 'image')}
      >
        <img 
          src={heroImage} 
          className="w-full h-full object-cover block transition-transform hover:scale-[1.02] duration-500" 
          alt="Hero"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Right Column: Scrollable Content */}
      <div className="flex-1 h-full overflow-y-auto p-12 pl-0 flex flex-col gap-12 scroll-window">
        {/* Header Section */}
        <div className="flex flex-col gap-4 pr-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-[24px] font-bold text-[#1d1d1f] leading-tight tracking-[-0.01em] uppercase">{title}</h2>
            <p className="text-[18px] text-[#6e6e73] font-semibold tracking-[-0.01em]">{subtitle}</p>
          </div>
          <div className="h-[1px] bg-black/10 w-full" />
          <div className="text-[16px] leading-[1.6] text-[#1d1d1f] font-normal whitespace-pre-line">
            {description}
          </div>
          {details && (
            <div className="mt-2 text-[14px] text-[#6e6e73] font-medium">
              {details}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 pr-12 pb-12">
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              className="aspect-[3/4] overflow-hidden border border-black/10 shadow-sm cursor-zoom-in"
              onClick={() => onEnlarge(img, 'image')}
            >
              <img 
                src={img} 
                className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-500" 
                alt={`Gallery ${i}`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FolderLayout = ({ title, items, videoMapping, onSizeChange }: { title: string; items?: string[]; videoMapping?: Record<string, string>; onSizeChange?: (size: { width: number | string; height: number | string }) => void }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const defaultItems = items !== undefined ? items : [...Array(6)].map((_, i) => `Item ${i + 1}`);

  const handleBack = () => {
    setSelectedVideo(null);
    setSelectedTitle(null);
    if (onSizeChange) {
      onSizeChange({ width: 'fit-content', height: 'fit-content' });
    }
  };

  const handleSelect = (item: string) => {
    if (videoMapping && videoMapping[item]) {
      setSelectedVideo(videoMapping[item]);
      setSelectedTitle(item);
      if (onSizeChange) {
        onSizeChange({ width: 400, height: 'fit-content' });
      }
    }
  };

  if (selectedVideo) {
    return (
      <div className="flex flex-col h-auto w-full bg-black pb-4 overflow-visible">
        {/* The Top (Header) */}
        <div className="h-10 flex-shrink-0 flex items-center px-4 bg-white/10 backdrop-blur-md border-b border-white/5 z-20">
          <button 
            onClick={handleBack}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors"
          >
            <ChevronLeft size={12} />
            Back
          </button>
          <div className="flex-1 text-center pr-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{selectedTitle}</span>
          </div>
        </div>
        
        {/* The Middle (Video Area) - Fixed 9:16 Aspect Ratio */}
        <div className="w-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden">
          <video 
            src={selectedVideo} 
            className="w-full h-full object-contain" 
            controls
            autoPlay
            loop
            playsInline
          />
        </div>
      </div>
    );
  }

  if (defaultItems.length === 0) {
    return (
      <div className="w-[360px] h-[180px] bg-white flex flex-col items-center justify-center p-8 select-none">
        <div className="w-14 h-11 bg-[#7cc8ff]/30 rounded-[3px] relative mb-3 flex items-center justify-center">
          <div className="absolute left-0 -top-1 w-5 h-2 bg-[#7cc8ff]/30 rounded-t-[2px]" />
        </div>
        <span className="text-[11px] font-mono text-black/30 uppercase tracking-widest">0 items</span>
      </div>
    );
  }

  return (
    <div className="p-[40px] bg-white">
      <div className="grid grid-cols-3 gap-10">
        {defaultItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => handleSelect(item)}
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div className="w-20 h-16 bg-[#7cc8ff] rounded-[4px] relative shadow-sm group-hover:brightness-105 transition-all">
               <div className="absolute left-0 -top-1.5 w-8 h-2.5 bg-[#7cc8ff] rounded-t-[2px]" />
            </div>
            <span className="text-[11px] font-semibold text-black/70 uppercase text-center group-hover:text-black transition-colors tracking-tight">{item}</span>
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
      className={`flex items-center justify-between px-4 py-2 cursor-default select-none transition-colors border-b border-black/10 w-full ${
        activeTab === id ? 'bg-black/10 text-black' : 'text-black/60 hover:bg-black/5'
      }`}
    >
      <span className="text-[14px] font-medium tracking-tight pr-4">{label}</span>
      <span className="text-[13px] text-[#8E8E93] font-normal">{count}</span>
    </div>
  );

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar - Recessed feel with light grey bg */}
      <div className="w-[150px] bg-[#F3F3F3]/80 border-r border-black/20 flex flex-col flex-shrink-0 shadow-inner">
        <div className="flex flex-col">
          <SidebarItem label="About me" id="about" count={13} />
          <SidebarItem label="CV" id="cv" count={6} />
          <SidebarItem label="Interests" id="interests" count="∞" />
        </div>
      </div>

      {/* Main Content Area - Clean raised bright white */}
      <div className="flex-1 overflow-y-auto bg-white flex flex-col">
        <div className="px-12 py-10 max-w-3xl w-full flex flex-col h-fit">
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <p className="text-[16px] text-[#1d1d1f] font-normal leading-[1.6] tracking-tight">
                Studying cognitive science @ UCLA, but don’t let that confuse you -my real passion lies in strategizing and creating- whether it be for VC, startups, or brand storytelling. +Avid Letterboxd user and frozen yogurt connoisseur.
              </p>
              
              <div className="space-y-2">
                <div className="text-[18px] text-[#1d1d1f] font-semibold tracking-[-0.01em] mb-2">I can do…</div>
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
            <div className="animate-in fade-in duration-300 w-full max-w-3xl pb-12">
              <div className="bg-white border border-black/10 rounded-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-7 sm:p-9 font-sans text-black">
                {/* Header */}
                <div className="text-center pb-3 border-b border-black">
                  <h1 className="text-[24px] font-bold tracking-tight text-black mb-1">Ava Geller</h1>
                  <div className="flex flex-wrap items-center justify-center gap-x-2 text-[12px] text-[#333]">
                    <span>Los Angeles, CA</span>
                    <span>•</span>
                    <span>4048252545</span>
                    <span>•</span>
                    <a href="mailto:avageller@ucla.edu" className="hover:underline text-blue-700">avageller@ucla.edu</a>
                    <span>•</span>
                    <a href="https://linkedin.com/in/ava-geller" target="_blank" rel="noreferrer" className="hover:underline text-blue-700">linkedin.com/in/ava-geller</a>
                    <span>•</span>
                    <a href="https://avagportfolio.vercel.app" target="_blank" rel="noreferrer" className="hover:underline text-blue-700">avagportfolio.vercel.app</a>
                  </div>
                </div>

                {/* Education */}
                <div className="mt-4">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                    Education
                  </h2>
                  <div className="flex justify-between items-baseline text-[12.5px]">
                    <span className="font-bold text-black">University of California, Los Angeles (UCLA)</span>
                    <span className="text-[#333]">Los Angeles, CA</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[12px] text-[#444] mt-0.5">
                    <span>B.S. Cognitive Science - GPA: 3.72/4.0</span>
                    <span>Expected June 2027</span>
                  </div>
                </div>

                {/* Work Experience */}
                <div className="mt-4">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                    Work Experience
                  </h2>

                  {/* Hello Sunshine */}
                  <div className="mb-3.5">
                    <div className="flex justify-between items-baseline text-[12.5px]">
                      <span className="font-bold text-black">Hello Sunshine – Reese Witherspoon</span>
                      <span className="text-[#333]">Los Angeles, CA</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[12px] italic text-[#444] mt-0.5 mb-1">
                      <span>Growth & Insights Intern</span>
                      <span>Jun 2026 – Aug 2026</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-[#222] leading-[1.45]">
                      <li>Led earned media reporting for: Apple TV ("Lucky"), Prime Video ("Elle" – 342M+ views across promotional posts), and WhatsApp (53 creator/local partners tracked weekly for Book Club chapters, contributing to the Y2 negotiation pitch).</li>
                      <li>Sought out by the Director of Integrated Marketing and Reese's Book Club Marketing Director to strengthen three multi-million-dollar brand partnership pitches (Lovesac, Apple Books, Coach) with original, data-backed insights.</li>
                      <li>Engineered a custom LLM tool synthesizing 2,000+ proprietary data points from 5+ years of company research – now adopted across Social, Sales, and Marketing teams across all 3 brands, the first tool of its kind in company history.</li>
                      <li>Designed cross-channel analytics dashboards (Dash Social, CreatorIQ, Quid) across four brands, presenting Year 1 recaps and tentpole strategy one-pagers to senior leadership; also pitched an original book-to-screen adaptation and produced the accompanying sizzle reel in DaVinci Resolve.</li>
                    </ul>
                  </div>

                  {/* EQ.app */}
                  <div className="mb-3.5">
                    <div className="flex justify-between items-baseline text-[12.5px]">
                      <span className="font-bold text-black">EQ.app – AI Agent Tech Startup</span>
                      <span className="text-[#333]">Remote</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[12px] italic text-[#444] mt-0.5 mb-1">
                      <span>Growth Intern (PM & UI/UX Focus)</span>
                      <span>Jan 2026 – Apr 2026</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-[#222] leading-[1.45]">
                      <li>Designed high-fidelity landing pages to visualize autonomous agent use cases; translated complex AI capabilities into user-centric UI prototypes for B2C clients. Organized a private AI networking event in LA for the company investors.</li>
                    </ul>
                  </div>

                  {/* Sara Blakely - Sneex */}
                  <div className="mb-3.5">
                    <div className="flex justify-between items-baseline text-[12.5px]">
                      <span className="font-bold text-black">Sara Blakely Internship - Sneex</span>
                      <span className="text-[#333]">Atlanta, GA</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[12px] italic text-[#444] mt-0.5 mb-1">
                      <span>Finance and Operations Intern</span>
                      <span>Jun 2025 – Aug 2025</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-[#222] leading-[1.45]">
                      <li>Produced/edited marketing reel personally selected by Sara Blakely to run as a paid ad, continuously funded since Aug '25.</li>
                      <li>Led team of 5 on a 48-hour research/content production trip to NYC; conducting 115 cold-approach street interviews; synthesized data points into a strategy presentation delivered to Sara Blakely.</li>
                      <li>Worked directly with CFO to guide weekly decisions on pricing, inventory, and growth through financial modeling and market research.</li>
                    </ul>
                  </div>

                  {/* Bruin Ventures */}
                  <div className="mb-3.5">
                    <div className="flex justify-between items-baseline text-[12.5px]">
                      <span className="font-bold text-black">Bruin Ventures – UCLA's Premier VC and Entrepreneurship Org</span>
                      <span className="text-[#333]">Los Angeles, CA</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[12px] italic text-[#444] mt-0.5 mb-1">
                      <span>Senior Analyst & Project Manager</span>
                      <span>Oct 2024 – Present</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-[#222] leading-[1.45]">
                      <li>1 of 13 selected from 507 applicants; completed 50+ hours of intensive training on VC and startup fundamentals.</li>
                      <li>Selected to be a contract consultant for Draper Associates, pitching investment memos directly to billionaire investor Tim Draper on the AR/VR sector.</li>
                      <li>Executed 4 project-based client engagements across VC and startup verticals, including a 250-person event to onboard Ditto AI users resulting in 1000 signups for the app.</li>
                    </ul>
                  </div>

                  {/* Hiike */}
                  <div className="mb-3.5">
                    <div className="flex justify-between items-baseline text-[12.5px]">
                      <span className="font-bold text-black">Hiike – Film-Tech Startup</span>
                      <span className="text-[#333]">Los Angeles, CA</span>
                    </div>
                    <div className="flex justify-between items-baseline text-[12px] italic text-[#444] mt-0.5 mb-1">
                      <span>Business Development Intern</span>
                      <span>Feb 2025 – May 2025</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-[#222] leading-[1.45]">
                      <li>Built a film festival partnerships database from scratch, tracking 300+ sponsors and creating a scalable outreach system to connect independent films with festivals.</li>
                      <li>Refined the founder's investor pitch decks ahead of VC meetings, shaping the narrative around the brand positioning and go-to-market strategy.</li>
                    </ul>
                  </div>

                  {/* 2x Founder */}
                  <div className="mb-3.5">
                    <div className="flex justify-between items-baseline text-[12.5px]">
                      <span className="font-bold text-black">2x Founder</span>
                      <span className="text-[#333]"></span>
                    </div>
                    <div className="flex justify-between items-baseline text-[12px] italic text-[#444] mt-0.5 mb-1">
                      <span>Style Bundles by Ava/ The04Brand</span>
                      <span>Jan 2022 – Jun 2023</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-[11.5px] text-[#222] leading-[1.45]">
                      <li>Bootstrapped two independent businesses – a thrift resale brand and a custom loungewear line (founded at age 16) – driving 175+ sales and $10,000 in combined revenue over 18 months through entirely self-produced content and branding.</li>
                    </ul>
                  </div>
                </div>

                {/* Additional */}
                <div className="mt-4">
                  <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                    Additional
                  </h2>
                  <p className="text-[11.5px] text-[#222] leading-[1.5]">
                    <span className="font-semibold">Skills:</span> Dash Social, CreatorIQ, DaVinci Resolve/Premiere, UI/UX, pitch decks, Excel modeling, consumer insights
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interests' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-[18px] text-[#1d1d1f] font-semibold tracking-[-0.01em] mb-2">Obsessions</div>
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

const SpotlightSearchHint: React.FC = () => {
  const fullText = "click on each folder to see what i've been up to";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        index++;
        setDisplayedText(fullText.slice(0, index));
        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, 85);

      return () => clearInterval(interval);
    }, 900);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.7, type: "spring", stiffness: 260, damping: 22 }}
      className="fixed top-4 md:top-7 left-1/2 -translate-x-1/2 z-[25] pointer-events-none select-none max-w-[92vw]"
    >
      <div className="h-[38px] md:h-[46px] px-3 md:px-4 rounded-[14px] md:rounded-[16px] bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_16px_40px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] inline-flex items-center gap-2 md:gap-2.5 w-fit">
        <Search size={16} className="text-[#1d1d1f]/45 flex-shrink-0 md:w-[18px] md:h-[18px]" strokeWidth={2.2} />
        <div className="flex items-center">
          <span className="text-[13px] md:text-[15px] text-[#1d1d1f] font-normal tracking-[-0.01em] whitespace-nowrap">
            {displayedText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.85, ease: "steps(2, start)" }}
            className="inline-block w-[2px] h-[14px] md:h-[17px] bg-[#007AFF] ml-0.5 flex-shrink-0 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([]);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [enlargedMedia, setEnlargedMedia] = useState<{ url: string, type: 'image' | 'video' } | null>(null);
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

  const handleOpenDesktopFile = useCallback((id: string, title: string, startX?: number, startY?: number) => {
    // Mark as viewed
    setViewedIds(prev => prev.includes(id) ? prev : [...prev, id]);

    if (id === 'projekty') {
      window.open('https://avageller.my.canva.site/ugcportfolio', '_blank', 'noopener,noreferrer');
      return;
    }

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
        const updateSize = (size: { width: number | string; height: number | string }) => {
          setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, ...size } : w));
        };

        if (id === 'projekty') {
          content = <FolderLayout title={title} items={[]} videoMapping={{}} onSizeChange={updateSize} />;
        } else {
          content = <FolderLayout title={title} onSizeChange={updateSize} />;
        }
        winType = 'folder';
      } else {
        // Handle custom content for specific project IDs
        if (id === 'ramowka') {
          content = (
            <SneexVideoCampaignWindow 
              title="SNEEX VIDEO CAMPAIGN" 
              description={
                <p>
                  Marketing reel i created during my internship that was <span className="font-bold">personally selected by spanx founder/shark tank investor sara blakely</span> to be turned into a paid Instagram and Facebook promotion that has been actively running as a boosted ad for the past 5 months.
                </p>
              }
              videoUrl="https://i.imgur.com/2CHxWWF.mp4"
              details="~170K combined reach (insta + tik tok) to date."
            />
          );
        } else if (id === 'sneex-editorial') {
          content = (
            <SneexEditorialLookbookWindow 
              title={title} 
              subtitle="Lead Creative / Photographer"
              description={`Capturing the intersection of high-performance sneakers and luxury stilettos.\n\nOutcome: Visual assets for web, social media, and brand identity.`}
              images={[
                "https://i.imgur.com/zjtRYmQ.jpeg",
                "https://i.imgur.com/8NGzojs.jpeg",
                "https://i.imgur.com/s5ErHUS.jpeg",
                "https://i.imgur.com/uBkgdBv.jpeg",
                "https://i.imgur.com/pQBz4OU.jpeg"
              ]}
              details={
                <span>
                  Role: Lead Creative / Photographer for <a href="https://sneex.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sneex</a>
                </span>
              }
              onEnlarge={(url, type) => setEnlargedMedia({ url, type })}
            />
          );
        } else if (id === 'nyc-mission') {
          content = (
            <SneexGuerillaWindow 
              title="Sneex Guerilla Marketing PM" 
              subtitle="Hand-picked by Sara Blakely to lead a team of 5 in a 48-hour trip to NYC through real-world consumer feedback."
              description={
                <ul className="list-disc space-y-4 ml-6">
                  <li className="pl-2">Conducted <span className="font-bold">115 cold-approach interviews</span> on the streets of NYC, managing team logistics, morale, and data integrity under a 2-day deadline.</li>
                  <li className="pl-2">Interviewed high-profile targets including Nicole Scherzinger (Lead singer of The Pussycat Dolls) and 2 professional WNBA players, proving the product's appeal to elite athletes and global icons.</li>
                  <li className="pl-2">Served as the <span className="font-bold">Lead Director and Editor</span>, distilling ~20 hours of raw street footage into a high-energy narrative and analyzing qualitative data to provide actionable product insights.</li>
                  <li className="pl-2">Devised 3 proposals for Sara Blakely based on field research... if I told you I’d have to kill you (NDA again)</li>
                </ul>
              }
              videoUrl="https://i.imgur.com/Itcd7qH.mp4"
            />
          );
        } else if (id === 'event-planner') {
          content = <EventPlannerBinder />;
        } else if (id === 'love') {
          content = <StyleBundlesWindow onEnlarge={(url, type) => setEnlargedMedia({ url, type })} />;
        } else if (id === 'szept') {
          content = <The04BrandWindow />;
        } else if (id === 'draper-consultant') {
          content = null;
        } else if (id === 'movie-trailer') {
          content = null;
        } else {
          content = <ProjectInformationLayout title={title} thumbnail={icon?.iconSrc} />;
        }
        winType = 'project';
      }

      let winWidth: number | string | undefined = 640;
      let winHeight: number | string | undefined = 540;

      // Content-Aware Sizing
      if (id === 'ramowka' || id === 'nyc-mission') {
        // Side-by-side layout
        winWidth = 1100;
        winHeight = '80vh';
      } else if (id === 'sneex-editorial') {
        winWidth = 1050;
        winHeight = '78vh';
      } else if (id === 'event-planner') {
        // Binder (8.5/11)
        winWidth = 750;
        winHeight = '82vh';
      } else if (id === 'love') {
        winWidth = 1150;
        winHeight = '80vh';
      } else if (id === 'szept') {
        // Gallery/Grid
        winWidth = 850;
        winHeight = '78vh';
      } else if (id === 'draper-consultant') {
        winWidth = 800;
        winHeight = undefined; // Intrinsic height
      } else if (winType === 'folder') {
        winWidth = 'fit-content';
        winHeight = 'fit-content';
      }

      const newWindow: WindowData = {
        id,
        title: id === 'event-planner' ? "LEAD PM: ANALOG TO AI" : title,
        type: winType === 'folder' ? 'folder' : 'project',
        content,
        zIndex: nextZ,
        startX: startX !== undefined ? (startX / 100) * window.innerWidth : undefined,
        startY: startY !== undefined ? (startY / 100) * window.innerHeight : undefined,
        width: winWidth,
        height: winHeight,
        aspectRatio: id === 'event-planner' ? 8.5 / 11 : undefined,
        overflowVisible: id === 'event-planner' || id === 'projekty',
      };

      return [...prev, newWindow];
    });
  }, [getNextZ]);

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
      else if (id === 'error' || id === 'letterboxd' || id === 'kindle' || id === 'photos' || id === 'id') type = 'media';
      else content = <div className="p-10 text-center text-black font-normal uppercase tracking-widest leading-relaxed bg-white">Workspace is currently undergoing maintenance.</div>;

      let winWidth = 800;
      let winHeight = 600;
      if (id === 'error') { winWidth = 260; winHeight = 125; }
      if (id === 'letterboxd') { winWidth = 420; winHeight = 220; }
      if (id === 'kindle') { winWidth = 440; winHeight = 620; }
      if (id === 'photos') { winWidth = 500; winHeight = 600; }
      if (id === 'notes') { winWidth = 840; winHeight = 600; }
      if (id === 'id') { winWidth = 900; winHeight = 650; }
      
      const newWindow: WindowData = {
        id,
        title,
        type,
        content,
        zIndex: nextZ,
        startX: window.innerWidth / 2,
        startY: window.innerHeight,
        width: winWidth,
        height: winHeight,
      };

      return [...prev, newWindow];
    });
  }, [getNextZ]);

  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div ref={desktopRef} className="w-screen h-screen overflow-hidden relative">
      <img 
        src="https://i.imgur.com/jMeW4mJ.jpeg" 
        alt="Background"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, objectFit: 'cover', filter: 'blur(4px) brightness(1.1)', scale: '1.05' }} 
      />
      <div className="fixed inset-0 bg-white/40 pointer-events-none z-[1]" />
      
      <div className="absolute inset-0 z-[10] pointer-events-none">
        <SpotlightSearchHint />

        <div className="mobile-desktop-container absolute inset-0 z-[30] pointer-events-auto md:pointer-events-none md:overflow-visible md:block md:p-0">
          {DESKTOP_ICONS.map((icon, index) => (
            <DesktopIcon
              key={icon.id}
              index={index}
              title={icon.title}
              iconSrc={icon.iconSrc}
              x={icon.x}
              y={icon.y}
              orientation={icon.orientation}
              type={icon.type}
              isProminent={icon.isProminent}
              isViewed={viewedIds.includes(icon.id)}
              onClick={(startX, startY) => handleOpenDesktopFile(icon.id, icon.title, startX, startY)}
              onFocus={() => handleFocusWindow(icon.id)}
              zIndex={30}
              containerRef={desktopRef}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-[50] pointer-events-none">
          <AnimatePresence>
            {openWindows.map((win) => (
              <div key={win.id} className="pointer-events-auto">
                {win.id === 'error' ? (
                  <AdobeError 
                    zIndex={win.zIndex || 100} 
                    onClose={() => handleCloseWindow(win.id)} 
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
                  />
                ) : win.id === 'letterboxd' ? (
                  <LetterboxdWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
                  />
                ) : win.id === 'kindle' ? (
                  <KindleWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
                  />
                ) : win.id === 'photos' ? (
                  <PhotosWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
                  />
                ) : win.id === 'id' ? (
                  <InDesignWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
                  />
                ) : win.id === 'event-planner' ? (
                  <EventPlannerBinder 
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
                  />
                ) : win.id === 'draper-consultant' ? (
                  <DraperWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                  />
                ) : win.id === 'movie-trailer' ? (
                  <MovieTrailerWindow
                    zIndex={win.zIndex || 100}
                    onClose={() => handleCloseWindow(win.id)}
                    onFocus={() => handleFocusWindow(win.id)}
                    startX={win.startX}
                    startY={win.startY}
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
                      startX={win.startX}
                      startY={win.startY}
                      width={win.width}
                      height={win.height}
                      aspectRatio={win.aspectRatio}
                      overflowVisible={win.overflowVisible}
                      maxHeight={(win.id === 'nyc-mission' || win.id === 'ramowka') ? '80vh' : win.id === 'sneex-editorial' ? '78vh' : win.id === 'love' ? '80vh' : win.id === 'projekty' ? '75vh' : undefined}
                      style={(win.id === 'nyc-mission' || win.id === 'ramowka') ? { height: '80vh', marginBottom: '100px' } : win.id === 'sneex-editorial' ? { height: '78vh', marginBottom: '100px' } : win.id === 'love' ? { maxHeight: '80vh', marginBottom: '100px' } : win.id === 'projekty' ? { height: 'fit-content', maxHeight: '75vh', top: '45%', translateY: '-45%' } : undefined}
                      noScroll={win.id === 'nyc-mission' || win.id === 'ramowka' || win.id === 'sneex-editorial' || win.id === 'projekty'}
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

      {/* Lightbox Portal */}
      <AnimatePresence>
        {enlargedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-8 cursor-default"
            onClick={() => setEnlargedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-0 right-0 p-4 text-white/60 hover:text-white transition-colors pointer-events-auto z-10"
                onClick={() => setEnlargedMedia(null)}
              >
                <X size={32} />
              </button>

              <div className="w-full h-full flex items-center justify-center pointer-events-auto">
                {enlargedMedia.type === 'image' ? (
                  <img
                    src={enlargedMedia.url}
                    alt="Enlarged"
                    className="max-w-[90%] max-h-[90%] object-contain shadow-2xl rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <video
                    src={enlargedMedia.url}
                    className="max-w-[90%] max-h-[90%] object-contain shadow-2xl rounded-sm"
                    controls
                    autoPlay
                    muted={false}
                    playsInline
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
