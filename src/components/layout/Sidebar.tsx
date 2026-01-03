"use client";

import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  menus: MenuItem[];
  activeMenuId: string;
  onMenuChange: (id: string) => void;
}

const Sidebar = ({ menus, activeMenuId, onMenuChange }: SidebarProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['main-volume']);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.includes(item.id);
    const isActive = activeMenuId === item.id;

    return (
      <div key={item.id} className="w-full">
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              onMenuChange(item.id);
            }
          }}
          className={cn(
            "w-full flex items-center py-2.5 px-4 text-sm transition-colors",
            depth > 0 ? "pl-8" : "",
            isActive 
              ? "bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-600" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <span className="flex-1 text-left truncate">{item.label}</span>
          {hasChildren && (
            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="bg-slate-50/50">
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 border-r bg-white overflow-y-auto shrink-0">
      <div className="py-4">
        {menus.map(menu => renderMenuItem(menu))}
      </div>
    </aside>
  );
};

export default Sidebar;