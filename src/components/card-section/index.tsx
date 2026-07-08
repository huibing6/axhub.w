/**
 * @name CardSection
 */
export default function CardSection({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded border border-[#DDDDDD] p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-[#E53935] rounded" />
        {icon && <span className="text-[14px]">{icon}</span>}
        <span className="text-[14px] font-bold">{title}</span>
      </div>
      {children}
    </div>
  );
}
