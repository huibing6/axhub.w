/**
 * @name 待配码详情
 * 服务商管理工作台2.0 - 待配码库单据详情
 * 只读查看：基本信息 / 服务品类 / 资质信息
 */
import React from 'react';
import { useState, useMemo } from 'react';
import { theme, Typography, Card, Space, Table, Tabs, Tag } from 'antd';

const rawData = [
  { idx: 1, name: '中海油能源发展股份有限公司', code: '91440300MA5F1234AB', category: '石油钻采设备维保', manageType: '所属企业管理', regDate: '2025-06-15', status: '启用', enabled: true },
  { idx: 2, name: '杰瑞石油装备技术有限公司', code: '913706005971234523', category: '油田化学品供应', manageType: '总部管理', regDate: '2025-07-20', status: '未启用', enabled: false },
  { idx: 3, name: '宝鸡石油钢管有限责任公司', code: '91610300220523456A', category: '管道设备制造', manageType: '所属企业管理', regDate: '2025-05-10', status: '启用', enabled: true },
  { idx: 4, name: '山东科瑞机械制造有限公司', code: '91370500567890123B', category: '钻井设备租赁', manageType: '总部管理', regDate: '2025-08-01', status: '未启用', enabled: false },
  { idx: 5, name: '天津渤海石油装备制造有限公司', code: '91120116MA05CDEF5G', category: '海洋工程设备', manageType: '所属企业管理', regDate: '2025-04-22', status: '启用', enabled: true },
  { idx: 6, name: '四川宏华石油设备有限公司', code: '91510100MA6123456H', category: '钻机成套设备', manageType: '总部管理', regDate: '2025-03-18', status: '未启用', enabled: false },
  { idx: 7, name: '河南中原测控技术有限公司', code: '91410100MA40JKLM7N', category: '油田测井服务', manageType: '所属企业管理', regDate: '2025-09-05', status: '启用', enabled: true },
  { idx: 8, name: '北京石油机械有限公司', code: '91110108MA01PQRST8Q', category: '石油机械配件', manageType: '总部管理', regDate: '2025-02-28', status: '未启用', enabled: false },
];

const serviceDirData = [
  { code: '502010', name: '工程技术服务 / 生产及维修服务', type: '专业', level: '一级' },
  { code: '601010', name: '办公服务 / 物业管理', type: '通用', level: '二级' },
];

const qualData = [
  { type: '营业执照', name: '—', status: '已上传', validTime: '2020-01-01 至 2030-12-31' },
  { type: '专业资质证书', name: '—', status: '已上传', validTime: '2022-06-01 至 2027-05-31' },
  { type: '财务审计报告/银行资信证明', name: '—', status: '已上传', validTime: '2024年度' },
  { type: '质量/安全/环保资质认证', name: '—', status: '已上传', validTime: '永久有效' },
  { type: '无重大违法违规记录承诺', name: '—', status: '已上传', validTime: '永久有效' },
  { type: '信用中国查询（法人及无黑名单）', name: '—', status: '已上传', validTime: '2025-12-01 至 2026-11-30' },
];

function parseNo(): string {
  if (typeof window === 'undefined') return '';
  const hash = window.location.hash.slice(1);
  const query = hash.split('?')[1] || '';
  const params = new URLSearchParams(query);
  return params.get('code') || '';
}

