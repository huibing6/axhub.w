/**
 * @name 冻结申请
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Form, Row, Col, DatePicker, Tabs, Checkbox, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const { RangePicker } = DatePicker;

const searchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'flowStatus', label: '流程状态', type: 'select' as const, options: ['请选择', '待提交', '审批中', '已通过', '已驳回'] },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '暂停交易权限', '取消服务商准入资格'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
];

const columns = [
  { key: 'applyType', title: '申请类型', width: 160, dataIndex: 'applyType', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 200, dataIndex: 'spName', sorter: true, ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 140, dataIndex: 'mgmtType', sorter: true, ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 180, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'action', title: '操作', width: 240, align: 'center' as const, fixed: 'right' as const },
];

const tableData = [
  { index: 1, applyType: '暂停交易权限', spCode: '1002020681', spName: '测试服务商20260509', mgmtType: '所属企业管理', freezeReason: '未年审', flowStatus: '待提交' },
  { index: 2, applyType: '暂停交易权限', spCode: '38671240', spName: '天津销售服务商考试0718…', mgmtType: '所属企业管理', freezeReason: '资质到期', flowStatus: '待提交' },
  { index: 3, applyType: '暂停交易权限', spCode: '38671240', spName: '天津销售服务商考试0718…', mgmtType: '所属企业管理', freezeReason: '服务商稽核总部未通过', flowStatus: '待提交' },
  { index: 4, applyType: '取消服务商准入资格', spCode: '1000145303', spName: '盐城市长胜石化机械有限…', mgmtType: '所属企业管理', freezeReason: '其它', flowStatus: '待提交' },
  { index: 5, applyType: '暂停交易权限', spCode: '1000347223', spName: '章丘市永清寺篷布厂', mgmtType: '所属企业管理', freezeReason: '服务商稽核总部未通过', flowStatus: '待提交' },
  { index: 6, applyType: '暂停交易权限', spCode: '1000060596', spName: '盖州水泵厂', mgmtType: '所属企业管理', freezeReason: '现场考察', flowStatus: '待提交' },
];

export default function FreezeApply() {
  const { token: t } = theme.useToken();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchCollapsed, setSearchCollapsed] = useState(true);

  const actionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>编辑</Button>
      <Button type="link" size="small" style={{ color: '#ff4d4f' }}>删除</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>冻结历史</Button>
    </Space>
  );

  const enhancedColumns = columns.map(c => c.key === 'action' ? { ...c, render: actionColumn } : c);

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-apply" portalType="admin">
      <Tabs
        defaultActiveKey="spFreeze"
        items={[
          {
            key: 'spFreeze',
            label: <span style={{ color: t.colorPrimary, fontWeight: 600 }}>服务商冻结</span>,
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务商冻结</Typography.Title>}
                  extra={<Button type="text" icon={<span style={{ fontSize: 18 }}>{searchCollapsed ? '▾' : '▴'}</span>} onClick={() => setSearchCollapsed(!searchCollapsed)} />}
                >
                  {!searchCollapsed && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                      {searchFields.map(f => (
                        <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Typography.Text style={{ whiteSpace: 'nowrap', minWidth: 90, textAlign: 'right' }}>{f.label}：</Typography.Text>
                          {f.type === 'select' ? (
                            <Select defaultValue={f.options?.[0]} style={{ flex: 1 }}>
                              {f.options?.map(o => <Select.Option key={o} value={o}>{o}</Select.Option>)}
                            </Select>
                          ) : f.type === 'range' ? (
                            <RangePicker style={{ flex: 1 }} />
                          ) : (
                            <Input placeholder={f.placeholder} style={{ flex: 1 }} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {!searchCollapsed && (
                    <Row justify="end">
                      <Space>
                        <Button type="primary">查询</Button>
                        <Button>重置</Button>
                      </Space>
                    </Row>
                  )}
                </Card>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <Button type="primary" danger onClick={() => message.success('新建服务商冻结申请')}>新建服务商冻结申请</Button>
                        <Button onClick={() => message.info('批量提交审批')}>批量提交审批</Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={enhancedColumns}
                  dataSource={tableData}
                  rowKey="index"
                  size="middle"
                  scroll={{ x: 1200 }}
                  pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
          {
            key: 'productFreeze',
            label: '准入产品冻结',
            children: <div style={{ padding: 40, textAlign: 'center', color: t.colorTextQuaternary }}>准入产品冻结（待开发）</div>,
          },
        ]}
      />
    </PortalLayout>
  );
}
