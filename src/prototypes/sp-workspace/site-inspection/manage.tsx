/**
 * @name 现场考察管理-服务商端
 */
import { useState } from 'react';
import { Table, Button, Typography, Row, Col, Input, Select, Card, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFilterData } from '../common/hooks';

const { TextArea } = Input;

const data = [
  { index: 1, code: '12343', name: '市政绿化服务考察', type: '实地考察', status: '草稿', creator: '三阿', createTime: '2026-06-24' },
  { index: 2, code: '12343', name: '租赁服务实地考察', type: '视频考察', status: '审批中', creator: '三阿', createTime: '2026-06-24' },
  { index: 3, code: '12343', name: '市政绿化服务考察', type: '实地考察', status: '审批拒绝', creator: '三阿', createTime: '2026-06-24' },
  { index: 4, code: '12343', name: '租赁服务实地考察', type: '视频考察', status: '审批通过', creator: '三阿', createTime: '2026-06-24' },
  { index: 5, code: '12343', name: '市政绿化服务考察', type: '实地考察', status: '', creator: '', createTime: '2026-06-24' },
  { index: 6, code: '12343', name: '租赁服务实地考察', type: '视频考察', status: '', creator: '', createTime: '2026-06-24' },
];

export default function SiteInspectionManage() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [searchCode, setSearchCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);

  const { filteredData, setFilter } = useFilterData(data, [
    { key: 'code', label: '考察方案编号' },
    { key: 'name', label: '考察方案名称' },
    { key: 'type', label: '考察类型' },
    { key: 'status', label: '状态' },
  ]);

  const handleSearch = () => {
    setFilter('code', searchCode);
    setFilter('name', searchName);
    setFilter('type', searchType || '');
    setFilter('status', searchStatus || '');
  };

  const handleReset = () => {
    setSearchCode('');
    setSearchName('');
    setSearchType(undefined);
    setSearchStatus(undefined);
    setFilter('code', '');
    setFilter('name', '');
    setFilter('type', '');
    setFilter('status', '');
  };

  const renderActions = (record: typeof data[0]) => {
    const links: React.ReactNode[] = [];
    links.push(<Typography.Link key="view" style={{ color: '#1677ff' }}>查看</Typography.Link>);
    if (record.status === '草稿' || record.status === '审批拒绝') {
      links.push(<Typography.Link key="edit" style={{ color: '#1677ff' }}>编辑</Typography.Link>);
      links.push(<Typography.Link key="cancel" style={{ color: '#1677ff' }}>取消</Typography.Link>);
    }
    return (
      <span>
        {links.map((link, i) => (
          <span key={i}>{i > 0 && <span style={{ margin: '0 4px' }}>、</span>}{link}</span>
        ))}
      </span>
    );
  };

  if (view === 'form') {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>录入考察结果</Typography.Title>
        </div>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>考察方案</div>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="考察方案名称">
                  <Input placeholder="请输入考察方案名称" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="考察类型">
                  <Select defaultValue="实地考察" placeholder="请选择考察类型">
                    <Select.Option value="实地考察">实地考察</Select.Option>
                    <Select.Option value="视频考察">视频考察</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="考察日期">
                  <Input placeholder="请选择考察日期" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="联系人">
                  <Input placeholder="请输入联系人" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="联系方式">
                  <Input placeholder="请输入联系方式" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="考察内容">
              <TextArea rows={4} placeholder="请输入考察内容" />
            </Form.Item>
            <Form.Item label="附件">
              <Typography.Link style={{ color: '#1677ff' }}>上传文件</Typography.Link>
            </Form.Item>
          </Form>
        </Card>

        <Card variant="outlined" size="small" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>考察对象</div>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="服务品类编码">
                  <Input placeholder="请输入服务品类编码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="服务品类名称">
                  <Input placeholder="请输入服务品类名称" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="服务品类级别">
                  <Input value="二级" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="服务品类类型">
                  <Input value="通用" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="服务情况">
              <TextArea rows={4} placeholder="企业概况、经营情况、服务质量、ESG等情况说明" />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="考察得分">
                  <Input placeholder="请输入考察得分" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="考察结果">
                  <Select defaultValue="通过" placeholder="请选择考察结果">
                    <Select.Option value="通过">通过</Select.Option>
                    <Select.Option value="不通过">不通过</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="附件">
              <Typography.Link style={{ color: '#1677ff' }}>上传文件</Typography.Link>
            </Form.Item>
          </Form>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          <Button onClick={() => setView('list')}>取消</Button>
          <Button>保存</Button>
          <Button type="primary" danger>提交审核</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0 }}>现场考察管理</Typography.Title>

      <div style={{ marginBottom: 16 }}>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col>
            <span style={{ marginRight: 8 }}>考察方案编号</span>
            <Input
              placeholder="请输入考察方案编号"
              style={{ width: 200 }}
              value={searchCode}
              onChange={e => setSearchCode(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
          <Col>
            <span style={{ marginRight: 8 }}>考察方案名称</span>
            <Input
              placeholder="请输入考察方案名称"
              style={{ width: 200 }}
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
            <span style={{ marginRight: 8 }}>考察类型</span>
            <Select
              style={{ width: 200 }}
              placeholder="全部"
              allowClear
              value={searchType}
              onChange={v => setSearchType(v)}
              options={[
                { value: '实地考察', label: '实地考察' },
                { value: '视频考察', label: '视频考察' },
              ]}
            />
          </Col>
          <Col>
            <span style={{ marginRight: 8 }}>状态</span>
            <Select
              style={{ width: 200 }}
              placeholder="全部"
              allowClear
              value={searchStatus}
              onChange={v => setSearchStatus(v)}
              options={[
                { value: '草稿', label: '草稿' },
                { value: '审批中', label: '审批中' },
                { value: '审批拒绝', label: '审批拒绝' },
                { value: '审批通过', label: '审批通过' },
              ]}
            />
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" danger onClick={() => setView('form')}>录入考察结果</Button>
      </div>

      <Table
        columns={[
          { key: 'index', title: '序号', width: 80, align: 'center' as const, dataIndex: 'index' },
          { key: 'code', title: '考察方案编号', dataIndex: 'code' },
          { key: 'name', title: '考察方案名称', dataIndex: 'name' },
          { key: 'type', title: '考察类型', dataIndex: 'type' },
          { key: 'status', title: '状态', dataIndex: 'status', width: 120 },
          { key: 'creator', title: '创建人', dataIndex: 'creator', width: 100 },
          { key: 'createTime', title: '创建时间', dataIndex: 'createTime', width: 140 },
          {
            key: 'action',
            title: '操作',
            width: 180,
            render: (_: unknown, record: typeof data[0]) => renderActions(record),
          },
        ]}
        dataSource={filteredData.map((d, i) => ({ ...d, _key: i }))}
        rowKey="_key"
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `共 ${t} 条` }}
        bordered
        size="middle"
      />
    </div>
  );
}
