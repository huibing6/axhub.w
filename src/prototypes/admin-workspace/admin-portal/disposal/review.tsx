/**
 * @name 复核
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tabs, Row, Col, DatePicker, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const { RangePicker } = DatePicker;

const spSearchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '制造商', '贸易商', '代理商'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '暂停交易权限', '恢复交易权限'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
];

const spColumns = [
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'applyType', title: '申请类型', width: 140, dataIndex: 'applyType', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'spType', title: '服务商类型', width: 100, dataIndex: 'spType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 180, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'action', title: '操作', width: 140, align: 'center' as const, fixed: 'right' as const },
];

const spData = [
  { index: 1, spName: '山东丽新石化股份有限公司', spCode: '1002020631', applyType: '暂停交易权限', mgmtType: '总部管理', spType: '制造商', adminUnit: '中国石油天然气集团有限公司', flowStatus: '待审核' },
  { index: 2, spName: '中储（天津）物资有限公司', spCode: '1000018008', applyType: '暂停交易权限', mgmtType: '总部管理', spType: '贸易商', adminUnit: '中国石油天然气集团有限公司', flowStatus: '待审核' },
  { index: 3, spName: '测试服务商20260509', spCode: '1002020681', applyType: '暂停交易权限', mgmtType: '所属企业管理', spType: '制造商', adminUnit: '长庆油田分公司', flowStatus: '待复核' },
  { index: 4, spName: '王牌测试1114上线冻结', spCode: '47370456', applyType: '暂停交易权限', mgmtType: '所属企业管理', spType: '制造商', adminUnit: '长庆油田分公司', flowStatus: '待审核' },
  { index: 5, spName: '上分测试门店负责人产品新增冻结…', spCode: '1001876004', applyType: '暂停交易权限', mgmtType: '所属企业管理', spType: '制造商', adminUnit: '大庆油田分公司', flowStatus: '待审核' },
  { index: 6, spName: '江阴石化装备化工机械有限公司', spCode: '1000282613', applyType: '暂停交易权限', mgmtType: '所属企业管理', spType: '制造商', adminUnit: '中国石油天然气集团有限公司', flowStatus: '待复核' },
];

const categorySearchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '制造商', '贸易商', '代理商'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'categoryCode', label: '服务品类编码', placeholder: '请输入' },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '暂停准入服务品类交易权限', '恢复准入服务品类交易权限'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
];

const categoryColumns = [
  { key: 'applyType', title: '申请类型', width: 160, dataIndex: 'applyType', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', ellipsis: true },
  { key: 'categoryCode', title: '服务品类编码', width: 120, dataIndex: 'categoryCode', ellipsis: true },
  { key: 'categoryName', title: '服务品类名称', width: 140, dataIndex: 'categoryName', ellipsis: true },
  { key: 'catalogLevel', title: '目录级别', width: 100, dataIndex: 'catalogLevel', ellipsis: true },
  { key: 'spType', title: '服务商类型', width: 100, dataIndex: 'spType', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'action', title: '操作', width: 100, align: 'center' as const, fixed: 'right' as const },
];

const categoryData = [
  { index: 1, applyType: '暂停准入服务品类交易权限', spCode: '1000802855', spName: '渤海石油装备（天津）中…', categoryCode: 'A09020201', categoryName: '耐火土', catalogLevel: '一级', spType: '制造商', mgmtType: '总部管理' },
  { index: 2, applyType: '暂停准入服务品类交易权限', spCode: '1000802855', spName: '渤海石油装备（天津）中…', categoryCode: 'A09020105', categoryName: '其它耐火制品', catalogLevel: '一级', spType: '制造商', mgmtType: '总部管理' },
  { index: 3, applyType: '暂停准入服务品类交易权限', spCode: '1000200490', spName: '北方大气公司', categoryCode: 'A01010102', categoryName: '人造金刚石', catalogLevel: '二级', spType: '制造商', mgmtType: '所属企业管理' },
  { index: 4, applyType: '暂停准入服务品类交易权限', spCode: '1000802855', spName: '渤海石油装备（天津）中…', categoryCode: 'A09020102', categoryName: '其它耐火制品', catalogLevel: '一级', spType: '制造商', mgmtType: '所属企业管理' },
  { index: 5, applyType: '暂停准入服务品类交易权限', spCode: '1000684812', spName: '瑞泰士股份有限公司', categoryCode: 'A01002005', categoryName: '瓷件', catalogLevel: '二级', spType: '制造商', mgmtType: '所属企业管理' },
  { index: 6, applyType: '暂停准入服务品类交易权限', spCode: '1000681181', spName: '实友化工（扬州）有限公司', categoryCode: 'A01002005', categoryName: '瓷件', catalogLevel: '二级', spType: '制造商', mgmtType: '所属企业管理' },
  { index: 7, applyType: '暂停准入服务品类交易权限', spCode: '1000984527', spName: '北京普瑞博美科贸有限公司', categoryCode: 'A40040608', categoryName: '阻燃灭火剂', catalogLevel: '二级', spType: '代理商', mgmtType: '总部管理' },
];

export default function Review() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('spReview');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchCollapsed, setSearchCollapsed] = useState(false);

  const spActionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/review-detail'}>复核</Button>
    </Space>
  );

  const categoryActionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/category-review-detail'}>复核</Button>
    </Space>
  );

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/review" portalType="admin">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'spReview',
            label: <span style={{ color: activeTab === 'spReview' ? t.colorPrimary : undefined, fontWeight: activeTab === 'spReview' ? 600 : 400 }}>服务商复核</span>,
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务商复核</Typography.Title>}
                  extra={<Button type="text" icon={<span style={{ fontSize: 18 }}>{searchCollapsed ? '▾' : '▴'}</span>} onClick={() => setSearchCollapsed(!searchCollapsed)} />}
                >
                  {!searchCollapsed && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                        {spSearchFields.map(f => (
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
                        <Button type="primary" danger onClick={() => message.info('批量复核')}>批量复核</Button>
                        <Button onClick={() => message.info('导出')}>导出</Button>
                        <Button onClick={() => message.info('批量添加到关注列表')}>批量添加到关注列表</Button>
                      </Space>
                    </Col>
                    <Col>
                      <Button>表格定制</Button>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={spColumns.map(c => c.key === 'action' ? { ...c, render: spActionColumn } : c)}
                  dataSource={spData}
                  rowKey="index"
                  size="middle"
                  scroll={{ x: 1200 }}
                  pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
          {
            key: 'categoryReview',
            label: '服务品类复核',
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务品类复核</Typography.Title>}
                  extra={<Button type="text" icon={<span style={{ fontSize: 18 }}>{searchCollapsed ? '▾' : '▴'}</span>} onClick={() => setSearchCollapsed(!searchCollapsed)} />}
                >
                  {!searchCollapsed && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
                        {categorySearchFields.map(f => (
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
                        <Button type="primary" danger onClick={() => message.info('批量复核')}>批量复核</Button>
                        <Button onClick={() => message.info('导出')}>导出</Button>
                      </Space>
                    </Col>
                    <Col>
                      <Button>表格定制</Button>
                    </Col>
                  </Row>
                </Card>
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={categoryColumns.map(c => c.key === 'action' ? { ...c, render: categoryActionColumn } : c)}
                  dataSource={categoryData}
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
