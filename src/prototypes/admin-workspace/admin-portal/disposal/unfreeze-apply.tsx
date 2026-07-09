/**
 * @name 解冻申请
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tabs, Row, Col, DatePicker, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const { RangePicker } = DatePicker;

const searchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '代理商', '贸易商', '制造商'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'freezeStatus', label: '冻结状态', type: 'select' as const, options: ['请选择', '冻结', '临时冻结'] },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '恢复交易权限', '恢复准入产品交易权限'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
];

const spColumns = [
  { key: 'applyType', title: '申请类型', width: 160, dataIndex: 'applyType', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', sorter: true, ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 140, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'workType', title: '工作单类型', width: 140, dataIndex: 'workType', ellipsis: true },
  { key: 'spType', title: '服务商类型', width: 100, dataIndex: 'spType', ellipsis: true },
  { key: 'action', title: '操作', width: 280, align: 'center' as const, fixed: 'right' as const },
];

const spData = [
  { index: 1, applyType: '恢复交易权限', spCode: '1003240949', spName: '乌鲁木齐金宏升电子科…', mgmtType: '所属企业管理', freezeReason: '临时冻结', flowStatus: '冻结（总部未通过）', workType: '恢复交易权限', spType: '代理商' },
  { index: 2, applyType: '恢复交易权限', spCode: '1001400492', spName: '济南中友欣安科技有…', mgmtType: '所属企业管理', freezeReason: '临时冻结', flowStatus: '冻结（总部未通过）', workType: '恢复交易权限', spType: '贸易商' },
  { index: 3, applyType: '恢复交易权限', spCode: '1003286269', spName: '九厨伟德（北京）科…', mgmtType: '所属企业管理', freezeReason: '临时冻结', flowStatus: '冻结（总部未通过）', workType: '恢复交易权限', spType: '代理商' },
  { index: 4, applyType: '恢复交易权限', spCode: '1000886614', spName: '门源广汇天然气有…', mgmtType: '所属企业管理', freezeReason: '冻结', flowStatus: '已通过（总部通过）', workType: '恢复准入产品交易权限', spType: '贸易商' },
  { index: 5, applyType: '恢复交易权限', spCode: '1001186265', spName: '庆阳亿凡工贸有限…', mgmtType: '所属企业管理', freezeReason: '冻结', flowStatus: '已通过（总部通过）', workType: '恢复准入产品交易权限', spType: '贸易商' },
  { index: 6, applyType: '恢复交易权限', spCode: '1001656831', spName: '华电广汇能源装备…', mgmtType: '所属企业管理', freezeReason: '未审核', flowStatus: '待提交', workType: '恢复准入产品交易权限', spType: '贸易商' },
];

const productColumns = [
  { key: 'applyType', title: '申请类型', width: 160, dataIndex: 'applyType', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', sorter: true, ellipsis: true },
  { key: 'spType', title: '服务商类型', width: 100, dataIndex: 'spType', ellipsis: true },
  { key: 'categoryCode', title: '产品编码', width: 120, dataIndex: 'categoryCode', ellipsis: true },
  { key: 'categoryName', title: '产品名称', width: 180, dataIndex: 'categoryName', ellipsis: true },
  { key: 'catalogLevel', title: '物资级别', width: 100, dataIndex: 'catalogLevel', ellipsis: true },
  { key: 'source', title: '准入类型', width: 100, dataIndex: 'source', ellipsis: true },
  { key: 'action', title: '操作', width: 200, align: 'center' as const, fixed: 'right' as const },
];

const productData = [
  { index: 1, applyType: '恢复准入产品交易权限', spCode: '1000562192', spName: '山东大方电气有限公司', spType: '制造商', categoryCode: 'A46892001', categoryName: '低压成套开关设备', catalogLevel: '一级物资', source: '其它' },
  { index: 2, applyType: '恢复准入产品交易权限', spCode: '1000562192', spName: '山东大方电气有限公司', spType: '制造商', categoryCode: 'A46892002', categoryName: '低压成套开关设备', catalogLevel: '一级物资', source: '其它' },
  { index: 3, applyType: '恢复准入产品交易权限', spCode: '1000816195', spName: '成都新宝科技有限公司', spType: '制造商', categoryCode: 'A14016309', categoryName: '粘土及用粘土配制料', catalogLevel: '一级物资', source: '产品资质到期' },
  { index: 4, applyType: '恢复准入产品交易权限', spCode: '1000594108', spName: '安徽江淮汽车集团锻…', spType: '制造商', categoryCode: 'A40815601', categoryName: '皮卡', catalogLevel: '一级物资', source: '产品资质到期' },
  { index: 5, applyType: '恢复准入产品交易权限', spCode: '1000434112', spName: '上海美科阀门科技有…', spType: '制造商', categoryCode: 'A52920302', categoryName: '中压球阀及闸阀', catalogLevel: '一级物资', source: '产品资质' },
  { index: 6, applyType: '恢复准入产品交易权限', spCode: '1000434112', spName: '上海美科阀门科技有…', spType: '制造商', categoryCode: 'A52920302', categoryName: '中压球阀及闸阀', catalogLevel: '一级物资', source: '产品资质' },
];

export default function UnfreezeApply() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('spUnfreeze');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchCollapsed, setSearchCollapsed] = useState(false);

  const spActionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => message.info('查看供应商')}>查看供应商</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/unfreeze-history'}>冻结历史</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>解冻</Button>
      <Button type="link" size="small" style={{ color: '#ff4d4f' }}>终止</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>预警信息</Button>
    </Space>
  );

  const productActionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看产品信息</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/category-unfreeze-history'}>冻结历史</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>编辑</Button>
      <Button type="link" size="small" style={{ color: '#ff4d4f' }}>删除</Button>
    </Space>
  );

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/unfreeze-apply" portalType="admin">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'spUnfreeze',
            label: <span style={{ color: activeTab === 'spUnfreeze' ? t.colorPrimary : undefined, fontWeight: activeTab === 'spUnfreeze' ? 600 : 400 }}>服务商解冻</span>,
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务商解冻</Typography.Title>}
                  extra={<Button type="text" icon={<span style={{ fontSize: 18 }}>{searchCollapsed ? '▾' : '▴'}</span>} onClick={() => setSearchCollapsed(!searchCollapsed)} />}
                >
                  {!searchCollapsed && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                        {searchFields.map(f => (
                          <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Typography.Text style={{ whiteSpace: 'nowrap', minWidth: 100, textAlign: 'right' }}>{f.label}：</Typography.Text>
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
                      <Row justify="end">
                        <Space>
                          <Button type="primary">查询</Button>
                          <Button>重置</Button>
                        </Space>
                      </Row>
                    </>
                  )}
                </Card>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <Button type="primary" danger onClick={() => window.location.hash = '#/admin/unfreeze-apply-create'}>新建服务商解冻申请</Button>
                        <Button onClick={() => message.info('批量提交审批')}>批量提交审批</Button>
                        <Button onClick={() => message.info('导出')}>导出</Button>
                        <Button onClick={() => message.info('跳转解冻')}>跳转解冻</Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={spColumns.map(c => c.key === 'action' ? { ...c, render: spActionColumn } : c)}
                  dataSource={spData}
                  rowKey="index"
                  size="middle"
                  scroll={{ x: 1400 }}
                  pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
          {
            key: 'productUnfreeze',
            label: '服务品类解冻',
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务品类解冻</Typography.Title>}
                  extra={<Button type="text" icon={<span style={{ fontSize: 18 }}>{searchCollapsed ? '▾' : '▴'}</span>} onClick={() => setSearchCollapsed(!searchCollapsed)} />}
                >
                  {!searchCollapsed && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                        {searchFields.map(f => (
                          <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Typography.Text style={{ whiteSpace: 'nowrap', minWidth: 100, textAlign: 'right' }}>{f.label}：</Typography.Text>
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
                      <Row justify="end">
                        <Space>
                          <Button type="primary">查询</Button>
                          <Button>重置</Button>
                        </Space>
                      </Row>
                    </>
                  )}
                </Card>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <Button type="primary" danger onClick={() => window.location.hash = '#/admin/category-unfreeze-create'}>新建服务品类解冻申请</Button>
                        <Button onClick={() => message.info('批量提交审批')}>批量提交审批</Button>
                        <Button onClick={() => message.info('导出')}>导出</Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={productColumns.map(c => c.key === 'action' ? { ...c, render: productActionColumn } : c)}
                  dataSource={productData}
                  rowKey="index"
                  size="middle"
                  scroll={{ x: 1400 }}
                  pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
        ]}
      />
    </PortalLayout>
  );
}
