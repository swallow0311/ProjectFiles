"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { MENU_DATA } from '@/constants/menuData';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Index = () => {
  const [activeModuleId, setActiveModuleId] = useState(MENU_DATA[1].id); // 默认选中“文物档案”
  const [activeMenuId, setActiveMenuId] = useState('text'); // 默认选中“文字卷”

  const activeModule = useMemo(() => 
    MENU_DATA.find(m => m.id === activeModuleId) || MENU_DATA[0],
    [activeModuleId]
  );

  // 查找当前选中的菜单名称（用于面包屑和标题）
  const activeMenuLabel = useMemo(() => {
    let label = '';
    const findLabel = (items: any[]) => {
      for (const item of items) {
        if (item.id === activeMenuId) {
          label = item.label;
          return;
        }
        if (item.children) findLabel(item.children);
      }
    };
    findLabel(activeModule.menus);
    return label || activeModule.label;
  }, [activeModule, activeMenuId]);

  const handleModuleChange = (id: string) => {
    setActiveModuleId(id);
    const module = MENU_DATA.find(m => m.id === id);
    if (module && module.menus.length > 0) {
      const firstMenu = module.menus[0];
      setActiveMenuId(firstMenu.children ? firstMenu.children[0].id : firstMenu.id);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <Header 
        activeModuleId={activeModuleId} 
        onModuleChange={handleModuleChange} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          menus={activeModule.menus} 
          activeMenuId={activeMenuId} 
          onMenuChange={setActiveMenuId} 
        />
        
        <main className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{activeModule.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeMenuLabel}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Card className="flex-1 shadow-sm border-slate-200">
            <CardHeader className="border-b bg-white py-4">
              <CardTitle className="text-lg font-semibold text-slate-800">
                {activeMenuLabel}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <p className="text-slate-500 mb-2">正在展示：{activeModule.label} - {activeMenuLabel}</p>
                <p className="text-sm text-slate-400">此处为功能模块内容展示区域</p>
              </div>
              
              {/* 模拟一些数据展示 */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-4 bg-white border rounded-lg shadow-sm">
                    <div className="h-32 bg-slate-100 rounded mb-3 flex items-center justify-center text-slate-300">
                      图片占位符
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <footer className="mt-auto pt-6">
            <MadeWithDyad />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;