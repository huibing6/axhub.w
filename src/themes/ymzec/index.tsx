/**
 * @name YMZEC 供应商管理系统主题
 *
 * 基于雲夢澤供应商管理平台的设计规范
 * 红色主色调 + 白色背景的专业商务风格
 */

import './globals.css';
import React, { useState } from 'react';
import { ThemeShell, NavGroup, NavItem } from '../../common/ThemeShell';

// Navigation Groups
const NAV_GROUPS: NavGroup[] = [
  { id: 'overview', title: '概览', order: 1 },
  { id: 'colors', title: '色彩', order: 2 },
  { id: 'components', title: '组件', order: 3 },
  { id: 'templates', title: '模板', order: 4 },
];

// Navigation Items
const NAV_ITEMS: NavItem[] = [
  { id: 'design-spec', label: '设计规范', groupId: 'overview' },
  { id: 'colors', label: '色彩系统', groupId: 'colors' },
  { id: 'buttons', label: '按钮 Button', groupId: 'components' },
  { id: 'inputs', label: '输入框 Input', groupId: 'components' },
  { id: 'cards', label: '卡片 Card', groupId: 'components' },
  { id: 'tables', label: '表格 Table', groupId: 'components' },
  { id: 'dashboard', label: '工作台', groupId: 'templates' },
  { id: 'list', label: '列表页', groupId: 'templates' },
];

// ============ Color Palette Section ============
const ColorsSection: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>色彩系统</h2>
      <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>YMZEC 供应商管理系统色彩规范</p>
    </div>

    {/* Primary Colors */}
    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>主色 Primary</h3>
      <div className="flex gap-4 flex-wrap">
        {[
          { name: 'Primary', color: '#ff4d4f', desc: '主色调 - 激活状态、主要按钮' },
          { name: 'Primary Hover', color: '#ff7875', desc: '悬停状态' },
          { name: 'Primary Active', color: '#d9363e', desc: '按下状态' },
          { name: 'Primary Light', color: '#fff1f0', desc: '浅色背景' },
        ].map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-lg mb-2 shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</span>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{item.color}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Semantic Colors */}
    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>语义色 Semantic</h3>
      <div className="flex gap-4 flex-wrap">
        {[
          { name: 'Success', color: '#52c41a', desc: '成功状态' },
          { name: 'Warning', color: '#faad14', desc: '警告状态' },
          { name: 'Error', color: '#ff4d4f', desc: '错误状态' },
          { name: 'Info', color: '#1677ff', desc: '信息提示' },
        ].map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-lg mb-2 shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</span>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{item.color}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Neutral Colors */}
    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>中性色 Neutral</h3>
      <div className="flex gap-4 flex-wrap">
        {[
          { name: 'Background', color: '#ffffff', desc: '页面背景' },
          { name: 'Content BG', color: '#f5f5f5', desc: '内容背景' },
          { name: 'Border', color: '#e8e8e8', desc: '边框颜色' },
          { name: 'Text Primary', color: 'rgba(0,0,0,0.85)', desc: '主文本' },
          { name: 'Text Secondary', color: 'rgba(0,0,0,0.65)', desc: '次要文本' },
          { name: 'Text Disabled', color: 'rgba(0,0,0,0.25)', desc: '禁用文本' },
        ].map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-lg mb-2 shadow-sm border"
              style={{ backgroundColor: item.color, borderColor: 'var(--border)' }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.name}</span>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============ Button Section ============
const ButtonSection: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>按钮 Button</h2>
      <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>按钮用于触发操作或事件</p>
    </div>

    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>按钮类型</h3>
      <div className="flex gap-4 items-center flex-wrap">
        <button
          className="px-4 py-2 rounded text-white font-medium"
          style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          主按钮
        </button>
        <button
          className="px-4 py-2 rounded font-medium"
          style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
        >
          次按钮
        </button>
        <button
          className="px-4 py-2 rounded font-medium"
          style={{ color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          文本按钮
        </button>
        <button
          className="px-4 py-2 rounded font-medium"
          style={{ color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          虚线按钮
        </button>
      </div>
    </div>

    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>按钮尺寸</h3>
      <div className="flex gap-4 items-center flex-wrap">
        <button
          className="px-2 py-1 text-sm rounded text-white"
          style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-sm)' }}
        >
          小按钮
        </button>
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          默认按钮
        </button>
        <button
          className="px-6 py-3 text-lg rounded text-white"
          style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          大按钮
        </button>
      </div>
    </div>

    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>按钮状态</h3>
      <div className="flex gap-4 items-center flex-wrap">
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          默认
        </button>
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--primary)', opacity: 0.85, borderRadius: 'var(--radius-md)' }}
        >
          悬停
        </button>
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--primary)', opacity: 0.65, borderRadius: 'var(--radius-md)' }}
        >
          禁用
        </button>
        <button
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
        >
          加载中...
        </button>
      </div>
    </div>
  </div>
);

// ============ Input Section ============
const InputSection: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>输入框 Input</h2>
      <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>用于输入文本信息的表单控件</p>
    </div>

    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>基础用法</h3>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>标题</label>
          <input
            type="text"
            placeholder="请输入"
            className="w-full px-3 py-2 rounded"
            style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
          />
        </div>
        <div>
          <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>禁用状态</label>
          <input
            type="text"
            placeholder="禁用输入框"
            disabled
            className="w-full px-3 py-2 rounded"
            style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
          />
        </div>
      </div>
    </div>

    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>输入框尺寸</h3>
      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="小尺寸"
          className="w-full px-2 py-1 text-sm rounded"
          style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
        />
        <input
          type="text"
          placeholder="默认尺寸"
          className="w-full px-3 py-2 rounded"
          style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
        />
        <input
          type="text"
          placeholder="大尺寸"
          className="w-full px-4 py-3 text-lg rounded"
          style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
        />
      </div>
    </div>

    <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>搜索输入框</h3>
      <div className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="搜索菜单"
          className="flex-1 px-3 py-2 rounded"
          style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
        />
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
  </div>
);

