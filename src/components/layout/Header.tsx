"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { User, Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
}

const Header = ({ activeModuleId, onModuleChange }: HeaderProps) => {
  return (
    <header className="h-16 border-b bg-[#001529] text-white flex items-center px-6 shrink-0 z-50 shadow-md">
      <div className="flex items-center gap-3 mr-12">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">智慧文物管理系统</span>
      </div>

      <nav className="flex h-full items-center">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              'px-6 h-full flex items-center transition-colors relative text-sm font-medium',
              activeModuleId === module.id
                ? 'text-white bg-blue-600/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            )}
          >
            {module.label}
            {activeModuleId === module.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
            )}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-6">
        <button className="p-2 text-slate-300 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#001529]" />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">管理员</span>
            <span className="text-[10px] text-slate-400">超级管理员</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;