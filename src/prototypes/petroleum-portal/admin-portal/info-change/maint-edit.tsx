/**
 * @name 维护编辑
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Input, Button, Table, Tabs, message, Row, Col, Form } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const tabItems = [
  { key: 'basic', label: '基本信息维护' },
  { key: 'catalog', label: '服务目录维护' },
];

const columns = [
  { key: 'index', title: '序号', width: 60, align: 'center' as const, dataIndex: 'index' },
  { key: 'code', title: '服务商编码', width: 120, dataIndex: 'code', ellipsis: true },
  { key: 'name', title: '服务商名称', width: 200, dataIndex: 'name', ellipsis: true },
  { key: 'mgmtType', title: '服务商管理类型', width: 120, dataIndex: 'mgmtType', ellipsis: true },
  { key: 'flowStatus', title: '流程状态', width: 100, dataIndex: 'flowStatus', ellipsis: true },
  { key: 'adminUnit', title: '管理单位', width: 140, dataIndex: 'adminUnit', ellipsis: true },
  { key: 'dataSource', title: '数据来源', width: 120, dataIndex: 'dataSource', ellipsis: true },
];

const tableData = [
  { index: '1', code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '待提交', adminUnit: '长庆油田分公司', dataSource: '自助服务管' },
  { index: '2', code: '10000100', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '待提交', adminUnit: '长庆油田分公司', dataSource: '自助服务管' },
  { index: '3', code: '10000100', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理', flowStatus: '已拒绝', adminUnit: '长庆油田分公司', dataSource: '日常信息管' },
  { index: '4', code: '10000100', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理', flowStatus: '已拒绝', adminUnit: '长庆油田分公司', dataSource: '日常信息管' },
  { index: '5', code: '', name: '中海油能源发展股份有限公司', mgmtType: '', flowStatus: '', adminUnit: '', dataSource: '' },
  { index: '6', code: '', name: '杰瑞石油装备技术有限公司', mgmtType: '', flowStatus: '', adminUnit: '', dataSource: '' },
];

export default function MaintEdit() {
  const [activeTab, setActiveTab] = useState('basic');
  const { token: t } = theme.useToken();
  return (
    <PortalLayout groups={adminGroups} activePath="/admin/maint-edit" portalType="admin">
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        <Typography.Text style={{ color: theme.useToken().token.colorPrimary }}>注册服务商审核</Typography.Text>
      </Typography.Text>
      <Typography.Title level={4}>维护编辑</Typography.Title>
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      {activeTab === 'basic' ? (
        <Card size="small" variant="outlined" title="基本信息" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="服务商编码" required>
                <Input placeholder="请输入服务商编码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="服务商名称">
                <Input placeholder="请输入服务商名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="服务商管理类型">
                <Input placeholder="请输入管理类型" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="管理单位">
                <Input placeholder="请输入管理单位" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: 16 }}>
            <Button type="primary" onClick={() => message.success('维护信息已保存')}>保存</Button>
          </Row>
        </Card>
      ) : (
        <>
          <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商编码</Typography.Text>
                  <Input placeholder="请输入" style={{ width: 200 }} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text>
                  <Input placeholder="请输入" style={{ width: 200 }} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>管理单位</Typography.Text>
                  <Input placeholder="请输入" style={{ width: 200 }} />
                </Space>
                <Space size={8}>
                  <Typography.Text style={{ whiteSpace: 'nowrap' }}>数据来源</Typography.Text>
                  <Input placeholder="请输入" style={{ width: 200 }} />
                </Space>
              </div>
              <Button type="primary">查询</Button>
            </Space>
          </Card>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary">创建基本信息维护</Button>
          </div>
          <Table
            columns={columns}
            dataSource={tableData.map((d, i) => ({ ...d, _key: i }))}
            rowKey="_key"
            pagination={false}
            bordered
            size="middle"
          />
        </>
      )}
    </PortalLayout>
  );
}
