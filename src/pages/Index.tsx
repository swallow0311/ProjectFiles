"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { MENU_DATA } from '@/constants/menuData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { LayoutGrid, PauseCircle, PlayCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
import IntelligentAnalysis from '@/components/archives/IntelligentAnalysis';
import RelicArchiveOverview from '@/components/archives/RelicArchiveOverview';
import EquipmentList from '@/components/safety/EquipmentList';
import EquipmentForm from '@/components/safety/EquipmentForm';
import AlarmProcessingList from '@/components/safety/AlarmProcessingList';
import SchemeList from '@/components/restoration/SchemeList';
import SchemeForm from '@/components/restoration/SchemeForm';
import ApprovalList from '@/components/restoration/ApprovalList';
import RecordList from '@/components/restoration/RecordList';
import RecordForm from '@/components/restoration/RecordForm';
import UserList from '@/components/system/UserList';
import UserForm from '@/components/system/UserForm';
import RoleList from '@/components/system/RoleList';
import RoleForm from '@/components/system/RoleForm';
import ContactList from '@/components/system/ContactList';
import ContactForm from '@/components/system/ContactForm';
import ApiList from '@/components/system/ApiList';
import ApiForm from '@/components/system/ApiForm';
import LoginLogList from '@/components/system/LoginLogList';
import OpLogList from '@/components/system/OpLogList';
import SmartScreenCarousel, { DASHBOARDS } from '@/components/cockpit/SmartScreenCarousel';

const Index = () => {
  const [activeModuleId, setActiveModuleId] = useState(MENU_DATA[0].id); 
  const [activeMenuId, setActiveMenuId] = useState('relic-data'); 
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'add-version' | 'add-record'>('list');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedRelic, setSelectedRelic] = useState<any>(null);
  
  // 智慧大屏滚动状态
  const [smartScreenIndex, setSmartScreenIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeModule = useMemo(() => 
    MENU_DATA.find(m => m.id === activeModuleId) || MENU_DATA[0],
    [activeModuleId]
  );

  const activeMenuLabel = useMemo(() => {
    if (activeModuleId === 'cockpit') return '智慧大屏';
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
  }, [activeModule, activeMenuId, activeModuleId]);

  // 处理智慧大屏自动滚动
  useEffect(() => {
    if (activeModuleId === 'cockpit' && !isPaused) {
      timerRef.current = setInterval(() => {
        setSmartScreenIndex((prev) => (prev + 1) % DASHBOARDS.length);
      }, 8000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeModuleId, isPaused]);

  const handleModuleChange = (id: string, menuId?: string) => {
    setActiveModuleId(id);
    setViewMode('list');
    setSelectedRelic(null); // 切换模块时重置选中的文物
    const module = MENU_DATA.find(m => m.id === id);
    if (menuId) {
      setActiveMenuId(menuId);
    } else if (module && module.menus.length > 0) {
      const firstMenu = module.menus[0];
      setActiveMenuId(firstMenu.children ? firstMenu.children[0].id : firstMenu.id);
    } else {
      setActiveMenuId(''); 
    }
  };

  const handleMenuChange = (id: string) => {
    setActiveMenuId(id);
    setViewMode('list');
  };

  const handleSelectRelic = (relic: any) => {
    setSelectedRelic(relic);
    setActiveMenuId('text'); // 默认进入文字卷
  };

  const handleAddVersion = (scheme: any) => {
    setSelectedData(scheme);
    setViewMode('add-version');
  };

  const handleAddRecord = (record: any) => {
    setSelectedData(record);
    setViewMode('add-record');
  };

  const renderContent = () => {
    if (activeModuleId === 'cockpit') {
      return (
        <div 
          className="h-full" 
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          <SmartScreenCarousel activeIndex={smartScreenIndex} />
        </div>
      );
    }

    // 文物管理模块且未选择具体文物时，显示总览页
    if (activeModuleId === 'archives' && !selectedRelic) {
      return <RelicArchiveOverview onSelectRelic={handleSelectRelic} />;
    }

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
        case 'equipment': return <EquipmentForm onBack={() => setViewMode('list')} />;
        case 'scheme-mgmt': return <SchemeForm onBack={() => setViewMode('list')} />;
        case 'exec-record': return <RecordForm onBack={() => setViewMode('list')} />;
        case 'user': return <UserForm onBack={() => setViewMode('list')} />;
        case 'role': return <RoleForm onBack={() => setViewMode('list')} />;
        case 'contacts': return <ContactForm onBack={() => setViewMode('list')} />;
        case 'api': return <ApiForm onBack={() => setViewMode('list')} />;
      }
    }

    if (viewMode === 'add-version') {
      return <SchemeForm onBack={() => setViewMode('list')} initialData={selectedData} isVersionMode />;
    }

    if (viewMode === 'add-record') {
      return <RecordForm onBack={() => setViewMode('list')} initialData={selectedData} isAddRecordMode />;
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
      case 'smart-analysis': return <IntelligentAnalysis />;
      case 'equipment': return <EquipmentList onAdd={() => setViewMode('add')} />;
      case 'alarm-process': return <AlarmProcessingList />;
      case 'scheme-mgmt': return <SchemeList onAdd={() => setViewMode('add')} onAddVersion={handleAddVersion} />;
      case 'scheme-audit': return <ApprovalList />;
      case 'exec-record': return <RecordList onAdd={() => setViewMode('add')} onAddDetail={handleAddRecord} />;
      case 'user': return <UserList onAdd={() => setViewMode('add')} />;
      case 'role': return <RoleList onAdd={() => setViewMode('add')} />;
      case 'contacts': return <ContactList onAdd={() => setViewMode('add')} />;
      case 'api': return <ApiList onAdd={() => setViewMode('add')} />;
      case 'login-log': return <LoginLogList />;
      case 'op-log': return <OpLogList />;
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
        onBellClick={() => handleModuleChange('safety', 'alarm-process')}
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
                  <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); setSelectedRelic(null); }} className="hover:text-blue-600 transition-colors">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="font-medium">{activeModule.label}</span>
                </BreadcrumbItem>
                {activeMenuLabel !== activeModule.label && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {viewMode !== 'list' ? (
                        <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className="hover:text-blue-600 transition-colors">
                          {activeMenuLabel}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-slate-900 font-semibold">{activeMenuLabel}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </>
                )}
                {selectedRelic && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-blue-600 font-bold">{selectedRelic.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-6">
                {selectedRelic && viewMode === 'list' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-500 hover:text-blue-600 -ml-2"
                    onClick={() => setSelectedRelic(null)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> 返回菜单
                  </Button>
                )}
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {viewMode === 'add' ? `新增${activeMenuLabel}` : 
                   viewMode === 'add-version' ? '添加方案版本' : 
                   viewMode === 'add-record' ? '新增修葺记录' : 
                   (activeModuleId === 'archives' && !selectedRelic) ? '文物档案总览' : activeMenuLabel}
                </h2>
              </div>

              {/* 智慧大屏专用切换按钮 - 居中处理 */}
              {activeModuleId === 'cockpit' && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-sm"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {DASHBOARDS.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setSmartScreenIndex(idx)}
                      className={cn(
                        "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                        smartScreenIndex === idx 
                          ? "bg-white text-blue-600 shadow-sm" 
                          : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="w-px h-4 bg-slate-200 mx-1" />
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      isPaused ? "text-orange-500 hover:bg-orange-50" : "text-slate-400 hover:bg-slate-200"
                    )}
                    title={isPaused ? "点击恢复自动滚动" : "点击暂停自动滚动"}
                  >
                    {isPaused ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                  </button>
                </div>
              )}

              {viewMode === 'list' && activeModuleId !== 'cockpit' && (
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
        </main>
      </div>
    </div>
  );
};

export default Index;