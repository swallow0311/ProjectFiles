"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChronicleListProps {
  onAdd: () => void;
}

const ChronicleList = ({ onAdd }: ChronicleListProps) => {
  const data = [
    { id: '1', title: '太和殿大规模修葺工程启动', type: '修葺', creator: '管理员', time: '2023-03-12' },
    { id: '2', title: '签署国际文物保护战略协议', type: '战略', creator: '管理员', time: '2023-08-25' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="事件标题" />
          </div>
          <Select>
            <SelectTrigger className="w-48 h-9">
              <SelectValue placeholder="事件类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="repair">修葺</SelectItem>
              <SelectItem value="strategy">战略</SelectItem>
              <SelectItem value="accident">意外事故</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-9">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 新增
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[800px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="border-b whitespace-nowrap">事件标题</TableHead>
                <TableHead className="border-b whitespace-nowrap">事件类型</TableHead>
                <TableHead className="border-b whitespace-nowrap">添加人</TableHead>
                <TableHead className="border-b whitespace-nowrap">添加时间</TableHead>
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium whitespace-nowrap">{item.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.type}</TableCell>
                  <TableCell className="whitespace-nowrap">{item.creator}</TableCell>
                  <TableCell className="text-slate-500 whitespace-nowrap">{item.time}</TableCell>
                  <TableCell className="sticky right-0 bg-white z-40 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap">
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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

export default ChronicleList;