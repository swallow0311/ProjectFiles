"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { User, Bell, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
  onBellClick?: () => void;
}

const Header = ({ activeModuleId, onModuleChange, onBellClick }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-white/5 bg-[#020617] text-white flex items-center px-6 shrink-0 z-50 shadow-2xl">
      {/* Logo 区域 */}
      <div className="flex items-center gap-3 mr-16 group cursor-pointer">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-slate-900 p-2 rounded-xl border border-white/10">
            <Sparkles size={20} className="text-indigo-400" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            智慧文物系统
          </span>
          <span className="text-[9px] text-indigo-400/60 mt-0.5 tracking-[0.15em] uppercase font-semibold">
            Intelligent Archive
          </span>
        </div>
      </div>
      
      {/* 一级模块导航 */}
      <nav className="flex h-full items-center gap-1">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "px-6 h-10 rounded-full flex items-center transition-all relative text-sm font-medium tracking-wide group",
              activeModuleId === module.id 
                ? "text-white bg-white/10" 
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            )}
          >
            <span className="relative z-10">{module.label}</span>
            {activeModuleId === module.id && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
            )}
          </button>
        ))}
      </nav>

      {/* 右侧工具栏 */}
      <div className="ml-auto flex items-center gap-5">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
          <button 
            onClick={onBellClick}
            className="p-2 text-slate-400 hover:text-white transition-all rounded-full hover:bg-white/10"
            title="查看告警处理"
          >
            <Bell size={16} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-[1px]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;