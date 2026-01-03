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
import { LayoutGrid } from 'lucide-react';

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
          <div className="flex flex-col items-center justify-center h-96 border border-cyan-500/20 rounded-2xl bg-slate-900/50 backdrop-blur-sm shadow-2xl">
            <div className="bg-cyan-500/10 p-6 rounded-full mb-6 relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20" />
              <LayoutGrid size={48} className="text-cyan-500 relative" />
            </div>
            <p className="text-slate-300 font-bold text-lg tracking-widest uppercase">System Module: {activeMenuLabel}</p>
            <p className="text-cyan-500/50 text-xs mt-2 font-mono">INITIALIZING INTERFACE...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] overflow-hidden font-sans antialiased text-slate-100">
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
        
        <main className="flex-1 overflow-y-auto p-8 flex flex-col relative">
          {/* 装饰背景 */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[100px] -z-10" />
          
          {/* 顶部导航与标题区 */}
          <div className="mb-10">
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className="hover:text-cyan-400 transition-colors">CORE</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="opacity-20" />
                <BreadcrumbItem>
                  <span className="text-slate-400">{activeModule.label}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="opacity-20" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]">{activeMenuLabel}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                  {viewMode === 'add' ? `NEW_${activeMenuLabel}` : activeMenuLabel}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
              </div>
              {viewMode === 'list' && (
                <div className="text-[10px] font-mono text-cyan-500/50 bg-cyan-500/5 px-4 py-2 rounded-lg border border-cyan-500/10 backdrop-blur-sm">
                  SYSTEM_TIME: {new Date().toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>

          {/* 内容主体区 */}
          <div className="flex-1">
            {renderContent()}
          </div>
          
          <footer className="mt-12 pb-4 opacity-30 hover:opacity-100 transition-opacity">
            <MadeWithDyad />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;