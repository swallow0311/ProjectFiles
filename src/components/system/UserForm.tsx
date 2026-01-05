"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";

interface UserFormProps {
  onBack: () => void;
}

const UserForm = ({ onBack }: UserFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("用户创建成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-base">用户信息录入</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">用户名</Label>
            <Input required placeholder="用于系统登录的唯一账号" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">姓名</Label>
            <Input required placeholder="请输入真实姓名" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">所属角色</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="请选择角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">超级管理员</SelectItem>
                <SelectItem value="archive">文保专员</SelectItem>
                <SelectItem value="auditor">审核员</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>所属部门</Label>
            <Input placeholder="请输入部门名称" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">初始密码</Label>
            <Input required type="password" placeholder="请输入初始登录密码" />
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <Switch id="user-status" defaultChecked />
            <Label htmlFor="user-status">立即启用账号</Label>
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-lg">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-8">提交保存</Button>
      </div>
    </form>
  );
};

export default UserForm;