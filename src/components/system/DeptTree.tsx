"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

interface DeptNode {
  id: string;
  name: string;
  count: number;
  children?: DeptNode[];
}

const INITIAL_DEPTS: DeptNode[] = [
  {
    id: '1',
    name: '测试部门',
    count: 169,
    children: [
      { id: '1-1', name: '在线测试组', count: 8 },
      { id: '1-2', name: 'SCRM测试组', count: 4 },
    ]
  },
  {
    id: '2',
    name: '开发部门1',
    count: 16,
    children: [
      { id: '2-1', name: '开发组1', count: 5 },
      { id: '2-2', name: '在线客服开发', count: 5 },
      { id: '2-3', name: '开发组2', count: 3 },
    ]
  }
];

const DeptTree = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['1', '2']);
  const [selectedId, setSelectedId] = useState<string>('1');

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderNode = (node: DeptNode, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.includes(node.id);
    const isSelected = selectedId === node.id;

    return (
      <div key={node.id} className="group">
        <div 
          className={cn(
            "flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors",
            isSelected ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-600"
          )}
          onClick={() => setSelectedId(node.id)}
        >
          <div className="flex items-center flex-1 min-w-0">
            {hasChildren ? (
              <button 
                onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
                className="p-0.5 hover:bg-slate-200 rounded mr-1"
              >
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : (
              <div className="w-5" />
            )}
            <span className="text-sm truncate">{node.name}({node.count})</span>
          </div>
          
          <div className={cn(
            "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
            isSelected && "opacity-100"
          )}>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-blue-600">
              <Edit2 size={12} />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-600">
              <Trash2 size={12} />
            </Button>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1 border-l border-slate-100">
            {node.children?.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Users size={16} className="text-blue-600" /> 组织架构
        </h3>
        <Button 
          variant="link" 
          className="text-blue-600 text-xs p-0 h-auto font-bold"
          onClick={() => showSuccess("添加部门弹窗")}
        >
          添加部门
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {INITIAL_DEPTS.map(dept => renderNode(dept))}
      </div>
    </div>
  );
};

export default DeptTree;