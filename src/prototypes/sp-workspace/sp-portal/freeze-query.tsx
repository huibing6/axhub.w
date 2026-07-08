/**
 * @name 冻结解冻查询
 */
import { useState } from 'react';
import { theme, Tabs, Table, Typography } from 'antd';

export default function SpFreezeQuery() {
  const [activeTab, setActiveTab] = useState('sp-freeze');

  /* ─── Tab 1: 服务商冻结解冻历史 ─── */
  const spColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'applicant', title: '申请人', dataIndex: 'applicant' },
    { key: 'applyTime', title: '申请时间', dataIndex: 'applyTime' },
    { key: 'applyUnit', title: '申请单位', dataIndex: 'applyUnit' },
    { key: 'applyType', title: '申请类型', dataIndex: 'applyType' },
    { key: 'freezeReason', title: '冻结原因', dataIndex: 'freezeReason' },
    { key: 'freezeDuration', title: '冻结时效', dataIndex: 'freezeDuration' },
    { key: 'effectiveTime', title: '生效时间', dataIndex: 'effectiveTime' },
    { key: 'remark', title: '备注意见', dataIndex: 'remark' },
  ];

  const spData = [
    { key: 1, index: 1, applicant: '系统自动', applyTime: '2026-02-25 09:56:42', applyUnit: '长庆油田', applyType: '暂停交易权限', freezeReason: '资质到期', freezeDuration: '', effectiveTime: '2026-02-25 09:56:42', remark: '' },
    { key: 2, index: 2, applicant: '张三', applyTime: '2026-02-25 09:56:42', applyUnit: '中国石油天然气集团有限公司', applyType: '恢复交易权限', freezeReason: '未年审', freezeDuration: '36', effectiveTime: '2026-02-25 09:56:42', remark: '' },
    { key: 3, index: 3, applicant: '中海油能源发展股份有限公司', applyTime: '', applyUnit: '长庆油田', applyType: '取消准入资质', freezeReason: '违法违规', freezeDuration: '', effectiveTime: '2026-02-25 09:56:42', remark: '' },
    { key: 4, index: 4, applicant: '杰瑞石油装备技术有限公司', applyTime: '', applyUnit: '中国石油天然气集团有限公司', applyType: '', freezeReason: '取消资格', freezeDuration: '12', effectiveTime: '', remark: '' },
    { key: 5, index: 5, applicant: '中海油能源发展股份有限公司', applyTime: '', applyUnit: '长庆油田', applyType: '', freezeReason: '', freezeDuration: '', effectiveTime: '', remark: '' },
    { key: 6, index: 6, applicant: '杰瑞石油装备技术有限公司', applyTime: '', applyUnit: '', applyType: '', freezeReason: '', freezeDuration: '', effectiveTime: '', remark: '' },
  ];

  /* ─── Tab 2: 服务品类冻结解冻历史 ─── */
  const svcColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'svcCode', title: '服务品类编码', dataIndex: 'svcCode' },
    { key: 'svcName', title: '服务品类名称', dataIndex: 'svcName' },
    { key: 'applicant', title: '申请人', dataIndex: 'applicant' },
    { key: 'applyTime', title: '申请时间', dataIndex: 'applyTime' },
    { key: 'applyUnit', title: '申请单位', dataIndex: 'applyUnit' },
    { key: 'applyType', title: '申请类型', dataIndex: 'applyType' },
    { key: 'freezeReason', title: '冻结原因', dataIndex: 'freezeReason' },
    { key: 'freezeDuration', title: '冻结时效', dataIndex: 'freezeDuration' },
    { key: 'effectiveTime', title: '生效时间', dataIndex: 'effectiveTime' },
    { key: 'remark', title: '备注', dataIndex: 'remark' },
  ];

  const svcData = [
    { key: 1, index: 1, svcCode: 'S1001000', svcName: '租赁服务', applicant: '张三', applyTime: '2025-09-05 13:43:16', applyUnit: '中国石油集团', applyType: '暂停目录交易权限', freezeReason: '重大质量事故', freezeDuration: '12', effectiveTime: '2025-09-05 13:43:16', remark: '' },
    { key: 2, index: 2, svcCode: 'S1001000', svcName: '租赁服务', applicant: '张三', applyTime: '2025-09-05 13:43:16', applyUnit: '长庆油田', applyType: '恢复目录交易权限', freezeReason: '三年无服务', freezeDuration: '24', effectiveTime: '2025-09-05 13:43:16', remark: '' },
    { key: 3, index: 3, svcCode: 'S1001000', svcName: '租赁服务', applicant: '张三', applyTime: '2025-09-05 13:43:16', applyUnit: '', applyType: '', freezeReason: '', freezeDuration: '36', effectiveTime: '2025-09-05 13:43:16', remark: '' },
    { key: 4, index: 4, svcCode: 'S1001000', svcName: '租赁服务', applicant: '', applyTime: '', applyUnit: '', applyType: '', freezeReason: '', freezeDuration: '', effectiveTime: '2025-09-05 13:43:16', remark: '' },
    { key: 5, index: 5, svcCode: 'S1001000', svcName: '租赁服务', applicant: '', applyTime: '', applyUnit: '', applyType: '', freezeReason: '', freezeDuration: '', effectiveTime: '2025-09-05 13:43:16', remark: '' },
    { key: 6, index: 6, svcCode: 'S1001000', svcName: '租赁服务', applicant: '', applyTime: '', applyUnit: '', applyType: '', freezeReason: '', freezeDuration: '', effectiveTime: '2025-09-05 13:43:16', remark: '' },
  ];

  return (
    <div>
      {/* 信息行 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
        items={[
          {
            key: 'sp-freeze',
            label: <span style={{ color: activeTab === 'sp-freeze' ? '#ff4d4f' : undefined, fontWeight: activeTab === 'sp-freeze' ? 500 : undefined }}>服务商冻结解冻历史</span>,
          },
          {
            key: 'svc-freeze',
            label: <span style={{ color: activeTab === 'svc-freeze' ? '#ff4d4f' : undefined, fontWeight: activeTab === 'svc-freeze' ? 500 : undefined }}>服务品类冻结解冻历史</span>,
          },
        ]}
      />

      {/* 表格 */}
      {activeTab === 'sp-freeze' ? (
        <Table
          columns={spColumns}
          dataSource={spData}
          pagination={{ pageSize: 10, showTotal: (total: number) => `共 ${total} 条` }}
          bordered
          size="middle"
        />
      ) : (
        <Table
          columns={svcColumns}
          dataSource={svcData}
          pagination={{ pageSize: 10, showTotal: (total: number) => `共 ${total} 条` }}
          bordered
          size="middle"
        />
      )}
    </div>
  );
}
