"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, Lock } from "lucide-react";
import RoleGroupSidebar from './RoleGroupSidebar';

interface RoleListProps {
  onAdd: () => void;
}

const RoleList = ({ onAdd }: RoleListProps) => {
  const data = [
    { id: '1', name: '超级管理员', code: 'ROLE_ADMIN', desc: '拥有系统所有操作权限', userCount: 2 },
    { id: '2', name: '文保专员', code: 'ROLE_ARCHIVE', desc: '负责文物档案的录入与维护', userCount: 15 },
    { id: '3', name: '审核员', code: 'ROLE_AUDITOR', desc: '负责修葺方案的审核与批复', userCount: 5 },
  ];

  return (
    <div className="flex gap-6 h-[calc(100vh-240px)]">
      {/* 左侧角色分组 */}
      <RoleGroupSidebar />

      {/* 右侧角色列表 */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex justify-end bg-white p-4 rounded-xl border shadow-sm">
          <Button onClick={onAdd} className="bg-indigo-600 hover:bg-indigo-700 h-9">
            <ShieldCheck className="w-4 h-4 mr-2" /> 新增角色
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex-1">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>角色名称</TableHead>
                <TableHead>角色编码</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>关联用户数</TableHead>
                <TableHead className="text-right pr-6">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-bold">{role.name}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">{role.code}</TableCell>
                  <TableCell className="text-slate-600 max-w-xs truncate">{role.desc}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{role.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" className="text-indigo-600">
                      <Lock className="w-3.5 h-3.5 mr-1" /> 权限配置
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">编辑</Button>
                    <Button variant="ghost" size="sm" className="text-red-600">删除</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RoleList;