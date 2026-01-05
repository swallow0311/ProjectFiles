"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, CheckCircle2, XCircle, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { showSuccess } from "@/utils/toast";

const ApprovalList = () => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  
  const data = [
    { 
      id: '1', 
      name: '故宫太和殿屋顶修缮方案', 
      type: '抢救性修复', 
      relic: '太和殿', 
      urgency: '特急', 
      compiler: '张工', 
      leader: '李队', 
      status: '审核中', 
      submitter: '张工', 
      submitTime: '2023-10-12 14:30'
    },
    { 
      id: '2', 
      name: '天坛祈年殿彩画修复方案', 
      type: '日常保养', 
      relic: '祈年殿', 
      urgency: '一般', 
      compiler: '王工', 
      leader: '赵队', 
      status: '已通过', 
      submitter: '王工', 
      submitTime: '2023-11-05 09:15'
    },
    { 
      id: '3', 
      name: '颐和园佛香阁木构件加固方案', 
      type: '预防性保护', 
      relic: '佛香阁', 
      urgency: '紧急', 
      compiler: '李工', 
      leader: '孙队', 
      status: '已归档', 
      submitter: '李工', 
      submitTime: '2023-11-08 10:00'
    },
  ];

  const handleApprove = (name: string) => showSuccess(`方案《${name}》已审核通过`);
  const handleReject = (name: string) => showSuccess(`方案《${name}》已驳回`);

  const renderActions = (item: any) => {
    const baseActions = (
      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2 hover:bg-blue-50">
        <Eye className="w-3.5 h-3.5 mr-1" /> 详情
      </Button>
    );

    switch (item.status) {
      case '审核中':
        return (
          <div className="flex items-center gap-2 px-2">
            {baseActions}
            <Button variant="ghost" size="sm" className="text-green-600 h-8 px-2 hover:bg-green-50" onClick={() => handleApprove(item.name)}>
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> 通过
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2 hover:bg-red-50" onClick={() => handleReject(item.name)}>
              <XCircle className="w-3.5 h-3.5 mr-1" /> 驳回
            </Button>
          </div>
        );
      case '已通过':
        return (
          <div className="flex items-center gap-2 px-2">
            {baseActions}
            <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2 hover:bg-red-50" onClick={() => handleReject(item.name)}>
              <XCircle className="w-3.5 h-3.5 mr-1" /> 驳回
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-2">
            {baseActions}
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* 搜索区域 */}
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="方案名称" />
            </div>
            <Select>
              <SelectTrigger className="w-40 h-9">
                <SelectValue placeholder="方案类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">日常保养</SelectItem>
                <SelectItem value="rescue">抢救性修复</SelectItem>
                <SelectItem value="prevent">预防性保护</SelectItem>
                <SelectItem value="research">研究性修复</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-40 h-9" placeholder="关联文物" />
            <Select>
              <SelectTrigger className="w-40 h-9">
                <SelectValue placeholder="方案状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">草稿</SelectItem>
                <SelectItem value="pending">审核中</SelectItem>
                <SelectItem value="approved">已通过</SelectItem>
                <SelectItem value="archived">已归档</SelectItem>
                <SelectItem value="rejected">已驳回</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 h-9">查询</Button>
            <Button 
              variant="ghost" 
              className="text-slate-500 text-xs h-9"
              onClick={() => setShowMoreSearch(!showMoreSearch)}
            >
              {showMoreSearch ? '收起筛选' : '更多筛选'} 
              {showMoreSearch ? <ChevronUp className="ml-1 w-3 h-3" /> : <ChevronDown className="ml-1 w-3 h-3" />}
            </Button>
          </div>
        </div>

        {showMoreSearch && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <Input className="h-9" placeholder="编制人" />
            <Input className="h-9" placeholder="实施责任人" />
            <Input className="h-9" placeholder="提审人" />
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-md border">
              <span className="text-xs text-slate-500 shrink-0">提审时间:</span>
              <Input className="w-full h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
            </div>
          </div>
        )}
      </div>

      {/* 列表区域 */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[1600px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-64 border-b">方案名称</TableHead>
                <TableHead className="w-32 border-b">方案类型</TableHead>
                <TableHead className="w-32 border-b">关联文物</TableHead>
                <TableHead className="w-24 border-b">紧急度</TableHead>
                <TableHead className="w-24 border-b">编制人</TableHead>
                <TableHead className="w-32 border-b">实施责任人</TableHead>
                <TableHead className="w-24 border-b">方案状态</TableHead>
                <TableHead className="w-24 border-b">提审人</TableHead>
                <TableHead className="w-40 border-b">提审时间</TableHead>
                {/* 固定操作列：左对齐 */}
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-left w-48 border-b border-l pl-6">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium border-b">{item.name}</TableCell>
                  <TableCell className="border-b">{item.type}</TableCell>
                  <TableCell className="border-b">{item.relic}</TableCell>
                  <TableCell className="border-b">
                    <Badge variant="outline" className={cn(
                      item.urgency === '特急' ? 'text-red-600 border-red-200 bg-red-50' : 
                      item.urgency === '紧急' ? 'text-orange-600 border-orange-200 bg-orange-50' : 
                      'text-slate-600 border-slate-200 bg-slate-50'
                    )}>
                      {item.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell className="border-b">{item.compiler}</TableCell>
                  <TableCell className="border-b">{item.leader}</TableCell>
                  <TableCell className="border-b">
                    <Badge className={cn(
                      item.status === '已通过' ? 'bg-green-50 text-green-700 border-green-200' : 
                      item.status === '审核中' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                      item.status === '已归档' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    )}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="border-b">{item.submitter}</TableCell>
                  <TableCell className="text-slate-500 border-b">{item.submitTime}</TableCell>
                  {/* 固定操作列单元格：左对齐 */}
                  <TableCell className="sticky right-0 bg-white z-40 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l border-b pl-4">
                    {renderActions(item)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* 分页区域 */}
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-slate-500">共 {data.length} 条数据</div>
        <div className="flex items-center gap-6">
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
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-slate-500">条</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">1</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalList;