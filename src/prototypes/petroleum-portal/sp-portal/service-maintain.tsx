/**
 * @name 服务维护
 */
import { useState } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { useFilterData } from '../common/hooks';
import { theme, Table, Input, Button, Card, Row, Col, Typography, Space, message } from 'antd';

export default function SpServiceMaintain() {
  const { token: t } = theme.useToken();
  const columns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'code', title: '服务分类编码', dataIndex: 'code' },
    { key: 'name', title: '服务分类名称', dataIndex: 'name' },
    { key: 'level', title: '级别', dataIndex: 'level' },
    { key: 'type', title: '目录类型', dataIndex: 'type' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
  ];

  const data = [
    { key: 1, index: 1, code: 'S1001000', name: '租赁服务', level: '一级', type: '专业', unit: '长庆油田' },
    { key: 2, index: 2, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '长庆油田' },
    { key: 3, index: 3, code: 'S1001000', name: '租赁服务', level: '二级', type: '专业', unit: '' },
    { key: 4, index: 4, code: 'S1001000', name: '租赁服务', level: '二级', type: '通用', unit: '' },
    { key: 5, index: 5, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '' },
    { key: 6, index: 6, code: 'S1001000', name: '租赁服务', level: '', type: '', unit: '' },
  ];

  const { filters, setFilter, clearFilters, filteredData } = useFilterData(data, [
    { key: 'code', label: '服务品类编码' },
    { key: 'level', label: '级别' },
    { key: 'unit', label: '管理单位' },
  ]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <PortalLayout groups={spGroups} activePath="/sp/service-maintain" portalType="sp">
      <Space size={16} style={{ marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>服务维护</Typography.Title>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </Space>

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>服务品类编码</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={filters.code || ''} onChange={e => setFilter('code', e.target.value)} />
            </Space>
          </Col>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>级别</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={filters.level || ''} onChange={e => setFilter('level', e.target.value)} />
            </Space>
          </Col>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>管理单位</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={filters.unit || ''} onChange={e => setFilter('unit', e.target.value)} />
            </Space>
          </Col>
        </Row>
        <Space size={12}>
          <Button type="primary" onClick={clearFilters}>查询</Button>
          <Button type="primary" onClick={() => message.info('维护服务品类弹窗待实现')}>维护服务品类</Button>
          <Button type="primary" onClick={() => {
            if (selectedRowKeys.length === 0) {
              message.warning('请先选择要删除的条目');
            } else {
              message.success('已删除选中条目');
              setSelectedRowKeys([]);
            }
          }}>批量删除</Button>
        </Space>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }}
        bordered
        size="middle"
      />
    </PortalLayout>
  );
}
