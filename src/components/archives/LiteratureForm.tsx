"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

interface LiteratureFormProps {
  onBack: () => void;
}

const LiteratureForm = ({ onBack }: LiteratureFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">论文与文献录入</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">名称</Label>
            <Input required placeholder="请输入名称" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">类型</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="请选择类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paper">论文</SelectItem>
                <SelectItem value="report">考古报告</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">出版年份</Label>
            <Input required placeholder="如：2023" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">内容</Label>
            <Textarea required className="min-h-[200px]" placeholder="请输入详细内容" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>说明</Label>
            <Textarea placeholder="请输入相关说明" />
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-lg">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">提交保存</Button>
      </div>
    </form>
  );
};

export default LiteratureForm;