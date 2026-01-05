"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Image as ImageIcon, Map as MapIcon } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface SchemeFormProps {
  onBack: () => void;
}

const SchemeForm = ({ onBack }: SchemeFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("方案提交成功，进入审核流程");
    onBack();
  };

  const renderUploadBox = (icon: React.ReactNode, label: string, desc: string) => (
    <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
      <div className="p-3 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="text-xs text-slate-400 mt-1">{desc}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-24">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-base">方案基础信息</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="space-y-2 md:col-span-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">方案名称</Label>
            <Input required placeholder="请输入修缮方案完整名称" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">修缮类型</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="请选择修缮类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="structure">结构加固</SelectItem>
                <SelectItem value="painting">彩画修复</SelectItem>
                <SelectItem value="roof">屋面修缮</SelectItem>
                <SelectItem value="foundation">基础防潮</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>版本号</Label>
            <Input defaultValue="V1.0" readOnly className="bg-slate-50 font-mono" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>方案概述</Label>
            <Textarea placeholder="请简述修缮方案的核心内容与目标" className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-base">关键资料上传</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {renderUploadBox(<ImageIcon className="w-6 h-6 text-blue-500" />, "效果图上传", "支持JPG/PNG，建议尺寸16:9")}
            {renderUploadBox(<FileText className="w-6 h-6 text-orange-500" />, "方案文本", "支持PDF/Word，包含详细技术说明")}
            {renderUploadBox(<MapIcon className="w-6 h-6 text-green-500" />, "工程图纸", "支持DWG/PDF，包含平立剖面图")}
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-8">提交保存</Button>
      </div>
    </form>
  );
};

export default SchemeForm;