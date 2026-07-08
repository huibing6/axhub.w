import React, { useState } from 'react';

export const DashboardTemplate: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>我的工作台</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>供应商工作台 - 供应商管理端</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            className="px-3 py-2 rounded text-sm"
            style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
          >
            <option>请选择用户组</option>
            <option>用户组1</option>
            <option>用户组2</option>
          </select>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: 'var(--primary)' }}>
              U
            </div>
            <span className="text-sm" style={{ color: 'var(--foreground)' }}>我的工作台</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
        {[
          { id: 'pending', label: '待阅' },
          { id: 'read', label: '已阅' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-6 py-3 text-sm font-medium"
            style={{
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--muted-foreground)',
              borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <div className="flex gap-4 items-end p-4 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <div className="flex-1">
          <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>标题</label>
          <input
            type="text"
            placeholder="请输入"
            className="w-full px-3 py-2 rounded"
            style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-sm)' }}
          >
            查询
          </button>
          <button
            className="px-4 py-2 rounded"
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
          >
            重置
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>序号</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>标题</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>时间</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
                暂无数据
              </td>
            </tr>
          </tbody>
        </table>
        <div className="px-4 py-3 flex justify-between items-center" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>共 0 条</span>
          <div className="flex items-center gap-2">
            <select
              className="px-2 py-1 text-sm rounded"
              style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
            >
              <option>10条/页</option>
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&lt;</button>
              <button className="px-3 py-1 text-sm rounded text-white" style={{ backgroundColor: 'var(--primary)' }}>1</button>
              <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&gt;</button>
            </div>
            <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              前往
              <input
                type="text"
                defaultValue="1"
                className="w-10 px-2 py-1 text-center rounded"
                style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
              />
              页
            </div>
          </div>
        </div>
      </div>

      {/* Second Tab Section */}
      <div className="mt-8">
        <div className="flex gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
          {[
            { id: 'todo', label: '待办' },
            { id: 'done', label: '已办' },
            { id: 'reauth', label: '预授权重新申请' },
          ].map((tab, i) => (
            <button
              key={tab.id}
              className="px-6 py-3 text-sm font-medium"
              style={{
                color: i === 0 ? 'var(--primary)' : 'var(--muted-foreground)',
                borderBottom: i === 0 ? '2px solid var(--primary)' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <div className="flex gap-4 items-end p-4 rounded-lg mt-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="flex-1">
            <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>标题</label>
            <input
              type="text"
              placeholder="请输入"
              className="w-full px-3 py-2 rounded"
              style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-sm)' }}
            >
              查询
            </button>
            <button
              className="px-4 py-2 rounded"
              style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
            >
              重置
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg overflow-hidden mt-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>序号</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>标题</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>时间</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  暂无数据
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-4 py-3 flex justify-between items-center" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>共 0 条</span>
            <div className="flex items-center gap-2">
              <select
                className="px-2 py-1 text-sm rounded"
                style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
              >
                <option>10条/页</option>
                <option>20条/页</option>
                <option>50条/页</option>
              </select>
              <div className="flex gap-1">
                <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&lt;</button>
                <button className="px-3 py-1 text-sm rounded text-white" style={{ backgroundColor: 'var(--primary)' }}>1</button>
                <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&gt;</button>
              </div>
              <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                前往
                <input
                  type="text"
                  defaultValue="1"
                  className="w-10 px-2 py-1 text-center rounded"
                  style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
                />
                页
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
