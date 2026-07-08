/**
 * @name 信息编辑详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Tabs } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { BasicInfoCards, ServiceCategoryCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../common/admission-shared';
import { QUALIFICATION_DOCS } from '../../common/admission-types';

export default function EditDetailPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');

  const handleBack = () => {
    window.location.hash = '#/admin/info-edit';
  };

  const tabItems = [
    { key: 'basic', label: '基本信息', children: <BasicInfoCards mode="readonly" /> },
    { key: 'category', label: '服务品类', children: <ServiceCategoryCards mode="readonly" /> },
    { key: 'qualification', label: '资质信息', children: <QualificationTable mode="readonly" data={QUALIFICATION_DOCS} /> },
    { key: 'required', label: '要件信息', children: <RequiredDocsTable mode="readonly" data={[{ key: '1', name: '', upload: '' }]} /> },
    { key: 'mdg', label: 'MDG信息', children: <MDGCards mode="readonly" /> },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-edit" portalType="admin">
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Typography.Text style={{ color: '#ff4d4f', fontSize: 13 }}>注册服务商审核</Typography.Text>
              <Typography.Title level={4} style={{ margin: '4px 0 0' }}>服务商信息编辑详情</Typography.Title>
            </div>
            <Button type="link" onClick={handleBack} style={{ padding: 0 }}>← 返回列表</Button>
          </div>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleBack}>返回列表</Button>
          </div>
        </Space>
      </Card>
    </PortalLayout>
  );
}
