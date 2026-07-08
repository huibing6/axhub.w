/**
 * @name 服务商工作台
 */
import { useState } from 'react';
import { theme, Card, Button, Typography, Space, Row, Col, Modal, message } from 'antd';

export default function SpWorkspace() {
  const { token: t } = theme.useToken();
  const [todoModalOpen, setTodoModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  const todoItems = [
    { dotColor: '#ff4d4f', text: '您有新的中标项目可办理', time: '2026-06-16 09:00', route: '/sp/admission' },
    { dotColor: '#faad14', text: '西南油气田工程技术服务目录 — 资质材料待补充', time: '2026-06-15 14:30', route: '/sp/qual-maintain' },
    { dotColor: '#faad14', text: '设备检修服务目录 — 专业资质审查待提交', time: '2026-06-14 10:15', route: '/sp/qual-maintain' },
    { dotColor: '#1890ff', text: '信息技术服务目录 — 准入申请审核中', time: '2026-06-12 16:45', route: '/sp/progress-query' },
  ];

  const notifications = [
    { dotColor: '#faad14', title: '【系统通知】2026年度服务商考评将于6月15日启动', sub: '系统管理员 · 2026-06-01', content: '各位服务商：\n\n2026年度服务商综合考核将于2026年7月1日正式启动，请各服务商提前准备以下材料：\n\n1. 年度服务报告\n2. 客户满意度调查表\n3. 资质证书更新文件\n4. 安全生产记录\n\n请在2026年6月30日前完成材料准备。' },
    { dotColor: '#1890ff', title: '【政策更新】服务商注册标签新增ESG管理材料要求', sub: '工程和物装管理部 · 2026-05-28', content: '各相关部门、服务商：\n\n根据最新政策要求，服务商注册管理规定已完成修订，新增ESG管理材料要求。新规定自2026年7月1日起施行。' },
    { dotColor: '#1890ff', title: '【培训通知】服务商管理平台操作培训（第三期）报名开始', sub: '培训中心 · 2026-05-25', content: '各服务商：\n\n服务商管理平台操作培训（第三期）现已开放报名，请未完成培训的服务商尽快报名参加。' },
    { dotColor: '#faad14', title: '【系统维护】系统将于6月3日凌晨2:00-4:00进行维护升级', sub: '系统管理员 · 2026-05-22', content: '各位用户：\n\n系统将于2026年6月3日（周三）02:00-04:00进行维护升级，届时系统将暂停服务。请提前做好相关工作安排。' },
    { dotColor: '#1890ff', title: '【功能上线】处置管理模块新增自动冻结触发规则', sub: '系统管理员 · 2026-05-20', content: '各服务商：\n\n处置管理模块已完成更新，新增自动冻结触发规则功能，请各服务商登录系统查阅详细操作指南。' },
  ];

  const manuals = [
    '服务商注册操作手册0618V.pdf',
    '服务商正式准入操作手册0618V.pdf',
    '服务商日常管理操作手册0618V.pdf',
  ];

  return (
    <div>
      <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>服务商工作台</Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>欢迎回来，张明远。以下是您的待办事项和系统通知。</Typography.Text>

      <Row gutter={20}>
        {/* 左侧 - 待办事项 */}
        <Col flex="1">
          <Card
            variant="outlined"
            size="small"
            title="待办事项"
            extra={
              <Button type="link" size="small" style={{ color: '#1890ff' }} onClick={() => setTodoModalOpen(true)}>
                查看全部
              </Button>
            }
            style={{ marginBottom: 20 }}
          >
            {todoItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 0',
                  borderBottom: i < todoItems.length - 1 ? `1px solid ${t.colorBorderSecondary}` : 'none',
                }}
              >
                <Space size={12}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dotColor, flexShrink: 0 }} />
                  <div>
                    <Typography.Text style={{ fontSize: 14 }}>{item.text}</Typography.Text>
                    <div>
                      <Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text>
                    </div>
                  </div>
                </Space>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => { window.location.hash = '#' + item.route; }}
                >
                  处理
                </Button>
              </div>
            ))}
          </Card>

          {/* 操作手册 */}
          <Card variant="outlined" size="small" title="操作手册">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {manuals.map((m, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => { e.preventDefault(); message.info('文件下载功能待对接'); }}
                  style={{ color: '#1890ff', fontSize: 14 }}
                >
                  {m}
                </a>
              ))}
            </div>
          </Card>
        </Col>

        {/* 右侧 - 系统通知 */}
        <Col style={{ width: 360, flexShrink: 0 }}>
          <Card
            variant="outlined"
            size="small"
            title="系统通知"
            extra={
              <Button type="link" size="small" style={{ color: '#1890ff' }}>
                查看全部
              </Button>
            }
          >
            {notifications.map((n, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 8px',
                  borderBottom: i < notifications.length - 1 ? `1px solid ${t.colorBorderSecondary}` : 'none',
                  cursor: 'pointer',
                  borderRadius: 4,
                  transition: 'background 0.2s',
                }}
                onClick={() => { setSelectedNotif(n); setNotifModalOpen(true); }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = t.colorBgTextHover; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.dotColor, flexShrink: 0, marginTop: 6 }} />
                  <div style={{ minWidth: 0 }}>
                    <Typography.Text style={{ fontSize: 14, display: 'block' }}>{n.title}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>{n.sub}</Typography.Text>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* 通知详情弹窗 */}
      <Modal
        title="通知详情"
        open={notifModalOpen}
        onCancel={() => { setNotifModalOpen(false); setSelectedNotif(null); }}
        footer={[
          <Button key="close" onClick={() => { setNotifModalOpen(false); setSelectedNotif(null); }}>关闭</Button>,
          <Button key="read" type="primary" onClick={() => { setNotifModalOpen(false); setSelectedNotif(null); message.success('已标记为已读'); }}>标记已读</Button>,
        ]}
        width={600}
      >
        {selectedNotif && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedNotif.dotColor }} />
              <Typography.Text strong style={{ fontSize: 16 }}>{selectedNotif.title}</Typography.Text>
            </div>
            <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 16, fontSize: 13 }}>{selectedNotif.sub}</Typography.Text>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: t.colorText, fontSize: 14 }}>{selectedNotif.content}</div>
          </div>
        )}
      </Modal>

      {/* 全部待办弹窗 */}
      <Modal
        title="全部待办事项"
        open={todoModalOpen}
        onCancel={() => setTodoModalOpen(false)}
        footer={null}
        width={720}
      >
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {todoItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < todoItems.length - 1 ? `1px solid ${t.colorBorderSecondary}` : 'none',
              }}
            >
              <Space size={12}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.dotColor }} />
                <div>
                  <Typography.Text style={{ fontSize: 14 }}>{item.text}</Typography.Text>
                  <div>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Typography.Text>
                  </div>
                </div>
              </Space>
              <Button type="primary" size="small" onClick={() => { setTodoModalOpen(false); window.location.hash = '#' + item.route; }}>处理</Button>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
