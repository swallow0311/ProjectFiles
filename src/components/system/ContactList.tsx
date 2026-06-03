"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Building2, Plus } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ContactListProps {
  onAdd: () => void;
}

const ContactList = ({ onAdd }: ContactListProps) => {
  const data = [
    { id: '1', name: '王建国', unit: '故宫博物院', position: '古建修复专家', phone: '13800138000', email: 'wangjg@dpm.org.cn' },
    { id: '2', name: '李明', unit: '北京市文物局', position: '档案科科长', phone: '13911223344', email: 'liming@bjww.gov.cn' },
    { id: '3', name: '陈教授', unit: '清华大学建筑学院', position: '特聘顾问', phone: '13655667788', email: 'chen@tsinghua.edu.cn' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="搜索姓名 / 单位" />
          </div>
          <Button variant="outline" className="h-9">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
          <Plus className="w-4 h-4 mr-2" /> 新增联系人
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <ScrollArea className="w-full">
          <Table className="min-w-[1000px] border-separate border-spacing-0">
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="border-b whitespace-nowrap">姓名</TableHead>
                <TableHead className="border-b whitespace-nowrap">所属单位</TableHead>
                <TableHead className="border-b whitespace-nowrap">职务/职称</TableHead>
                <TableHead className="border-b whitespace-nowrap">联系电话</TableHead>
                <TableHead className="border-b whitespace-nowrap">电子邮箱</TableHead>
                <TableHead className="sticky right-0 bg-slate-50 z-50 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] text-center border-b border-l whitespace-nowrap">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((contact) => (
                <TableRow key={contact.id} className="group">
                  <TableCell className="font-bold whitespace-nowrap">{contact.name}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {contact.unit}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{contact.position}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-indigo-600">
                      <Phone className="w-3.5 h-3.5" />
                      {contact.phone}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Mail className="w-3.5 h-3.5" />
                      {contact.email}
                    </div>
                  </TableCell>
                  <TableCell className="sticky right-0 bg-white z-40 shadow-[-12px_0_15px_-5px_rgba(0,0,0,0.1)] group-hover:bg-slate-50 transition-colors border-l whitespace-nowrap">
                    <div className="flex items-center gap-2 px-4 justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">编辑</Button>
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
    </div>
  );
};

export default ContactList;