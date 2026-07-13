/**
 * @name 冻结解冻查询
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Tabs, Row, Col, DatePicker, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const { RangePicker } = DatePicker;

const spSearchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '恢复交易权限', '暂停交易权限'] },
  { key: 'applyUnit', label: '申请单位', placeholder: '请输入' },
  { key: 'spStatus', label: '服务商状态', type: 'select' as const, options: ['请选择', '正常', '已冻结'] },
  { key: 'disposeRange', label: '处置范围', type: 'select' as const, options: ['请选择', '全集团', '本单位'] },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '制造商', '贸易商', '代理商'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'dataSource', label: '数据来源', type: 'select' as const, options: ['请选择', '准入管理', '信息变更'] },
  { key: 'freezeReason', label: '冻结原因', type: 'select' as const, options: ['请选择', '资质到期', '未缴费', '其他'] },
  { key: 'flowStatus', label: '流程状态', type: 'select' as const, options: ['请选择', '已完成', '待提交', '审批中'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
  { key: 'isExpired', label: '是否已到期', type: 'select' as const, options: ['请选择', '是', '否'] },
  { key: 'isUnfreeze', label: '是否已解冻', type: 'select' as const, options: ['请选择', '是', '否'] },
  { key: 'applyPerson', label: '申请人', placeholder: '请输入' },
  { key: 'effectTime', label: '生效时间', type: 'range' as const },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'batchName', label: '批次名称', type: 'select' as const, options: ['请选择', '2026年第一批', '2026年第二批'] },
];

const spColumns = [
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', sorter: true, ellipsis: true },
  { key: 'spType', title: '服务商类型', width: 100, dataIndex: 'spType', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'workType', title: '工作单类型', width: 100, dataIndex: 'workType', ellipsis: true },
  { key: 'applyType', title: '申请类型', width: 120, dataIndex: 'applyType', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 100, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'applyTime', title: '申请时间', width: 160, dataIndex: 'applyTime', ellipsis: true },
  { key: 'action', title: '操作', width: 240, align: 'center' as const, fixed: 'right' as const },
];

const spData = [
  { index: 1, spCode: '1000886989', spName: '赤峰联谊气体有限责任公司', spType: '制造商', mgmtType: '所属企业管理', workType: '', applyType: '恢复交易权限', freezeReason: '资质到期', flowStatus: '已完成', applyTime: '2026-07-09 16:00:00' },
  { index: 2, spCode: '1001003920', spName: '任丘市联畅石油工程技术…', spType: '贸易商', mgmtType: '所属企业管理', workType: '', applyType: '恢复交易权限', freezeReason: '资质到期', flowStatus: '已完成', applyTime: '2026-07-09 16:00:00' },
  { index: 3, spCode: '1000098405', spName: '镇江西门子母线有限公司', spType: '制造商', mgmtType: '总部管理', workType: '', applyType: '恢复交易权限', freezeReason: '未缴费', flowStatus: '已完成', applyTime: '2026-07-09 14:00:00' },
  { index: 4, spCode: '1000571968', spName: '山西建邦集团有限公司', spType: '制造商', mgmtType: '总部管理', workType: '', applyType: '恢复交易权限', freezeReason: '未缴费', flowStatus: '已完成', applyTime: '2026-07-09 14:00:00' },
];

const categorySearchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'categoryCode', label: '服务品类编码', placeholder: '请输入' },
  { key: 'categoryName', label: '服务品类名称', placeholder: '请输入' },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '暂停准入服务品类交易权限', '恢复准入服务品类交易权限'] },
  { key: 'applyUnit', label: '申请单位', placeholder: '请输入' },
  { key: 'spStatus', label: '服务商状态', type: 'select' as const, options: ['请选择', '正常', '已冻结'] },
  { key: 'disposeRange', label: '处置范围', type: 'select' as const, options: ['请选择', '全集团', '本单位'] },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '制造商', '贸易商', '代理商'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'dataSource', label: '数据来源', type: 'select' as const, options: ['请选择', '准入管理', '信息变更'] },
  { key: 'freezeReason', label: '冻结原因', type: 'select' as const, options: ['请选择', '资质到期', '未缴费', '其他'] },
  { key: 'flowStatus', label: '流程状态', type: 'select' as const, options: ['请选择', '已完成', '待提交', '待复核', '审批中'] },
  { key: 'catalogLevel', label: '目录级别', type: 'select' as const, options: ['请选择', '一级物资', '二级物资', '三级物资'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
  { key: 'isExpired', label: '是否已到期', type: 'select' as const, options: ['请选择', '是', '否'] },
  { key: 'isUnfreeze', label: '是否已解冻', type: 'select' as const, options: ['请选择', '是', '否'] },
  { key: 'applyPerson', label: '申请人', placeholder: '请输入' },
  { key: 'effectTime', label: '生效时间', type: 'range' as const },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
];

const categoryColumns = [
  { key: 'categoryCode', title: '服务品类编码', width: 120, dataIndex: 'categoryCode', sorter: true, ellipsis: true },
  { key: 'categoryName', title: '服务品类名称', width: 140, dataIndex: 'categoryName', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', ellipsis: true },
  { key: 'spType', title: '服务商类型', width: 100, dataIndex: 'spType', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'workType', title: '工作单类型', width: 120, dataIndex: 'workType', ellipsis: true },
  { key: 'applyType', title: '申请类型', width: 160, dataIndex: 'applyType', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 100, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'catalogLevel', title: '目录级别', width: 100, dataIndex: 'catalogLevel', ellipsis: true },
  { key: 'action', title: '操作', width: 200, align: 'center' as const, fixed: 'right' as const },
];

const categoryData = [
  { index: 1, categoryCode: 'S0101000', categoryName: '咨询', spName: '大庆拓邦龙达科技有限公司', spType: '贸易商', mgmtType: '所属企业管理', workType: '暂停准入服务品类交易权限', applyType: '暂停准入服务品类交易权限', freezeReason: '资质到期', flowStatus: '待复核', catalogLevel: '二级' },
  { index: 2, categoryCode: 'S0201000', categoryName: '物化探服务', spName: '四川伯尔塔石油科技有限…', spType: '代理商', mgmtType: '所属企业管理', workType: '', applyType: '暂停准入服务品类交易权限', freezeReason: '其它', flowStatus: '已完成', catalogLevel: '一级' },
];

export default function FreezeQuery() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('spFreeze');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchCollapsed, setSearchCollapsed] = useState(false);

  const spActionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看服务商</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/unfreeze-history'}>冻结历史</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>进度查询</Button>
    </Space>
  );

  const categoryActionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/category-unfreeze-history'}>冻结历史</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>进度查询</Button>
      <Button type="link" size="small" style={{ color: '#ff4d4f' }}>撤回</Button>
    </Space>
  );

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-query" portalType="admin">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'spFreeze',
            label: <span style={{ color: activeTab === 'spFreeze' ? t.colorPrimary : undefined, fontWeight: activeTab === 'spFreeze' ? 600 : 400 }}>服务商冻结解冻查询</span>,
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务商冻结解冻查询</Typography.Title>}
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
                        <Button type="primary" danger onClick={() => message.info('批量导出')}>批量导出</Button>
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
                  scroll={{ x: 1400 }}
                  pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
                />
              </>
            ),
          },
          {
            key: 'categoryFreeze',
            label: '服务品类冻结解冻查询',
            children: (
              <>
                <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
                  title={<Typography.Title level={5} style={{ margin: 0 }}>服务品类冻结解冻查询</Typography.Title>}
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
                        <Button type="primary" danger onClick={() => message.info('批量导出')}>批量导出</Button>
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
