"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TextVolumeListProps {
  onAdd: () => void;
}

const TextVolumeList = ({ onAdd }: TextVolumeListProps) => {
  const data = [
    { id: '1', code: 'BH-001', name: '故宫太和殿', imei: '861234567890', factory: '北京文物局', status: '正常', creator: '张三', time: '2023-10-12' },
    { id: '2', code: 'BH-002', name: '天坛祈年殿', imei: '861234567891', factory: '北京文物局', status: '正常', creator: '李四', time: '2023-11-05' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9" placeholder="设备编码" />
          </div>
          <div className="relative w-48">
            <Input placeholder="设备名称" />
          </div>
          <div className="relative w-48">
            <Input placeholder="IMEI唯一标识" />
          </div>
          <Button variant="outline">查询</Button>
          <Button variant="ghost" className="text-slate-500 text-xs">更多筛选 <ChevronDown className="ml-1 w-3 h-3" /></Button>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> 新增文字卷
        </Button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>设备编码</TableHead>
              <TableHead>设备名称</TableHead>
              <TableHead>IMEI标识</TableHead>
              <TableHead>厂家</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>添加人</TableHead>
              <TableHead>添加时间</TableHead>
              <TableHead className="sticky right-0 bg-slate-50 shadow-[-4px_0_8px_rgba(0,0,0,0.05)]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-slate-500 text-xs">{item.imei}</TableCell>
                <TableCell>{item.factory}</TableCell>
                <TableCell><Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">{item.status}</Badge></TableCell>
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

export default TextVolumeList;