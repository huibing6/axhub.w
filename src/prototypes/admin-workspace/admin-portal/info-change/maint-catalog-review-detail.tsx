/**
 * @name 服务目录复核详情
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Tabs, Table, Timeline, Input, Radio, Upload, message, Form } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';
import { Select } from 'antd';

const categoryData = [
  { idx: 1, catCode: 'S1000200', catName: '租赁服务', dirType: '专业', dirLevel: '一级', flowStatus: '待复核', changeType: '新增', spCode: '1000020022', spName: '中海油能源发展股份有限公司', adminUnit: '长庆油田' },
  { idx: 2, catCode: 'S1000200', catName: '租赁服务', dirType: '通用', dirLevel: '二级', flowStatus: '待复核', changeType: '删除', spCode: '1000020022', spName: '杰瑞石油装备技术有限公司', adminUnit: '长庆油田' },
];

export default function MaintCatalogReviewDetailPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('approval');
  const [form] = Form.useForm();
  const [opinion, setOpinion] = useState('同意');
  const [result, setResult] = useState<'pass' | 'reject'>('pass');

  const handleBack = () => {
    window.location.hash = '#/admin/maint-review';
  };

  const handleSubmit = () => {
    message.success('复核完成');
    handleBack();
  };

  const categoryColumns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'catCode', title: '服务分类编码', width: 110, dataIndex: 'catCode', ellipsis: true },
    { key: 'catName', title: '服务分类名称', width: 110, dataIndex: 'catName', ellipsis: true },
    { key: 'dirType', title: '目录类型', width: 80, dataIndex: 'dirType', ellipsis: true },
    { key: 'dirLevel', title: '目录等级', width: 80, dataIndex: 'dirLevel', ellipsis: true },
    { key: 'flowStatus', title: '流程状态', width: 80, dataIndex: 'flowStatus', ellipsis: true },
    { key: 'changeType', title: '变更类型', width: 80, dataIndex: 'changeType', ellipsis: true },
    { key: 'spCode', title: '服务商编码', width: 110, dataIndex: 'spCode', ellipsis: true },
    { key: 'spName', title: '服务商名称', width: 140, dataIndex: 'spName', ellipsis: true },
    { key: 'adminUnit', title: '管理单位', width: 90, dataIndex: 'adminUnit', ellipsis: true },
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

  const tabItems = [
    {
      key: 'category', label: '服务品类',
      children: (
        <>
          <Table
            columns={categoryColumns}
            dataSource={categoryData.map((d, i) => ({ ...d, _key: i }))}
            rowKey="_key"
            pagination={false}
            bordered
            size="middle"
            scroll={{ x: 'max-content' }}
            style={{ marginBottom: 24 }}
          />
          <Card size="small" title={<span>资质信用 <Typography.Text type="danger">必填</Typography.Text></span>} style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>资质等级</Typography.Text>
                <Input placeholder="请选择资质等级" disabled />
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>资质证书编号</Typography.Text>
                <Input placeholder="请输入资质证书编号" disabled />
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>信用评级</Typography.Text>
                <Input placeholder="请选择信用评级" disabled />
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>资质证明文件</Typography.Text>
                <Input placeholder="无附件" disabled />
              </div>
            </div>
          </Card>
          <Card size="small" title={<span>服务能力 <Typography.Text type="danger">必填</Typography.Text></span>}>
            <div style={{ marginBottom: 16 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>主要设备/装备情况</Typography.Text>
              <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" disabled />
            </div>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>技术优势及特色</Typography.Text>
              <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" disabled />
            </div>
          </Card>
        </>
      ),
    },
    { key: 'approval', label: '审批意见' },
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
