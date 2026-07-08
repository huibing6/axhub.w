/**
 * @name 要件配置
 */
import { useState } from 'react';
import { theme, Typography, Card, Space, Select, Checkbox, Button, message } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const workOrderTypes = [
  '供应商新增准入',
  '内部企业准入',
  '进出口物流商准入',
  '代理商备案',
  '公开招标采购项目中标',
  '供应商更名',
  '服务范围重审',
  '同小类增项',
  '跨小类增项',
  '所属企业评审增项',
  '代理商增项备案',
  '供应商更名审核',
];

export default function DocConfig() {
  const [selectedType, setSelectedType] = useState('');
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const { token: t } = theme.useToken();

  const toggle = (idx: number) => setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/doc-config" portalType="admin">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>要件配置</Typography.Title>
        <Button type="primary" onClick={() => message.success('要件配置已保存')}>保存配置</Button>
      </div>
      <Card size="small" variant="outlined">
        <Space direction="vertical" style={{ width: '100%' }} size={20}>
          <Space size={12}>
            <Typography.Text style={{ fontSize: 14 }}>工作单类型：</Typography.Text>
            <Select
              style={{ width: 200 }}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="请选择"
            >
              {workOrderTypes.map((t, i) => (
                <Select.Option key={i} value={t}>{t}</Select.Option>
              ))}
            </Select>
          </Space>

          <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: t.colorBgLayout }}>
                <th style={{ width: 300, padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>工作单类型</th>
                <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>不审批走备案</th>
              </tr>
            </thead>
            <tbody>
              {workOrderTypes.map((type, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'transparent' }}>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>{type}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>
                    <Checkbox checked={!!checked[i]} onChange={() => toggle(i)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Space>
      </Card>
    </PortalLayout>
  );
}
