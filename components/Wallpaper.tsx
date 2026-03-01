
import React from 'react';

const Wallpaper: React.FC = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -50,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <div 
        className="absolute inset-0 scale-[1.15]"
        style={{
          backgroundImage: `url('https://i.imgur.com/i5C34Bj.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px) brightness(1.1) saturate(1.2)',
          width: '100%',
          height: '100%'
        }}
      />
      {/* Soft overlay to ensure legibility of desktop elements */}
      <div className="absolute inset-0 bg-white/40 backdrop-brightness-105" />
    </div>
  );
};

export default Wallpaper;
