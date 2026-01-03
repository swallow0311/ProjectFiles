"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LiteratureListProps {
  onAdd: () => void;
}

const LiteratureList = ({ onAdd }: LiteratureListProps) => {
  const data = [
    { id: '1', name: '故宫太和殿修缮技术研究', type: '论文', year: '2022', creator: '管理员', time: '2023-05-20' },
    { id: '2', name: '北京中轴线考古发掘报告', type: '考古报告', year: '2023', creator: '管理员', time: '2023-08-15' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9" placeholder="名称" />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paper">论文</SelectItem>
              <SelectItem value="report">考古报告</SelectItem>
            </SelectContent>
          </Select>
          <Input className="w-32" placeholder="出版年份" />
          <Button variant="outline">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> 新增
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>出版年份</TableHead>
              <TableHead>添加人</TableHead>
              <TableHead>添加时间</TableHead>
              <TableHead className="sticky right-0 bg-slate-50 shadow-[-4px_0_8px_rgba(0,0,0,0.05)]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell className="text-slate-500">{item.time}</TableCell>
                <TableCell className="sticky right-0 bg-white shadow-[-4px_0_8px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2">
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

export default LiteratureList;