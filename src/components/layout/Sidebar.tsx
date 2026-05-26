"use client";

import React from 'react';
import { MenuItem } from '@/types/menu';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  ShieldAlert, 
  Wrench, 
  Settings,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  menus: MenuItem[];
  activeMenuId: string;
  onMenuChange: (id: string) => void;
}

const ICON_MAP: Record<string, any> = {
  cockpit: LayoutDashboard,
  archives: FileText,
  safety: ShieldAlert,
  restoration: Wrench,
  system: Settings,
};

const Sidebar = ({ menus, activeMenuId, onMenuChange }: SidebarProps) => {
  return (
    <aside className="w-64 border-r bg-white overflow-y-auto shrink-0 shadow-sm">
      <div className="py-4">
        {menus.map((item) => {
          const isActive = activeMenuId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={cn(
                'w-full flex items-center justify-between py-3 px-6 transition-all group',
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <span className={cn(
                "text-sm font-medium",
                isActive ? "font-bold" : ""
              )}>
                {item.label}
              </span>
              <ChevronRight size={14} className={cn(
                "transition-transform",
                isActive ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-50"
              )} />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;