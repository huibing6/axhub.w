/**
 * @name PortalSidebar
 */
import { useState } from 'react';

interface MenuItem { label: string; icon?: string; children?: MenuItem[]; }
interface MenuGroup { title: string; items: MenuItem[]; }

export default function PortalSidebar({ groups, activeItem, variant = 'default' }: { groups: MenuGroup[]; activeItem: string; variant?: 'default' | 'admin' }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="w-[240px] bg-white border-r border-[#DDDDDD] min-h-[calc(100vh-56px)]">
      <div className="p-3">
        <div className="flex items-center gap-2 bg-[#F5F5F5] rounded px-3 py-1.5 mb-3">
          <svg className="w-4 h-4 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input placeholder="搜索菜单" className="bg-transparent text-[13px] outline-none flex-1" />
        </div>
      </div>
      {groups.map((group, gi) => (
        <div key={gi} className="mb-1">
          {variant === 'admin' ? (
            <div className="bg-[#1976D2] text-white text-[12px] px-4 py-1.5 font-bold">{group.title}</div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-1.5 text-[13px] text-[#333] font-bold cursor-pointer" onClick={() => toggle(group.title)}>
              <svg className="w-4 h-4 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              {group.title}
              <svg className={`w-3 h-3 ml-auto transition-transform ${expanded[group.title] ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
          )}
          {(variant === 'admin' || expanded[group.title]) && (
            <div className="py-1">
              {group.items.map((item, ii) => (
                <div key={ii}>
                  {item.children ? (
                    <div>
                      <div className="flex items-center gap-2 px-4 py-1.5 text-[13px] cursor-pointer hover:bg-[#F5F5F5]" onClick={() => toggle(item.label)}>
                        <svg className={`w-3 h-3 transition-transform ${expanded[item.label] ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        {item.label}
                      </div>
                      {expanded[item.label] && item.children.map((child, ci) => (
                        <div key={ci} className={`pl-10 pr-4 py-1.5 text-[13px] cursor-pointer hover:bg-[#F5F5F5] ${activeItem === child.label ? 'text-[#E53935] border-l-3 border-[#E53935]' : 'text-[#333]'}`}>{child.label}</div>
                      ))}
                    </div>
                  ) : (
                    <div className={`pl-6 pr-4 py-1.5 text-[13px] cursor-pointer hover:bg-[#F5F5F5] ${activeItem === item.label ? 'text-[#E53935] border-l-3 border-[#E53935] font-bold' : 'text-[#333]'}`}>{item.label}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
