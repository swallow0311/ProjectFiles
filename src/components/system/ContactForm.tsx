"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

interface ContactFormProps {
  onBack: () => void;
}

const ContactForm = ({ onBack }: ContactFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("联系人已添加至通讯录");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-base">联系人信息</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">姓名</Label>
            <Input required placeholder="请输入姓名" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">所属单位</Label>
            <Input required placeholder="请输入单位全称" />
          </div>
          <div className="space-y-2">
            <Label>职务/职称</Label>
            <Input placeholder="如：高级工程师" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">联系电话</Label>
            <Input required placeholder="请输入手机或座机号" />
          </div>
          <div className="space-y-2">
            <Label>电子邮箱</Label>
            <Input type="email" placeholder="example@domain.com" />
          </div>
          <div className="space-y-2">
            <Label>办公地址</Label>
            <Input placeholder="请输入详细办公地址" />
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-lg">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-8">保存联系人</Button>
      </div>
    </form>
  );
};

export default ContactForm;