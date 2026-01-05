"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Building2, Plus } from "lucide-react";

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
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>所属单位</TableHead>
              <TableHead>职务/职称</TableHead>
              <TableHead>联系电话</TableHead>
              <TableHead>电子邮箱</TableHead>
              <TableHead className="text-right pr-6">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-bold">{contact.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {contact.unit}
                  </div>
                </TableCell>
                <TableCell>{contact.position}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    <Phone className="w-3.5 h-3.5" />
                    {contact.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    {contact.email}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button variant="ghost" size="sm" className="text-blue-600">编辑</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">删除</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactList;