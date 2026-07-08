/**
 * @name 添加服务品类
 */
import { useState } from 'react';
import { theme, Typography, Card, Input, Button, Table, Select, Upload, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const categoryData = [
  { idx: 1, catCode: 'S1001000', catName: '租赁服务', dirType: '专业', dirLevel: '一级', expanded: false },
  { idx: 2, catCode: 'S1002000', catName: '运输服务', dirType: '通用', dirLevel: '二级', expanded: false },
];

export default function AddCategoryFormPage() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [data, setData] = useState(categoryData);

  const toggleExpand = (idx: number) => {
    setData(prev => prev.map(d => d.idx === idx ? { ...d, expanded: !d.expanded } : d));
  };

  const categoryColumns = [
    { key: 'idx', title: '序号', width: 50, align: 'center' as const, dataIndex: 'idx' },
    { key: 'catCode', title: '服务品类码', width: 120, dataIndex: 'catCode', ellipsis: true },
    { key: 'catName', title: '服务品类名称', width: 150, dataIndex: 'catName', ellipsis: true },
    { key: 'dirType', title: '品类类型', width: 100, dataIndex: 'dirType', ellipsis: true },
    { key: 'dirLevel', title: '品类等级', width: 100, dataIndex: 'dirLevel', ellipsis: true },
    {
      key: 'action', width: 100, align: 'center' as const,
      title: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <span>操作</span>
          <Typography.Link style={{ fontSize: 12, color: '#1677ff' }} onClick={() => setData(prev => prev.map(d => ({ ...d, expanded: true })))}>全部合并</Typography.Link>
        </div>
      ),
      render: (_: unknown, record: any) => (
        <Typography.Link
          style={{ fontSize: 13, color: '#1677ff' }}
          onClick={() => toggleExpand(record.idx)}
        >
          {record.expanded ? '合并' : '展开'}
        </Typography.Link>
      ),
    },
  ];

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>添加服务品类</Typography.Title>
      <Typography.Title level={5} style={{ margin: '0 0 12px' }}>已选择添加服务品类</Typography.Title>
      <Table
        columns={categoryColumns}
        dataSource={data.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
        style={{ marginBottom: 24 }}
      />
      <Form form={form} layout="vertical">
        <Card size="small" title={<span>资质信用 <Typography.Text type="danger">必填</Typography.Text></span>} style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Form.Item label="资质等级" name="qualLevel" rules={[{ required: true }]}>
              <Select placeholder="请选择资质等级" />
            </Form.Item>
            <Form.Item label="资质证书编号" name="qualNo" rules={[{ required: true }]}>
              <Input placeholder="请输入资质证书编号" />
            </Form.Item>
            <Form.Item label="信用评级" name="creditRating">
              <Select placeholder="请选择信用评级" />
            </Form.Item>
            <Form.Item label="资质证明文件">
              <Upload>
                <Button icon={<UploadOutlined />}>上传文件</Button>
              </Upload>
            </Form.Item>
          </div>
        </Card>
        <Card size="small" title={<span>服务能力 <Typography.Text type="danger">必填</Typography.Text></span>}>
          <Form.Item label="主要设备/装备情况" name="equipment" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="请描述拥有的主要设备、仪器等硬件条件" />
          </Form.Item>
          <Form.Item label="技术优势及特色" name="techAdvantage" rules={[{ required: true }]}>
            <Input.TextArea rows={3} placeholder="请描述核心技术能力、专利技术、工艺特色等" />
          </Form.Item>
        </Card>
      </Form>
    </PortalLayout>
  );
}
