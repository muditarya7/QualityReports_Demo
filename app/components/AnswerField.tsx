'use client';

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
  // BOOLEAN (Pass/Fail or Yes/No)
  if (type === 'boolean') {
    return (
      <div className="flex items-center gap-4">
        <button
          className={`px-3 py-1 rounded ${
            value === true ? 'bg-green-500 text-white' : 'bg-slate-200'
          }`}
          onClick={() => onChange(true)}
        >
          Yes
        </button>

        <button
          className={`px-3 py-1 rounded ${
            value === false ? 'bg-red-500 text-white' : 'bg-slate-200'
          }`}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>
    );
  }

  // NUMBER
  if (type === 'number') {
    return (
      <input
        type="number"
        value={typeof value === 'number' ? value : ''}
        className="border rounded p-2 w-40"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  // TEXT
  if (type === 'text') {
    return (
      <input
        type="text"
        value={typeof value === 'string' ? value : ''}
        className="border rounded p-2 w-full"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  // DROPDOWN
  if (type === 'dropdown') {
    return (
      <select
        className="border rounded p-2 w-60"
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select an option</option>
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  // DATETIME
  if (type === 'datetime') {
    return (
      <input
        type="datetime-local"
        value={value as string}
        className="border rounded p-2"
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  // MULTISELECT (checkbox group)
  if (type === 'multiselect') {
    const arr = Array.isArray(value) ? value : [];

    return (
      <div>
        {options?.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              checked={arr.includes(opt)}
              onChange={() => {
                const updated = arr.includes(opt)
                  ? arr.filter((x) => x !== opt)
                  : [...arr, opt];

                onChange(updated);
              }}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  return null;
}
