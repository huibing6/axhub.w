/**
 * @name 审批意见详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Tabs, Tag, Timeline, Input, Radio, Table, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { BasicInfoCards, ServiceCategoryCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../common/admission-shared';
import { QUALIFICATION_DOCS } from '../../common/admission-types';

export default function ReviewDetailPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');
  const [opinion, setOpinion] = useState('同意');
  const [approvalResult, setApprovalResult] = useState<string>('pass');
  const [attachments, setAttachments] = useState([
    { key: '1', name: '', upload: '', remark: '' },
  ]);

  const handleBack = () => {
    window.location.hash = '#/admin/info-review';
  };

  const handleAddAttachment = () => {
    const newKey = String(attachments.length + 1);
    setAttachments([...attachments, { key: newKey, name: '', upload: '', remark: '' }]);
  };

  const attachmentColumns = [
    {
      title: '序号',
      dataIndex: 'key',
      width: 60,
      render: (_: string, __: unknown, index: number) => index + 1,
    },
    {
      title: '文件上传',
      dataIndex: 'upload',
      render: () => (
        <Button icon={<UploadOutlined />} type="primary" danger size="small">
          上传
        </Button>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      render: () => <Input placeholder="请输入" style={{ width: 200 }} />,
    },
  ];

  const renderOpinionTab = () => (
    <Space direction="vertical" style={{ width: '100%' }} size={24}>
      <Card title="附件上传" variant="outlined" size="small">
        <Table
          columns={attachmentColumns}
          dataSource={attachments}
          pagination={false}
          size="small"
          bordered
        />
        <Button
          type="link"
          onClick={handleAddAttachment}
          style={{ padding: 0, marginTop: 8 }}
        >
          + 添加
        </Button>
      </Card>

      <Card title="审批流程" variant="outlined" size="small">
        <Timeline
          items={[
            {
              color: 'blue',
              children: (
                <>
                  2026-01-13 15:01:53 张明远{' '}
                  <Tag color="green">✓ 提交</Tag>
                </>
              ),
            },
            {
              color: 'orange',
              children: (
                <>
                  【王建国/审核主管】{' '}
                  <Tag color="orange">◎ 待审批</Tag>
                </>
              ),
            },
          ]}
        />
      </Card>

      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div>
            <Typography.Text strong style={{ marginRight: 8 }}>
              <span style={{ color: '#ff4d4f' }}>*</span> 审批意见:
            </Typography.Text>
            <Input.TextArea
              rows={4}
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
            />
          </div>
          <div>
            <Typography.Text strong style={{ marginRight: 8 }}>
              <span style={{ color: '#ff4d4f' }}>*</span> 审批结果:
            </Typography.Text>
            <Radio.Group
              value={approvalResult}
              onChange={(e) => setApprovalResult(e.target.value)}
            >
              <Radio value="pass">通过</Radio>
              <Radio value="return">退回</Radio>
            </Radio.Group>
          </div>
        </Space>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button
          type="primary"
          danger
          onClick={() => {
            message.success('审批已提交');
          }}
        >
          确定
        </Button>
        <Button onClick={handleBack}>取消</Button>
      </div>
    </Space>
  );

  const tabItems = [
    { key: 'basic', label: '基本信息', children: <BasicInfoCards mode="readonly" /> },
    { key: 'category', label: '服务品类', children: <ServiceCategoryCards mode="readonly" /> },
    { key: 'qualification', label: '资质信息', children: <QualificationTable mode="readonly" data={QUALIFICATION_DOCS} /> },
    { key: 'required', label: '要件信息', children: <RequiredDocsTable mode="readonly" data={[{ key: '1', name: '', upload: '' }]} /> },
    { key: 'mdg', label: 'MDG信息', children: <MDGCards mode="readonly" /> },
    { key: 'opinion', label: <span style={{ color: '#ff4d4f' }}>审批意见</span>, children: renderOpinionTab() },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/info-review" portalType="admin">
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          {/* Company info header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <Typography.Title level={4} style={{ margin: '0 0 8px' }}>
                中国石油集团东方地球物理勘探有限责任公司
              </Typography.Title>
              <Space wrap size={[16, 4]}>
                <Typography.Text type="secondary">统一社会信用代码: 91130000100012345X</Typography.Text>
                <Typography.Text type="secondary">提交时间: 2025-12-20 14:32:18</Typography.Text>
                <Typography.Text type="secondary">联系人: 李明</Typography.Text>
                <Typography.Text type="secondary">联系电话: 139****5678</Typography.Text>
              </Space>
            </div>
            <Tag color="error" style={{ fontSize: 14, padding: '2px 12px' }}>待审核</Tag>
          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Space>
      </Card>
    </PortalLayout>
  );
}
