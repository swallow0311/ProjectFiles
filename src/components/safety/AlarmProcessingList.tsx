"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, Trash2, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AlarmProcessingList = () => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  
  const data = [
    { 
      id: '1', 
      name: '太和殿烟雾告警', code: 'ALM-20231012-001', time: '2023-10-12 14:30:05', 
      alarmDuration: '15min', processDuration: '45min', lastAlarmDuration: '10min',
      relic: '太和殿', deviceCode: 'SB-2023-001', deviceName: '烟感探测器A1',
      condition: '烟雾浓度 > 30%', processor: '张三', contact: '13800138000'
    },
    { 
      id: '2', 
      name: '祈年殿温度异常', code: 'ALM-20231105-002', time: '2023-11-05 09:15:20', 
      alarmDuration: '5min', processDuration: '20min', lastAlarmDuration: 'N/A',
      relic: '祈年殿', deviceCode: 'SB-2023-002', deviceName: '温湿度计B2',
      condition: '温度 > 45℃', processor: '李四', contact: '13900139000'
    },
  ];

  return (
    <div className="space-y-4">
      {/* 查询区域 */}
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="事件名称" />
            </div>
            <div className="relative w-48">
              <Input className="h-9" placeholder="事件编号" />
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-md border">
              <span className="text-xs text-slate-500 shrink-0">发生时间:</span>
              <Input className="w-36 h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
              <span className="text-slate-300">-</span>
              <Input className="w-36 h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
            </div>
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
            <Input className="h-9" placeholder="告警文物" />
            <Input className="h-9" placeholder="告警设备编码" />
            <Input className="h-9" placeholder="处置人员" />
            <Input className="h-9" placeholder="告警条件" />
          </div>
        )}
      </div>

      {/* 列表区域 */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[1800px]">
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-48">事件名称</TableHead>
                <TableHead className="w-48">事件编号</TableHead>
                <TableHead className="w-48">发生时间</TableHead>
                <TableHead className="w-32">告警时长</TableHead>
                <TableHead className="w-32">处置时长</TableHead>
                <TableHead className="w-32">上次告警时长</TableHead>
                <TableHead className="w-40">告警文物</TableHead>
                <TableHead className="w-40">告警设备编码</TableHead>
                <TableHead className="w-40">告警设备名称</TableHead>
                <TableHead className="w-48">告警条件</TableHead>
                <TableHead className="w-32">处置人员</TableHead>
                <TableHead className="w-40">联系信息</TableHead>
                <TableHead className="sticky right-0 bg-slate-50 z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.05)] text-center w-32">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                  <TableCell className="text-indigo-600 font-mono text-xs">{item.code}</TableCell>
                  <TableCell className="text-slate-500">{item.time}</TableCell>
                  <TableCell>{item.alarmDuration}</TableCell>
                  <TableCell>{item.processDuration}</TableCell>
                  <TableCell className="text-slate-400">{item.lastAlarmDuration}</TableCell>
                  <TableCell>{item.relic}</TableCell>
                  <TableCell className="text-xs">{item.deviceCode}</TableCell>
                  <TableCell>{item.deviceName}</TableCell>
                  <TableCell className="text-orange-600 text-xs">{item.condition}</TableCell>
                  <TableCell>{item.processor}</TableCell>
                  <TableCell className="text-slate-500">{item.contact}</TableCell>
                  <TableCell className="sticky right-0 bg-white group-hover:bg-slate-50 z-20 shadow-[-4px_0_8px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" className="text-indigo-600 h-8 px-2 hover:bg-indigo-50">
                        <Eye className="w-3.5 h-3.5 mr-1" /> 详情
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2 hover:bg-red-50">
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> 删除
                      </Button>
                    </div>
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

export default AlarmProcessingList;