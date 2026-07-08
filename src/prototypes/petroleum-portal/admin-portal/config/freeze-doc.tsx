/**
 * @name 冻结资质文件设定
 */
import { useState } from 'react';
import { theme, Typography, Card, Tabs, Checkbox, Button, message, Space } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const tabItems = [
  { key: 'supplier', label: '供应商资质类型冻结参数设置' },
  { key: 'region', label: '地区公司资质自动冻结设定' },
];

const leftColumns = [
  { name: '企业营业执照', checked: true },
  { name: '组织机构代码证', checked: false },
  { name: '税务登记证', checked: false },
  { name: '代理授权证书', checked: false },
  { name: '银行开户证明', checked: false },
  { name: '银行资信证明', checked: false },
  { name: '获奖证书', checked: false },
  { name: '质量管理体系认证证书', checked: true },
  { name: '权威机构颁发的证书', checked: false },
];

const rightColumns = [
  { name: '近三年销售业绩清单', checked: false },
  { name: '相关生产许可证(如需)', checked: false },
  { name: '检验报告/出厂合格证(如需)', checked: false },
  { name: '变更核准通知书', checked: false },
  { name: '安全管理体系认证证书', checked: true },
  { name: '环保管理体系认证证书', checked: true },
  { name: '供应商准入承诺书', checked: false },
  { name: '统一社会信用代码证', checked: true },
  { name: '其它材料', checked: false },
];

export default function FreezeDoc() {
  const [activeTab, setActiveTab] = useState('supplier');
  const [leftChecked, setLeftChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(leftColumns.map((c, i) => [i, c.checked]))
  );
  const [rightChecked, setRightChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(rightColumns.map((c, i) => [i, c.checked]))
  );
  const { token: t } = theme.useToken();

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/freeze-doc" portalType="admin">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>冻结资质文件设定</Typography.Title>
        <Button type="primary" onClick={() => message.success('冻结资质文件设定已保存')}>保存配置</Button>
      </div>
      <Card size="small" variant="outlined">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 16 }}>
          <div>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: t.colorBgLayout }}>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>供应商资质类型名称</th>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>是否自动冻结</th>
                </tr>
              </thead>
              <tbody>
                {leftColumns.map((col, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'transparent' }}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>{col.name}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>
                      <Checkbox checked={!!leftChecked[i]} onChange={() => setLeftChecked(prev => ({ ...prev, [i]: !prev[i] }))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: t.colorBgLayout }}>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>供应商资质类型名称</th>
                  <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>是否自动冻结</th>
                </tr>
              </thead>
              <tbody>
                {rightColumns.map((col, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'transparent' }}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>{col.name}</td>
                    <td style={{ padding: '10px 16px', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>
                      <Checkbox checked={!!rightChecked[i]} onChange={() => setRightChecked(prev => ({ ...prev, [i]: !prev[i] }))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </PortalLayout>
  );
}
