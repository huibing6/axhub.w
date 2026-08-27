/**
 * @name 正式服务商查询
 */
import React from 'react';
import { useState } from 'react';
import { Typography, Input, Select, Button, Table, Card, Row, Col, Tag, Space, Tooltip, message } from 'antd';

const currentUnit = '大庆油田';

interface ServiceCategory {
  code: string;
  name: string;
  type: '专业' | '通用';
  certified: boolean;
}

interface FormalRow {
  seq: number;
  code: string;
  name: string;
  mgmtType: string;
  useUnits: string[];
  status: string;
  creditCode: string;
  regTime: string;
  categories: ServiceCategory[];
}

const formalData: FormalRow[] = [
  {
    seq: 1, code: '1000020022', name: '中海油能源发展股份有限公司', mgmtType: '所属企业管理',
    useUnits: ['长庆油田', '大庆油田', '西南油气田'], status: '正常', creditCode: '91420000706802345X', regTime: '2025-12-19 09:15',
    categories: [
      { code: 'S0101000', name: '咨询服务', type: '专业', certified: true },
      { code: 'S0401000', name: '仓储物流', type: '通用', certified: true },
      { code: 'S0501000', name: '科技服务', type: '专业', certified: false },
    ],
  },
  {
    seq: 2, code: '1000030033', name: '杰瑞石油装备技术有限公司', mgmtType: '总部管理',
    useUnits: ['长庆油田', '新疆油田'], status: '暂停', creditCode: '91420000706802345X', regTime: '2025-12-17 15:03',
    categories: [
      { code: 'S0301000', name: '设备制造', type: '专业', certified: true },
    ],
  },
  {
    seq: 3, code: '1000040044', name: '宝鸡石油钢管有限责任公司', mgmtType: '所属企业管理',
    useUnits: ['大庆油田', '辽河油田', '吉林油田', '大港油田'], status: '正常', creditCode: '91420000706802345X', regTime: '2025-12-16 10:20',
    categories: [
      { code: 'S0301000', name: '设备制造', type: '专业', certified: false },
      { code: 'S0401000', name: '仓储物流', type: '通用', certified: false },
    ],
  },
  {
    seq: 4, code: '1000050055', name: '山东科瑞机械制造有限公司', mgmtType: '总部管理',
    useUnits: [], status: '正常', creditCode: '91420000706802345X', regTime: '2025-12-14 11:08',
    categories: [
      { code: 'S0401000', name: '仓储物流', type: '通用', certified: true },
    ],
  },
  {
    seq: 5, code: '1000060066', name: '天津渤海石油装备制造有限公司', mgmtType: '所属企业管理',
    useUnits: ['长庆油田'], status: '正常', creditCode: '91420000706802345X', regTime: '2025-12-13 08:45',
    categories: [
      { code: 'S0102000', name: '勘查服务', type: '专业', certified: true },
      { code: 'S0401000', name: '仓储物流', type: '通用', certified: true },
    ],
  },
  {
    seq: 6, code: '1000070077', name: '四川宏华石油设备有限公司', mgmtType: '总部管理',
    useUnits: ['西南油气田', '塔里木油田'], status: '正常', creditCode: '91420000706802345X', regTime: '2025-12-12 14:20',
    categories: [
      { code: 'S0201000', name: '物化探服务', type: '专业', certified: false },
    ],
  },
];

const statusColors: Record<string, string> = {
  '正常': 'success',
  '暂停': 'warning',
  '取消': 'default',
};

const UseUnitTags = ({ units }: { units: string[] }) => {
  if (units.length === 0) return <Typography.Text type="secondary">—</Typography.Text>;
  const show = units.slice(0, 2);
  const more = units.slice(2);
  return (
    <Space size={4} wrap>
      {show.map(u => (
        <Tag key={u} color={u === currentUnit ? 'blue' : 'default'} style={{ margin: 0 }}>{u}</Tag>
      ))}
      {more.length > 0 && (
        <Tooltip title={more.join('、')}>
          <Tag style={{ margin: 0, cursor: 'pointer' }}>+{more.length}</Tag>
        </Tooltip>
      )}
    </Space>
  );
};

const CertBadges = ({ categories }: { categories: ServiceCategory[] }) => {
  const hasPro = categories.some(c => c.type === '专业' && c.certified);
  const hasGen = categories.some(c => c.type === '通用' && c.certified);
  if (!hasPro && !hasGen) return null;
  return (
    <Space size={4}>
      {hasPro && (
        <Tooltip title="有专业品类且已通过资质认证">
          <Tag color="red" style={{ margin: 0, cursor: 'pointer', fontSize: 12, padding: '0 4px', lineHeight: '18px' }}>专</Tag>
        </Tooltip>
      )}
      {hasGen && (
        <Tooltip title="有通用品类且使用单位已认证">
          <Tag color="blue" style={{ margin: 0, cursor: 'pointer', fontSize: 12, padding: '0 4px', lineHeight: '18px' }}>通</Tag>
        </Tooltip>
      )}
    </Space>
  );
};

