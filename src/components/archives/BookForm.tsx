"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface BookFormProps {
  onBack: () => void;
}

const BookForm = ({ onBack }: BookFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">图书录入</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">书名</Label>
            <Input required placeholder="请输入书名" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">出版单位</Label>
            <Input required placeholder="请输入出版单位" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">版本</Label>
            <Input required placeholder="如：第一版" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">目录</Label>
            <Textarea required className="min-h-[200px]" placeholder="请输入图书目录" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>说明</Label>
            <Textarea placeholder="请输入相关说明" />
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-4 mt-8 bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-xl flex justify-end gap-4 z-10 shadow-lg">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">提交保存</Button>
      </div>
    </form>
  );
};

export default BookForm;