/**
 * @name 服务商冻结历史
 */
import { theme, Typography, Card, Table, Button } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const historyColumns = [
  { key: 'applyPerson', title: '申请人', width: 100, dataIndex: 'applyPerson', ellipsis: true },
  { key: 'applyTime', title: '申请时间', width: 180, dataIndex: 'applyTime', ellipsis: true },
  { key: 'applyUnit', title: '申请单位', width: 180, dataIndex: 'applyUnit', ellipsis: true },
  { key: 'applyType', title: '申请类型', width: 140, dataIndex: 'applyType', ellipsis: true },
  { key: 'freezeRange', title: '冻结范围', width: 100, dataIndex: 'freezeRange', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 120, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'freezeDuration', title: '冻结时效（月）', width: 120, dataIndex: 'freezeDuration', ellipsis: true },
  { key: 'effectTime', title: '生效时间', width: 180, dataIndex: 'effectTime', ellipsis: true },
  { key: 'remark', title: '备注意见', width: 250, dataIndex: 'remark', ellipsis: true },
];

const historyData = [
  { index: 1, applyPerson: '系统自动', applyTime: '2026-02-10 00:00:01', applyUnit: '昆仑银行股份有限公司', applyType: '暂停交易权限', freezeRange: '全集团', freezeReason: '临时冻结', freezeDuration: '', effectTime: '2026-02-10 00:00:01', remark: '临时冻结到期自动解冻' },
];

export default function UnfreezeHistory() {
  const { token: t } = theme.useToken();

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/unfreeze-apply" portalType="admin">
      <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>服务商冻结历史</Typography.Title>
        <div style={{ borderBottom: `1px solid ${t.colorBorderSecondary}`, margin: '16px 0' }} />

        <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
          <div>
            <Typography.Text type="secondary">服务商名称：</Typography.Text>
            <Typography.Text>乌鲁木齐金宏升电子科技有限公司</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">服务商编码：</Typography.Text>
            <Typography.Text>1003240949</Typography.Text>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Typography.Text strong>服务商冻结历史详情列表</Typography.Text>
          <Button>表格定制</Button>
        </div>

        <Table
          columns={historyColumns}
          dataSource={historyData}
          rowKey="index"
          size="middle"
          scroll={{ x: 1400 }}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: total => `共 ${total} 条` }}
        />
      </Card>
    </PortalLayout>
  );
}