export default function SpQueryFormal() {
  const [searchName, setSearchName] = useState('');
  const [searchMgmtType, setSearchMgmtType] = useState<string | undefined>(undefined);
  const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);
  const [searchUseUnit, setSearchUseUnit] = useState<string | undefined>(undefined);
  const [searchCert, setSearchCert] = useState<string[]>([]);
  const [data, setData] = useState(formalData);

  const filteredData = data.filter(d => {
    if (searchName && !d.name.includes(searchName)) return false;
    if (searchMgmtType && d.mgmtType !== searchMgmtType) return false;
    if (searchStatus && d.status !== searchStatus) return false;
    if (searchUseUnit && !d.useUnits.includes(searchUseUnit)) return false;
    if (searchCert.length > 0) {
      const hasPro = d.categories.some(c => c.type === '专业' && c.certified);
      const hasGen = d.categories.some(c => c.type === '通用' && c.certified);
      if (searchCert.includes('professional') && !hasPro) return false;
      if (searchCert.includes('general') && !hasGen) return false;
    }
    return true;
  });

  const handleReset = () => {
    setSearchName('');
    setSearchMgmtType(undefined);
    setSearchStatus(undefined);
    setSearchUseUnit(undefined);
    setSearchCert([]);
  };

  const handleAddUnit = (seq: number) => {
    setData(prev => prev.map(d => d.seq === seq ? { ...d, useUnits: [...d.useUnits, currentUnit] } : d));
    message.success(`已将「${currentUnit}」添加为使用单位`);
  };

  const handleRemoveUnit = (seq: number) => {
    setData(prev => prev.map(d => d.seq === seq ? { ...d, useUnits: d.useUnits.filter(u => u !== currentUnit) } : d));
    message.success(`已移除「${currentUnit}」使用关系`);
  };

  const unitOptions = Array.from(new Set(data.flatMap(d => d.useUnits))).map(u => ({ label: u, value: u }));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>正式服务商查询</Typography.Title>
        <Button type="primary" danger>导出</Button>
      </div>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>服务商名称</Typography.Text><Input placeholder="请输入服务商名称" style={{ width: 200 }} value={searchName} onChange={e => setSearchName(e.target.value)} /></Space></Col>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>管理类型</Typography.Text><Select style={{ width: 200 }} placeholder="全部" allowClear value={searchMgmtType} onChange={setSearchMgmtType} options={[{ value: '所属企业管理', label: '所属企业管理' }, { value: '总部管理', label: '总部管理' }]} /></Space></Col>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>使用单位</Typography.Text><Select style={{ width: 200 }} placeholder="全部" allowClear value={searchUseUnit} onChange={setSearchUseUnit} options={unitOptions} /></Space></Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 12 }}>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>状态</Typography.Text><Select style={{ width: 200 }} placeholder="全部" allowClear value={searchStatus} onChange={setSearchStatus} options={[{ value: '正常', label: '正常' }, { value: '暂停', label: '暂停' }, { value: '取消', label: '取消' }]} /></Space></Col>
          <Col><Space size={8}><Typography.Text style={{ whiteSpace: 'nowrap' }}>认证标签</Typography.Text><Select mode="multiple" style={{ width: 260 }} placeholder="全部" allowClear value={searchCert} onChange={setSearchCert} options={[{ value: 'professional', label: '专业认证' }, { value: 'general', label: '通用认证' }]} /></Space></Col>
        </Row>
        <Row gutter={24}>
          <Col><Space size={8}><Button type="primary" danger>查询</Button><Button onClick={handleReset}>重置</Button></Space></Col>
        </Row>
      </Card>
      <Table
        columns={[
          { key: 'seq', title: '序号', width: 60, align: 'center' as const, dataIndex: 'seq' },
          { key: 'code', title: '服务商编码', dataIndex: 'code', width: 120 },
          {
            key: 'name', title: '服务商名称', dataIndex: 'name', ellipsis: true,
            render: (name: string, record: FormalRow) => (
              <Space size={6}>
                <CertBadges categories={record.categories} />
                <span>{name}</span>
              </Space>
            ),
          },
          { key: 'mgmtType', title: '管理类型', dataIndex: 'mgmtType', width: 130 },
          { key: 'useUnits', title: '使用单位', dataIndex: 'useUnits', width: 200, render: (units: string[]) => <UseUnitTags units={units} /> },
          { key: 'status', title: '状态', dataIndex: 'status', width: 80, align: 'center' as const, render: (val: string) => val ? <Tag color={statusColors[val]}>{val}</Tag> : '—' },
          { key: 'creditCode', title: '统一社会信用代码', dataIndex: 'creditCode', width: 180, ellipsis: true },
          { key: 'regTime', title: '注册时间', dataIndex: 'regTime', width: 160 },
          {
            key: 'action', title: '操作', width: 150, align: 'center' as const,
            render: (_: unknown, record: FormalRow) => (
              <Space size={4}>
                <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => window.location.hash = '#/admin/sp-query-formal-detail'}>查看</Typography.Link>
                <Typography.Text type="secondary">|</Typography.Text>
                {record.useUnits.includes(currentUnit)
                  ? <Typography.Link style={{ color: '#999' }} onClick={() => handleRemoveUnit(record.seq)}>移除</Typography.Link>
                  : <Typography.Link style={{ color: '#ff4d4f' }} onClick={() => handleAddUnit(record.seq)}>添加</Typography.Link>
                }
              </Space>
            ),
          },
        ]}
        dataSource={filteredData} rowKey="seq" pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }} bordered size="middle"
      />
    </div>
  );
}
