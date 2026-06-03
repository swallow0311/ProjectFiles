"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface BookListProps {
  onAdd: () => void;
}

const BookList = ({ onAdd }: BookListProps) => {
  const data = [
    { id: '1', name: '中国古建筑史', unit: '中国建筑工业出版社', version: '第三版', creator: '管理员', time: '2023-04-12' },
    { id: '2', name: '营造法式解读', unit: '清华大学出版社', version: '2021修订版', creator: '管理员', time: '2023-09-28' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9" placeholder="书名" />
          </div>
          <Input className="w-40" placeholder="版本" />
          <Input className="w-48" placeholder="出版单位" />
          <Button variant="outline">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> 新增
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[1000px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="border-b">书名</TableHead>
                <TableHead className="border-b">出版单位</TableHead>
                <TableHead className="border-b">版本</TableHead>
                <TableHead className="border-b">添加人</TableHead>
                <TableHead className="border-b">添加时间</TableHead>
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center border-b border-l">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.version}</TableCell>
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

export default BookList;