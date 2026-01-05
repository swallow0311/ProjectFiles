"use client";

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, ChevronUp, Edit, Trash2, History } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SchemeListProps {
  onAdd: () => void;
  onAddVersion: (scheme: any) => void;
}

const SchemeList = ({ onAdd, onAddVersion }: SchemeListProps) => {
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const data = [
    { 
      id: '1', 
      name: '故宫太和殿屋顶修缮方案', 
      type: '抢救性修复', 
      relic: '太和殿', 
      urgency: '特急', 
      compiler: '张工', 
      leader: '李队', 
      status: '已通过', 
      creator: '管理员', 
      createTime: '2023-10-12 14:30',
      versions: [
        { id: 'v1', versionNo: 'V1.2', route: '传统工艺修缮', materials: '琉璃瓦、糯米浆', tools: '脚手架、瓦刀', desc: '针对屋顶漏雨进行整体修缮', img: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=200' },
        { id: 'v2', versionNo: 'V1.1', route: '局部加固', materials: '木料、铁钉', tools: '木工工具', desc: '初期局部加固方案', img: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=200' }
      ]
    },
    { 
      id: '2', 
      name: '天坛祈年殿彩画修复方案', 
      type: '日常保养', 
      relic: '祈年殿', 
      urgency: '一般', 
      compiler: '王工', 
      leader: '赵队', 
      status: '审核中', 
      creator: '管理员', 
      createTime: '2023-11-05 09:15',
      versions: [
        { id: 'v3', versionNo: 'V2.0', route: '矿物颜料修复', materials: '石青、石绿', tools: '毛笔、调色盘', desc: '恢复彩画原有色彩', img: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=200' }
      ]
    },
  ];

  return (
    <div className="space-y-4">
      {/* 搜索区域 */}
      <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
            <Plus className="w-4 h-4 mr-2" /> 新增方案
          </Button>
        </div>

        {showMoreSearch && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            <Input className="h-9" placeholder="编制人" />
            <Input className="h-9" placeholder="实施责任人" />
            <Input className="h-9" placeholder="添加人" />
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-md border">
              <span className="text-xs text-slate-500 shrink-0">添加时间:</span>
              <Input className="w-full h-7 border-0 bg-transparent focus-visible:ring-0 text-xs" type="date" />
            </div>
          </div>
        )}
      </div>

      {/* 列表区域 */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[1400px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12 border-b"></TableHead>
                <TableHead className="w-64 border-b">方案名称</TableHead>
                <TableHead className="w-32 border-b">方案类型</TableHead>
                <TableHead className="w-32 border-b">关联文物</TableHead>
                <TableHead className="w-24 border-b">紧急度</TableHead>
                <TableHead className="w-24 border-b">编制人</TableHead>
                <TableHead className="w-32 border-b">实施责任人</TableHead>
                <TableHead className="w-24 border-b">方案状态</TableHead>
                <TableHead className="w-24 border-b">添加人</TableHead>
                <TableHead className="w-40 border-b">添加时间</TableHead>
                {/* 固定操作列 */}
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center w-40 border-b border-l">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow className="group">
                    <TableCell className="border-b">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(item.id)}>
                        {expandedIds.includes(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </TableCell>
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
                        'bg-slate-50 text-slate-700 border-slate-200'
                      )}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-b">{item.creator}</TableCell>
                    <TableCell className="text-slate-500 border-b">{item.createTime}</TableCell>
                    {/* 固定操作列单元格 */}
                    <TableCell className="sticky right-0 bg-white z-40 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l border-b">
                      <div className="flex items-center gap-2 px-2 justify-center">
                        <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2" onClick={() => toggleExpand(item.id)}>详情</Button>
                        <Button variant="ghost" size="sm" className="text-indigo-600 h-8 px-2" onClick={() => onAddVersion(item)}>+版本</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 h-8 px-2">删除</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* 展开的版本详情 */}
                  {expandedIds.includes(item.id) && (
                    <TableRow className="bg-slate-50/50">
                      <TableCell colSpan={11} className="p-0 border-b">
                        <div className="p-6 space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <History className="w-3 h-3" /> 版本历史数据
                          </h4>
                          <div className="space-y-3">
                            {item.versions.map((v) => (
                              <div key={v.id} className="bg-white border rounded-xl p-4 shadow-sm flex gap-6 group/version">
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                  <img src={v.img} className="w-full h-full object-cover" alt="效果图" />
                                </div>
                                <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
                                  <div className="col-span-3 flex items-center justify-between mb-1">
                                    <Badge variant="secondary" className="font-mono">{v.versionNo}</Badge>
                                    <div className="flex items-center gap-2 opacity-0 group-hover/version:opacity-100 transition-opacity">
                                      <Button variant="ghost" size="sm" className="text-slate-600 h-7 px-2"><Edit className="w-3 h-3 mr-1" /> 编辑</Button>
                                      <Button variant="ghost" size="sm" className="text-red-600 h-7 px-2"><Trash2 className="w-3 h-3 mr-1" /> 删除</Button>
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-slate-400 text-xs">技术路线：</span>
                                    <p className="text-slate-700">{v.route}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-slate-400 text-xs">材料清单：</span>
                                    <p className="text-slate-700">{v.materials}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-slate-400 text-xs">工具设备：</span>
                                    <p className="text-slate-700">{v.tools}</p>
                                  </div>
                                  <div className="col-span-3 space-y-1">
                                    <span className="text-slate-400 text-xs">方案说明：</span>
                                    <p className="text-slate-700">{v.desc}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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

export default SchemeList;