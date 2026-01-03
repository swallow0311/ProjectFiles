"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";

const PublicityMaintenance = () => {
  const fieldGroups = [
    {
      title: '文字卷字段',
      fields: [
        { id: 'name', label: '公布名称' },
        { id: 'code', label: '代码' },
        { id: 'coords', label: '地理坐标' },
        { id: 'area', label: '面积' },
        { id: 'era', label: '公布时代' },
        { id: 'ownership', label: '所有权' },
      ]
    },
    {
      title: '行政管理文件字段',
      fields: [
        { id: 'title', label: '文件标题' },
        { id: 'type', label: '文件类型' },
        { id: 'doc_code', label: '文号' },
        { id: 'unit', label: '发文单位' },
      ]
    },
    {
      title: '图书管理字段',
      fields: [
        { id: 'book_name', label: '书名' },
        { id: 'publisher', label: '出版单位' },
        { id: 'version', label: '版本' },
      ]
    }
  ];

  const handleSave = () => {
    showSuccess("公开性设置已保存");
  };

  return (
    <div className="space-y-6 pb-24">
      {fieldGroups.map((group, gIdx) => (
        <Card key={gIdx}>
          <CardHeader className="bg-slate-50/50 border-b py-3">
            <CardTitle className="text-sm font-bold text-slate-700">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-1/3 pl-6">字段名称</TableHead>
                  <TableHead>公开性设置</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.fields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell className="font-medium pl-6">{field.label}</TableCell>
                    <TableCell>
                      <RadioGroup defaultValue="internal" className="flex items-center gap-8">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="internal" id={`${field.id}-internal`} />
                          <Label htmlFor={`${field.id}-internal`} className="font-normal cursor-pointer">内部公开</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="request" id={`${field.id}-request`} />
                          <Label htmlFor={`${field.id}-request`} className="font-normal cursor-pointer">依申请公开</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="active" id={`${field.id}-active`} />
                          <Label htmlFor={`${field.id}-active`} className="font-normal cursor-pointer">主动公开</Label>
                        </div>
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t p-4 flex justify-end gap-4 z-10 shadow-lg">
        <Button variant="outline">重置</Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>保存设置</Button>
      </div>
    </div>
  );
};

export default PublicityMaintenance;