/**
 * @name 注册服务商变更查看
 */
import { theme, Typography, Card, Space, Input, Button, Table } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const columns = [
  { key: 'idx', title: '序号', width: 60, align: 'center' as const, dataIndex: 'idx' },
  { key: 'catCode', title: '服务分类码', width: 120, dataIndex: 'catCode', ellipsis: true },
  { key: 'catName', title: '服务分类名称', width: 140, dataIndex: 'catName', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 260, dataIndex: 'spName', ellipsis: true },
  { key: 'extra', title: '服务商', width: 100, dataIndex: 'extra', ellipsis: true },
];

const data = [
  { idx: 1, catCode: 'S1000010', catName: '租赁服务', spCode: '100000010', spName: '中海油能源发展股份有限公司', extra: '所属...' },
  { idx: 2, catCode: 'S1000011', catName: '租赁服务', spCode: '100000010', spName: '杰瑞石油装备技术有限公司', extra: '总部...' },
  { idx: 3, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司', extra: '' },
  { idx: 4, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司', extra: '总部...' },
  { idx: 5, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '中海油能源发展股份有限公司', extra: '' },
  { idx: 6, catCode: 'S1000010', catName: '租赁服务', spCode: '', spName: '杰瑞石油装备技术有限公司', extra: '' },
];

export default function ChangeViewPage() {
  return (
    <PortalLayout groups={adminGroups} activePath="/admin/reg-change-view" portalType="admin">
      <Typography.Link onClick={() => window.location.hash = '#/admin/reg-change-review'} style={{ marginBottom: 8, display: 'block' }}>← 返回</Typography.Link>
      <Typography.Title level={4}>投标服务目录查看</Typography.Title>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
              <Input placeholder="请输入服务商名称" style={{ width: 200 }} />
            </Space>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商管理类型</Typography.Text>
              <Input placeholder="请输入服务商管理类型" style={{ width: 200 }} />
            </Space>
            <Space size={8}>
              <Typography.Text style={{ whiteSpace: 'nowrap' }}>提交人</Typography.Text>
              <Input placeholder="请输入提交人" style={{ width: 200 }} />
            </Space>
          </div>
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
