"use client";

import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Hexagon } from 'lucide-react';

interface SidebarProps {
  menus: MenuItem[];
  activeMenuId: string;
  onMenuChange: (id: string) => void;
}

const Sidebar = ({ menus, activeMenuId, onMenuChange }: SidebarProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['main-volume', 'sub-volume', 'voucher', 'category']);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.includes(item.id);
    const isActive = activeMenuId === item.id;

    if (depth === 0) {
      return (
        <div key={item.id} className="mb-4 px-4">
          <button
            onClick={() => hasChildren ? toggleExpand(item.id) : onMenuChange(item.id)}
            className={cn(
              "w-full flex items-center py-3 px-4 rounded-xl transition-all group relative overflow-hidden",
              isActive && !hasChildren
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
            )}
          >
            {isActive && !hasChildren && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
            )}
            <Hexagon size={16} className={cn("mr-3 transition-colors", isActive ? "text-cyan-400" : "text-slate-600 group-hover:text-cyan-500")} />
            <span className="flex-1 text-left text-sm font-black tracking-widest uppercase">{item.label}</span>
            {hasChildren && (
              <div className="opacity-40">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            )}
          </button>
          
          {hasChildren && isExpanded && (
            <div className="mt-2 ml-2 border-l border-slate-800 space-y-1">
              {item.children?.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onMenuChange(item.id)}
        className={cn(
          "w-full flex items-center py-2.5 pl-8 pr-4 text-[13px] transition-all relative group",
          isActive 
            ? "text-cyan-400 font-bold" 
            : "text-slate-500 hover:text-slate-200 hover:pl-9"
        )}
      >
        {isActive && (
          <div className="absolute left-0 w-4 h-[1px] bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
        )}
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm overflow-y-auto shrink-0">
      <div className="py-8">
        <div className="px-8 mb-6">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
        {menus.map(menu => renderMenuItem(menu))}
      </div>
    </aside>
  );
};

export default Sidebar;