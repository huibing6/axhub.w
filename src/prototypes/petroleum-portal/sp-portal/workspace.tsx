/**
 * @name 服务商工作台
 */
import PortalLayout from '../common/portal-layout';
import { spGroups } from '../common/menu-data';
import { theme, Card, Button, Typography, Space, Row, Col, message } from 'antd';

export default function SpWorkspace() {
  const { token: t } = theme.useToken();
  const todoItems = [
    { dotColor: t.colorPrimary, text: '您有新的中标项目可办理', time: '2026-06-16 09:00' },
    { dotColor: t.colorPrimary, text: '西南油气田工程技术服务目录 — 资质材料待补充', time: '2026-06-15 14:30' },
    { dotColor: '#FFC107', text: '设备检修服务目录 — 专业资质审查待提交', time: '2026-06-14 10:15' },
    { dotColor: t.colorInfo, text: '信息技术服务目录 — 准入申请审核中', time: '2026-06-12 16:45' },
  ];

  const notifications = [
    { dotColor: '#FFC107', title: '【系统通知】2026年...', sub: '系统管理员 · 2026-06...' },
    { dotColor: t.colorInfo, title: '【政策更新】服务商注...', sub: '工程和物装管理部 · 20...' },
    { dotColor: t.colorInfo, title: '【培训通知】服务商准...', sub: '培训中心 · 2026-05-25' },
    { dotColor: '#FFC107', title: '【系统维护】系统将于...', sub: '系统管理员 · 2026-05-2...' },
    { dotColor: t.colorInfo, title: '【功能上线】处置管理...', sub: '系统管理员 · 2026-05-2...' },
  ];

  const manuals = [
    '服务商注册操作手册0618V.pdf',
    '服务商正式准入操作手册0618V.pdf',
    '服务商日常管理操作手册0618V.pdf',
  ];

  return (
    <PortalLayout groups={spGroups} activePath="/sp/workspace" portalType="sp">
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>服务商工作台</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>欢迎回来，张明远。以下是您的待办事项和系统通知。</Typography.Text>

      <Row gutter={20}>
        <Col flex="1">
          <Card variant="outlined" size="small" style={{ marginBottom: 20 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <Typography.Text strong>待办事项</Typography.Text>
              <a href="#" onClick={e => { e.preventDefault(); message.info('查看全部待办事项'); }} style={{ color: t.colorInfo, fontSize: 14 }}>查看全部</a>
            </div>
            {todoItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={i < todoItems.length - 1 ? { borderBottom: `1px solid ${t.colorBorderSecondary}` } : undefined}>
                <Space size={12}>
                  <div className="w-2 h-2 rounded-full" style={{ background: item.dotColor }} />
                  <div>
                    <Typography.Text style={{ fontSize: 14 }}>{item.text}</Typography.Text>
                    <div><Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text></div>
                  </div>
                </Space>
                <Button type="primary" size="small" onClick={() => message.info('正在跳转到处理页面...')}>处理</Button>
              </div>
            ))}
          </Card>

          <Card variant="outlined" size="small">
            <Typography.Text strong style={{ display: 'block', marginBottom: 12 }}>操作手册</Typography.Text>
            {manuals.map((m, i) => (
              <a key={i} href="#" className="block text-sm py-1" style={{ color: t.colorInfo }}>{m}</a>
            ))}
          </Card>
        </Col>

        <Col style={{ width: 288 }}>
          <Card variant="outlined" size="small">
            <Typography.Text strong style={{ display: 'block', marginBottom: 16 }}>系统通知</Typography.Text>
            {notifications.map((n, i) => (
              <div key={i} className="py-2.5" style={i < notifications.length - 1 ? { borderBottom: `1px solid ${t.colorBorderSecondary}` } : undefined}>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.dotColor }} />
                  <div>
                    <Typography.Text style={{ fontSize: 14 }}>{n.title}</Typography.Text>
                    <div><Typography.Text type="secondary" style={{ fontSize: 12 }}>{n.sub}</Typography.Text></div>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </PortalLayout>
  );
}
