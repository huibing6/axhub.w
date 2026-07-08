/**
 * @name 草稿管理
 */
import { useState, useMemo } from 'react';
import { DataTable, ConfirmDialog, SearchFilter, StatusTag } from '../common/components';
import { theme, Typography, message, Button as AntButton, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Draft {
  id: string;
  name: string;
  createdTime: string;
  updatedTime: string;
  status: string;
}

const mockDrafts: Draft[] = [
  { id: '1', name: '湖北江汉石油机械制造有限公司-注册申请', createdTime: '2026-06-20 14:30', updatedTime: '2026-06-22 09:15', status: '待提交' },
  { id: '2', name: '四川宏达石油工程有限公司-注册申请', createdTime: '2026-06-18 10:00', updatedTime: '2026-06-21 16:42', status: '待提交' },
  { id: '3', name: '新疆克拉玛依钻井服务公司-信息变更', createdTime: '2026-06-15 08:20', updatedTime: '2026-06-20 11:30', status: '待复核' },
  { id: '4', name: '陕西延长石油技术服务有限公司-注册申请', createdTime: '2026-06-10 15:45', updatedTime: '2026-06-18 13:10', status: '已退回' },
  { id: '5', name: '大庆油田设备维修有限公司-注册申请', createdTime: '2026-06-08 09:00', updatedTime: '2026-06-12 17:25', status: '已提交' },
];

export default function SpDraftList() {
  const { token: t } = theme.useToken();
  const [drafts, setDrafts] = useState<Draft[]>(mockDrafts);
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Draft | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredDrafts = useMemo(() => {
    return drafts.filter(d => {
      const nameMatch = !searchValues.name || d.name.includes(searchValues.name);
      const statusMatch = !searchValues.status || searchValues.status === '全部' || d.status === searchValues.status;
      return nameMatch && statusMatch;
    });
  }, [drafts, searchValues]);

  const handleEdit = (record: Draft) => {
    message.success(`正在打开草稿：${record.name}`);
    window.location.hash = '#/sp/register';
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setTimeout(() => {
      setDrafts(prev => prev.filter(d => d.id !== deleteTarget.id));
      message.success('草稿已删除');
      setDeleteTarget(null);
      setDeleting(false);
    }, 600);
  };

  const columns = [
    { key: 'name', title: '草稿名称', width: 360 },
    { key: 'createdTime', title: '创建时间', width: 180 },
    { key: 'updatedTime', title: '最后修改时间', width: 180 },
    { key: 'status', title: '状态', width: 100 },
    { key: 'action', title: '操作', width: 160 },
  ];

  const tableData = filteredDrafts.map(draft => ({
    name: <Typography.Text>{draft.name}</Typography.Text>,
    createdTime: <Typography.Text type="secondary">{draft.createdTime}</Typography.Text>,
    updatedTime: <Typography.Text type="secondary">{draft.updatedTime}</Typography.Text>,
    status: <StatusTag status={draft.status} />,
    action: (
      <Space size={4}>
        <AntButton
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(draft)}
        >
          编辑
        </AntButton>
        <AntButton
          type="link"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => setDeleteTarget(draft)}
        >
          删除
        </AntButton>
      </Space>
    ),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>草稿管理</Typography.Title>
        <AntButton type="primary" icon={<PlusOutlined />} onClick={() => { window.location.hash = '#/sp/register'; }}>
          新建草稿
        </AntButton>
      </div>

      <SearchFilter
        fields={[
          { key: 'name', label: '草稿名称', placeholder: '请输入草稿名称' },
          { key: 'status', label: '状态', type: 'select', options: ['全部', '待提交', '待复核', '已提交', '已退回'] },
        ]}
        values={searchValues}
        onChange={(key, value) => setSearchValues(prev => ({ ...prev, [key]: value }))}
        onSearch={() => message.info('已刷新查询结果')}
      />

      <DataTable columns={columns} data={tableData} pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total: number) => `共 ${total} 条` }} />

      <ConfirmDialog
        open={!!deleteTarget}
        title="确认删除草稿"
        content={`确定要删除草稿「${deleteTarget?.name}」吗？此操作不可恢复。`}
        danger
        onOk={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLoading={deleting}
      />
    </div>
  );
}
