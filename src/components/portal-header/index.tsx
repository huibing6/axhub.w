/**
 * @name PortalHeader
 */
export default function PortalHeader({ activeTab }: { activeTab?: 'workspace' | 'admin' }) {
  return (
    <div className="h-[56px] bg-white border-b border-[#DDDDDD] flex items-center px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#E53935] flex items-center justify-center">
          <span className="text-white text-xs">雪</span>
        </div>
        <span className="text-[14px] font-bold">云梦泽</span>
      </div>
      <div className="flex items-center gap-2 ml-8">
        <button className={`px-4 py-1.5 rounded text-[13px] ${activeTab === 'workspace' ? 'bg-[#E53935] text-white' : 'text-[#333]'}`}>服务商工作台</button>
        <span className={`text-[13px] cursor-pointer ${activeTab === 'admin' ? 'text-[#E53935]' : 'text-[#333]'}`}>服务商管理端</span>
      </div>
    </div>
  );
}
