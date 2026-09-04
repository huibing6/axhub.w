/**
 * @name 注册备案
 */
import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Typography, Card, Space, Button, Steps, Form, Row, message, Modal, Descriptions, Tag } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { BasicInfoCards, ServiceCategoryCards, QualificationTable, RequiredDocsTable, MDGCards } from '../../admin-workspace/common/admission-shared';
import { QUALIFICATION_DOCS } from '../../admin-workspace/common/admission-types';

const STEPS = ['基本信息', '服务品类', '资质信息', '要件信息', 'MDG信息'];
const DRAFT_KEY = 'sp2-admission-entry-draft';

interface StepValidation {
  status: 'finish' | 'process' | 'error' | 'wait';
  errors?: string[];
}

export default function InfoEntry() {
  const [currentStep, setCurrentStep] = useState(0);
  const [qualDocs, setQualDocs] = useState(QUALIFICATION_DOCS);
  const [requiredDocs, setRequiredDocs] = useState([{ key: '1', name: '', upload: '' }]);
  const [stepValidation, setStepValidation] = useState<StepValidation[]>(STEPS.map(() => ({ status: 'wait' })));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        Modal.confirm({
          title: '发现未提交的草稿',
          content: '是否恢复上次保存的草稿继续填写？',
          okText: '恢复草稿',
          cancelText: '新建申请',
          onOk: () => {
            setCurrentStep(parsed.currentStep || 0);
            setQualDocs(parsed.qualDocs || QUALIFICATION_DOCS);
            setRequiredDocs(parsed.requiredDocs || [{ key: '1', name: '', upload: '' }]);
            message.success('草稿已恢复');
          },
          onCancel: () => {
            localStorage.removeItem(DRAFT_KEY);
          },
        });
        setHasDraft(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const errors: string[] = [];
    if (step === 0) {
      errors.push('请填写服务商名称');
    }
    if (step === 2 && qualDocs.length === 0) {
      errors.push('请添加资质信息');
    }
    if (step === 3 && requiredDocs.every(d => !d.name)) {
      errors.push('请添加要件信息');
    }

    setStepValidation(prev => {
      const next = [...prev];
      next[step] = { status: errors.length > 0 ? 'error' : 'finish', errors };
      if (step + 1 < STEPS.length) {
        next[step + 1] = { ...next[step + 1], status: 'process' };
      }
      return next;
    });

    return errors.length === 0;
  }, [qualDocs, requiredDocs]);

  const handleSaveDraft = () => {
    const draft = { currentStep, qualDocs, requiredDocs, saveTime: new Date().toISOString() };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setHasDraft(true);
    message.success('草稿已暂存');
  };

  const handleNext = () => {
    validateStep(currentStep);
    setCurrentStep(s => Math.min(s + 1, 4));
  };

  const handlePrev = () => setCurrentStep(s => Math.max(s - 1, 0));

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleSubmit = () => {
    setPreviewOpen(false);
    localStorage.removeItem(DRAFT_KEY);
    message.success('正式申请已提交审核');
  };

  const stepItems = STEPS.map((title, i) => {
    const validation = stepValidation[i];
    let icon: React.ReactNode;
    if (validation.status === 'finish') {
      icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
    } else if (validation.status === 'error') {
      icon = <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
    }
    return { title, icon };
  });

  const renderStepActions = (prev = true, next = true, finalLabel?: string) => (
    <Row justify="end" style={{ marginTop: 16 }}>
      <Space size={12}>
        {prev && currentStep > 0 && <Button onClick={handlePrev}>上一步</Button>}
        {next && currentStep < 4 && <Button type="primary" onClick={handleNext}>下一步</Button>}
        {currentStep === 4 && (
          <>
            <Button icon={<EyeOutlined />} onClick={handlePreview}>预览确认</Button>
            <Button type="primary" danger onClick={handlePreview}>{finalLabel || '提交'}</Button>
          </>
        )}
        <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>暂存</Button>
        <Button onClick={() => { message.info('已取消'); }}>取消</Button>
      </Space>
    </Row>
  );

  return (
    <div>
      <Card variant="outlined" size="small">
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Typography.Title level={4} style={{ margin: 0 }}>正式申请</Typography.Title>
              <Typography.Text type="secondary">基于中标结果的申请，请完善相关信息并提交审核</Typography.Text>
            </div>
            {hasDraft && (
              <Tag color="warning" style={{ fontSize: 12 }}>有未提交的草稿</Tag>
            )}
          </div>
          <Steps current={currentStep} items={stepItems} status={stepValidation[currentStep]?.status === 'error' ? 'error' : 'process'} />
          <Form layout="vertical">
            {currentStep === 0 && <BasicInfoCards mode="editable" />}
            {currentStep === 1 && <ServiceCategoryCards mode="editable" />}
            {currentStep === 2 && <QualificationTable mode="editable" data={qualDocs} onDataChange={setQualDocs} />}
            {currentStep === 3 && <RequiredDocsTable mode="editable" data={requiredDocs} onDataChange={setRequiredDocs} />}
            {currentStep === 4 && <MDGCards mode="editable" />}
          </Form>
          {renderStepActions()}
        </Space>
      </Card>

      <Modal
        title="预览确认 - 正式申请"
        open={previewOpen}
        onOk={handleSubmit}
        onCancel={() => setPreviewOpen(false)}
        okText="确认提交"
        cancelText="返回修改"
        okButtonProps={{ danger: true }}
        width={640}
      >
        <Descriptions column={2} bordered size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="申请类型">正式</Descriptions.Item>
          <Descriptions.Item label="申请步骤">5 步（已完成）</Descriptions.Item>
          <Descriptions.Item label="资质信息">{qualDocs.length} 条记录</Descriptions.Item>
          <Descriptions.Item label="要件信息">{requiredDocs.filter(d => d.name).length} 条记录</Descriptions.Item>
          <Descriptions.Item label="MDG信息" span={2}>待同步</Descriptions.Item>
        </Descriptions>
        <Typography.Text type="secondary" style={{ display: 'block', marginTop: 12, fontSize: 12 }}>
          提交后将进入审核流程，审核人将对您填写的信息进行审核。提交后不可撤回，请确认信息无误。
        </Typography.Text>
      </Modal>
    </div>
  );
}
