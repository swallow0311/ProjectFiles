"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ReferenceListProps {
  onAdd: () => void;
}

const ReferenceList = ({ onAdd }: ReferenceListProps) => {
  const data = [
    { id: '1', name: '明清建筑构造研究', source: '故宫出版社', location: '资料室A-01', creator: '管理员', time: '2023-10-12' },
    { id: '2', name: '古代彩画工艺手册', source: '文物出版社', location: '资料室B-05', creator: '管理员', time: '2023-11-05' },
  ];

  const handleImport = () => {
    showSuccess("数据导入成功");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9" placeholder="文件名称" />
          </div>
          <Input className="w-40" placeholder="标注来源" />
          <Input className="w-40" placeholder="收藏位置" />
          <Button variant="outline">查询</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" /> 导入
          </Button>
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" /> 新增
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[1000px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="border-b">文件名称</TableHead>
                <TableHead className="border-b">标注来源</TableHead>
                <TableHead className="border-b">收藏位置</TableHead>
                <TableHead className="border-b">添加人</TableHead>
                <TableHead className="border-b">添加时间</TableHead>
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center border-b border-l">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.creator}</TableCell>
                  <TableCell className="text-slate-500">{item.time}</TableCell>
                  <TableCell className="sticky right-0 bg-white z-40 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l">
                    <div className="flex items-center gap-2 px-2 justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">详情</Button>
                      <Button variant="ghost" size="sm" className="text-slate-600 h-8 px-2">编辑</Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2">删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex items-center justify-between px-2">
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

export default ReferenceList;