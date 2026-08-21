/**
 * @name 系统通知编辑
 * 新增/编辑页面（独立子页面）
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { theme, Typography, Form, Input, Select, Button, Card, Divider, Space, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { systemNoticeData, type SystemNotice } from '../common/qualification-config';

export default function SystemNoticeEdit() {
  const { token: t } = theme.useToken();
  const [form] = Form.useForm();

  // 从URL获取seq参数判断是新增还是编辑
  const [isEdit, setIsEdit] = useState(false);
  const [currentSeq, setCurrentSeq] = useState<number>(0);
  const [editType, setEditType] = useState<'系统通知' | '操作手册'>('系统通知');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editAttachments, setEditAttachments] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/seq=(\d+)/);
    if (match) {
      const seq = Number(match[1]);
      setIsEdit(true);
      setCurrentSeq(seq);
      // 回显数据
      const record = systemNoticeData.find(n => n.seq === seq);
      if (record) {
        setEditType(record.type);
        setEditTitle(record.title);
        setEditContent(record.content);
        setEditAttachments([...record.attachments]);
      }
    }
  }, []);

  const handleSave = () => {
    if (!editTitle) {
      message.warning('请输入标题');
      return;
    }
    if (!editContent) {
      message.warning('请输入内容');
      return;
    }
    message.success(isEdit ? '通知已更新' : '通知已创建');
    window.location.hash = '#/admin/system-notice';
  };

  const handleAddAttachment = () => {
    const name = `附件${editAttachments.length + 1}.pdf`;
    setEditAttachments([...editAttachments, { name, url: '#' }]);
  };

  const handleRemoveAttachment = (idx: number) => {
    setEditAttachments(editAttachments.filter((_, i) => i !== idx));
  };

  return (
    <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
      <Typography.Title level={4} style={{ marginBottom: 0 }}>
        {isEdit ? '编辑通知' : '新增通知'}
      </Typography.Title>
      <Divider style={{ margin: '16px 0 24px' }} />

      <div style={{ maxWidth: 800 }}>
        <Form layout="vertical">
          <Form.Item label="通知类型" required>
            <Select
              placeholder="请选择通知类型"
              value={editType}
              onChange={setEditType}
              options={[
                { value: '系统通知', label: '系统通知（展示在工作台右侧通知列表）' },
                { value: '操作手册', label: '操作手册（展示在工作台左侧操作手册区域）' },
              ]}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label="标题" required>
            <Input
              placeholder="请输入通知标题"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="内容" required>
            <Input.TextArea
              rows={8}
              placeholder="请输入通知内容"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="附件">
            <div>
              <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddAttachment}>
                添加附件
              </Button>
              <div style={{ marginTop: 8, color: t.colorTextSecondary, fontSize: 12 }}>
                支持扩展名：.docx、.xlsx、.pdf，最大不超过 200M 的文件。
              </div>
            </div>
            {editAttachments.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {editAttachments.map((att, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      background: t.colorBgLayout,
                      borderRadius: 4,
                    }}
                  >
                    <span style={{ color: t.colorText }}>{att.name}</span>
                    <Button
                      type="link"
                      size="small"
                      icon={<DeleteOutlined />}
                      style={{ color: '#ff4d4f', marginLeft: 'auto' }}
                      onClick={() => handleRemoveAttachment(idx)}
                    >
                      删除
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Form.Item>
        </Form>
      </div>

      <Divider style={{ margin: '16px 0' }} />
      <Space size={16}>
        <Button type="primary" danger onClick={handleSave}>
          {isEdit ? '保存' : '创建'}
        </Button>
        <Button onClick={() => window.location.hash = '#/admin/system-notice'}>
          返回
        </Button>
      </Space>
    </Card>
  );
}
