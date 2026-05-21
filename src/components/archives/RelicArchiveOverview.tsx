"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface RelicArchiveOverviewProps {
  onSelectRelic: (relic: any) => void;
}

const RELICS = [
  {
    id: '1',
    name: '崇孝堂（山仰陈氏祠堂）',
    category: '古建筑类',
    level: '未定',
    levelColor: 'bg-lime-500',
    desc: '崇孝堂是位于福建省厦门市海沧区山仰社的陈氏家族祠堂，由清末族长陈志抛（又名陈天衢）于光绪年间（具体为光绪壬寅年，即1902年）主持兴建，作为山仰陈氏五房的小宗祠堂。',
    era: '清代',
    address: '海沧街道围瑶村山仰社119号',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400'
  },
  {
    id: '2',
    name: '莲塘别墅',
    category: '古建筑类',
    level: '省级',
    levelColor: 'bg-green-500',
    desc: '莲塘别墅位于中国福建省厦门市海沧区海沧街道的清代华侨建筑群，由越南华侨陈炳猷于1904-1906年建造，占地约8235平方米，现为省级文物保护单位及厦门新二十四景之一，融合闽南传统与……',
    era: '清光绪三十年',
    address: '海沧街道海沧村新街48号',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400'
  },
  {
    id: '3',
    name: '东头山烈士陵园',
    category: '近现代重要史迹',
    level: '区级',
    levelColor: 'bg-lime-600',
    desc: '东山烈士陵园通常指位于福建省漳州市东山县的东山战斗烈士陵园，该陵园是为纪念1953年东山保卫战中牺牲的烈士而建，是国家级烈士纪念设施，占地6.29万平方米，安葬449名烈士。',
    era: '1958年',
    address: '厦门市海沧区海沧社区东头山',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400'
  },
  {
    id: '4',
    name: '杨本营宅',
    category: '古建筑类',
    level: '市级',
    levelColor: 'bg-green-400',
    desc: '位于海沧区新阳街道霞阳村，建于清代。这是一座由第一、二、三进主体建筑和左右护厝组成的合院式闽南传统建筑。砖木石结构，硬山顶，木梁全架于墙体上。第一、二进屋顶双燕尾脊，面阔3间，进深2间；左右护……',
    era: '清代',
    address: '新阳街道霞阳村西路191号',
    image: 'https://images.unsplash.com/photo-1528154291023-a6525faba5b0?w=400'
  }
];

const RelicArchiveOverview = ({ onSelectRelic }: RelicArchiveOverviewProps) => {
  return (
    <div className="flex gap-6 h-full">
      {/* 左侧主内容区 */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">文物档案</h2>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-9 h-9 bg-slate-50 border-slate-200" placeholder="请输入文物名称进行搜索" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {RELICS.map((relic) => (
            <Card 
              key={relic.id} 
              className="group cursor-pointer hover:shadow-md transition-all border-slate-200 overflow-hidden"
              onClick={() => onSelectRelic(relic)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={relic.image} alt={relic.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <Badge className={`absolute top-2 right-2 ${relic.levelColor} text-white border-none px-2 py-0.5 text-[10px]`}>
                  {relic.level}
                </Badge>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm truncate flex-1">{relic.name}</h3>
                  <span className="text-[10px] text-orange-500 font-medium shrink-0">{relic.category}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-4 h-[64px]">
                  {relic.desc}
                </p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                  <span>{relic.era}</span>
                  <span className="truncate max-w-[120px]">{relic.address}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 分页 */}
        <div className="mt-auto flex items-center justify-end gap-4 py-4">
          <span className="text-xs text-slate-500">共26条</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">上一页</Button>
            <Button variant="default" size="sm" className="h-8 w-8 p-0 text-xs bg-blue-500">1</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs">2</Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-xs">3</Button>
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">下一页</Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            前往 <Input className="w-10 h-8 p-1 text-center" defaultValue="1" /> 页
          </div>
        </div>
      </div>

      {/* 右侧侧边栏 */}
      <div className="w-80 flex flex-col gap-6">
        {/* 修缮审批 */}
        <Card className="border-slate-200 shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-sm font-bold">修缮审批</h3>
            <Button variant="link" className="text-blue-500 text-xs p-0 h-auto">查看更多 >></Button>
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[11px] h-9">方案名称</TableHead>
                <TableHead className="text-[11px] h-9">修缮文物</TableHead>
                <TableHead className="text-[11px] h-9 text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i} className="text-[11px]">
                  <TableCell className="py-3">青礁慈济宫外墙翻新</TableCell>
                  <TableCell className="py-3">青礁慈济宫</TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <span className="text-blue-500 cursor-pointer">查看</span>
                      {i < 3 && (
                        <>
                          <span className="text-green-600 cursor-pointer">通过</span>
                          <span className="text-red-500 cursor-pointer">拒绝</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* 告警通知 */}
        <Card className="border-slate-200 shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-sm font-bold">告警通知</h3>
            <Button variant="link" className="text-blue-500 text-xs p-0 h-auto">查看更多 >></Button>
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[11px] h-9">事件名称</TableHead>
                <TableHead className="text-[11px] h-9">发生时间</TableHead>
                <TableHead className="text-[11px] h-9">告警文物</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2].map((i) => (
                <TableRow key={i} className="text-[11px]">
                  <TableCell className="py-3">主殿西区烟火报警</TableCell>
                  <TableCell className="py-3 text-slate-400">2026年1月19日22:08</TableCell>
                  <TableCell className="py-3">青礁慈济宫</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default RelicArchiveOverview;