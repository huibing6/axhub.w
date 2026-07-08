import React from 'react';

interface CardSectionProps {
  tokens: Record<string, any>;
}

export const CardSection: React.FC<CardSectionProps> = ({ tokens }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>卡片 Card</h1>
        <p className="text-neutral-600">信息聚合的容器组件。</p>
      </div>

      {/* Basic Card */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>基础卡片</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>基础卡片</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>卡片内容描述信息</p>
          </div>
          <div className="p-6 rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>带操作的卡片</h3>
              <button className="text-sm" style={{ color: 'var(--primary)' }}>更多</button>
            </div>
            <p style={{ color: 'var(--muted-foreground)' }}>卡片内容描述信息</p>
          </div>
        </div>
      </div>

      {/* Supplier Card */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>供应商卡片</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: 'var(--primary)' }}>
                Y
              </div>
              <div>
                <h3 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>供应商名称</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>供应商编码：SUP001</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <span>状态：合作中</span>
              <span>等级：A级</span>
            </div>
          </div>
          <div className="p-6 rounded-lg" style={{ border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: 'var(--success)' }}>
                Z
              </div>
              <div>
                <h3 className="text-base font-medium" style={{ color: 'var(--foreground)' }}>供应商名称</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>供应商编码：SUP002</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <span>状态：待审核</span>
              <span>等级：B级</span>
            </div>
          </div>
        </div>
      </div>

      {/* Todo Card */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>待办事项卡片</h2>
        <div className="p-6 rounded-lg" style={{ border: '1px solid var(--border)' }}>
          <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--foreground)' }}>待办事项</h3>
          <div className="space-y-2">
            {['待审核订单', '待确认收货', '待对账单据'].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--foreground)' }}>{item}</span>
                <span className="text-sm" style={{ color: 'var(--primary)' }}>查看</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>数据统计卡片</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: '订单总数', value: '1,234', change: '+12%' },
            { label: '待处理', value: '56', change: '-5%' },
            { label: '已完成', value: '1,178', change: '+15%' },
            { label: '总金额', value: '¥89,000', change: '+8%' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-lg text-center" style={{ border: '1px solid var(--border)' }}>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{stat.value}</div>
              <div className="text-sm mb-1" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
              <div className="text-xs" style={{ color: stat.change.startsWith('+') ? 'var(--success)' : 'var(--destructive)' }}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card with Footer */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>带底部操作的卡片</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>订单详情</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>订单编号：PO2024001</p>
            <p style={{ color: 'var(--muted-foreground)' }}>订单金额：¥12,500.00</p>
          </div>
          <div className="px-6 py-4 flex justify-end gap-2" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--muted)' }}>
            <button
              className="px-4 py-2 rounded"
              style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
            >
              取消
            </button>
            <button
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-sm)' }}
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
