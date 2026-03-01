
import React from 'react';

export interface WindowData {
  id: string;
  title: string;
  type: 'project' | 'about' | 'contact' | 'media' | 'folder' | 'app';
  content: React.ReactNode;
  iconSrc?: string;
  initialX?: number;
  initialY?: number;
  zIndex?: number;
  aspectRatio?: number;
  overflowVisible?: boolean;
}

export interface DesktopIconData {
  id: string;
  title: string;
  iconSrc: string;
  x: number;
  y: number;
  orientation?: 'vertical' | 'horizontal';
  type?: 'file' | 'folder';
  isProminent?: boolean;
}