// ============ Card Section ============
const CardSection: React.FC = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>卡片 Card</h2>
      <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>信息聚合的容器组件</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>基础卡片</h3>
        <p style={{ color: 'var(--muted-foreground)' }}>卡片内容描述信息</p>
      </div>

      <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium" style={{ color: 'var(--foreground)' }}>带操作的卡片</h3>
          <button className="text-sm" style={{ color: 'var(--primary)' }}>更多</button>
        </div>
        <p style={{ color: 'var(--muted-foreground)' }}>卡片内容描述信息</p>
      </div>

      <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
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

      <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
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
  </div>
);

// ============ Table Section ============
const TableSection: React.FC = () => {
  const data = [
    { id: 1, title: '采购订单PO2024001', time: '2024-01-15 10:30', status: '待审核' },
    { id: 2, title: '采购订单PO2024002', time: '2024-01-15 11:20', status: '已审核' },
    { id: 3, title: '采购订单PO2024003', time: '2024-01-15 14:00', status: '已完成' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>表格 Table</h2>
        <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>用于展示大量结构化数据</p>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>序号</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>标题</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>时间</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: 'var(--foreground)' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--foreground)' }}>{row.id}</td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--foreground)' }}>{row.title}</td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>{row.time}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: row.status === '已完成' ? 'var(--success)' : row.status === '已审核' ? 'var(--primary)' : '#faad14',
                      color: '#fff'
                    }}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button style={{ color: 'var(--primary)' }}>查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 flex justify-between items-center" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>共 3 条</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&lt;</button>
            <button className="px-3 py-1 text-sm rounded text-white" style={{ backgroundColor: 'var(--primary)' }}>1</button>
            <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ Dashboard Template ============
