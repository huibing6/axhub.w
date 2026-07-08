/**
 * @name StepWizard
 */
export default function StepWizard({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] border-2 ${i < current ? 'bg-[#4CAF50] border-[#4CAF50] text-white' : i === current ? 'bg-[#E53935] border-[#E53935] text-white' : 'bg-white border-[#DDD] text-[#999]'}`}>{i + 1}</div>
          <span className={`ml-2 text-[13px] ${i === current ? 'text-[#E53935] font-bold' : 'text-[#333]'}`}>{step}</span>
          {i < steps.length - 1 && <div className="w-12 h-px bg-[#DDD] mx-3" />}
        </div>
      ))}
    </div>
  );
}
