"use client";

import React from 'react';
import { MENU_DATA } from '@/constants/menuData';
import { cn } from '@/lib/utils';
import { Library } from 'lucide-react';

interface HeaderProps {
  activeModuleId: string;
  onModuleChange: (id: string) => void;
}

const Header = ({ activeModuleId, onModuleChange }: HeaderProps) => {
  return (
    <header className="h-16 border-b bg-slate-900 text-white flex items-center px-6 shrink-0">
      <div className="flex items-center gap-2 mr-12">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Library size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">文物管理系统</span>
      </div>
      
      <nav className="flex h-full">
        {MENU_DATA.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={cn(
              "px-6 h-full flex items-center transition-colors relative text-sm font-medium",
              activeModuleId === module.id 
                ? "text-white bg-slate-800" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            )}
          >
            {module.label}
            {activeModuleId === module.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
            )}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <div className="text-sm text-slate-400">管理员：张三</div>
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
          Admin
        </div>
      </div>
    </header>
  );
};

export default Header;