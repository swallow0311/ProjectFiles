"use client";

import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LayoutGrid, Sparkles } from 'lucide-react';

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
              "w-full flex items-center py-2.5 px-3 rounded-xl transition-all group",
              isActive && !hasChildren
                ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_4px_15px_rgba(244,63,94,0.3)]"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <LayoutGrid size={16} className={cn("mr-3", isActive && !hasChildren ? "text-white" : "text-slate-500 group-hover:text-pink-400")} />
            <span className="flex-1 text-left text-sm font-bold tracking-wide">{item.label}</span>
            {hasChildren && (
              <div className="opacity-40">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            )}
          </button>
          
          {hasChildren && isExpanded && (
            <div className="mt-2 space-y-1 border-l border-white/5 ml-5">
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
          "w-full flex items-center py-2 pl-6 pr-4 text-[13px] transition-all relative group",
          isActive 
            ? "text-pink-400 font-semibold" 
            : "text-slate-500 hover:text-slate-300 hover:pl-7"
        )}
      >
        {isActive && (
          <div className="absolute left-0 w-1 h-4 bg-pink-500 rounded-r-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        )}
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 bg-[#0f111a] border-r border-white/5 overflow-y-auto shrink-0">
      <div className="py-8">
        {/* 顶部装饰 */}
        <div className="px-7 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-white/5 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Status</span>
            </div>
            <div className="text-xl font-black text-white">运行中</div>
            <div className="text-[10px] text-slate-500 mt-1">System Online: 24d 12h</div>
          </div>
        </div>

        {menus.map(menu => renderMenuItem(menu))}
      </div>
    </aside>
  );
};

export default Sidebar;