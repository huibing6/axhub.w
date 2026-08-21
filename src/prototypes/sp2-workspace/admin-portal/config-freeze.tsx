/** @name 冻结资质文件设定 */
import React from 'react';
import { useState } from 'react';
import { theme, Typography, Button, Card, Space, Checkbox, Modal, message } from 'antd';

const qualFiles = [
  { name: '营业执照', checked: true },
  { name: '专业资质证书', checked: true },
  { name: '财务审计报告 / 银行资信证明', checked: false },
  { name: 'QHSE/ESG 无重大事故事件承诺', checked: false },
  { name: '无重大违法违规承诺', checked: false },
  { name: '信用信息合规（4大平台无黑名单）', checked: true },
  { name: 'ISO 9001 质量管理体系认证证书', checked: true },
];

function FreezeDocTab() {
  const [checked, setChecked] = useState<Record<number, boolean>>(
    Object.fromEntries(qualFiles.map((c, i) => [i, c.checked]))
  );
  const { token: t } = theme.useToken();

  return (
    <div>
      <Card size="small" variant="outlined">
        <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: t.colorBgLayout }}>
              <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'left', borderBottom: '1px solid ' + t.colorBorderSecondary }}>供应商资质类型名称</th>
              <th style={{ padding: '10px 16px', fontWeight: 'bold', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary, width: 120 }}>是否自动冻结</th>
            </tr>
          </thead>
          <tbody>
            {qualFiles.map((col, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAFA' : 'transparent' }}>
                <td style={{ padding: '10px 16px', borderBottom: '1px solid ' + t.colorBorderSecondary }}>{col.name}</td>
                <td style={{ padding: '10px 16px', textAlign: 'center', borderBottom: '1px solid ' + t.colorBorderSecondary }}>
                  <Checkbox checked={!!checked[i]} onChange={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid #f0f0f0' }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>上次保存：2025-06-20 15:30</Typography.Text>
        <Space size={12}>
          <Button>取消</Button>
          <Button type="primary" danger onClick={() => Modal.confirm({ title: '确认保存', content: '确定要保存当前配置吗？', okText: '确定', cancelText: '取消', onOk: () => message.success('冻结资质文件设定已保存') })}>保存配置</Button>
        </Space>
      </div>
    </div>
  );
}

export default FreezeDocTab;
