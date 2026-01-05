"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface UserListProps {
  onAdd: () => void;
}

const UserList = ({ onAdd }: UserListProps) => {
  const data = [
    { id: '1', username: 'admin', name: '系统管理员', role: '超级管理员', dept: '技术部', status: true, lastLogin: '2023-11-15 10:20' },
    { id: '2', username: 'zhangsan', name: '张三', role: '文保专员', dept: '档案科', status: true, lastLogin: '2023-11-14 15:45' },
    { id: '3', username: 'lisi', name: '李四', role: '审核员', dept: '管理处', status: false, lastLogin: '2023-11-10 09:00' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9" placeholder="搜索用户名 / 姓名" />
          </div>
          <Button variant="outline" className="h-9">查询</Button>
        </div>
        <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
          <UserPlus className="w-4 h-4 mr-2" /> 新增用户
        </Button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>用户名</TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>所属角色</TableHead>
              <TableHead>部门</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>最后登录</TableHead>
              <TableHead className="text-right pr-6">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-xs font-bold">{user.username}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                    <Shield className="w-3 h-3 mr-1" /> {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.dept}</TableCell>
                <TableCell>
                  <Switch checked={user.status} />
                </TableCell>
                <TableCell className="text-slate-500 text-xs">{user.lastLogin}</TableCell>
                <TableCell className="text-right pr-6">
                  <Button variant="ghost" size="sm" className="text-blue-600">编辑</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">重置密码</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;