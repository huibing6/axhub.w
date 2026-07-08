/**
 * @name SearchFilter
 */
interface FilterField { label: string; type?: 'input' | 'select'; options?: string[]; }
export default function SearchFilter({ fields, onSearch }: { fields: FilterField[]; onSearch?: () => void }) {
  return (
    <div className="bg-white rounded border border-[#DDDDDD] p-4 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {fields.map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <label className="text-[13px] text-[#333] whitespace-nowrap">{f.label}</label>
            {f.type === 'select' ? (
              <select className="flex-1 h-8 border border-[#DDDDDD] rounded px-2 text-[13px] outline-none bg-white">
                {f.options?.map((o, oi) => <option key={oi}>{o}</option>)}
              </select>
            ) : (
              <input className="flex-1 h-8 border border-[#DDDDDD] rounded px-2 text-[13px] outline-none" />
            )}
          </div>
        ))}
      </div>
      <button onClick={onSearch} className="bg-[#E53935] text-white px-6 py-1.5 rounded text-[13px]">查询</button>
    </div>
  );
}
