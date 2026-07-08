import React from 'react';

interface InputSectionProps {
  tokens: Record<string, any>;
}

export const InputSection: React.FC<InputSectionProps> = ({ tokens }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>输入框 Input</h1>
        <p className="text-neutral-600">用于输入文本信息的表单控件。</p>
      </div>

      {/* Basic Input */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>基础用法</h2>
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

      {/* Input Sizes */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>输入框尺寸</h2>
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

      {/* Search Input */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>搜索输入框</h2>
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

      {/* Input with Prefix/Suffix */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>前后缀</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>带前缀</label>
            <div className="flex">
              <span
                className="px-3 py-2 rounded-l"
                style={{ border: '1px solid var(--input)', borderRight: 'none', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)', backgroundColor: 'var(--muted)' }}
              >
                https://
              </span>
              <input
                type="text"
                placeholder="请输入网址"
                className="flex-1 px-3 py-2 rounded-r"
                style={{ border: '1px solid var(--input)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>带后缀</label>
            <div className="flex">
              <input
                type="text"
                placeholder="请输入金额"
                className="flex-1 px-3 py-2 rounded-l"
                style={{ border: '1px solid var(--input)', borderRight: 'none', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }}
              />
              <span
                className="px-3 py-2 rounded-r"
                style={{ border: '1px solid var(--input)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', backgroundColor: 'var(--muted)' }}
              >
                元
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>文本域</h2>
        <div className="max-w-md">
          <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>备注信息</label>
          <textarea
            placeholder="请输入备注信息"
            rows={4}
            className="w-full px-3 py-2 rounded resize-none"
            style={{ border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)' }}
          />
        </div>
      </div>
    </div>
  );
};
