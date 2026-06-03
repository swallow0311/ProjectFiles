"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DocumentVolumeListProps {
  type: 'planning' | 'archaeology' | 'monitoring';
  onAdd: () => void;
}

const DocumentVolumeList = ({ type, onAdd }: DocumentVolumeListProps) => {
  const data = [
    { id: '1', index: '01', unit: '省文物保护中心', title: '太和殿修缮规划', time: '2023-05-20', approveUnit: '国家文物局', approveTime: '2023-08-12', creator: '管理员' },
    { id: '2', index: '02', unit: '市考古研究所', title: '遗址发掘报告', time: '2023-06-15', approveUnit: '省文化厅', approveTime: '2023-09-01', creator: '管理员' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="编制单位" />
          </div>
          <div className="relative w-48">
            <Input className="h-9" placeholder="题名" />
          </div>
          <Button variant="outline" className="h-9">查询</Button>
          <Button variant="ghost" className="text-slate-500 text-xs h-9">更多筛选 <ChevronDown className="ml-1 w-3 h-3" /></Button>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 新增
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[1000px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-16 border-b whitespace-nowrap">序号</TableHead>
                <TableHead className="border-b whitespace-nowrap">编制单位</TableHead>
                <TableHead className="border-b whitespace-nowrap">题名</TableHead>
                <TableHead className="border-b whitespace-nowrap">编制时间</TableHead>
                <TableHead className="border-b whitespace-nowrap">批准单位</TableHead>
                <TableHead className="!sticky !right-0 bg-slate-50 z-50 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="whitespace-nowrap">{item.index}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{item.unit}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.time}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.approveUnit}</TableCell>
                  <TableCell className="!sticky !right-0 bg-white z-40 shadow-[-4px_0_10px_-3px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap">
                    <div className="flex items-center gap-2 px-4 justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">详情</Button>
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

      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-slate-500">共 {data.length} 条数据</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">每页显示</span>
          <Select defaultValue="20">
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DocumentVolumeList;