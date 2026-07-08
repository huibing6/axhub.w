/**
 * @name 资质维护
 */
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { theme, Card, Button, Input, Upload, Table, Typography, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function SpQualMaintain() {
  const { token: t } = theme.useToken();
  const qualItems = [
    { label: '营业执照', required: true },
    { label: '专业资质证书', required: true },
    { label: '无重大违法违规承诺', required: true },
    { label: '信用信息合规（4大平台无黑名单）', required: true },
    { label: '服务商准入承诺书', required: true },
  ];

  const columns = [
    {
      title: '文件类型',
      dataIndex: 'label',
      key: 'label',
      render: (_: string, record: { label: string; required: boolean }) => (
        <Typography.Text>
          {record.required && <Typography.Text style={{ color: t.colorPrimary }}>* </Typography.Text>}
          {record.label}
        </Typography.Text>
      ),
    },
    {
      title: '文件上传',
      dataIndex: 'upload',
      key: 'upload',
      width: 200,
      render: () => (
        <Upload customRequest={() => message.success('文件上传成功')}>
          <Button icon={<UploadOutlined />} size="small">上传文件</Button>
        </Upload>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
      render: () => <Input placeholder="备注" size="small" />,
    },
  ];

  return (
    <PortalLayout groups={spGroups} activePath="/sp/qual-maintain" portalType="sp">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 20 }}>资质维护</Typography.Title>

      <Card title="资质文件上传" variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Table
          columns={columns}
          dataSource={qualItems.map((item, i) => ({ ...item, key: i }))}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button type="primary" onClick={() => message.success('资质信息已保存')}>保存</Button>
      </div>
    </PortalLayout>
  );
}
