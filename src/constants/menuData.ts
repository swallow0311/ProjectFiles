import { Module } from "../types/menu";

export const MENU_DATA: Module[] = [
  {
    id: "cockpit",
    label: "驾驶舱",
    menus: [{ id: "overview", label: "运行概览" }]
  },
  {
    id: "archives",
    label: "文物档案",
    menus: [
      {
        id: "main-volume",
        label: "主卷管理",
        children: [
          { id: "text", label: "文字卷" },
          { id: "drawing", label: "图纸卷" },
          { id: "photo", label: "照片卷" },
          { id: "rubbing", label: "拓片卷" },
          { id: "curtain", label: "幕本卷" },
          { id: "display", label: "文物展示卷" },
          { id: "planning", label: "保护规划及保护工程方案卷" },
          { id: "archaeology", label: "文物调查及考古发掘资料卷" },
          { id: "monitoring", label: "文物保护工程及防治监测卷" },
        ]
      },
      { 
        id: "sub-volume", 
        label: "副卷管理",
        children: [
          { id: "admin-doc", label: "行政管理文件" },
          { id: "legal-doc", label: "法律文书" },
          { id: "chronicle", label: "大事记" },
        ]
      },
      { 
        id: "voucher", 
        label: "备考卷管理",
        children: [
          { id: "reference", label: "参考资料" },
          { id: "literature", label: "论文与文献" },
          { id: "book", label: "图书管理" },
        ]
      },
      { 
        id: "category", 
        label: "文物分类",
        children: [
          { id: "basic-info", label: "基础信息维护" },
          { id: "publicity", label: "公开性维护" },
        ]
      },
    ]
  },
  {
    id: "restoration",
    label: "文物修缮",
    menus: [
      { id: "plan", label: "修葺方案" },
      { id: "approval", label: "方案审核" },
      { id: "record", label: "修葺记录" },
    ]
  },
  {
    id: "safety",
    label: "文物安全",
    menus: [
      { id: "equipment", label: "设备台账" },
      { id: "alarm-process", label: "告警处理" },
    ]
  },
  {
    id: "data-center",
    label: "数据中心",
    menus: [
      { id: "stats", label: "数据统计" },
      { id: "report", label: "报表导出" },
    ]
  },
  {
    id: "system",
    label: "系统管理",
    menus: [
      { id: "user", label: "用户管理" },
      { id: "role", label: "角色权限" },
      { id: "contacts", label: "文保通讯录" },
      { id: "api", label: "接口对接" },
      { id: "login-log", label: "登录日志" },
      { id: "op-log", label: "操作日志" },
    ]
  }
];