/**
 * @name 服务商工作台
 */
import React from 'react';
import { useState } from 'react';
import { theme, Card, Button, Typography, Space, Row, Col, Modal, message } from 'antd';
import { getPublishedNotifications, getPublishedManuals } from '../common/qualification-config';

/* 通知模板数据（模拟从管理端配置读取） */
const noticeTemplates = [
  { seq: 1, name: '注册补充资料通知', unit: '长庆油田分公司', category: '注册流程' },
  { seq: 2, name: '补充资料通知', unit: '西南油气田分公司', category: '流程' },
  { seq: 3, name: '变更补充资料通知', unit: '大庆油田有限责任公司', category: '变更流程' },
];

export default function SpWorkspace() {
  const { token: t } = theme.useToken();
  const [todoModalOpen, setTodoModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<any>(null);

  /* 待办事项：全部从补充资料通知动态生成 */
  const todoItems = noticeTemplates.map(t => ({
    dotColor: '#faad14',
    text: `${t.name} — ${t.unit}，待补充资料`,
    time: '2026-06-15 14:30',
    route: `/sp/supplement-fill?seq=${t.seq}`,
  }));

  // 从共享数据获取系统通知和操作手册
  const notifications = getPublishedNotifications().map(n => ({
    dotColor: '#faad14',
    title: n.title,
    sub: `系统管理员 · ${n.createTime}`,
    content: n.content,
  }));

  const manuals = getPublishedManuals().map(n => n.attachments[0]?.name || n.title);

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
              <Button type="link" size="small" style={{ color: '#ff4d4f' }} onClick={() => setTodoModalOpen(true)}>
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
                  style={{ color: '#ff4d4f', fontSize: 14 }}
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
              <Button type="link" size="small" style={{ color: '#ff4d4f' }} onClick={() => setNotifModalOpen(true)}>
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
