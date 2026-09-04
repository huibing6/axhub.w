/**
 * @name 配码编辑详情
 * 服务商管理工作台2.0 - 配码编辑详情页
 * 复用注册备案共享组件，确保内容一致
 * 默认定位到 MDG信息 Tab
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Card, Space, Button, Form, Row, message, Tag } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, SaveOutlined } from '@ant-design/icons';
import { BasicInfoCards, ServiceCategoryCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../admin-workspace/common/admission-shared';
import { QUALIFICATION_DOCS } from '../../admin-workspace/common/admission-types';

const STEPS = ['基本信息', '服务品类', '资质信息', '要件信息', 'MDG信息'];

interface StepValidation {
  status: 'finish' | 'process' | 'error' | 'wait';
  errors?: string[];
}

export default function InfoEditDetail() {
  const [activeTab, setActiveTab] = useState('MDG信息');
  const [stepValidation, setStepValidation] = useState<StepValidation[]>(STEPS.map(() => ({ status: 'wait' })));
  const [qualDocs, setQualDocs] = useState(QUALIFICATION_DOCS);
  const [requiredDocs, setRequiredDocs] = useState([{ key: '1', name: '', upload: '' }]);

  const handleNext = () => {
    const idx = STEPS.indexOf(activeTab);
    if (idx < STEPS.length - 1) {
      setStepValidation(prev => {
        const next = [...prev];
        next[idx] = { status: 'finish' };
        if (idx + 1 < STEPS.length) next[idx + 1] = { status: 'process' };
        return next;
      });
      setActiveTab(STEPS[idx + 1]);
    }
  };

  const handlePrev = () => {
    const idx = STEPS.indexOf(activeTab);
    if (idx > 0) setActiveTab(STEPS[idx - 1]);
  };

  const handleSaveDraft = () => {
    message.success('草稿已暂存');
  };

  const handleSubmit = () => {
    message.success('信息已提交审核');
  };

  const stepItems = STEPS.map((title, i) => {
    const validation = stepValidation[i];
    let icon: React.ReactNode;
    if (validation.status === 'finish') {
      icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
    } else if (validation.status === 'error') {
      icon = <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
    }
    return { title, icon, key: STEPS[i] };
  });

  const renderStepActions = () => {
    const idx = STEPS.indexOf(activeTab);
    return (
      <Row justify="end" style={{ marginTop: 16 }}>
        <Space size={12}>
          {idx > 0 && <Button onClick={handlePrev}>上一步</Button>}
          {idx < STEPS.length - 1 && <Button type="primary" onClick={handleNext}>下一步</Button>}
          {idx === STEPS.length - 1 && (
            <Button type="primary" danger onClick={handleSubmit}>提交</Button>
          )}
          <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>暂存</Button>
          <Button onClick={() => window.history.back()}>取消</Button>
        </Space>
      </Row>
    );
  };

  const tabContent: Record<string, React.ReactNode> = {
    '基本信息': <BasicInfoCards mode="editable" />,
    '服务品类': <ServiceCategoryCards mode="editable" />,
    '资质信息': <QualificationTable mode="editable" data={qualDocs} onDataChange={setQualDocs} />,
    '要件信息': <RequiredDocsTable mode="editable" data={requiredDocs} onDataChange={setRequiredDocs} />,
    'MDG信息': <MDGCards mode="editable" />,
  };

  return (
    <>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.history.back()} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>注册服务商审核</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>配码编辑</Typography.Text>
            </Space>
            <Typography.Title level={4} style={{ margin: '4px 0 0 0' }}>湖北江汉石油机械制造有限公司</Typography.Title>
            <Space size={16} style={{ marginTop: 4 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码 91420000706802345X</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>来源: 公开招标采购中标</Typography.Text>
            </Space>
          </Space>
          <Tag color="processing" style={{ fontSize: 13, padding: '4px 12px' }}>待提交</Tag>
        </div>
      </Card>

      <Card size="small" variant="outlined">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {stepItems.map((item) => (
                <div
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderBottom: activeTab === item.key ? '2px solid #ff4d4f' : '2px solid transparent',
                    color: activeTab === item.key ? '#ff4d4f' : '#666',
                    fontWeight: activeTab === item.key ? 600 : 400,
                    fontSize: 14,
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          <Form layout="vertical">
            {tabContent[activeTab]}
          </Form>
          {renderStepActions()}
        </Space>
      </Card>
    </>
  );
}
