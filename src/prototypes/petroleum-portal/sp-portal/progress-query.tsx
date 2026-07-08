/**
 * @name 进度查询
 */
import { useState } from 'react';
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { useFilterData } from '../common/hooks';
import { theme, Tabs, Table, Typography, Space, Card, Input, Button, Row, Col, message } from 'antd';

export default function SpProgressQuery() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('sp-info');

  const spColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'name', title: '服务商名称', dataIndex: 'name' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'time', title: '申请时间', dataIndex: 'time' },
    { key: 'type', title: '申请类别', dataIndex: 'type' },
  ];

  const spData = [
    { key: 1, index: 1, name: '中海油能源发展股份有限公司', unit: '长庆油田', time: '所属企业管理', type: '新增准入' },
    { key: 2, index: 2, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', time: '总部管理', type: '变更申请' },
    { key: 3, index: 3, name: '中海油能源发展股份有限公司', unit: '长庆油田', time: '', type: '资质维护申请' },
    { key: 4, index: 4, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', time: '', type: '' },
    { key: 5, index: 5, name: '中海油能源发展股份有限公司', unit: '长庆油田', time: '', type: '' },
    { key: 6, index: 6, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', time: '', type: '' },
  ];

  const svcColumns = [
    { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
    { key: 'name', title: '服务商名称', dataIndex: 'name' },
    { key: 'unit', title: '管理单位', dataIndex: 'unit' },
    { key: 'time', title: '申请时间', dataIndex: 'time' },
    { key: 'type', title: '申请类别', dataIndex: 'type' },
  ];

  const svcData = [
    { key: 1, index: 1, name: '中海油能源发展股份有限公司', unit: '长庆油田', time: '', type: '' },
    { key: 2, index: 2, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', time: '', type: '' },
    { key: 3, index: 3, name: '中海油能源发展股份有限公司', unit: '长庆油田', time: '', type: '' },
    { key: 4, index: 4, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', time: '', type: '' },
    { key: 5, index: 5, name: '中海油能源发展股份有限公司', unit: '长庆油田', time: '', type: '' },
    { key: 6, index: 6, name: '杰瑞石油装备技术有限公司', unit: '中国石油天然气集团有限公司', time: '', type: '' },
  ];

  const filterFields = [
    { key: 'name', label: '服务商名称' },
    { key: 'type', label: '申请类别' },
  ];

  const { filters, setFilter, clearFilters, filteredData: filteredSpData } = useFilterData(spData, filterFields);
  const { filters: svcFilters, setFilter: setSvcFilter, clearFilters: clearSvcFilters, filteredData: filteredSvcData } = useFilterData(svcData, filterFields);

  return (
    <PortalLayout groups={spGroups} activePath="/sp/progress-query" portalType="sp">
      <Space size={16} style={{ marginBottom: 16 }}>
        <Typography.Text type="secondary">服务商名称：中海油能源发展股份有限公司</Typography.Text>
        <Typography.Text type="secondary">服务商编码：100001231</Typography.Text>
        <Typography.Text type="secondary">服务商状态：正常</Typography.Text>
      </Space>

      <Tabs
        items={[
          { key: 'sp-info', label: '服务商信息' },
          { key: 'svc-info', label: '服务品类信息' },
        ]}
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
      />

      <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>服务商名称</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={activeTab === 'sp-info' ? (filters.name || '') : (svcFilters.name || '')} onChange={e => { const fn = activeTab === 'sp-info' ? setFilter : setSvcFilter; fn('name', e.target.value); }} />
            </Space>
          </Col>
          <Col span={8}>
            <Space size={8}>
              <Typography.Text>申请类别</Typography.Text>
              <Input size="small" style={{ width: 180 }} value={activeTab === 'sp-info' ? (filters.type || '') : (svcFilters.type || '')} onChange={e => { const fn = activeTab === 'sp-info' ? setFilter : setSvcFilter; fn('type', e.target.value); }} />
            </Space>
          </Col>
          <Col span={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type="primary" onClick={() => { activeTab === 'sp-info' ? clearFilters() : clearSvcFilters(); }}>查询</Button>
          </Col>
        </Row>
      </Card>

      {activeTab === 'sp-info' ? (
        <Table columns={spColumns} dataSource={filteredSpData} pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }} bordered size="middle" />
      ) : (
        <Table columns={svcColumns} dataSource={filteredSvcData} pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }} bordered size="middle" />
      )}
    </PortalLayout>
  );
}
