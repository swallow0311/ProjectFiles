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
import AdminDocList from '@/components/archives/AdminDocList';
import AdminDocForm from '@/components/archives/AdminDocForm';
import LegalDocList from '@/components/archives/LegalDocList';
import LegalDocForm from '@/components/archives/LegalDocForm';
import ChronicleList from '@/components/archives/ChronicleList';
import ChronicleForm from '@/components/archives/ChronicleForm';
import ReferenceList from '@/components/archives/ReferenceList';
import ReferenceForm from '@/components/archives/ReferenceForm';
import LiteratureList from '@/components/archives/LiteratureList';
import LiteratureForm from '@/components/archives/LiteratureForm';
import BookList from '@/components/archives/BookList';
import BookForm from '@/components/archives/BookForm';
import BasicInfoList from '@/components/archives/BasicInfoList';
import BasicInfoForm from '@/components/archives/BasicInfoForm';
import PublicityMaintenance from '@/components/archives/PublicityMaintenance';

const Index = () => {
  const [activeModuleId, setActiveModuleId] = useState(MENU_DATA[1].id); 
  const [activeMenuId, setActiveMenuId] = useState('text'); 
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
      switch (activeMenuId) {
        case 'text': return <TextVolumeForm onBack={() => setViewMode('list')} />;
        case 'planning':
        case 'archaeology':
        case 'monitoring':
          return <DocumentVolumeForm type={activeMenuId as any} onBack={() => setViewMode('list')} />;
        case 'admin-doc': return <AdminDocForm onBack={() => setViewMode('list')} />;
        case 'legal-doc': return <LegalDocForm onBack={() => setViewMode('list')} />;
        case 'chronicle': return <ChronicleForm onBack={() => setViewMode('list')} />;
        case 'reference': return <ReferenceForm onBack={() => setViewMode('list')} />;
        case 'literature': return <LiteratureForm onBack={() => setViewMode('list')} />;
        case 'book': return <BookForm onBack={() => setViewMode('list')} />;
        case 'basic-info': return <BasicInfoForm onBack={() => setViewMode('list')} />;
      }
    }

    switch (activeMenuId) {
      case 'text': return <TextVolumeList onAdd={() => setViewMode('add')} />;
      case 'drawing': return <ImageVolumeGallery type="drawing" title="图纸卷" />;
      case 'photo': return <ImageVolumeGallery type="photo" title="照片卷" />;
      case 'rubbing': return <ImageVolumeGallery type="rubbing" title="拓片卷" />;
      case 'curtain': return <ImageVolumeGallery type="curtain" title="幕本卷" />;
      case 'display': return <ImageVolumeGallery type="display" title="文物展示卷" />;
      case 'planning': return <DocumentVolumeList type="planning" onAdd={() => setViewMode('add')} />;
      case 'archaeology': return <DocumentVolumeList type="archaeology" onAdd={() => setViewMode('add')} />;
      case 'monitoring': return <DocumentVolumeList type="monitoring" onAdd={() => setViewMode('add')} />;
      case 'admin-doc': return <AdminDocList onAdd={() => setViewMode('add')} />;
      case 'legal-doc': return <LegalDocList onAdd={() => setViewMode('add')} />;
      case 'chronicle': return <ChronicleList onAdd={() => setViewMode('add')} />;
      case 'reference': return <ReferenceList onAdd={() => setViewMode('add')} />;
      case 'literature': return <LiteratureList onAdd={() => setViewMode('add')} />;
      case 'book': return <BookList onAdd={() => setViewMode('add')} />;
      case 'basic-info': return <BasicInfoList onAdd={() => setViewMode('add')} />;
      case 'publicity': return <PublicityMaintenance />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-slate-200 rounded-2xl bg-white shadow-sm">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <LayoutGrid size={48} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">正在展示：{activeModule.label} - {activeMenuLabel}</p>
            <p className="text-sm text-slate-400 mt-1">此处为功能模块内容展示区域</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] overflow-hidden font-sans antialiased text-slate-900">
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
        
        <main className="flex-1 overflow-y-auto p-8 flex flex-col">
          {/* 顶部导航与标题区 */}
          <div className="mb-8">
            <Breadcrumb className="mb-3">
              <BreadcrumbList className="text-slate-500 text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className="hover:text-blue-600 transition-colors">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="font-medium">{activeModule.label}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {viewMode === 'add' ? (
                    <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className="hover:text-blue-600 transition-colors">
                      {activeMenuLabel}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-slate-900 font-semibold">{activeMenuLabel}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {viewMode === 'add' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-blue-600 font-semibold">新增{activeMenuLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {viewMode === 'add' ? `新增${activeMenuLabel}` : activeMenuLabel}
              </h2>
              {viewMode === 'list' && (
                <div className="text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  最后更新: {new Date().toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* 内容主体区 */}
          <div className="flex-1">
            {renderContent()}
          </div>
          
          <footer className="mt-12 pb-4">
            <MadeWithDyad />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;