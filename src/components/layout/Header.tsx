"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { Library, User, Bell, Settings, Search } from 'lucide-react';

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
}

const Header = ({ activeModuleId, onModuleChange }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-white/5 bg-[#161926]/80 backdrop-blur-md text-white flex items-center px-6 shrink-0 z-50">
      {/* Logo 区域 */}
      <div className="flex items-center gap-3 mr-12">
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.4)]">
          <Library size={20} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight leading-none">文物管理系统</span>
          <span className="text-[9px] text-slate-500 mt-1 tracking-widest uppercase font-medium">Digital Archives Center</span>
        </div>
      </div>
      
      {/* 一级模块导航 */}
      <nav className="flex h-full items-center gap-1">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "px-5 h-10 rounded-full flex items-center transition-all text-sm font-medium",
              activeModuleId === module.id 
                ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            )}
          >
            {module.label}
          </button>
        ))}
      </nav>

      {/* 右侧工具栏 */}
      <div className="ml-auto flex items-center gap-5">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-pink-500/50 w-48 transition-all"
            placeholder="搜索功能..."
          />
        </div>

        <div className="flex items-center gap-3 border-r border-white/10 pr-5">
          <button className="text-slate-400 hover:text-pink-500 transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#161926]" />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-pink-400 shadow-lg">
            <User size={16} />
          </div>
          <span className="text-xs font-medium text-slate-300 hidden sm:block">管理员</span>
        </div>
      </div>
    </header>
  );
};

export default Header;