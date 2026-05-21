"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface TextVolumeFormProps {
  onBack: () => void;
}

interface RelicItem {
  id: string;
  name: string;
  year: string;
  count: string;
  pos: string;
}

const TextVolumeForm = ({ onBack }: TextVolumeFormProps) => {
  const [attachedRelics, setAttachedRelics] = React.useState<RelicItem[]>([{ id: '1', name: '', year: '', count: '', pos: '' }]);
  const [importantCollections, setImportantCollections] = React.useState<RelicItem[]>([{ id: '1', name: '', year: '', count: '', pos: '' }]);
  const [ancientTrees, setAncientTrees] = React.useState<RelicItem[]>([{ id: '1', name: '', year: '', count: '', pos: '' }]);
  
  const addItem = (setter: React.Dispatch<React.SetStateAction<RelicItem[]>>) => {
    setter(prev => [...prev, { id: Date.now().toString(), name: '', year: '', count: '', pos: '' }]);
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<RelicItem[]>>, id: string) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  const renderRelicList = (title: string, list: RelicItem[], setter: React.Dispatch<React.SetStateAction<RelicItem[]>>) => (
    <div className="space-y-4 border-b pb-6 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700">{title}</h4>
        <Button type="button" variant="outline" size="sm" onClick={() => addItem(setter)}>
          <Plus className="w-4 h-4 mr-1" /> 添加
        </Button>
      </div>
      {list.map((item) => (
        <div key={item.id} className="flex gap-4 items-end bg-slate-50/50 p-3 rounded-lg">
          <div className="flex-1 grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">名称</Label>
              <Input className="h-8 text-sm" value={item.name} onChange={() => {}} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">年代</Label>
              <Input className="h-8 text-sm" value={item.year} onChange={() => {}} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">数量</Label>
              <Input className="h-8 text-sm" value={item.count} onChange={() => {}} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">位置</Label>
              <Input className="h-8 text-sm" value={item.pos} onChange={() => {}} />
            </div>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-red-500 h-8 w-8" 
            onClick={() => removeItem(setter, item.id)}
            disabled={list.length === 1}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full">
      <div className="flex-1 space-y-8 pb-24">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base">基本信息</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
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

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base">环境与沿革记录</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2"><Label>自然环境</Label><Textarea placeholder="描述地形地貌、气候等" /></div>
            <div className="space-y-2"><Label>人文环境</Label><Textarea placeholder="描述周边社区、民俗等" /></div>
            <div className="space-y-2"><Label>历史沿革</Label><Textarea placeholder="描述兴废变迁过程" /></div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base">基本状况描述</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2"><Label>古遗址</Label><Textarea placeholder="遗址分布、堆积情况等" /></div>
            <div className="space-y-2"><Label>古墓葬</Label><Textarea placeholder="墓葬形制、封土规模等" /></div>
            <div className="space-y-2"><Label>古建筑</Label><Textarea placeholder="建筑结构、艺术特色等" /></div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50"><CardTitle className="text-base">保护与评估</CardTitle></CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><Label>价值评估</Label><Textarea placeholder="历史、艺术、科学价值" /></div>
              <div className="space-y-2"><Label>保存现状</Label><Textarea placeholder="当前完好程度描述" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2"><Label>残损原因分析</Label><Textarea placeholder="自然或人为因素分析" /></div>
              <div className="space-y-2"><Label>保护范围</Label><Textarea placeholder="具体四至界限描述" /></div>
              <div className="space-y-2"><Label>建设控制地带信息</Label><Textarea placeholder="外围控地范围及要求" /></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-base">附属文物管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            {renderRelicList("附属文物", attachedRelics, setAttachedRelics)}
            {renderRelicList("重要文物藏品", importantCollections, setImportantCollections)}
            {renderRelicList("古树名木", ancientTrees, setAncientTrees)}
          </CardContent>
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-8 -mb-8 bg-white border-t p-4 px-8 flex justify-start gap-3 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">确定</Button>
        <Button type="button" variant="outline" onClick={onBack} className="px-8">取消</Button>
      </div>
    </form>
  );
};

export default TextVolumeForm;