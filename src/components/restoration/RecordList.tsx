"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { showSuccess } from "@/utils/toast";

interface RecordListProps {
  onAdd: () => void;
}

const RecordList = ({ onAdd }: RecordListProps) => {
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
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>修缮项目名称</TableHead>
              <TableHead>责任部门</TableHead>
              <TableHead>责任人</TableHead>
              <TableHead>开始时间</TableHead>
              <TableHead>预计完成</TableHead>
              <TableHead className="w-48">修缮进度</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.dept}</TableCell>
                <TableCell>{item.manager}</TableCell>
                <TableCell className="text-slate-500">{item.startTime}</TableCell>
                <TableCell className="text-slate-500">{item.expectedEnd}</TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span>已完成</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1.5" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-indigo-600 h-8 px-2"><Calendar className="w-3.5 h-3.5 mr-1" /> 进度记录</Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 h-8 px-2">编辑</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2">删除</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecordList;