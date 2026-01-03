"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BasicInfoFormProps {
  onBack: () => void;
}

const RANGE_OPTIONS = [
  { group: '主卷管理', items: ['文字卷', '图纸卷', '照片卷', '拓片卷', '幕本卷', '文物展示卷', '保护规划及保护工程方案卷', '文物调查及考古发掘资料卷', '文物保护工程及防治监测卷'] },
  { group: '副卷管理', items: ['行政管理文件', '法律文书', '大事记'] },
  { group: '备考卷管理', items: ['参考资料', '论文与文献', '图书管理'] },
];

const BasicInfoForm = ({ onBack }: BasicInfoFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("保存成功");
    onBack();
  };

  const toggleItem = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const filteredOptions = RANGE_OPTIONS.map(group => ({
    ...group,
    items: group.items.filter(item => item.includes(searchTerm))
  })).filter(group => group.items.length > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">基础信息录入</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">基础信息名称</Label>
            <Input required placeholder="请输入基础信息名称" />
          </div>

          <div className="space-y-3">
            <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">应用范围</Label>
            <div className="border rounded-lg overflow-hidden bg-slate-50/30">
              <div className="p-3 border-b bg-white flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <Input 
                  className="h-8 border-0 focus-visible:ring-0 bg-transparent" 
                  placeholder="搜索应用范围..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ScrollArea className="h-[300px] p-4">
                <div className="space-y-6">
                  {filteredOptions.map((group) => (
                    <div key={group.group} className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{group.group}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.items.map((item) => (
                          <div key={item} className="flex items-center space-x-2">
                            <Checkbox 
                              id={item} 
                              checked={selectedItems.includes(item)}
                              onCheckedChange={() => toggleItem(item)}
                            />
                            <label 
                              htmlFor={item} 
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-3 border-t bg-slate-50 flex flex-wrap gap-2">
                <span className="text-xs text-slate-500 self-center mr-2">已选 ({selectedItems.length}):</span>
                {selectedItems.map(item => (
                  <div key={item} className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded flex items-center gap-1">
                    {item}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleItem(item)} />
                  </div>
                ))}
                {selectedItems.length === 0 && <span className="text-xs text-slate-400 italic">暂未选择</span>}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>说明</Label>
            <Textarea placeholder="请输入相关说明" />
          </div>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-lg">
        <Button type="button" variant="outline" onClick={onBack}>取消</Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={selectedItems.length === 0}>提交保存</Button>
      </div>
    </form>
  );
};

export default BasicInfoForm;