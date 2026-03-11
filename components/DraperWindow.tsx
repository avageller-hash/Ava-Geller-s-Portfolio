import React from 'react';
import { motion } from 'framer-motion';

interface DraperWindowProps {
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

const DraperWindow: React.FC<DraperWindowProps> = ({ onClose, onFocus, zIndex }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onMouseDown={onFocus}
      style={{
        zIndex,
        position: 'fixed',
        inset: 0,
        margin: 'auto',
        width: '800px',
        height: 'auto',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.45), 0 10px 30px -10px rgba(0,0,0,0.2)',
        pointerEvents: 'auto'
      }}
    >
      {/* The Header (Title Bar) */}
      <div 
        style={{ 
          height: '40px', 
          flexShrink: 0, 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 16px', 
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          background: '#f6f6f6',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          cursor: 'default'
        }}
      >
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 hover:brightness-90 transition-all"
          />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
        </div>
        <div className="flex-1 text-center pr-12">
          <span className="text-[13px] font-medium text-gray-600">Contract Consultant for Draper Associates</span>
        </div>
      </div>

      {/* The Image (No-Zoom Rule) */}
      <img 
        src="https://i.imgur.com/tBzPpHv.jpeg" 
        alt="Pitching to Tim Draper" 
        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        referrerPolicy="no-referrer"
      />

      {/* The Text (Natural Flow) */}
      <div style={{ padding: '40px', background: 'white' }}>
        <div className="space-y-6 text-center">
          <p className="text-[16px] text-[#1d1d1f] font-normal leading-[1.6] italic">
            me pitching an investment memo to Tim Draper, founder of <a href="https://www.draper.vc/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline font-bold">Draper Associates</a> known for his early-stage bets on Tesla, SpaceX, Skype, and Baidu
          </p>
          <p className="text-[18px] text-[#1d1d1f] font-bold leading-[1.6] italic">
            I’d tell you the details, but then I’d have to kill you... (Standard NDA behavior)
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DraperWindow;
