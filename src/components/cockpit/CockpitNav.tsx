"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { DASHBOARDS } from './SmartScreenCarousel';

interface CockpitNavProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  isLocked: boolean;
  onToggleLock: (lock: boolean) => void;
}

const CockpitNav = ({ activeIndex, onSelect, isLocked, onToggleLock }: CockpitNavProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 处理点击菜单项
  const handleItemClick = (index: number) => {
    onSelect(index);
    onToggleLock(true); // 点击后锁定
  };

  // 滚动控制
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center bg-slate-900/60 backdrop-blur-md border-b border-white/10 px-4 h-14 shrink-0 z-30">
      {/* 播放/暂停状态切换 */}
      <button
        onClick={() => onToggleLock(!isLocked)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all mr-4 shrink-0",
          isLocked 
            ? "bg-slate-700 text-slate-300 hover:bg-slate-600" 
            : "bg-blue-600 text-white animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        )}
      >
        {isLocked ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
        {isLocked ? "开始巡检" : "自动巡检中"}
      </button>

      <div className="h-6 w-px bg-white/10 mr-4 shrink-0" />

      {/* 左右滚动按钮（仅在需要时显示，这里简化处理） */}
      <button onClick={() => scroll('left')} className="p-1 text-slate-400 hover:text-white shrink-0">
        <ChevronLeft size={20} />
      </button>

      {/* 滚动菜单主体 */}
      <div 
        ref={scrollRef}
        className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-2"
      >
        {DASHBOARDS.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(index)}
              className={cn(
                "relative px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0",
                isActive 
                  ? "text-white bg-white/10 shadow-inner" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {item.label}
              {isActive && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full animate-in fade-in slide-in-from-bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      <button onClick={() => scroll('right')} className="p-1 text-slate-400 hover:text-white shrink-0">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CockpitNav;