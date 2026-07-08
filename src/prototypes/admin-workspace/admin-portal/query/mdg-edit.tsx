/**
 * @name MDG信息编辑
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Button, Input, Select, Form, DatePicker, Modal, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

export default function MdgEditPage() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();
  const [changeOpen, setChangeOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [changeItems, setChangeItems] = useState<{ field: string; value: string }[]>([{ field: '', value: '' }]);

  const fieldOptions = [
    { value: '法定代表人姓名', label: '法定代表人姓名' },
    { value: '联系电话', label: '联系电话' },
    { value: '注册资本', label: '注册资本' },
    { value: '币种', label: '币种' },
    { value: '成立日期', label: '成立日期' },
    { value: '注册地址', label: '注册地址' },
    { value: '经营范围', label: '经营范围' },
    { value: '联系人邮箱', label: '联系人邮箱' },
  ];

  const historyData = [
    { idx: 1, field: '法定代表人姓名', oldValue: '张三', newValue: '李四', changeTime: '2025-12-19 09:15', operator: '张三' },
    { idx: 2, field: '联系电话', oldValue: '13800000000', newValue: '13900000000', changeTime: '2025-12-17 15:03', operator: '李四' },
  ];

  const historyColumns = [
    { key: 'field', title: '变更字段', dataIndex: 'field' },
    { key: 'oldValue', title: '原值', dataIndex: 'oldValue' },
    { key: 'newValue', title: '变更为', dataIndex: 'newValue' },
    { key: 'changeTime', title: '变更时间', dataIndex: 'changeTime' },
    { key: 'operator', title: '操作人', dataIndex: 'operator' },
  ];

  const addChangeItem = () => {
    setChangeItems(prev => [...prev, { field: '', value: '' }]);
  };

  const removeChangeItem = (index: number) => {
    setChangeItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateChangeItem = (index: number, key: 'field' | 'value', val: string) => {
    setChangeItems(prev => prev.map((item, i) => i === index ? { ...item, [key]: val } : item));
  };

  const handleBack = () => {
    window.location.hash = '#/admin/mdg-query';
  };

  const handleSubmit = () => {
    handleBack();
  };

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/mdg-query" portalType="admin">
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Space size={48}>
          <Typography.Text>供应商名称：<Typography.Text strong>石油外部一般往来单位22</Typography.Text></Typography.Text>
          <Typography.Text>供应商编码：<Typography.Text strong>—</Typography.Text></Typography.Text>
          <Typography.Text>供应商状态：<Typography.Text strong>—</Typography.Text></Typography.Text>
        </Space>
      </Card>
      <Form form={form} layout="vertical">
        <Card size="small" title="申请信息" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Form.Item label="申请人（员工编号）" name="applicant" rules={[{ required: true }]}>
              <Input placeholder="请输入申请人" defaultValue="80021903" />
            </Form.Item>
            <Form.Item label="申请原因" name="applyReason" rules={[{ required: true }]}>
              <Input placeholder="请输入申请原因" />
            </Form.Item>
          </div>
        </Card>
        <Card
          size="small"
          title="基础信息"
          extra={
            <Space>
              <Button type="primary" danger size="small" onClick={() => { setChangeItems([{ field: '', value: '' }]); setChangeOpen(true); }}>基础信息变更</Button>
              <Button type="primary" danger size="small" onClick={() => setHistoryOpen(true)}>基础信息变更历史</Button>
            </Space>
          }
          style={{ marginBottom: 16 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>供应商名称</Typography.Text>
              <Input defaultValue="石油外部一般往来单位22" disabled />
            </div>
            <div />
            <Form.Item label="证件类型" name="docType">
              <Select defaultValue="02" options={[{ value: '02', label: '02 三证合一' }]} />
            </Form.Item>
            <Form.Item label="国家" name="country">
              <Select defaultValue="中国" options={[{ value: '中国', label: '中国' }]} />
            </Form.Item>
            <Form.Item label="城市" name="city">
              <Input defaultValue="丰台区" />
            </Form.Item>
            <Form.Item label="邮编" name="zipCode">
              <Input defaultValue="075100" />
            </Form.Item>
            <Form.Item label="注册资本" name="regCapital">
              <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="54" style={{ width: 'calc(100% - 60px)' }} />
                <Select defaultValue="万" style={{ width: 60 }} options={[{ value: '万', label: '万' }, { value: '亿', label: '亿' }]} />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="成立日期" name="establishDate">
              <DatePicker style={{ width: '100%' }} defaultValue={undefined} />
            </Form.Item>
            <Form.Item label="省/直辖市" name="province">
              <Select defaultValue="北京市" options={[{ value: '北京市', label: '北京市' }]} />
            </Form.Item>
            <Form.Item label="注册地址" name="regAddress">
              <Input defaultValue="北京" />
            </Form.Item>
            <Form.Item label="法定代表人姓名" name="legalPerson">
              <Input defaultValue="节节" />
            </Form.Item>
            <Form.Item label="币种" name="currency">
              <Select defaultValue="美元" options={[{ value: '美元', label: '美元' }, { value: '人民币', label: '人民币' }]} />
            </Form.Item>
            <Form.Item label="联系电话" name="phone">
              <Input defaultValue="15512145834" />
            </Form.Item>
          </div>
        </Card>
        <Card size="small" title="MDG信息" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <Form.Item label="单位分类（供应商账户）" name="mdgUnitClass" rules={[{ required: true }]}>
              <Select placeholder="请选择" />
            </Form.Item>
            <Form.Item label="单位简称（供应商简称）" name="mdgUnitShort" rules={[{ required: true }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="企业规模" name="mdgScale" rules={[{ required: true }]}>
              <Select defaultValue="微型" options={[{ value: '微型', label: '微型' }, { value: '小型', label: '小型' }, { value: '中型', label: '中型' }, { value: '大型', label: '大型' }]} />
            </Form.Item>
            <Form.Item label="备注" name="mdgRemark">
              <Input placeholder="请输入备注" />
            </Form.Item>
            <Form.Item label="公司代码" name="mdgCompanyCode" rules={[{ required: true }]}>
              <Select defaultValue="长庆油田分公司成本控制范围" options={[{ value: '长庆油田分公司成本控制范围', label: '长庆油田分公司成本控制范围' }]} />
            </Form.Item>
            <Form.Item label="关联人士香港联交所" name="mdgHkExchange">
              <Select placeholder="请选择" />
            </Form.Item>
            <Form.Item label="所属集团类型" name="mdgGroupType">
              <Select defaultValue="外部单位>其他外部单位>国有" options={[{ value: '外部单位>其他外部单位>国有', label: '外部单位>其他外部单位>国有' }]} />
            </Form.Item>
            <Form.Item label="注册地区" name="mdgRegRegion" rules={[{ required: true }]}>
              <Select defaultValue="中国" options={[{ value: '中国', label: '中国' }]} />
            </Form.Item>
            <Form.Item label="所属行业" name="mdgIndustry" rules={[{ required: true }]}>
              <Select defaultValue="农、林、牧、渔业" options={[{ value: '农、林、牧、渔业', label: '农、林、牧、渔业' }]} />
            </Form.Item>
            <Form.Item label="客户资料附件" name="mdgCustomerDoc">
              <Select defaultValue="无" options={[{ value: '无', label: '无' }]} />
            </Form.Item>
            <Form.Item label="经营状况" name="mdgOperateStatus" rules={[{ required: true }]}>
              <Select defaultValue="存续（在营、开业、在册）" options={[{ value: '存续（在营、开业、在册）', label: '存续（在营、开业、在册）' }]} />
            </Form.Item>
            <Form.Item label="公司曾用名" name="mdgFormerName">
              <Input placeholder="请输入公司曾用名" />
            </Form.Item>
            <Form.Item label="贸易伙伴" name="mdgTradePartner" rules={[{ required: true }]}>
              <Select defaultValue="外部" options={[{ value: '外部', label: '外部' }, { value: '内部', label: '内部' }]} />
            </Form.Item>
          </div>
          <Typography.Link style={{ fontSize: 12, color: '#1677ff' }}>按照当前MDG程序规范的伙伴仅选择（外部）</Typography.Link>
        </Card>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
        <Button onClick={handleBack}>返回</Button>
        <Button type="primary" danger onClick={handleSubmit}>同步发送</Button>
      </div>
      <Modal
        title="基础信息变更"
        open={changeOpen}
        onCancel={() => setChangeOpen(false)}
        onOk={() => { setChangeOpen(false); }}
        okButtonProps={{ danger: true }}
        width={700}
      >
        <Table
          columns={[
            {
              key: 'field', title: '变更字段', dataIndex: 'field', width: 250,
              render: (_: unknown, __: unknown, index: number) => (
                <Space>
                  <MinusCircleOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => removeChangeItem(index)} />
                  <Select
                    placeholder="请选择"
                    style={{ width: 200 }}
                    value={changeItems[index]?.field || undefined}
                    onChange={(val) => updateChangeItem(index, 'field', val)}
                    options={fieldOptions}
                  />
                </Space>
              ),
            },
            {
              key: 'value', title: '变更为', dataIndex: 'value',
              render: (_: unknown, __: unknown, index: number) => (
                <Input
                  placeholder="请输入"
                  value={changeItems[index]?.value || ''}
                  onChange={(e) => updateChangeItem(index, 'value', e.target.value)}
                />
              ),
            },
          ]}
          dataSource={changeItems.map((_, i) => ({ _key: i }))}
          rowKey="_key"
          pagination={false}
          bordered
          size="middle"
          footer={() => (
            <Button type="link" icon={<PlusOutlined />} onClick={addChangeItem}>添加</Button>
          )}
        />
      </Modal>
      <Modal
        title="基础信息变更历史"
        open={historyOpen}
        onCancel={() => setHistoryOpen(false)}
        footer={<Button type="primary" danger onClick={() => setHistoryOpen(false)}>关闭</Button>}
        width={700}
      >
        <Table
          columns={historyColumns}
          dataSource={historyData}
          rowKey="idx"
          pagination={false}
          bordered
          size="middle"
        />
      </Modal>
    </PortalLayout>
  );
}
