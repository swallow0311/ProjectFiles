"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { Library, User, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
}

const Header = ({ activeModuleId, onModuleChange }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0f172a] text-white flex items-center px-6 shrink-0 z-50 shadow-2xl">
      {/* Logo 区域 */}
      <div className="flex items-center gap-3 mr-16">
        <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          <Library size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-wider leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">文物管理系统</span>
          <span className="text-[9px] text-slate-500 mt-1 tracking-[0.2em] uppercase font-medium">Cultural Relics Management</span>
        </div>
      </div>
      
      {/* 一级模块导航 */}
      <nav className="flex h-full items-center">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "px-8 h-full flex items-center transition-all relative text-sm font-medium tracking-wide group",
              activeModuleId === module.id 
                ? "text-white bg-slate-800/40" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/20"
            )}
          >
            <span className="relative z-10">{module.label}</span>
            {activeModuleId === module.id && (
              <>
                {/* 底部主光条 */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)]" />
                {/* 底部扩散光晕 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-blue-500/20 blur-xl rounded-full" />
              </>
            )}
          </button>
        ))}
      </nav>

      {/* 右侧工具栏 */}
      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-slate-800 pr-6">
          <button className="text-slate-400 hover:text-white transition-all hover:scale-110">
            <Bell size={18} />
          </button>
          <button className="text-slate-400 hover:text-white transition-all hover:scale-110">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">系统管理员</div>
            <div className="text-[10px] text-slate-500 font-medium">SUPER ADMIN</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 font-bold shadow-lg group-hover:border-blue-500/50 transition-all">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;