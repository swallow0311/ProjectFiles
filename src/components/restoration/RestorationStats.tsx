"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area 
} from 'recharts';
import { Wrench, ClipboardCheck, FileText, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

// 模拟数据：方案类型分布
const TYPE_DATA = [
  { name: '日常保养', value: 45 },
  { name: '抢救性修复', value: 25 },
  { name: '预防性保护', value: 20 },
  { name: '研究性修复', value: 10 },
];

// 模拟数据：审核状态分布
const STATUS_DATA = [
  { name: '已通过', value: 58 },
  { name: '审核中', value: 12 },
  { name: '已驳回', value: 5 },
  { name: '草稿', value: 25 },
];

// 模拟数据：修缮进度趋势
const PROGRESS_TREND = [
  { month: '1月', 计划: 10, 完成: 8 },
  { month: '2月', 计划: 15, 完成: 12 },
  { month: '3月', 计划: 20, 完成: 18 },
  { month: '4月', 计划: 18, 完成: 15 },
  { month: '5月', 计划: 25, 完成: 22 },
  { month: '6月', 计划: 30, 完成: 28 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];
const STATUS_COLORS = ['#10b981', '#3b82f6', '#ef4444', '#94a3b8'];

const RestorationStats = () => {
  return (
    <div className="space-y-6 bg-[#020617] p-6 rounded-2xl border border-white/5 min-h-screen text-white">
      {/* 顶部核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: '方案总数', value: '128', icon: FileText, color: 'text-blue-400', sub: '本月新增 12 份' },
          { label: '待审核方案', value: '12', icon: ClipboardCheck, color: 'text-orange-400', sub: '紧急处理 3 份' },
          { label: '在建修缮项目', value: '15', icon: Wrench, color: 'text-indigo-400', sub: '进度正常 13 个' },
          { label: '年度完工率', value: '92%', icon: CheckCircle2, color: 'text-green-400', sub: '较去年提升 5%' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
            <div>
              <p className="text-slate-400 text-xs font-medium mb-1">{item.label}</p>
              <h3 className="text-3xl font-bold tracking-tight">{item.value}</h3>
              <p className="text-[10px] text-slate-500 mt-2">{item.sub}</p>
            </div>
            <item.icon className={item.color} size={32} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 方案类型占比 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" /> 修缮方案类型分布
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TYPE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {TYPE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 审核状态统计 */}
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-blue-400" /> 方案审核状态统计
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STATUS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 修缮进度趋势分析 */}
        <Card className="bg-white/5 border-white/10 text-white lg:col-span-2">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Wrench className="w-4 h-4 text-green-400" /> 修缮项目执行进度趋势
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PROGRESS_TREND}>
                  <defs>
                    <linearGradient id="colorPlan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                  <Legend />
                  <Area type="monotone" dataKey="计划" stroke="#6366f1" fillOpacity={1} fill="url(#colorPlan)" strokeWidth={3} />
                  <Area type="monotone" dataKey="完成" stroke="#10b981" fillOpacity={1} fill="url(#colorDone)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestorationStats;