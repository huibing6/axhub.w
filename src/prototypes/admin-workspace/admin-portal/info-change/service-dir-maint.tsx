/**
 * @name 服务品类维护
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tabs, Row, Col, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const searchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'spStatus', label: '服务商状态', placeholder: '请输入' },
  { key: 'adminUnit', label: '管理单位', placeholder: '请输入' },
];

const admittedColumns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'categoryCode', title: '服务分类编码', width: 120, dataIndex: 'categoryCode', ellipsis: true },
  { key: 'categoryName', title: '服务分类名称', width: 120, dataIndex: 'categoryName', ellipsis: true },
  { key: 'level', title: '级别', width: 80, dataIndex: 'level', ellipsis: true },
  { key: 'dirType', title: '目录类型', width: 100, dataIndex: 'dirType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 100, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'source', title: '准入来源', width: 140, dataIndex: 'source', ellipsis: true },
  { key: 'bidNotice', title: '中标通知书', width: 120, dataIndex: 'bidNotice', ellipsis: true },
  { key: 'action', title: '操作', width: 80, align: 'center' as const },
];

const pendingColumns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'categoryCode', title: '服务分类编码', width: 120, dataIndex: 'categoryCode', ellipsis: true },
  { key: 'categoryName', title: '服务分类名称', width: 120, dataIndex: 'categoryName', ellipsis: true },
  { key: 'level', title: '级别', width: 80, dataIndex: 'level', ellipsis: true },
  { key: 'dirType', title: '目录类型', width: 100, dataIndex: 'dirType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 100, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'source', title: '数据来源', width: 120, dataIndex: 'source', ellipsis: true },
  { key: 'bidCode', title: '中标项目编号', width: 120, dataIndex: 'bidCode', ellipsis: true },
  { key: 'bidName', title: '中标项目名称', width: 180, dataIndex: 'bidName', ellipsis: true },
  { key: 'bidTime', title: '时间', width: 100, dataIndex: 'bidTime', ellipsis: true },
  { key: 'bidNotice', title: '中标通知书', width: 120, dataIndex: 'bidNotice', ellipsis: true },
  { key: 'action', title: '操作', width: 80, align: 'center' as const },
];

const admittedData = [
  { index: 1, categoryCode: 'S1001000', categoryName: '租赁服务', level: '一级', dirType: '专业', adminUnit: '长庆油田', source: '公开招标采购中标', bidNotice: '中标通知文件.pdf' },
  { index: 2, categoryCode: 'S1001000', categoryName: '租赁服务', level: '二级', dirType: '通用', adminUnit: '长庆油田', source: '其他公开方式', bidNotice: '' },
  { index: 3, categoryCode: 'S1001000', categoryName: '租赁服务', level: '二级', dirType: '专业', adminUnit: '', source: '公开招标采购中标', bidNotice: '中标通知文件.pdf' },
  { index: 4, categoryCode: 'S1001000', categoryName: '租赁服务', level: '二级', dirType: '通用', adminUnit: '', source: '其他公开方式', bidNotice: '' },
  { index: 5, categoryCode: 'S1001000', categoryName: '租赁服务', level: '', dirType: '', adminUnit: '', source: '', bidNotice: '' },
  { index: 6, categoryCode: 'S1001000', categoryName: '租赁服务', level: '', dirType: '', adminUnit: '', source: '', bidNotice: '' },
];

const pendingData = [
  { index: 1, categoryCode: 'S1001000', categoryName: '租赁服务', level: '一级', dirType: '专业', adminUnit: '长庆油田', source: '公开招标采购中标', bidCode: 'ZB12345', bidName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01', bidNotice: '中标通知文件.pdf' },
  { index: 2, categoryCode: 'S1001000', categoryName: '租赁服务', level: '二级', dirType: '通用', adminUnit: '长庆油田', source: '其他公开方式', bidCode: 'ZB12345', bidName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01', bidNotice: '' },
  { index: 3, categoryCode: 'S1001000', categoryName: '租赁服务', level: '二级', dirType: '专业', adminUnit: '', source: '公开招标采购中标', bidCode: 'ZB12345', bidName: '炼油化工分公司设备检修服务采购', bidTime: '2026-06-01', bidNotice: '中标通知文件.pdf' },
  { index: 4, categoryCode: 'S1001000', categoryName: '租赁服务', level: '二级', dirType: '通用', adminUnit: '', source: '其他公开方式', bidCode: '', bidName: '', bidTime: '', bidNotice: '' },
  { index: 5, categoryCode: 'S1001000', categoryName: '租赁服务', level: '', dirType: '', adminUnit: '', source: '', bidCode: '', bidName: '', bidTime: '', bidNotice: '' },
  { index: 6, categoryCode: 'S1001000', categoryName: '租赁服务', level: '', dirType: '', adminUnit: '', source: '', bidCode: '', bidName: '', bidTime: '', bidNotice: '' },
];

export default function ServiceDirMaintPage() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('admitted');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const actionColumn = (_: any, record: any) => (
    <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => message.info('编辑')}>编辑</Button>
  );

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Typography.Text style={{ color: t.colorPrimary }}>注册服务商审核</Typography.Text>
      <Typography.Title level={4} style={{ margin: '0 0 16px' }}>服务品类维护</Typography.Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'admitted',
            label: <span style={{ color: activeTab === 'admitted' ? t.colorPrimary : undefined, fontWeight: activeTab === 'admitted' ? 600 : 400 }}>已准入服务品类</span>,
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                    {searchFields.map(f => (
                      <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Typography.Text style={{ whiteSpace: 'nowrap', minWidth: 90, textAlign: 'right' }}>{f.label}：</Typography.Text>
                        <Input placeholder={f.placeholder} style={{ flex: 1 }} />
                      </div>
                    ))}
                  </div>
                  <Row justify="end">
                    <Space>
                      <Button type="primary">查询</Button>
                      <Button>重置</Button>
                    </Space>
                  </Row>
                </Card>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <Button type="primary" danger onClick={() => message.info('添加服务目录')}>添加服务目录</Button>
                        <Button type="primary" danger onClick={() => message.info('批量删除')}>批量删除</Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={admittedColumns.map(c => c.key === 'action' ? { ...c, render: actionColumn } : c)}
                  dataSource={admittedData}
                  rowKey="index"
                  size="middle"
                  scroll={{ x: 1000 }}
                  pagination={{ pageSize: 10, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
          {
            key: 'pending',
            label: '已中标待准入服务品类',
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                    {searchFields.map(f => (
                      <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Typography.Text style={{ whiteSpace: 'nowrap', minWidth: 90, textAlign: 'right' }}>{f.label}：</Typography.Text>
                        <Input placeholder={f.placeholder} style={{ flex: 1 }} />
                      </div>
                    ))}
                  </div>
                  <Row justify="end">
                    <Space>
                      <Button type="primary">查询</Button>
                      <Button>重置</Button>
                    </Space>
                  </Row>
                </Card>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <Button type="primary" danger onClick={() => message.info('编辑')}>编辑</Button>
                        <Button type="primary" danger onClick={() => message.info('批量删除')}>批量删除</Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={pendingColumns.map(c => c.key === 'action' ? { ...c, render: actionColumn } : c)}
                  dataSource={pendingData}
                  rowKey="index"
                  size="middle"
                  scroll={{ x: 1400 }}
                  pagination={{ pageSize: 10, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
        ]}
      />
    </PortalLayout>
  );
}
