"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

interface AdminDocFormProps {
  onBack: () => void;
}

const AdminDocForm = ({ onBack }: AdminDocFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle className="text-base">行政管理文件录入</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">文件标题</Label>
            <Input required placeholder="请输入文件标题" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">文件类型</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="请选择文件类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="law">专项法规</SelectItem>
                <SelectItem value="notice">通知</SelectItem>
                <SelectItem value="bulletin">布告</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">文号</Label>
            <Input required placeholder="请输入文号" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">发文单位</Label>
            <Input required placeholder="请输入发文单位" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>说明</Label>
            <Textarea placeholder="请输入相关说明" />
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-6 mt-10 bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-2xl flex justify-end gap-4 z-10 shadow-xl shadow-slate-200/50">
        <Button type="button" variant="outline" onClick={onBack} className="px-6">取消</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">提交保存</Button>
      </div>
    </form>
  );
};

export default AdminDocForm;