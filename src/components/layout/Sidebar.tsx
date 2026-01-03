"use client";

import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react';

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

    // 一级菜单样式（侧边栏顶层）
    if (depth === 0) {
      return (
        <div key={item.id} className="mb-2 px-3">
          <button
            onClick={() => hasChildren ? toggleExpand(item.id) : onMenuChange(item.id)}
            className={cn(
              "w-full flex items-center py-2.5 px-3 rounded-lg transition-all group",
              isActive && !hasChildren
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <LayoutGrid size={16} className={cn("mr-2.5 opacity-70", isActive && !hasChildren ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
            <span className="flex-1 text-left text-sm font-bold tracking-wide">{item.label}</span>
            {hasChildren && (
              <div className="opacity-50">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            )}
          </button>
          
          {hasChildren && isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children?.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // 二级/子菜单样式
    return (
      <button
        key={item.id}
        onClick={() => onMenuChange(item.id)}
        className={cn(
          "w-full flex items-center py-2 pl-10 pr-4 text-[13px] transition-all relative group",
          isActive 
            ? "text-blue-600 font-semibold" 
            : "text-slate-500 hover:text-slate-900 hover:pl-11"
        )}
      >
        {isActive && (
          <div className="absolute left-4 w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
        )}
        {!isActive && (
          <div className="absolute left-4 w-1 h-1 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-colors" />
        )}
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white overflow-y-auto shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="py-6">
        {menus.map(menu => renderMenuItem(menu))}
      </div>
    </aside>
  );
};

export default Sidebar;