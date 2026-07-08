/**
 * @name 服务商注册查看
 */
import { theme, Typography, Card, Space, Input, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const columns = [
  { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
  { key: 'name', title: '服务商名称', width: 300, dataIndex: 'name', ellipsis: true },
  { key: 'code', title: '统一社会信用代码', width: 220, dataIndex: 'code', ellipsis: true },
  { key: 'time', title: '提交时间', width: 180, dataIndex: 'time', ellipsis: true },
];

const data = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', time: '2025-12-19 09:15' },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', time: '2025-12-17 15:03' },
  { idx: 3, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', time: '2025-12-19 09:15' },
  { idx: 4, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', time: '2025-12-17 15:03' },
  { idx: 5, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', time: '2025-12-19 09:15' },
  { idx: 6, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', time: '2025-12-17 15:03' },
];

export default function ViewPage() {
  const { token: t } = theme.useToken();
  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-view" portalType="admin">
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={8}>
          <Typography.Link onClick={() => window.location.hash = '#/admin/reg-review'} style={{ marginBottom: 8, display: 'block' }}>← 返回</Typography.Link>
          <Typography.Text type="secondary">
            <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
          </Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>注册服务商审核</Typography.Title>
          <Card size="small" variant="outlined" style={{ marginBottom: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入服务商名称" style={{ width: 200 }} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>统一社会信用代码</Typography.Text>
                  <Input placeholder="请输入信用代码" style={{ width: 200 }} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>审批状态</Typography.Text>
                  <Input placeholder="请输入审批状态" style={{ width: 200 }} />
                </Space>
              </div>
            </Space>
          </Card>
        </Space>
      </Card>
      <Table
        columns={columns}
        dataSource={data.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={false}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
