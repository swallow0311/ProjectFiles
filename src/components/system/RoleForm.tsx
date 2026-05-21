"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface RoleFormProps {
  onBack: () => void;
}

const RoleForm = ({ onBack }: RoleFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("角色定义成功，请继续配置权限");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-base">角色定义</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">角色名称</Label>
              <Input required placeholder="如：文保专家" />
            </div>
            <div className="space-y-2">
              <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">角色编码</Label>
              <Input required placeholder="如：ROLE_EXPERT" className="font-mono" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>角色描述</Label>
            <Textarea placeholder="简述该角色的职责范围与权限级别" />
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm">
            提示：角色创建后，您需要在列表页点击“权限配置”来为该角色分配具体的菜单与操作权限。
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-6 mt-10 bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-2xl flex justify-end gap-4 z-10 shadow-xl shadow-slate-200/50">
        <Button type="button" variant="outline" onClick={onBack} className="px-6">取消</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-8">确认创建</Button>
      </div>
    </form>
  );
};

export default RoleForm;