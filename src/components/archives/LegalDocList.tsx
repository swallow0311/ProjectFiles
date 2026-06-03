"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface LegalDocListProps {
  onAdd: () => void;
}

const LegalDocList = ({ onAdd }: LegalDocListProps) => {
  const data = [
    { id: '1', unit: '故宫博物院', time: '2023-05-20', party: '北京文物局', creator: '管理员', addTime: '2023-05-21' },
    { id: '2', unit: '天坛公园管理处', time: '2023-06-15', party: '市园林局', creator: '管理员', addTime: '2023-06-16' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <Input className="w-40" placeholder="存储与使用单位" />
          <Input className="w-40" placeholder="责任方" />
          <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-md border">
            <span className="text-xs text-slate-500 shrink-0">签署时间:</span>
            <Input className="w-36 h-8 border-0 bg-transparent focus-visible:ring-0" type="date" />
            <span className="text-slate-300">-</span>
            <Input className="w-36 h-8 border-0 bg-transparent focus-visible:ring-0" type="date" />
          </div>
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
                <TableHead className="border-b">存储与使用单位</TableHead>
                <TableHead className="border-b">签署时间</TableHead>
                <TableHead className="border-b">责任方</TableHead>
                <TableHead className="border-b">添加人</TableHead>
                <TableHead className="border-b">添加时间</TableHead>
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center border-b border-l">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium">{item.unit}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.party}</TableCell>
                  <TableCell>{item.creator}</TableCell>
                  <TableCell className="text-slate-500">{item.addTime}</TableCell>
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

export default LegalDocList;