export default function PendingDetail() {
  const { token: t } = theme.useToken();
  const [activeTab, setActiveTab] = useState('basic');

  const record = useMemo(() => {
    const code = parseNo();
    return rawData.find(d => d.code === code) || rawData[0];
  }, []);

  const tabItems = [
    {
      key: 'basic',
      label: '基本信息',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>基础信息</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商名称</Typography.Text>
                <div style={{ marginTop: 2 }}>{record.name}</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码</Typography.Text>
                <div style={{ marginTop: 2 }}>{record.code}</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务商管理类型</Typography.Text>
                <div style={{ marginTop: 2 }}><Tag color={record.manageType === '总部管理' ? 'blue' : 'default'}>{record.manageType}</Tag></div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>注册日期</Typography.Text>
                <div style={{ marginTop: 2 }}>{record.regDate}</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>管理信息</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>是否内部服务商</Typography.Text>
                <div style={{ marginTop: 2 }}>内部服务商</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>授权关系证明</Typography.Text>
                <div style={{ marginTop: 2 }}>长庆油田</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>联系人信息</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>联系人姓名</Typography.Text>
                <div style={{ marginTop: 2 }}>李明</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>联系人手机</Typography.Text>
                <div style={{ marginTop: 2 }}>139****5678</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>联系人固定电话</Typography.Text>
                <div style={{ marginTop: 2 }}>010-88888888</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>联系人邮箱</Typography.Text>
                <div style={{ marginTop: 2 }}>liming@example.com</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>公司情况</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>法定代表人姓名</Typography.Text>
                <div style={{ marginTop: 2 }}>张建国</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>币种</Typography.Text>
                <div style={{ marginTop: 2 }}>人民币（CNY）</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>企业规模</Typography.Text>
                <div style={{ marginTop: 2 }}>大型</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>注册资本</Typography.Text>
                <div style={{ marginTop: 2 }}>5000 万元</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>人员情况</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>服务队伍人数</Typography.Text>
                <div style={{ marginTop: 2 }}>120 人</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>技术人员数量</Typography.Text>
                <div style={{ marginTop: 2 }}>85 人</div>
              </div>
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'service',
      label: '服务品类',
      children: (
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <div>
            <Table
              columns={[
                { key: 'code', title: '服务类目编码', width: 130, dataIndex: 'code' },
                { key: 'name', title: '服务类目名称', dataIndex: 'name' },
                { key: 'type', title: '目录类型', width: 100, align: 'center' as const, dataIndex: 'type', render: (v: string) => <Tag color={v === '专业' ? 'blue' : 'default'}>{v}</Tag> },
                { key: 'level', title: '目录等级', width: 90, align: 'center' as const, dataIndex: 'level' },
              ]}
              dataSource={serviceDirData}
              rowKey="code"
              pagination={false}
              bordered
              size="middle"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Typography.Text strong style={{ fontSize: 14, color: '#ff4d4f' }}>专业目录资格审查</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>工程技术类服务 / 生产及维修服务 (502010)</Typography.Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>资质信用</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>资质等级</Typography.Text>
                <div style={{ marginTop: 2 }}>一级</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>资质证书编号</Typography.Text>
                <div style={{ marginTop: 2 }}>D113045678</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>信用评级</Typography.Text>
                <div style={{ marginTop: 2 }}>AAA</div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>资质证明文件</Typography.Text>
                <div style={{ marginTop: 2 }}><Typography.Link style={{ color: '#ff4d4f' }}>查看文件</Typography.Link></div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ width: 3, height: 14, background: '#ff4d4f', borderRadius: 2, display: 'inline-block' }} />
              <Typography.Text strong style={{ fontSize: 14 }}>服务能力</Typography.Text>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px 24px' }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>主要设备/装备情况</Typography.Text>
                <div style={{ marginTop: 2, color: 'rgba(0,0,0,0.65)', fontSize: 13 }}>
                  拥有国际先进的地震采集系统12套、可控震源车48台、高性能计算集群（峰值算力2.8PFLOPS）、自主研发的GeoEast地震数据处理解释一体化平台。
                </div>
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>技术优势及特色</Typography.Text>
                <div style={{ marginTop: 2, color: 'rgba(0,0,0,0.65)', fontSize: 13 }}>
                  具备宽方位、高密度、全波场三维地震勘探技术能力，拥有12项核心专利技术。
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
    },
    {
      key: 'qualification',
      label: '资质信息',
      children: (
        <Table
          columns={[
            { key: 'type', title: '文件类型', width: 200, dataIndex: 'type' },
            { key: 'name', title: '文件名称', dataIndex: 'name' },
            {
              key: 'status', title: '备注', width: 90, align: 'center' as const, dataIndex: 'status',
              render: (v: string) => <Tag color={v === '已上传' ? 'success' : 'default'}>{v}</Tag>,
            },
            { key: 'validTime', title: '有效时间', width: 220, dataIndex: 'validTime' },
            { key: 'action', title: '操作', width: 100, align: 'center' as const, render: () => <Typography.Link style={{ color: '#ff4d4f', fontSize: 13 }}>预览</Typography.Link> },
          ]}
          dataSource={qualData}
          rowKey="type"
          pagination={false}
          bordered
          size="middle"
        />
      ),
    },
  ];

  return (
    <>
      <Card size="small" variant="outlined" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Space direction="vertical" size={4}>
            <Typography.Link onClick={() => window.history.back()} style={{ color: '#ff4d4f', fontSize: 13, display: 'block', marginBottom: 4 }}>← 返回列表</Typography.Link>
            <Space size={16} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>准入管理</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>&gt;</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>待配码详情</Typography.Text>
            </Space>
            <Typography.Title level={4} style={{ margin: '4px 0 0 0' }}>{record.name}</Typography.Title>
            <Space size={16} style={{ marginTop: 4 }}>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>统一社会信用代码 {record.code}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>注册日期: {record.regDate}</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>管理类型: {record.manageType}</Typography.Text>
            </Space>
          </Space>
          <Tag color={record.enabled ? 'success' : 'default'} style={{ fontSize: 13, padding: '4px 12px' }}>{record.status}</Tag>
        </div>
      </Card>

      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </Card>
    </>
  );
}
