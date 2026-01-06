"use client";

import React, { useState } from 'react';
import { Copy, Edit2, Trash2, Plus, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

interface RoleGroup {
  id: string;
  name: string;
  isDefault?: boolean;
}

const RoleGroupSidebar = () => {
  const [groups, setGroups] = useState<RoleGroup[]>([
    { id: '1', name: '管理员', isDefault: true },
    { id: '2', name: '技工人员', isDefault: true },
    { id: '3', name: '安全员', isDefault: true },
    { id: '4', name: '第三方' },
    { id: '5', name: '智慧机器人自定义' },
  ]);
  const [selectedId, setSelectedId] = useState<string>('1');

  return (
    <div className="w-64 bg-white border rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-4 border-b">
        <Button 
          variant="link" 
          className="w-full text-blue-600 font-bold text-lg hover:no-underline flex items-center justify-center gap-2"
          onClick={() => showSuccess("添加角色分组")}
        >
          添加角色
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {groups.map((group) => (
          <div 
            key={group.id}
            className={cn(
              "group relative flex items-center px-4 py-3 cursor-pointer transition-all",
              selectedId === group.id ? "bg-slate-100 text-blue-600" : "hover:bg-slate-50 text-slate-700"
            )}
            onClick={() => setSelectedId(group.id)}
          >
            <span className="text-sm font-medium truncate flex-1">
              {group.name} {group.isDefault && <span className="text-[10px] text-slate-400 ml-1">(默认)</span>}
            </span>
            
            <div className={cn(
              "flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
              selectedId === group.id && "opacity-100"
            )}>
              <button className="p-1 hover:text-blue-600" title="复制"><Copy size={14} /></button>
              <button className="p-1 hover:text-blue-600" title="编辑"><Edit2 size={14} /></button>
              <button className="p-1 hover:text-red-600" title="删除"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleGroupSidebar;