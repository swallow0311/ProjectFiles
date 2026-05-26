"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { MENU_DATA } from '@/constants/menuData';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// 驾驶舱组件
import CockpitModule from '@/components/cockpit/CockpitModule';

// 档案组件
import RelicArchiveOverview from '@/components/archives/RelicArchiveOverview';
import IntelligentAnalysis from '@/components/archives/IntelligentAnalysis';
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

// 安全组件
import EquipmentList from '@/components/safety/EquipmentList';
import EquipmentForm from '@/components/safety/EquipmentForm';
import AlarmProcessingList from '@/components/safety/AlarmProcessingList';

// 修葺组件
import RestorationStats from '@/components/restoration/RestorationStats';
import SchemeList from '@/components/restoration/SchemeList';
import SchemeForm from '@/components/restoration/SchemeForm';
import ApprovalList from '@/components/restoration/ApprovalList';
import RecordList from '@/components/restoration/RecordList';
import RecordForm from '@/components/restoration/RecordForm';

// 系统组件
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

const Index = () => {
  const [activeModuleId, setActiveModuleId] = useState('cockpit');
  const [activeMenuId, setActiveMenuId] = useState('map');
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<any>(null);

  const activeModule = useMemo(
    () => MENU_DATA.find((m) => m.id === activeModuleId) || MENU_DATA[0],
    [activeModuleId]
  );

  const activeMenuLabel = useMemo(() => {
    const item = activeModule.menus.find((m) => m.id === activeMenuId);
    return item?.label || '';
  }, [activeModule, activeMenuId]);

  const handleModuleChange = (id: string) => {
    setActiveModuleId(id);
    const firstMenu = MENU_DATA.find(m => m.id === id)?.menus[0];
    setActiveMenuId(firstMenu?.id || '');
    setViewMode('list');
  };

  const handleMenuChange = (id: string) => {
    setActiveMenuId(id);
    setViewMode('list');
  };

  const renderContent = () => {
    // 驾驶舱：使用统一的轮播容器，不再依赖侧边栏切换
    if (activeModuleId === 'cockpit') {
      return <CockpitModule />;
    }

    // 文物档案
    if (activeModuleId === 'archives') {
      if (viewMode === 'form') {
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
        case 'overview': return <RelicArchiveOverview onSelectRelic={() => setActiveMenuId('text')} />;
        case 'analysis': return <IntelligentAnalysis />;
        case 'text': return <TextVolumeList onAdd={() => setViewMode('form')} />;
        case 'drawing': return <ImageVolumeGallery type="drawing" title="图纸卷" />;
        case 'photo': return <ImageVolumeGallery type="photo" title="照片卷" />;
        case 'rubbing': return <ImageVolumeGallery type="rubbing" title="拓片卷" />;
        case 'curtain': return <ImageVolumeGallery type="curtain" title="幕本卷" />;
        case 'display': return <ImageVolumeGallery type="display" title="文物展示卷" />;
        case 'planning':
        case 'archaeology':
        case 'monitoring':
          return <DocumentVolumeList type={activeMenuId as any} onAdd={() => setViewMode('form')} />;
        case 'admin-doc': return <AdminDocList onAdd={() => setViewMode('form')} />;
        case 'legal-doc': return <LegalDocList onAdd={() => setViewMode('form')} />;
        case 'chronicle': return <ChronicleList onAdd={() => setViewMode('form')} />;
        case 'reference': return <ReferenceList onAdd={() => setViewMode('form')} />;
        case 'literature': return <LiteratureList onAdd={() => setViewMode('form')} />;
        case 'book': return <BookList onAdd={() => setViewMode('form')} />;
        case 'basic-info': return <BasicInfoList onAdd={() => setViewMode('form')} />;
        case 'publicity': return <PublicityMaintenance />;
      }
    }

    // 安全监测
    if (activeModuleId === 'safety') {
      if (viewMode === 'form' && activeMenuId === 'equipment') {
        return <EquipmentForm onBack={() => setViewMode('list')} />;
      }
      switch (activeMenuId) {
        case 'equipment': return <EquipmentList onAdd={() => setViewMode('form')} />;
        case 'alarm': return <AlarmProcessingList />;
      }
    }

    // 修葺管理
    if (activeModuleId === 'restoration') {
      if (viewMode === 'form') {
        if (activeMenuId === 'scheme') return <SchemeForm onBack={() => setViewMode('list')} initialData={formData} isVersionMode={!!formData} />;
        if (activeMenuId === 'record') return <RecordForm onBack={() => setViewMode('list')} initialData={formData} isAddRecordMode={!!formData} />;
      }
      switch (activeMenuId) {
        case 'stats': return <RestorationStats />;
        case 'scheme': return <SchemeList onAdd={() => { setFormData(null); setViewMode('form'); }} onAddVersion={(data) => { setFormData(data); setViewMode('form'); }} />;
        case 'approval': return <ApprovalList />;
        case 'record': return <RecordList onAdd={() => { setFormData(null); setViewMode('form'); }} onAddDetail={(data) => { setFormData(data); setViewMode('form'); }} />;
      }
    }

    // 系统管理
    if (activeModuleId === 'system') {
      if (viewMode === 'form') {
        switch (activeMenuId) {
          case 'user': return <UserForm onBack={() => setViewMode('list')} />;
          case 'role': return <RoleForm onBack={() => setViewMode('list')} />;
          case 'contact': return <ContactForm onBack={() => setViewMode('list')} />;
          case 'api': return <ApiForm onBack={() => setViewMode('list')} />;
        }
      }
      switch (activeMenuId) {
        case 'user': return <UserList onAdd={() => setViewMode('form')} />;
        case 'role': return <RoleList onAdd={() => setViewMode('form')} />;
        case 'contact': return <ContactList onAdd={() => setViewMode('form')} />;
        case 'api': return <ApiList onAdd={() => setViewMode('form')} />;
        case 'login-log': return <LoginLogList />;
        case 'op-log': return <OpLogList />;
      }
    }

    return <div className="p-8 text-slate-400">功能开发中...</div>;
  };

  const isCockpit = activeModuleId === 'cockpit';

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <Header activeModuleId={activeModuleId} onModuleChange={handleModuleChange} />

      <div className="flex flex-1 overflow-hidden">
        {/* 驾驶舱模式下隐藏侧边栏 */}
        {!isCockpit && (
          <Sidebar
            menus={activeModule.menus}
            activeMenuId={activeMenuId}
            onMenuChange={handleMenuChange}
          />
        )}

        <main className="flex-1 overflow-y-auto flex flex-col">
          {/* 驾驶舱模式下隐藏面包屑和标题 */}
          {!isCockpit && (
            <div className="p-8 pb-4">
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); handleModuleChange('cockpit'); }}>首页</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeModule.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-blue-600 font-bold">{activeMenuLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h2 className="text-2xl font-bold text-slate-800">{activeMenuLabel}</h2>
            </div>
          )}

          <div className={isCockpit ? "flex-1 flex flex-col" : "flex-1 px-8"}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;