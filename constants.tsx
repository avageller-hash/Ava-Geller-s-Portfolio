
import React from 'react';
import { DesktopIconData } from './types';

// Specific spring for desktop icons as requested: stiffness 150, damping 20
export const iconSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 20,
  mass: 1
};

// Snappy spring for windows
export const windowSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 25,
  mass: 1
};

export const entryAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

/**
 * REPLICATED POSITIONS FROM SCREENSHOT - REDUCED TO 7 FILES
 * Including one folder icon 'PROJEKTY' for a realistic desktop feel.
 */
export const DESKTOP_ICONS: DesktopIconData[] = [
  { id: 'ramowka', title: 'SNEEX CAMPAIGN', iconSrc: 'https://i.imgur.com/ao97oFf.jpeg', x: 24, y: 33, orientation: 'vertical', type: 'file', isProminent: true },
  { id: 'sneex-editorial', title: 'Sneex Editorial', iconSrc: 'https://i.imgur.com/zjtRYmQ.jpeg', x: 24, y: 48, orientation: 'vertical', type: 'file' },
  { id: 'love', title: 'STYLE BUNDLES BUSINESS', iconSrc: 'https://i.imgur.com/AzV3OrU.png', x: 42, y: 32, orientation: 'horizontal', type: 'file' },
  { id: 'projekty', title: 'Creative video editing', iconSrc: '', x: 58, y: 38, type: 'folder' },
  { id: 'event-planner', title: 'Ava the Event Planner', iconSrc: 'https://i.imgur.com/2wICCyn.jpeg', x: 52, y: 58, orientation: 'vertical', type: 'file' },
  { id: 'szept', title: 'THE 04 BRAND', iconSrc: 'https://i.imgur.com/pcfc0Mh.jpeg', x: 35, y: 58, orientation: 'horizontal', type: 'file' },
];
