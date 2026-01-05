"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, XCircle, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";

const ApprovalList = () => {
  const data = [
    { id: '1', name: '天坛祈年殿彩画修复方案', version: 'V2.0', creator: '李工', time: '2023-11-05', type: '彩画修复', dept: '工程部' },
    { id: '2', name: '颐和园佛香阁木构件加固方案', version: 'V1.1', creator: '王工', time: '2023-11-08', type: '结构加固', dept: '技术部' },
  ];

  const handleApprove = (name: string) => {
    showSuccess(`方案《${name}》已审核通过`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input className="pl-9 h-9" placeholder="搜索待审核方案..." />
        </div>
        <Button variant="outline" className="h-9">查询</Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>方案名称</TableHead>
              <TableHead>版本</TableHead>
              <TableHead>提交部门</TableHead>
              <TableHead>编制人</TableHead>
              <TableHead>提交时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell><Badge variant="outline" className="font-mono">{item.version}</Badge></TableCell>
                <TableCell>{item.dept}</TableCell>
                <TableCell>{item.creator}</TableCell>
                <TableCell className="text-slate-500">{item.time}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2"><Eye className="w-3.5 h-3.5 mr-1" /> 查看</Button>
                    <Button variant="ghost" size="sm" className="text-green-600 h-8 px-2" onClick={() => handleApprove(item.name)}><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 通过</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2"><XCircle className="w-3.5 h-3.5 mr-1" /> 驳回</Button>
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

export default ApprovalList;