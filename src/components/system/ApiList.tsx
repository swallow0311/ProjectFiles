"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, RefreshCw, Activity, Plus } from "lucide-react";

interface ApiListProps {
  onAdd: () => void;
}

const ApiList = ({ onAdd }: ApiListProps) => {
  const data = [
    { id: '1', name: '国家文物局数据同步', endpoint: 'https://api.ncha.gov.cn/v1/sync', status: 'connected', lastSync: '2023-11-15 08:00' },
    { id: '2', name: 'GIS地理信息系统', endpoint: 'https://gis.internal/api/map', status: 'connected', lastSync: '实时' },
    { id: '3', name: '短信网关服务', endpoint: 'https://sms.provider.com/send', status: 'error', lastSync: '2023-11-14 22:10' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium">系统接口运行状态良好</span>
        </div>
        <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 配置新接口
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>接口名称</TableHead>
              <TableHead>接口地址</TableHead>
              <TableHead>连接状态</TableHead>
              <TableHead>最后同步/调用</TableHead>
              <TableHead className="text-right pr-6">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((api) => (
              <TableRow key={api.id}>
                <TableCell className="font-bold">{api.name}</TableCell>
                <TableCell className="font-mono text-xs text-slate-500">{api.endpoint}</TableCell>
                <TableCell>
                  <Badge className={api.status === 'connected' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
                    {api.status === 'connected' ? '已连接' : '连接异常'}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-xs">{api.lastSync}</TableCell>
                <TableCell className="text-right pr-6">
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" /> 立即测试
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-600">配置</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApiList;