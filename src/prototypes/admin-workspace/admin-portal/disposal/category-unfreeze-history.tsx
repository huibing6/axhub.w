/**
 * @name 服务品类冻结历史
 */
import { theme, Typography, Card, Table, Button } from 'antd';
import PortalLayout from '../../common/portal-layout';
import { adminGroups } from '../../common/menu-data';

const historyColumns = [
  { key: 'applyPerson', title: '申请人', width: 100, dataIndex: 'applyPerson', ellipsis: true },
  { key: 'applyTime', title: '申请时间', width: 180, dataIndex: 'applyTime', ellipsis: true },
  { key: 'applyUnit', title: '申请单位', width: 180, dataIndex: 'applyUnit', ellipsis: true },
  { key: 'applyType', title: '申请类型', width: 160, dataIndex: 'applyType', ellipsis: true },
  { key: 'freezeReason', title: '冻结原因', width: 120, dataIndex: 'freezeReason', ellipsis: true },
  { key: 'freezeDuration', title: '冻结时效（月）', width: 120, dataIndex: 'freezeDuration', ellipsis: true },
  { key: 'effectTime', title: '生效时间', width: 180, dataIndex: 'effectTime', ellipsis: true },
  { key: 'remark', title: '备注意见', width: 300, dataIndex: 'remark', ellipsis: true },
];

const historyData = [
  { index: 1, applyPerson: '系统自动', applyTime: '2022-12-29 11:04:31', applyUnit: '', applyType: '暂停服务品类交易权限', freezeReason: '资质到期', freezeDuration: '', effectTime: '2022-12-29 11:04:31', remark: '依据总部2022年12月29日邮件对2019-2021年三年无交易服务品类执行暂停服务品类交易权限处理' },
];

export default function CategoryUnfreezeHistory() {
  const { token: t } = theme.useToken();

  return (
    <PortalLayout groups={adminGroups} activePath="/admin/unfreeze-apply" portalType="admin">
      <Card style={{ minHeight: 'calc(100vh - 56px - 48px)' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>服务品类冻结历史</Typography.Title>
        <div style={{ borderBottom: `1px solid ${t.colorBorderSecondary}`, margin: '16px 0' }} />

        <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
          <div>
            <Typography.Text type="secondary">服务商名称：</Typography.Text>
            <Typography.Text>山东大方电气有限公司</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">服务商编码：</Typography.Text>
            <Typography.Text>1000562192</Typography.Text>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Typography.Text strong>服务品类冻结历史详情列表</Typography.Text>
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
