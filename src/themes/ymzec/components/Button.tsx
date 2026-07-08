import React from 'react';

interface ButtonSectionProps {
  tokens: Record<string, any>;
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ tokens }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>按钮 Button</h1>
        <p className="text-neutral-600">按钮用于触发操作或事件。</p>
      </div>

      {/* Button Types */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>按钮类型</h2>
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

      {/* Button Sizes */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>按钮尺寸</h2>
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

      {/* Button States */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>按钮状态</h2>
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

      {/* Icon Buttons */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>图标按钮</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <button
            className="px-4 py-2 rounded text-white flex items-center gap-2"
            style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md)' }}
          >
            <span>+</span> 新增
          </button>
          <button
            className="px-4 py-2 rounded flex items-center gap-2"
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}
          >
            <span>↻</span> 刷新
          </button>
          <button
            className="px-4 py-2 rounded text-white flex items-center gap-2"
            style={{ backgroundColor: 'var(--destructive)', borderRadius: 'var(--radius-md)' }}
          >
            <span>×</span> 删除
          </button>
        </div>
      </div>

      {/* Button Group */}
      <div className="canvas-panel p-8 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>按钮组合</h2>
        <div className="flex gap-0">
          <button
            className="px-4 py-2 text-white"
            style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)' }}
          >
            查询
          </button>
          <button
            className="px-4 py-2"
            style={{ border: '1px solid var(--border)', borderLeft: 'none', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
          >
            重置
          </button>
        </div>
      </div>
    </div>
  );
};
