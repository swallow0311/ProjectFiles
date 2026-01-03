"use client";

import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  ChevronRight, 
  Database, 
  Files, 
  BookOpen, 
  Tags, 
  ShieldCheck, 
  BarChart3, 
  Settings2,
  LayoutDashboard,
  Wrench
} from 'lucide-react';

interface SidebarProps {
  menus: MenuItem[];
  activeMenuId: string;
  onMenuChange: (id: string) => void;
}

// 菜单图标映射表
const ICON_MAP: Record<string, any> = {
  'main-volume': Database,
  'sub-volume': Files,
  'voucher': BookOpen,
  'category': Tags,
  'overview': LayoutDashboard,
  'plan': Wrench,
  'approval': ShieldCheck,
  'record': Files,
  'evaluation': BarChart3,
  'equipment': Database,
  'analysis': BarChart3,
  'alarm': ShieldCheck,
  'event': Files,
  'stats': BarChart3,
  'report': Files,
  'user': Settings2,
  'role': ShieldCheck,
  'contacts': BookOpen,
  'api': Settings2,
  'login-log': Files,
  'op-log': Files,
};

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
    const IconComponent = ICON_MAP[item.id] || Database;

    // 二级菜单样式（侧边栏分组标题）
    if (depth === 0) {
      return (
        <div key={item.id} className="mb-2 px-3">
          <button
            onClick={() => hasChildren ? toggleExpand(item.id) : onMenuChange(item.id)}
            className={cn(
              "w-full flex items-center py-2.5 px-3 rounded-xl transition-all group",
              isActive && !hasChildren
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200/50"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg mr-3 transition-colors",
              isActive && !hasChildren ? "bg-indigo-500" : "bg-slate-100 group-hover:bg-white shadow-sm"
            )}>
              <IconComponent size={16} className={cn(isActive && !hasChildren ? "text-white" : "text-slate-500 group-hover:text-indigo-600")} />
            </div>
            <span className="flex-1 text-left text-[13px] font-bold tracking-wide">{item.label}</span>
            {hasChildren && (
              <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            )}
          </button>
          
          {hasChildren && isExpanded && (
            <div className="mt-1 space-y-0.5">
              {item.children?.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // 三级菜单样式（具体功能项）
    return (
      <button
        key={item.id}
        onClick={() => onMenuChange(item.id)}
        className={cn(
          "w-full flex items-center py-2.5 pl-10 pr-4 text-[13px] transition-all relative group rounded-lg mx-1",
          isActive 
            ? "text-indigo-600 font-bold bg-indigo-50/50" 
            : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50 hover:translate-x-1"
        )}
      >
        {isActive && (
          <div className="absolute left-[21px] w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.8)] z-10" />
        )}
        {!isActive && (
          <div className="absolute left-[22px] w-1 h-1 rounded-full bg-slate-300 group-hover:bg-indigo-400 transition-colors z-10" />
        )}
        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-66 border-r border-slate-200 bg-white overflow-y-auto shrink-0 shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
      <div className="py-6">
        {menus.map(menu => renderMenuItem(menu))}
      </div>
    </aside>
  );
};

export default Sidebar;