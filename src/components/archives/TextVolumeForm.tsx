"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface TextVolumeFormProps {
  onBack: () => void;
}

const TextVolumeForm = ({ onBack }: TextVolumeFormProps) => {
  const [attachedRelics, setAttachedRelics] = React.useState([{ id: '1', name: '', year: '', count: '', pos: '' }]);
  
  const addRelic = () => setAttachedRelics([...attachedRelics, { id: Date.now().toString(), name: '', year: '', count: '', pos: '' }]);
  const removeRelic = (id: string) => setAttachedRelics(attachedRelics.filter(r => r.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      {/* 基本信息 */}
      <Card>
        <CardHeader><CardTitle className="text-base">基本信息</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">公布名称</Label>
            <Input required placeholder="请输入公布名称" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">代码</Label>
            <Input required placeholder="请输入代码" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">地理坐标</Label>
            <Input required placeholder="经纬度坐标" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">面积</Label>
            <Input required placeholder="单位：平方米" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">公布时代</Label>
            <Input required placeholder="如：明代" />
          </div>
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">所有权</Label>
            <Input required placeholder="国家所有/集体所有" />
          </div>
          <div className="space-y-2 md:col-span-3">
            <Label>使用情况</Label>
            <Textarea placeholder="描述当前使用状态" />
          </div>
        </CardContent>
      </Card>

      {/* 环境与沿革 */}
      <Card>
        <CardHeader><CardTitle className="text-base">环境与沿革记录</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2"><Label>自然环境</Label><Textarea /></div>
          <div className="space-y-2"><Label>人文环境</Label><Textarea /></div>
          <div className="space-y-2"><Label>历史沿革</Label><Textarea /></div>
        </CardContent>
      </Card>

      {/* 附属文物管理 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">附属文物管理</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addRelic}><Plus className="w-4 h-4 mr-1" />添加</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {attachedRelics.map((relic, index) => (
            <div key={relic.id} className="flex gap-4 items-end border-b pb-4 last:border-0">
              <div className="flex-1 grid grid-cols-4 gap-4">
                <div className="space-y-2"><Label>名称</Label><Input /></div>
                <div className="space-y-2"><Label>年代</Label><Input /></div>
                <div className="space-y-2"><Label>数量</Label><Input /></div>
                <div className="space-y-2"><Label>位置</Label><Input /></div>
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => removeRelic(relic.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-lg">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit">提交保存</Button>
      </div>
    </form>
  );
};

export default TextVolumeForm;