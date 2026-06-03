"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Eye, Trash2, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { showSuccess } from "@/utils/toast";

interface RecordListProps {
  onAdd: () => void;
  onAddDetail: (record: any) => void;
}

const RecordList = ({ onAdd, onAddDetail }: RecordListProps) => {
  const data = [
    { id: '1', name: '故宫太和殿屋顶修缮项目', progress: 65, startTime: '2023-05-20', expectedEnd: '2023-12-30', dept: '古建一队', manager: '张三' },
    { id: '2', name: '天坛祈年殿彩画修复项目', progress: 30, startTime: '2023-09-15', expectedEnd: '2024-03-15', dept: '彩画修复组', manager: '李四' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="项目名称 / 责任人" />
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-md border">
            <span className="text-xs text-slate-500 shrink-0">时间范围:</span>
            <Input className="w-32 h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
            <span className="text-slate-300">-</span>
            <Input className="w-32 h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
          </div>
          <Button variant="outline" className="h-9">查询</Button>
          <Button variant="ghost" className="h-9 text-slate-500" onClick={() => showSuccess("报表导出成功")}><Download className="w-4 h-4 mr-2" /> 导出</Button>
        </div>
        <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 录入修缮信息
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1200px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="border-b whitespace-nowrap">修缮项目名称</TableHead>
                <TableHead className="border-b whitespace-nowrap">责任部门</TableHead>
                <TableHead className="border-b whitespace-nowrap">责任人</TableHead>
                <TableHead className="border-b whitespace-nowrap">开始时间</TableHead>
                <TableHead className="border-b whitespace-nowrap">预计完成</TableHead>
                <TableHead className="w-48 border-b whitespace-nowrap">修缮进度</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center w-64 border-b border-l whitespace-nowrap">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.dept}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.manager}</TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.startTime}</TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.expectedEnd}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span>已完成</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2 px-4">
                      <Button variant="ghost" size="sm" className="text-indigo-600 h-8 px-2" onClick={() => onAddDetail(item)}>
                        <PlusCircle className="w-3.5 h-3.5 mr-1" /> +记录
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">
                        <Eye className="w-3.5 h-3.5 mr-1" /> 详情
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2">
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> 删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecordList;