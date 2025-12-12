import AnswerField from './AnswerField';
export type Question_Props = {
  id: number;
  description: string;
  value: string | number | boolean;
  type: 'boolean' | 'number' | 'dropdown' | 'text' | 'datetime' | 'multiselect';
  options?: string[];
  required?: boolean;
  helperText?: string;
  onChange: (val: any) => void;
};

const Question = ({
  id,
  description,
  value,
  type,
  options,
  required,
  helperText,
  onChange,
}: Question_Props) => {
  return (
    <div className="bg-slate-100 p-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-slate-950 py-4">
          <h1>{id}</h1>
          <h1>{description}</h1>
        </div>
        <div>
          <AnswerField
            type={type}
            value={value}
            options={options}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Question;
