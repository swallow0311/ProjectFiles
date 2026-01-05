"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, History, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SchemeListProps {
  onAdd: () => void;
}

const SchemeList = ({ onAdd }: SchemeListProps) => {
  const data = [
    { id: '1', name: '故宫太和殿屋顶修缮方案', version: 'V1.2', status: '已通过', creator: '张工', time: '2023-10-12', type: '结构修缮' },
    { id: '2', name: '天坛祈年殿彩画修复方案', version: 'V2.0', status: '审核中', creator: '李工', time: '2023-11-05', type: '彩画修复' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="方案名称 / 编制人" />
          </div>
          <Select>
            <SelectTrigger className="w-40 h-9">
              <SelectValue placeholder="方案状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">草稿</SelectItem>
              <SelectItem value="pending">审核中</SelectItem>
              <SelectItem value="approved">已通过</SelectItem>
              <SelectItem value="rejected">已驳回</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-9">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 提交新方案
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>方案名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>版本</TableHead>
              <TableHead>编制人</TableHead>
              <TableHead>提交时间</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">{item.version}</Badge>
                </TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell className="text-slate-500">{item.time}</TableCell>
                <TableCell>
                  <Badge className={
                    item.status === '已通过' ? 'bg-green-50 text-green-700 border-green-200' : 
                    item.status === '审核中' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-indigo-600 h-8 px-2"><FileText className="w-3.5 h-3.5 mr-1" /> 详情</Button>
                    <Button variant="ghost" size="sm" className="text-slate-600 h-8 px-2"><History className="w-3.5 h-3.5 mr-1" /> 版本</Button>
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

export default SchemeList;