"use client";

import React, { useState, useEffect, useRef } from 'react';
import RelicDataDashboard from './RelicDataDashboard';
import EventDashboard from './EventDashboard';
import DeviceDashboard from './DeviceDashboard';
import { cn } from '@/lib/utils';

const DASHBOARDS = [
  { id: 'relic', component: RelicDataDashboard, label: '文物数据一张图' },
  { id: 'event', component: EventDashboard, label: '文保事件一张图' },
  { id: 'device', component: DeviceDashboard, label: '监测设备一张图' },
];

const SmartScreenCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DASHBOARDS.length);
    }, 8000); // 每8秒切换一次
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPaused]);

  const ActiveComponent = DASHBOARDS[activeIndex].component;

  return (
    <div 
      className="relative h-full flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 切换指示器 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {DASHBOARDS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
              activeIndex === idx 
                ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.5)]" 
                : "text-slate-400 hover:text-white"
            )}
          >
            {item.label}
          </button>
        ))}
        {isPaused && (
          <div className="ml-2 flex items-center gap-1 text-[10px] text-yellow-400 animate-pulse">
            <div className="w-1 h-1 rounded-full bg-yellow-400" />
            已暂停滚动
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 animate-in fade-in duration-700">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default SmartScreenCarousel;