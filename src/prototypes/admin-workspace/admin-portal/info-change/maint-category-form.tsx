/**
 * @name 服务品类维护编辑（5步）
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Steps, Form, Row, Col, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { BasicInfoCards, ServiceCategoryCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../common/admission-shared';
import { QUALIFICATION_DOCS, RequiredDocItem } from '../../common/admission-types';

const STEPS = ['基本信息', '服务品类', '资质信息', '要件信息', 'MDG信息'];

const INITIAL_REQUIRED_DOCS: RequiredDocItem[] = [
  { key: '1', name: '', upload: '' },
];

export default function MaintCategoryFormPage() {
  const { token: t } = theme.useToken();
  const [currentStep, setCurrentStep] = useState(1);
  const [qualDocs, setQualDocs] = useState(QUALIFICATION_DOCS);
  const [requiredDocs, setRequiredDocs] = useState(INITIAL_REQUIRED_DOCS);

  const handleNext = () => setCurrentStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setCurrentStep(s => Math.max(s - 1, 0));
  const handleSave = () => message.success('已暂存');
  const handleCancel = () => {
    window.location.hash = '#/admin/maint-edit';
  };
  const handleSubmit = () => {
    message.success('服务品类维护已提交');
    window.location.hash = '#/admin/maint-edit';
  };

  const renderStepActions = () => (
    <Row justify="end" style={{ marginTop: 16 }}>
      <Space size={12}>
        {currentStep > 0 && <Button onClick={handlePrev}>上一步</Button>}
        {currentStep < 4 && <Button type="primary" onClick={handleNext}>下一步</Button>}
        {currentStep === 4 && <Button type="primary" danger onClick={handleSubmit}>提交</Button>}
        {currentStep !== 4 && <Button onClick={handleSave}>暂存</Button>}
        <Button onClick={handleCancel}>取消</Button>
      </Space>
    </Row>
  );

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Space style={{ marginBottom: 16 }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleCancel} style={{ paddingLeft: 0 }}>返回列表</Button>
        <Typography.Text type="secondary">{'>'}</Typography.Text>
        <Typography.Text>维护编辑</Typography.Text>
      </Space>
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>服务品类维护</Typography.Title>
            <Typography.Text type="secondary">基于中标结果的服务品类维护，请完善相关信息并提交审核</Typography.Text>
          </div>
          <Steps
            current={currentStep}
            items={STEPS.map(title => ({ title }))}
          />
          {currentStep === 0 && <BasicInfoCards mode="new" />}
          {currentStep === 1 && <ServiceCategoryCards mode="new" />}
          {currentStep === 2 && <QualificationTable mode="new" data={qualDocs} onDataChange={setQualDocs} />}
          {currentStep === 3 && <RequiredDocsTable mode="new" data={requiredDocs} onDataChange={setRequiredDocs} />}
          {currentStep === 4 && <MDGCards mode="new" />}
          {renderStepActions()}
        </Space>
      </Card>
    </PortalLayout>
  );
}
