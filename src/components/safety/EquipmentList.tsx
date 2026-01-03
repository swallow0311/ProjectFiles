"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface EquipmentListProps {
  onAdd: () => void;
}

const EquipmentList = ({ onAdd }: EquipmentListProps) => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  
  const data = [
    { 
      id: '1', 
      code: 'SB-2023-001', name: '太和殿烟感器', imei: '861234567890', time: '2023-10-12', params: 'DC 12V', factory: '海康威视', model: 'YG-V3', address: '太和殿正殿',
      alarmThreshold: '50%', fireThreshold: '30%', tiltThreshold: '15°', tempThreshold: '60℃', humidityThreshold: '80%',
      sensitivity: '高', alarmLimit: '5s', frequency: '1min', area: '核心区', alertType: '短信/APP', alertTarget: '值班室',
      creator: '管理员', createTime: '2023-10-12 14:30'
    },
    { 
      id: '2', 
      code: 'SB-2023-002', name: '祈年殿温湿度计', imei: '861234567891', time: '2023-11-05', params: 'Battery 3V', factory: '大华股份', model: 'WS-A1', address: '祈年殿内',
      alarmThreshold: '40%', fireThreshold: 'N/A', tiltThreshold: 'N/A', tempThreshold: '45℃', humidityThreshold: '70%',
      sensitivity: '中', alarmLimit: '10s', frequency: '5min', area: '重点区', alertType: 'APP推送', alertTarget: '管理员',
      creator: '管理员', createTime: '2023-11-05 09:15'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input className="pl-9 h-9" placeholder="设备编码" />
            </div>
            <div className="relative w-48">
              <Input className="h-9" placeholder="设备名称" />
            </div>
            <div className="relative w-48">
              <Input className="h-9" placeholder="IMEI唯一标识" />
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
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
            <Plus className="w-4 h-4 mr-2" /> 新增设备
          </Button>
        </div>

        {showMoreSearch && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <Input className="h-9" placeholder="厂家" />
            <Input className="h-9" placeholder="型号" />
            <Input className="h-9" placeholder="地址" />
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="预警方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sms">短信</SelectItem>
                <SelectItem value="app">APP推送</SelectItem>
                <SelectItem value="voice">语音</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[2000px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead colSpan={8} className="text-center border-r border-b font-bold text-indigo-600 py-2">基础信息</TableHead>
                <TableHead colSpan={5} className="text-center border-r border-b font-bold text-orange-600 py-2">阈值设置</TableHead>
                <TableHead colSpan={6} className="text-center border-r border-b font-bold text-blue-600 py-2">AI预警</TableHead>
                <TableHead colSpan={2} className="text-center border-r border-b font-bold text-slate-600 py-2">操作信息</TableHead>
                {/* 浮窗表头 - 始终可见 */}
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center font-bold py-2 border-b border-l">操作</TableHead>
              </TableRow>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-32 border-b">设备编码</TableHead>
                <TableHead className="w-40 border-b">设备名称</TableHead>
                <TableHead className="w-40 border-b">IMEI标识</TableHead>
                <TableHead className="w-32 border-b">时间</TableHead>
                <TableHead className="w-32 border-b">产品参数</TableHead>
                <TableHead className="w-32 border-b">厂家</TableHead>
                <TableHead className="w-32 border-b">型号</TableHead>
                <TableHead className="w-48 border-r border-b">地址</TableHead>
                <TableHead className="w-24 border-b">报警阈值</TableHead>
                <TableHead className="w-24 border-b">烟火阈值</TableHead>
                <TableHead className="w-24 border-b">防倾斜阈值</TableHead>
                <TableHead className="w-24 border-b">温度阈值</TableHead>
                <TableHead className="w-24 border-r border-b">湿度阈值</TableHead>
                <TableHead className="w-24 border-b">灵敏度</TableHead>
                <TableHead className="w-32 border-b">报警时限</TableHead>
                <TableHead className="w-24 border-b">频率</TableHead>
                <TableHead className="w-32 border-b">区域</TableHead>
                <TableHead className="w-32 border-b">预警方式</TableHead>
                <TableHead className="w-32 border-r border-b">预警对象</TableHead>
                <TableHead className="w-24 border-b">添加人</TableHead>
                <TableHead className="w-40 border-r border-b">添加时间</TableHead>
                {/* 浮窗表头占位 */}
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] w-40 border-b border-l"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium text-indigo-600">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-slate-500 text-xs">{item.imei}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell className="text-slate-500">{item.params}</TableCell>
                  <TableCell>{item.factory}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell className="border-r">{item.address}</TableCell>
                  <TableCell className="text-orange-600 font-medium">{item.alarmThreshold}</TableCell>
                  <TableCell>{item.fireThreshold}</TableCell>
                  <TableCell>{item.tiltThreshold}</TableCell>
                  <TableCell>{item.tempThreshold}</TableCell>
                  <TableCell className="border-r">{item.humidityThreshold}</TableCell>
                  <TableCell><Badge variant="secondary" className="font-normal">{item.sensitivity}</Badge></TableCell>
                  <TableCell>{item.alarmLimit}</TableCell>
                  <TableCell>{item.frequency}</TableCell>
                  <TableCell>{item.area}</TableCell>
                  <TableCell>{item.alertType}</TableCell>
                  <TableCell className="border-r">{item.alertTarget}</TableCell>
                  <TableCell>{item.creator}</TableCell>
                  <TableCell className="text-slate-500 border-r">{item.createTime}</TableCell>
                  {/* 浮窗单元格 - 始终可见 */}
                  <TableCell className="sticky right-0 bg-white z-40 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l">
                    <div className="flex items-center gap-2 px-2 justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2 hover:bg-blue-50">详情</Button>
                      <Button variant="ghost" size="sm" className="text-slate-600 h-8 px-2 hover:bg-slate-100">编辑</Button>
                      <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2 hover:bg-red-50">删除</Button>
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

export default EquipmentList;