const DashboardTemplate: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>工作台 Dashboard</h2>
      <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>供应商工作台页面模板</p>
    </div>

    {/* Tabs */}
    <div className="flex gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
      {['待阅', '已阅'].map((tab, i) => (
        <button
          key={tab}
          className="px-6 py-3 text-sm font-medium"
          style={{
            color: i === 0 ? 'var(--primary)' : 'var(--muted-foreground)',
            borderBottom: i === 0 ? '2px solid var(--primary)' : '2px solid transparent',
          }}
        >
          {tab}
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
        <div className="flex gap-1">
          <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&lt;</button>
          <button className="px-3 py-1 text-sm rounded text-white" style={{ backgroundColor: 'var(--primary)' }}>1</button>
          <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&gt;</button>
        </div>
      </div>
    </div>
  </div>
);

// ============ List Template ============
const ListTemplate: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>列表页 List Page</h2>
      <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>数据列表页面模板</p>
    </div>

    {/* Tabs */}
    <div className="flex gap-0" style={{ borderBottom: '1px solid var(--border)' }}>
      {['待办', '已办', '预授权重新申请'].map((tab, i) => (
        <button
          key={tab}
          className="px-6 py-3 text-sm font-medium"
          style={{
            color: i === 0 ? 'var(--primary)' : 'var(--muted-foreground)',
            borderBottom: i === 0 ? '2px solid var(--primary)' : '2px solid transparent',
          }}
        >
          {tab}
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
        <div className="flex gap-1">
          <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&lt;</button>
          <button className="px-3 py-1 text-sm rounded text-white" style={{ backgroundColor: 'var(--primary)' }}>1</button>
          <button className="px-3 py-1 text-sm rounded" style={{ border: '1px solid var(--border)' }}>&gt;</button>
        </div>
      </div>
    </div>
  </div>
);

// ============ Main Component ============
const Component: React.FC = () => {
  const [activeTab, setActiveTab] = useState('design-spec');

  const renderContent = () => {
    switch (activeTab) {
      case 'design-spec':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>设计规范 Design Spec</h2>
              <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>YMZEC 供应商管理系统设计规范</p>
            </div>
            <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>品牌定位</h3>
              <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
                YMZEC（雲夢澤）供应商管理系统是一个专业的企业级 B2B 平台，为供应商提供订单管理、
                商品管理、账期对账等一站式服务。
              </p>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>设计原则</h3>
              <ul className="space-y-2" style={{ color: 'var(--muted-foreground)' }}>
                <li>• <strong style={{ color: 'var(--foreground)' }}>专业可靠</strong>：采用红色主色调，传递信任与专业感</li>
                <li>• <strong style={{ color: 'var(--foreground)' }}>简洁高效</strong>：清晰的信息层级，减少视觉干扰</li>
                <li>• <strong style={{ color: 'var(--foreground)' }}>一致统一</strong>：标准化的组件和交互模式</li>
                <li>• <strong style={{ color: 'var(--foreground)' }}>易于扩展</strong>：模块化设计，支持业务快速发展</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--foreground)' }}>色彩规范</h3>
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: '#ff4d4f' }} />
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>主色 #ff4d4f</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: '#52c41a' }} />
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>成功 #52c41a</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: '#faad14' }} />
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>警告 #faad14</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: '#1677ff' }} />
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>信息 #1677ff</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'colors':
        return <ColorsSection />;
      case 'buttons':
        return <ButtonSection />;
      case 'inputs':
        return <InputSection />;
      case 'cards':
        return <CardSection />;
      case 'tables':
        return <TableSection />;
      case 'dashboard':
        return <DashboardTemplate />;
      case 'list':
        return <ListTemplate />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
              <span className="text-2xl font-mono">;</span>
            </div>
            <h2 className="mt-0 text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>施工中 Work in Progress</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>
              <span className="font-medium" style={{ color: 'var(--muted-foreground)' }}>{activeTab}</span> 模块正在开发中...
            </p>
          </div>
        );
    }
  };

  return (
    <ThemeShell
      brand={{
        name: 'YMZEC',
        subtitle: '供应商管理系统',
        logoBgColor: '#ff4d4f',
        logoTextColor: '#ffffff',
      }}
      groups={NAV_GROUPS}
      items={NAV_ITEMS}
      activeId={activeTab}
      onNavigate={setActiveTab}
      sidebar={{
        defaultOpen: true,
        collapsible: true,
        width: 256,
      }}
      className="ymzec-theme"
    >
      <div className="max-w-5xl mx-auto">
        {renderContent()}
      </div>
    </ThemeShell>
  );
};

export default Component;
