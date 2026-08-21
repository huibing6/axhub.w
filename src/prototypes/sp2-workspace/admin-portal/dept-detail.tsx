/**
 * @name 专业部门审核详情
 * 服务商管理工作台2.0 - 专业部门审核详情
 * 回显服务商提交的注册信息，审核侧重服务品类（品类资质信用/服务能力/按目录配置的资质附件）。
 */
import React from 'react';
import { useMemo, useState } from 'react';
import { theme, Typography, Card, Space, Button, Table, Tabs, Tag, Form, Input, Radio, Descriptions, message } from 'antd';
import { deptTaskData, statusColor, type DeptTask } from '../common/dept-data';

const SectionTitle = ({ title, tag }: { title: string; tag?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
    <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
    <Typography.Text strong style={{ fontSize: 14 }}>{title}</Typography.Text>
    {tag && <Tag color="red" style={{ fontSize: 11, lineHeight: '18px', margin: 0 }}>{tag}</Tag>}
  </div>
);

const FieldView = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>{label}</Typography.Text>
    <div style={{ marginTop: 2 }}>{children}</div>
  </div>
);

const stepStatusColor: Record<string, string> = {
  '已提交': 'default',
  '已通过': 'success',
  '已驳回': 'error',
  '待审核': 'warning',
};

