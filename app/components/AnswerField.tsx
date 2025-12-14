import { cn } from '../utils/downloadpdf';
import { Check } from 'lucide-react';

type AnswerFieldProps = {
  type: 'boolean' | 'number' | 'dropdown' | 'text' | 'datetime' | 'multiselect';
  value: string | number | boolean | string[];
  options?: string[];
  onChange: (val: any) => void;
};

export default function AnswerField({
  type,
  value,
  options,
  onChange,
}: AnswerFieldProps) {
  /* BOOLEAN (YES / NO) */
  if (type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        {/* YES button */}
        <button
          type="button"
          className={cn(
            'px-5 py-2 rounded-md text-sm font-medium transition-all duration-150',
            value === true
              ? 'bg-[#2EBE74] text-white shadow-sm'
              : 'bg-[#9AA5B1] text-[#3E4C59] hover:bg-[#9AA5B1]/80'
          )}
          onClick={() => onChange(true)}
        >
          Yes
        </button>

        {/* NO button */}
        <button
          type="button"
          className={cn(
            'px-5 py-2 rounded-md text-sm font-medium transition-all duration-150',
            value === false
              ? 'bg-[#DE3411] text-white shadow-sm'
              : 'bg-[#9AA5B1] text-[#3E4C59] hover:bg-[#9AA5B1]/80'
          )}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    );
  }

  /* NUMBER FIELD */
  if (type === 'number') {
    return (
      <input
        type="number"
        value={typeof value === 'number' ? value : ''}
        className="
          w-40 px-4 py-2.5 text-sm bg-white border border-[#CBD2D9] rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#2D3A8C] focus:border-transparent
          transition-all duration-150 text-[#1F2933] placeholder:text-[#3E4C59]
        "
        placeholder="Enter number"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  /* TEXT FIELD */
  if (type === 'text') {
    return (
      <input
        type="text"
        value={typeof value === 'string' ? value : ''}
        className="
          w-full px-4 py-2.5 text-sm bg-white border border-[#CBD2D9] rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#2D3A8C] focus:border-transparent
          transition-all duration-150 text-[#1F2933] placeholder:text-[#3E4C59]
        "
        placeholder="Enter your response"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  /* DROPDOWN */
  if (type === 'dropdown') {
    return (
      <select
        className="
          w-64 px-4 py-2.5 text-sm bg-white border border-[#CBD2D9] rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#2D3A8C] focus:border-transparent
          transition-all duration-150 text-[#1F2933] cursor-pointer
          appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2224%22%20height%3d%2224%22%20viewBox%3d%220%200%2024%2024%22%20fill%3d%22none%22%20stroke%3d%22%236b7280%22%20stroke-width%3d%222%22%20stroke-linecap%3d%22round%22%20stroke-linejoin%3d%22round%22%3e%3cpolyline%20points%3d%226%209%2012%2015%2018%209%22%3e%3c%2fpolyline%3e%3c%2fsvg%3e')]
          bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10
        "
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" className="text-[#3E4C59]">
          Select an option
        </option>

        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  /* DATETIME PICKER */
  if (type === 'datetime') {
    return (
      <input
        type="datetime-local"
        value={value as string}
        className="
          px-4 py-2.5 text-sm bg-white border border-[#CBD2D9] rounded-md
          focus:outline-none focus:ring-2 focus:ring-[#2D3A8C] focus:border-transparent
          transition-all duration-150 text-[#1F2933] cursor-pointer
        "
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  /* MULTISELECT */
  if (type === 'multiselect') {
    const arr = Array.isArray(value) ? value : [];

    return (
      <div className="flex flex-wrap gap-3">
        {options?.map((opt) => {
          const isSelected = arr.includes(opt);

          return (
            <label
              key={opt}
              className={cn(
                'flex items-center gap-2.5 px-4 py-2.5 rounded-md text-sm cursor-pointer transition-all duration-150 border',
                isSelected
                  ? 'bg-[rgba(45,58,140,0.1)] border-[#2D3A8C] text-[#1F2933]'
                  : 'bg-white border-[#CBD2D9] text-[#1F2933] hover:border-[#3E4C59]/50'
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded border flex items-center justify-center transition-all duration-150',
                  isSelected
                    ? 'bg-[#2D3A8C] border-[#2D3A8C]'
                    : 'border-[#CBD2D9] bg-white'
                )}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              <span className="font-medium">{opt}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return null;
}
