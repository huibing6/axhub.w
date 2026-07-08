/**
 * @name 增强表格组件 - 支持视图切换（表格/卡片）+ 列密度切换
 */
import { useState, useMemo, ReactNode } from 'react';
import { Table, Card, Space, Button, Tooltip, Tag, Typography, Empty, Row, Col } from 'antd';
import { TableOutlined, AppstoreOutlined, ColumnHeightOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

/* ─── 列密度类型 ─── */
type Density = 'compact' | 'middle' | 'large';

const densityConfig: Record<Density, { size: 'small' | 'middle' | 'large'; label: string; cellPadding: number }> = {
  compact: { size: 'small', label: '紧凑', cellPadding: 4 },
  middle: { size: 'middle', label: '舒适', cellPadding: 8 },
  large: { size: 'large', label: '宽松', cellPadding: 12 },
};

/* ─── 卡片网格列数 ─── */
const GRID_COLS = { compact: 4, middle: 3, large: 2 };

/* ─── 组件 Props ─── */
export interface EnhancedTableProps<T extends Record<string, any>> extends Omit<TableProps<T>, 'size'> {
  /** 卡片渲染函数 */
  renderCard?: (record: T, index: number) => ReactNode;
  /** 卡片标题字段（默认 name） */
  cardTitleField?: string;
  /** 卡片描述字段（默认 description） */
  cardDescField?: string;
  /** 默认列密度 */
  defaultDensity?: Density;
  /** 默认视图模式 */
  defaultView?: 'table' | 'card';
  /** 是否显示视图切换 */
  showViewToggle?: boolean;
  /** 是否显示密度切换 */
  showDensityToggle?: boolean;
}

export function EnhancedTable<T extends Record<string, any>>({
  renderCard,
  cardTitleField = 'name',
  cardDescField = 'description',
  defaultDensity = 'middle',
  defaultView = 'table',
  showViewToggle = true,
  showDensityToggle = true,
  columns,
  dataSource,
  pagination,
  ...restProps
}: EnhancedTableProps<T>) {
  const [viewMode, setViewMode] = useState<'table' | 'card'>(defaultView);
  const [density, setDensity] = useState<Density>(defaultDensity);

  const config = densityConfig[density];
  const gridCols = GRID_COLS[density];

  /* ─── 默认卡片渲染 ─── */
  const defaultRenderCard = (record: T, index: number) => {
    const title = record[cardTitleField] || record.title || `记录 ${index + 1}`;
    const desc = record[cardDescField] || record.description || '';
    const status = record.status || record.flowStatus;

    return (
      <Card
        key={record.key || index}
        size="small"
        hoverable
        style={{ height: '100%' }}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Text ellipsis style={{ maxWidth: 200 }}>{title}</Typography.Text>
            {status && (
              <Tag color={
                status === '已完成' || status === '已入库' || status === '正常' ? 'success' :
                status === '进行中' || status === '审核中' || status === '注册中' ? 'processing' :
                status === '已拒绝' || status === '已冻结' ? 'error' :
                'default'
              }>
                {status}
              </Tag>
            )}
          </div>
        }
      >
        {desc && <Typography.Text type="secondary" style={{ fontSize: 12 }}>{desc}</Typography.Text>}
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {columns?.filter(c => c.key !== 'action' && c.key !== 'operation').slice(0, 3).map(col => {
            const val = (record as any)[(col as any).dataIndex];
            if (val === undefined || val === null || val === '') return null;
            const colTitle = typeof col.title === 'string' ? col.title : String(col.title);
            return (
              <div key={String(col.key)} style={{ fontSize: 12, color: '#8c8c8c' }}>
                {colTitle}: {String(val)}
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  /* ─── 操作栏 ─── */
  const toolbar = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <div />
      <Space size={4}>
        {showDensityToggle && (
          <Tooltip title={`列密度：${config.label}`}>
            <Button
              type="text"
              size="small"
              icon={<ColumnHeightOutlined />}
              onClick={() => {
                const next: Density = density === 'compact' ? 'middle' : density === 'middle' ? 'large' : 'compact';
                setDensity(next);
              }}
            >
              {config.label}
            </Button>
          </Tooltip>
        )}
        {showViewToggle && (
          <Space.Compact size="small">
            <Button
              type={viewMode === 'table' ? 'primary' : 'default'}
              icon={<TableOutlined />}
              onClick={() => setViewMode('table')}
            />
            <Button
              type={viewMode === 'card' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode('card')}
            />
          </Space.Compact>
        )}
      </Space>
    </div>
  );

  /* ─── 表格视图 ─── */
  const tableView = (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      size={config.size}
      scroll={{ x: 'max-content' }}
      {...restProps}
    />
  );

  /* ─── 卡片视图 ─── */
  const cardView = (
    <Row gutter={[16, 16]}>
      {dataSource && dataSource.length > 0 ? (
        dataSource.map((record, index) => (
          <Col key={record.key || index} xs={24} sm={12} md={24 / gridCols} lg={24 / gridCols}>
            {renderCard ? renderCard(record, index) : defaultRenderCard(record, index)}
          </Col>
        ))
      ) : (
        <Col span={24}>
          <Empty description="暂无数据" />
        </Col>
      )}
    </Row>
  );

  return (
    <div>
      {toolbar}
      {viewMode === 'table' ? tableView : cardView}
    </div>
  );
}

export default EnhancedTable;
