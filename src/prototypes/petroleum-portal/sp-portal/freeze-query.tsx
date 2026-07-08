/**
 * @name 冻结解冻查询
 */
import { useState } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { useFilterData } from '../common/hooks';
import { theme, Tabs, Table, Typography, Space, Card, Input, Button, Row, Col } from 'antd';

export default function SpFreezeQuery() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('sp-freeze');

  const columns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'applicant', title: '申请人', dataIndex: 'applicant' },
    { key: 'time', title: '申请时间', dataIndex: 'time' },
    { key: 'unit', title: '申请单位', dataIndex: 'unit' },
    { key: 'type', title: '申请类型', dataIndex: 'type' },
    { key: 'reason', title: '冻结原因', dataIndex: 'reason' },
  ];

  const spFreezeData = [
    { key: 1, index: 1, applicant: '系统自动', time: '2026-02-25 09:56:42', unit: '长庆油田', type: '暂停交易权限', reason: '资质到期' },
    { key: 2, index: 2, applicant: '张三', time: '2026-02-25 09:56:42', unit: '中国石油天然气集团有限公司', type: '恢复交易权限', reason: '未年审通过' },
    { key: 3, index: 3, applicant: '中海油能源发展股份有限公司', time: '', unit: '长庆油田', type: '取消准入资质', reason: '违法违规' },
  ];

  const svcFreezeData = [
    { key: 4, index: 1, applicant: '系统自动', time: '2026-03-01 10:00:00', unit: '长庆油田', type: '暂停服务目录', reason: '资质过期' },
    { key: 5, index: 2, applicant: '李四', time: '2026-03-02 14:30:00', unit: '中国石油天然气集团有限公司', type: '恢复服务目录', reason: '已更新资质' },
    { key: 6, index: 3, applicant: '中海油能源发展股份有限公司', time: '', unit: '长庆油田', type: '取消服务目录', reason: '业务调整' },
  ];

  const { filters, setFilter, clearFilters, filteredData: filteredSpData } = useFilterData(spFreezeData, [
    { key: 'applicant', label: '申请人' },
    { key: 'type', label: '申请类型' },
  ]);

  const { filters: svcFilters, setFilter: setSvcFilter, clearFilters: clearSvcFilters, filteredData: filteredSvcData } = useFilterData(svcFreezeData, [
    { key: 'applicant', label: '申请人' },
    { key: 'type', label: '申请类型' },
  ]);

  const currentData = activeTab === 'sp-freeze' ? filteredSpData : filteredSvcData;
  const currentFilters = activeTab === 'sp-freeze' ? filters : svcFilters;
  const currentSetFilter = activeTab === 'sp-freeze' ? setFilter : setSvcFilter;
  const currentClearFilters = activeTab === 'sp-freeze' ? clearFilters : clearSvcFilters;

  return (
    <PortalLayout groups={spGroups} activePath="/sp/freeze-query" portalType="sp">
      <Space size={16} style={{ marginBottom: 16 }}>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </Space>

      <Tabs
        items={[
          { key: 'sp-freeze', label: '服务商冻结解冻历史' },
          { key: 'svc-freeze', label: '服务目录冻结解冻历史' },
        ]}
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
      />

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>申请人</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={currentFilters.applicant || ''} onChange={e => currentSetFilter('applicant', e.target.value)} />
            </Space>
          </Col>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>申请类型</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={currentFilters.type || ''} onChange={e => currentSetFilter('type', e.target.value)} />
            </Space>
          </Col>
          <Col span={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type="primary" onClick={currentClearFilters}>查询</Button>
          </Col>
        </Row>
      </Card>

      <Table columns={columns} dataSource={currentData} pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }} bordered size="middle" />
    </PortalLayout>
  );
}
