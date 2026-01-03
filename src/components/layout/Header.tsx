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
    <header className="h-16 border-b border-slate-800 bg-slate-900 text-white flex items-center px-6 shrink-0 z-50 shadow-lg">
      {/* Logo 区域 */}
      <div className="flex items-center gap-3 mr-16">
        <div className="bg-blue-600 p-2 rounded-xl shadow-inner shadow-blue-400/20">
          <Library size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-wider leading-none">文物管理系统</span>
          <span className="text-[10px] text-slate-400 mt-1 tracking-widest uppercase opacity-60">Cultural Relics Management</span>
        </div>
      </div>
      
      {/* 一级模块导航 */}
      <nav className="flex h-full items-center">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "px-6 h-full flex items-center transition-all relative text-sm font-medium tracking-wide",
              activeModuleId === module.id 
                ? "text-white bg-slate-800/50" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
            )}
          >
            {module.label}
            {activeModuleId === module.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.5)]" />
            )}
          </button>
        ))}
      </nav>

      {/* 右侧工具栏 */}
      <div className="ml-auto flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-slate-800 pr-6">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Bell size={18} />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-slate-200">系统管理员</div>
            <div className="text-[10px] text-slate-500">超级管理员</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold shadow-md">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;