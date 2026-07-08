/**
 * @name 维护复核详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Tabs, Table, Timeline, Input, Radio, Upload, message } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { BasicInfoCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../common/admission-shared';
import { QUALIFICATION_DOCS, RequiredDocItem } from '../../common/admission-types';
import { Form } from 'antd';

const INITIAL_REQUIRED_DOCS: RequiredDocItem[] = [{ key: '1', name: '', upload: '' }];

export default function MaintReviewDetailPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('approval');
  const [form] = Form.useForm();
  const [qualDocs] = useState(QUALIFICATION_DOCS);
  const [requiredDocs] = useState<RequiredDocItem[]>(INITIAL_REQUIRED_DOCS);
  const [opinion, setOpinion] = useState('同意');
  const [result, setResult] = useState<'pass' | 'reject'>('pass');

  const handleBack = () => {
    window.location.hash = '#/admin/maint-review';
  };

  const handleSubmit = () => {
    message.success('复核完成');
    handleBack();
  };

  const tabItems = [
    { key: 'basic', label: '基本信息', children: <BasicInfoCards mode="readonly" form={form} /> },
    { key: 'qualification', label: '资质信息', children: <QualificationTable mode="readonly" data={qualDocs} onDataChange={() => {}} /> },
    { key: 'required', label: '要件信息', children: <RequiredDocsTable mode="readonly" data={requiredDocs} onDataChange={() => {}} /> },
    { key: 'mdg', label: 'MDG信息', children: <MDGCards mode="readonly" form={form} /> },
    { key: 'approval', label: '审批意见' },
  ];

  const attachmentColumns = [
    { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
    {
      key: 'upload', title: '文件上传', width: 200,
      render: () => <Upload><Button type="link" icon={<UploadOutlined />}>上传</Button></Upload>,
    },
    {
      key: 'remark', title: '备注', width: 300,
      render: () => <Input placeholder="请输入" />,
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-review" portalType="admin">
      <Space style={{ marginBottom: 16 }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} style={{ paddingLeft: 0 }}>返回列表</Button>
        <Typography.Text type="secondary">{'>'}</Typography.Text>
        <Typography.Text>注册审核管理</Typography.Text>
        <Typography.Text type="secondary">{'>'}</Typography.Text>
        <Typography.Text>审核详情</Typography.Text>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>中国石油集团东方地球物理勘探有限责任公司</Typography.Title>
          <Space style={{ marginTop: 8 }} size={24}>
            <Typography.Text type="secondary">统一社会信用代码：91130000100012345X</Typography.Text>
            <Typography.Text type="secondary">提交时间：2025-12-20 14:32:18</Typography.Text>
            <Typography.Text type="secondary">联系人：李明</Typography.Text>
            <Typography.Text type="secondary">联系电话：139****5678</Typography.Text>
          </Space>
        </div>
        <Typography.Text style={{ color: '#ff4d4f', border: '1px solid #ff4d4f', padding: '2px 12px', borderRadius: 4 }}>待审核</Typography.Text>
      </div>
      <Card variant="outlined" size="small">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        {activeTab === 'approval' && (
          <>
            <Card size="small" title="附件上传" style={{ marginBottom: 16 }}>
              <Table
                columns={attachmentColumns}
                dataSource={[{ idx: 1 }]}
                rowKey="idx"
                pagination={false}
                bordered
                size="middle"
              />
              <Button type="link" style={{ marginTop: 8 }}>+ 添加</Button>
            </Card>
            <Card size="small" title="审批流程" style={{ marginBottom: 16 }}>
              <Timeline
                items={[
                  { color: 'blue', children: <span>2026-01-13 15:01:53 张明远 <Typography.Text type="success">提交</Typography.Text></span> },
                  { color: 'orange', children: <span>【王建国/审核主管】<Typography.Text type="warning">待审批</Typography.Text></span> },
                ]}
              />
            </Card>
            <Card size="small">
              <div style={{ marginBottom: 16 }}>
                <Typography.Text style={{ marginRight: 8 }}><span style={{ color: '#ff4d4f' }}>*</span> 审批意见:</Typography.Text>
                <Input.TextArea rows={3} value={opinion} onChange={e => setOpinion(e.target.value)} style={{ marginTop: 8 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Typography.Text style={{ marginRight: 8 }}><span style={{ color: '#ff4d4f' }}>*</span> 审批结果:</Typography.Text>
                <Radio.Group value={result} onChange={e => setResult(e.target.value)}>
                  <Radio value="pass">通过</Radio>
                  <Radio value="reject">退回</Radio>
                </Radio.Group>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
                <Button type="primary" danger onClick={handleSubmit}>确定</Button>
                <Button onClick={handleBack}>取消</Button>
              </div>
            </Card>
          </>
        )}
      </Card>
    </PortalLayout>
  );
}
