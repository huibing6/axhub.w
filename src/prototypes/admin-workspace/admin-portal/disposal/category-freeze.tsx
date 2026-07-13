/**
 * @name 服务品类冻结
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Select, Button, Table, Row, Col, DatePicker, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const { RangePicker } = DatePicker;

const searchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '制造商', '贸易商', '服务商'] },
  { key: 'mgmtType', label: '服务商管理类型', type: 'select' as const, options: ['请选择', '所属企业管理', '总部管理'] },
  { key: 'adminUnit', label: '管理单位', type: 'select' as const, options: ['请选择', '长庆油田分公司', '大庆油田分公司'] },
  { key: 'categoryCode', label: '服务品类编码', placeholder: '请输入' },
  { key: 'catalogLevel', label: '目录级别', type: 'select' as const, options: ['请选择', '一级物资', '二级物资', '三级物资'] },
  { key: 'applyType', label: '申请类型', type: 'select' as const, options: ['请选择', '暂停准入服务品类交易权限'] },
  { key: 'applyTime', label: '申请时间', type: 'range' as const },
  { key: 'workType', label: '工作单类型', type: 'select' as const, options: ['请选择', '冻结申请', '解冻申请'] },
  { key: 'flowStatus', label: '流程状态', type: 'select' as const, options: ['请选择', '待提交', '审批中', '已通过', '已驳回'] },
];

const columns = [
  { key: 'applyType', title: '申请类型', width: 180, dataIndex: 'applyType', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', sorter: true, ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', sorter: true, ellipsis: true },
  { key: 'categoryCode', title: '服务品类编码', width: 120, dataIndex: 'categoryCode', sorter: true, ellipsis: true },
  { key: 'categoryName', title: '服务品类名称', width: 180, dataIndex: 'categoryName', sorter: true, ellipsis: true },
  { key: 'catalogLevel', title: '目录级别', width: 100, dataIndex: 'catalogLevel', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'workType', title: '工作单类型', width: 100, dataIndex: 'workType', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 140, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'applyTime', title: '申请时间', width: 140, dataIndex: 'applyTime', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 140, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'action', title: '操作', width: 220, align: 'center' as const, fixed: 'right' as const },
];

const tableData = [
  { index: 1, applyType: '暂停准入服务品类交易权限', spCode: '1001605660', spName: '宏鑫致远（北京）科技有…', categoryCode: 'S0101000', categoryName: '咨询', catalogLevel: '一级', mgmtType: '总部管理', workType: '冻结申请', adminUnit: '中国石油天然气集团有限公司', applyTime: '2025-12-19 09:15', freezeReason: '资质到期', flowStatus: '待提交' },
  { index: 2, applyType: '暂停准入服务品类交易权限', spCode: '1000212710', spName: '江苏上上电缆集团有限公司', categoryCode: 'S0201001', categoryName: '二维地震采集服务', catalogLevel: '一级', mgmtType: '所属企业管理', workType: '冻结申请', adminUnit: '长庆油田分公司', applyTime: '2025-12-18 14:30', freezeReason: '资质到期', flowStatus: '待提交' },
  { index: 3, applyType: '暂停准入服务品类交易权限', spCode: '1000212710', spName: '江苏上上电缆集团有限公司', categoryCode: 'S0301001', categoryName: '装配服务', catalogLevel: '一级', mgmtType: '所属企业管理', workType: '冻结申请', adminUnit: '长庆油田分公司', applyTime: '2025-12-18 14:30', freezeReason: '资质到期', flowStatus: '待提交' },
  { index: 4, applyType: '暂停准入服务品类交易权限', spCode: '1000212710', spName: '江苏上上电缆集团有限公司', categoryCode: 'S0401000', categoryName: '仓储服务', catalogLevel: '二级', mgmtType: '所属企业管理', workType: '冻结申请', adminUnit: '长庆油田分公司', applyTime: '2025-12-18 14:30', freezeReason: '其它', flowStatus: '待提交' },
  { index: 5, applyType: '暂停准入服务品类交易权限', spCode: '1000212710', spName: '江苏上上电缆集团有限公司', categoryCode: 'S0501001', categoryName: '委托技术开发服务', catalogLevel: '一级', mgmtType: '所属企业管理', workType: '冻结申请', adminUnit: '长庆油田分公司', applyTime: '2025-12-18 14:30', freezeReason: '资质到期', flowStatus: '待提交' },
  { index: 6, applyType: '暂停准入服务品类交易权限', spCode: '1000154310', spName: '安徽怡和电缆有限公司', categoryCode: 'S0601000', categoryName: '软件开发服务', catalogLevel: '二级', mgmtType: '所属企业管理', workType: '冻结申请', adminUnit: '大庆油田分公司', applyTime: '2025-12-17 10:20', freezeReason: '其它', flowStatus: '待提交' },
];

export default function CategoryFreeze() {
  const { token: t } = theme.useToken();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchCollapsed, setSearchCollapsed] = useState(false);

  const actionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }} onClick={() => window.location.hash = '#/admin/category-freeze-edit'}>编辑</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>冻结历史</Button>
      <Button type="link" size="small" style={{ color: '#ff4d4f' }}>删除</Button>
    </Space>
  );

  const enhancedColumns = columns.map(c => c.key === 'action' ? { ...c, render: actionColumn } : c);

  return (
    <>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}
        title={<Typography.Title level={5} style={{ margin: 0 }}>服务品类冻结</Typography.Title>}
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
              <Button type="primary" danger onClick={() => window.location.hash = '#/admin/category-freeze-create'}>新建服务品类冻结申请</Button>
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
        scroll={{ x: 1800 }}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
      />
    </>
  );
}
