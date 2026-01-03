"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { MENU_DATA } from '@/constants/menuData';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import TextVolumeList from '@/components/archives/TextVolumeList';
import TextVolumeForm from '@/components/archives/TextVolumeForm';
import ImageVolumeGallery from '@/components/archives/ImageVolumeGallery';
import DocumentVolumeList from '@/components/archives/DocumentVolumeList';
import DocumentVolumeForm from '@/components/archives/DocumentVolumeForm';

const Index = () => {
  const [activeModuleId, setActiveModuleId] = useState(MENU_DATA[1].id); // 默认选中“文物档案”
  const [activeMenuId, setActiveMenuId] = useState('text'); // 默认选中“文字卷”
  const [viewMode, setViewMode] = useState<'list' | 'add'>('list');

  const activeModule = useMemo(() => 
    MENU_DATA.find(m => m.id === activeModuleId) || MENU_DATA[0],
    [activeModuleId]
  );

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
    setViewMode('list');
    const module = MENU_DATA.find(m => m.id === id);
    if (module && module.menus.length > 0) {
      const firstMenu = module.menus[0];
      setActiveMenuId(firstMenu.children ? firstMenu.children[0].id : firstMenu.id);
    }
  };

  const handleMenuChange = (id: string) => {
    setActiveMenuId(id);
    setViewMode('list');
  };

  const renderContent = () => {
    if (viewMode === 'add') {
      if (activeMenuId === 'text') {
        return <TextVolumeForm onBack={() => setViewMode('list')} />;
      }
      if (['planning', 'archaeology', 'monitoring'].includes(activeMenuId)) {
        return <DocumentVolumeForm type={activeMenuId as any} onBack={() => setViewMode('list')} />;
      }
    }

    switch (activeMenuId) {
      case 'text':
        return <TextVolumeList onAdd={() => setViewMode('add')} />;
      case 'drawing':
        return <ImageVolumeGallery type="drawing" title="图纸卷" />;
      case 'photo':
        return <ImageVolumeGallery type="photo" title="照片卷" />;
      case 'rubbing':
        return <ImageVolumeGallery type="rubbing" title="拓片卷" />;
      case 'curtain':
        return <ImageVolumeGallery type="curtain" title="幕本卷" />;
      case 'display':
        return <ImageVolumeGallery type="display" title="文物展示卷" />;
      case 'planning':
        return <DocumentVolumeList type="planning" onAdd={() => setViewMode('add')} />;
      case 'archaeology':
        return <DocumentVolumeList type="archaeology" onAdd={() => setViewMode('add')} />;
      case 'monitoring':
        return <DocumentVolumeList type="monitoring" onAdd={() => setViewMode('add')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <p className="text-slate-500 mb-2">正在展示：{activeModule.label} - {activeMenuLabel}</p>
            <p className="text-sm text-slate-400">此处为功能模块内容展示区域</p>
          </div>
        );
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
          onMenuChange={handleMenuChange} 
        />
        
        <main className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={() => setViewMode('list')}>首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{activeModule.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeMenuLabel}</BreadcrumbPage>
                </BreadcrumbItem>
                {viewMode === 'add' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>新增{activeMenuLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                {viewMode === 'add' ? `新增${activeMenuLabel}` : activeMenuLabel}
              </h2>
            </div>
            {renderContent()}
          </div>
          
          <footer className="mt-auto pt-6">
            <MadeWithDyad />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;