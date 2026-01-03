"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Eye, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ImageItem {
  id: string;
  deviceCode: string;
  deviceName: string;
  title: string;
  category?: string;
  time?: string;
  creator?: string;
  url: string;
  [key: string]: any;
}

interface ImageVolumeGalleryProps {
  type: 'drawing' | 'photo' | 'rubbing' | 'curtain' | 'display';
  title: string;
}

const ImageVolumeGallery = ({ type, title }: ImageVolumeGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  
  // 模拟数据
  const mockData: ImageItem[] = [
    { id: '1', deviceCode: 'BH-001', deviceName: '故宫太和殿', title: '正立面图', category: '建筑图纸', time: '2023-10-01', creator: '张工', url: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800' },
    { id: '2', deviceCode: 'BH-002', deviceName: '天坛祈年殿', title: '全景照片', category: '全景照片', time: '2023-11-15', creator: '李摄', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9" placeholder="关联设备 / 名称查询" />
          </div>
          <Button variant="outline">查询</Button>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" /> 批量上传
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockData.map((item) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="rounded-full" onClick={() => setSelectedImage(item)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" className="rounded-full">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3 space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">{item.deviceCode}</Badge>
                <span className="text-[10px] text-slate-400">{item.category}</span>
              </div>
              <h4 className="font-medium text-sm truncate">{item.title}</h4>
              <p className="text-xs text-slate-500 truncate">{item.deviceName}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 大图查看弹窗 */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center min-h-[400px]">
              <img src={selectedImage?.url} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-y-3">
                <span className="text-slate-500">设备编码：</span><span>{selectedImage?.deviceCode}</span>
                <span className="text-slate-500">设备名称：</span><span>{selectedImage?.deviceName}</span>
                <span className="text-slate-500">分类：</span><span>{selectedImage?.category}</span>
                <span className="text-slate-500">添加人：</span><span>{selectedImage?.creator}</span>
                <span className="text-slate-500">添加时间：</span><span>{selectedImage?.time}</span>
              </div>
              <div className="pt-4 border-t">
                <p className="text-slate-500 mb-1">文字说明：</p>
                <p className="text-slate-700">暂无详细说明文字内容。</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageVolumeGallery;