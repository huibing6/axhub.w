/**
 * @name 服务品类解冻申请创建
 */
import { useState } from 'react';
import { theme, Typography, Form, Input, Select, Button, Card, Divider, Space, Upload, Table, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const searchFields = [
  { key: 'spCode', label: '服务商编码', placeholder: '请输入' },
  { key: 'spName', label: '服务商名称', placeholder: '请输入' },
  { key: 'spType', label: '服务商类型', type: 'select' as const, options: ['请选择', '制造商', '贸易商', '代理商'] },
  { key: 'categoryCode', label: '服务品类编码', placeholder: '请输入' },
  { key: 'categoryName', label: '服务品类名称', placeholder: '请输入' },
  { key: 'freezeType', label: '冻结类型', type: 'select' as const, options: ['请选择', '服务品类资质到期'] },
  { key: 'catalogLevel', label: '目录级别', type: 'select' as const, options: ['请选择', '一级物资', '二级物资', '三级物资'] },
  { key: 'disposeRange', label: '处置范围', type: 'select' as const, options: ['请选择', '全集团', '本单位'] },
  { key: 'dataSource', label: '数据来源', type: 'select' as const, options: ['请选择', '准入管理'] },
  { key: 'adminUnit', label: '准入单位', placeholder: '请输入' },
  { key: 'flowStatus', label: '服务商冻结类型', type: 'select' as const, options: ['请选择', '冻结', '服务品类资质到期'] },
];

const columns = [
  { key: 'categoryCode', title: '服务品类编码', width: 120, dataIndex: 'categoryCode', ellipsis: true },
  { key: 'categoryName', title: '服务品类名称', width: 180, dataIndex: 'categoryName', ellipsis: true },
  { key: 'spCode', title: '服务商编码', width: 120, dataIndex: 'spCode', ellipsis: true },
  { key: 'spName', title: '服务商名称', width: 180, dataIndex: 'spName', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'workType', title: '工作单类型', width: 100, dataIndex: 'workType', ellipsis: true },
  { key: 'adminUnit', title: '准入单位', width: 140, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'applyUnit', title: '申请单位', width: 180, dataIndex: 'applyUnit', ellipsis: true },
  { key: 'action', title: '操作', width: 150, align: 'center' as const },
];

const tableData = [
  { index: 1, categoryCode: 'A14073402', categoryName: '尼龙1/6', spCode: '1001581294', spName: '山东万达特种电缆有限公司', mgmtType: '总部管理', workType: '', adminUnit: '中国石油天然气集团有限公司', applyUnit: '中国石油天然气集团有限公司' },
  { index: 2, categoryCode: 'A14073401', categoryName: '尼龙6', spCode: '1001581294', spName: '山东万达特种电缆有限公司', mgmtType: '总部管理', workType: '', adminUnit: '中国石油天然气集团有限公司', applyUnit: '中国石油天然气集团有限公司' },
  { index: 3, categoryCode: 'A02042021', categoryName: '影印石英表', spCode: '1000934581', spName: '瓦卢瑞克（中国）有限公…', mgmtType: '总部管理', workType: '', adminUnit: '中国石油天然气集团有限公司', applyUnit: '中国石油天然气集团有限公司' },
  { index: 4, categoryCode: 'A02042015', categoryName: '特有无缝油管', spCode: '1000934581', spName: '瓦卢瑞克（中国）有限公…', mgmtType: '总部管理', workType: '', adminUnit: '中国石油天然气集团有限公司', applyUnit: '中国石油天然气集团有限公司' },
];

export default function CategoryUnfreezeCreate() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const actionColumn = (_: any, record: any) => (
    <Space size={4}>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>查看</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>冻结历史</Button>
      <Button type="link" size="small" style={{ color: '#1677ff' }}>解冻</Button>
    </Space>
  );

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/unfreeze-apply" portalType="admin">
      <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>服务品类解冻申请创建</Typography.Title>
        <Divider style={{ margin: '16px 0 24px' }} />

        <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px', marginBottom: 16 }}>
            {searchFields.map(f => (
              <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Typography.Text style={{ whiteSpace: 'nowrap', minWidth: 100, textAlign: 'right' }}>{f.label}：</Typography.Text>
                {f.type === 'select' ? (
                  <Select defaultValue={f.options?.[0]} style={{ flex: 1 }}>
                    {f.options?.map(o => <Select.Option key={o} value={o}>{o}</Select.Option>)}
                  </Select>
                ) : (
                  <Input placeholder={f.placeholder} style={{ flex: 1 }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button type="primary">查询</Button>
            <Button>重置</Button>
          </div>
        </Card>

        <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary" danger onClick={() => message.info('批量解冻')}>批量解冻</Button>
            <Button onClick={() => message.info('导出')}>导出</Button>
          </div>
        </Card>

        <Table
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          columns={columns.map(c => c.key === 'action' ? { ...c, render: actionColumn } : c)}
          dataSource={tableData}
          rowKey="index"
          size="middle"
          scroll={{ x: 1400 }}
          pagination={{ pageSize: 10, showTotal: total => `共 ${total} 条` }}
        />

        <Divider style={{ margin: '16px 0' }} />
        <Space size={16}>
          <Button onClick={() => window.history.back()}>返回</Button>
        </Space>
      </Card>
    </PortalLayout>
  );
}
