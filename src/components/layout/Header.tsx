"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { Library, User, Bell, Settings, Cpu } from 'lucide-react';

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
}

const Header = ({ activeModuleId, onModuleChange }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md text-white flex items-center px-6 shrink-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      {/* Logo 区域 */}
      <div className="flex items-center gap-3 mr-16">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 animate-pulse" />
          <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg">
            <Cpu size={22} className="text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            文物智慧档案
          </span>
          <span className="text-[9px] text-cyan-500/70 font-bold tracking-[0.2em] uppercase">
            Smart Heritage System
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
              "px-5 h-10 rounded-full flex items-center transition-all text-sm font-bold tracking-wide relative group",
              activeModuleId === module.id 
                ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20" 
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            )}
          >
            {module.label}
            {activeModuleId === module.id && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-500 rounded-full shadow-[0_0_12px_#06b6d4]" />
            )}
          </button>
        ))}
      </nav>

      {/* 右侧工具栏 */}
      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-slate-800 pr-6">
          <button className="text-slate-400 hover:text-cyan-400 transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
          </button>
          <button className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Admin</div>
            <div className="text-[10px] text-slate-500 font-mono">LV.99 SUPERUSER</div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-xl overflow-hidden">
              <User size={22} />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-cyan-500/20" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;