/**
 * @name DataTable
 */
interface Column { key: string; title: string; width?: number; align?: 'left' | 'center'; }
export default function DataTable({ columns, data }: { columns: Column[]; data: Record<string, string>[] }) {
  return (
    <div className="bg-white rounded border border-[#DDDDDD] overflow-hidden">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="bg-[#F5F5F5]">
            {columns.map(col => (
              <th key={col.key} className={`px-4 py-2.5 font-bold text-[#333] border-b border-[#DDDDDD] ${col.align === 'center' ? 'text-center' : 'text-left'}`} style={col.width ? { width: col.width } : undefined}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ri) => (
            <tr key={ri} className="hover:bg-[#FAFAFA]">
              {columns.map(col => (
                <td key={col.key} className={`px-4 py-2.5 border-b border-[#DDDDDD] text-[#333] ${col.align === 'center' ? 'text-center' : 'text-left'}`}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