export default function DeptDetail() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('category');
  const [status, setStatus] = useState<DeptTask['status']>(() => {
    const no = parseNo();
    const rec = deptTaskData.find(d => d.no === no);
    return rec ? rec.status : '待审核';
  });
  const [result, setResult] = useState<'pass' | 'reject' | undefined>(undefined);
  const [opinion, setOpinion] = useState('');

  function parseNo(): string {
    if (typeof window === 'undefined') return '';
    const hash = window.location.hash.slice(1);
    const query = hash.split('?')[1] || '';
    const params = new URLSearchParams(query);
    return params.get('no') || '';
  }

  const record = useMemo(() => deptTaskData.find(d => d.no === parseNo()) || deptTaskData[0], []);

  const steps = useMemo(() => {
    if (status === record.status) return record.steps;
    return record.steps.map((s, i) => i === record.steps.length - 1
      ? { ...s, status, approved: status === '已通过' ? '通过' : '驳回', opinion: opinion || (status === '已通过' ? '审核通过' : '已驳回') }
      : s);
  }, [status, opinion, record]);

  const handleSubmit = () => {
    if (!result) { message.warning('请选择审批结果'); return; }
    if (!opinion.trim()) { message.warning('请输入审核意见'); return; }
    setStatus(result === 'pass' ? '已通过' : '已驳回');
    message.success(result === 'pass' ? '审核通过' : '已驳回');
  };

  const stepColumns = [
    { key: 'step', title: '步骤', width: 80, dataIndex: 'step' },
    { key: 'unit', title: '受理单位', width: 140, dataIndex: 'unit', render: (v: string) => <Typography.Link style={{ color: '#ff4d4f' }}>{v}</Typography.Link> },
    { key: 'status', title: '状态', width: 90, dataIndex: 'status', render: (v: string) => <Tag color={stepStatusColor[v] || 'default'}>{v}</Tag> },
    { key: 'handler', title: '受理人', width: 90, dataIndex: 'handler' },
    { key: 'submitTime', title: '受理时间', width: 160, dataIndex: 'submitTime' },
    { key: 'finishTime', title: '完成时间', width: 160, dataIndex: 'finishTime' },
    { key: 'approved', title: '审批是否通过', width: 110, align: 'center' as const, dataIndex: 'approved' },
    { key: 'opinion', title: '处理意见', width: 220, dataIndex: 'opinion', ellipsis: true },
  ];

  const tabItems = [
    {
      key: 'category',
      label: '服务品类',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={24}>
          {/* 服务品类（审核侧重） */}
          <div>
            <SectionTitle title="服务品类" tag="审核重点" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FieldView label="品类名称"><Typography.Text style={{ fontSize: 14 }}>{record.category}</Typography.Text></FieldView>
              <FieldView label="品类编码"><Typography.Text style={{ fontSize: 14 }}>{record.categoryCode}</Typography.Text></FieldView>
              <FieldView label="所属专业目录"><Typography.Text style={{ fontSize: 14 }}>{record.detail.dirName}</Typography.Text></FieldView>
              <FieldView label="目录等级"><Typography.Text style={{ fontSize: 14 }}>{record.detail.dirLevel}</Typography.Text></FieldView>
            </div>
            <div style={{ marginTop: 12 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>审核部门</Typography.Text>
              <Tag color="blue" style={{ marginTop: 4 }}>{record.deptName}</Tag>
            </div>
          </div>

          {/* 资质信用 */}
          <div>
            <SectionTitle title="资质信用" tag="必填" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <FieldView label="资质等级"><Typography.Text style={{ fontSize: 14 }}>{record.detail.qualLevel}</Typography.Text></FieldView>
              <FieldView label="资质证书编号"><Typography.Text style={{ fontSize: 14 }}>{record.detail.certNo}</Typography.Text></FieldView>
              <FieldView label="信用评级"><Typography.Text style={{ fontSize: 14 }}>{record.detail.creditRating}</Typography.Text></FieldView>
              <FieldView label="有效时间"><Typography.Text style={{ fontSize: 14 }}>{record.detail.validTime}</Typography.Text></FieldView>
            </div>
            <div style={{ marginTop: 12 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block' }}>服务范围</Typography.Text>
              <Typography.Text style={{ fontSize: 14 }}>{record.detail.scope}</Typography.Text>
            </div>
          </div>

          {/* 服务能力 */}
          <div>
            <SectionTitle title="服务能力" tag="必填" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <FieldView label="主要设备/装备情况"><Typography.Text style={{ fontSize: 14 }}>{record.detail.equipment}</Typography.Text></FieldView>
              <FieldView label="技术优势及特色"><Typography.Text style={{ fontSize: 14 }}>{record.detail.techAdvantage}</Typography.Text></FieldView>
            </div>
          </div>

          {/* 资质附件（按专业目录配置回显） */}
          <div>
            <SectionTitle title="资质附件" tag="按专业目录配置" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {record.detail.attachments.length === 0 && (
                <Typography.Text type="secondary" style={{ fontSize: 13 }}>该品类无资质附件配置要求。</Typography.Text>
              )}
              {record.detail.attachments.map((att, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fafafa', borderRadius: 4 }}>
                  <Space size={8}>
                    {att.required && <Typography.Text style={{ color: '#ff4d4f' }}>*</Typography.Text>}
                    <Typography.Text style={{ fontSize: 13 }}>{att.name}</Typography.Text>
                    {att.desc && <Typography.Text type="secondary" style={{ fontSize: 12 }}>{att.desc}</Typography.Text>}
                  </Space>
                  <Space size={8}>
                    {att.fileName ? (
                      <>
                        <Typography.Text style={{ fontSize: 13 }}>{att.fileName}</Typography.Text>
                        <Typography.Link style={{ fontSize: 13, color: '#ff4d4f' }}>预览</Typography.Link>
                      </>
                    ) : (
                      <Tag color="error" style={{ fontSize: 12 }}>未上传</Tag>
                    )}
                  </Space>
                </div>
              ))}
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'basic',
      label: '服务商信息',
      children: (
        <div>
          <SectionTitle title="服务商信息（注册提交内容回显）" />
          <Descriptions column={3} size="small" bordered>
            <Descriptions.Item label="服务商名称">{record.name}</Descriptions.Item>
            <Descriptions.Item label="统一社会信用代码">{record.creditCode}</Descriptions.Item>
            <Descriptions.Item label="服务商管理类型">{record.mgmtType}</Descriptions.Item>
            <Descriptions.Item label="联系人">{record.contact}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{record.phone}</Descriptions.Item>
            <Descriptions.Item label="提交时间">{record.time}</Descriptions.Item>
            <Descriptions.Item label="提交人">{record.submitter}</Descriptions.Item>
            <Descriptions.Item label="申请编号">{record.no}</Descriptions.Item>
            <Descriptions.Item label="审核部门">{record.deptName}</Descriptions.Item>
          </Descriptions>
        </div>
      ),
    },
    {
      key: 'approval',
      label: '审批记录',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={24}>
          <div>
            <SectionTitle title="审批流程" />
            <Table
              columns={stepColumns}
              dataSource={steps}
              rowKey={(r, i) => `${r.step}-${r.unit}-${i}`}
              pagination={false}
              bordered
              size="middle"
            />
          </div>

          {status === '待审核' && (
            <div>
              <SectionTitle title="审批意见" />
              <Form layout="vertical">
                <Form.Item label="审批结果" required>
                  <Radio.Group value={result} onChange={e => setResult(e.target.value)}>
                    <Radio value="pass">通过</Radio>
                    <Radio value="reject">驳回</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="审批意见" required>
                  <Input.TextArea rows={4} value={opinion} onChange={e => setOpinion(e.target.value)} placeholder="请输入审核意见" />
                </Form.Item>
              </Form>
              <div style={{ textAlign: 'right' }}>
                <Space size={12}>
                  <Button onClick={() => setActiveTab('category')}>取消</Button>
                  <Button type="primary" danger onClick={handleSubmit}>确定</Button>
                </Space>
              </div>
            </div>
          )}

          {status !== '待审核' && (
            <div style={{
              padding: '12px 16px', borderRadius: 6,
              background: status === '已通过' ? '#f6ffed' : '#fff2f0',
              border: `1px solid ${status === '已通过' ? '#b7eb8f' : '#ffa39e'}`,
            }}>
              <Typography.Text style={{ color: status === '已通过' ? '#52c41a' : '#ff4d4f' }}>
                {status === '已通过' ? '该专业品类审核已通过' : '该专业品类已被驳回'}
              </Typography.Text>
            </div>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* 页面头部 */}
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.history.back()} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>专业部门审核</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>审核详情</Typography.Text>
            </Space>
            <Typography.Title level={4} style={{ margin: '4px 0 0 0' }}>{record.name}</Typography.Title>
            <Space size={16} style={{ marginTop: 4 }} wrap>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>申请编号 {record.no}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码 {record.creditCode}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>专业品类：{record.category}（{record.categoryCode}）</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>提交时间: {record.time}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>审核部门: {record.deptName}</Typography.Text>
            </Space>
          </Space>
          <Tag color={statusColor[status] || 'default'} style={{ fontSize: 13, padding: '4px 12px' }}>{status}</Tag>
        </div>
      </Card>

      {/* Tabs */}
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </>
  );
}
