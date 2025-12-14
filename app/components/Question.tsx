import AnswerField from './AnswerField';

export type Question_Props = {
  id: number;
  description: string;
  value: string | number | boolean | string[];
  type: 'boolean' | 'number' | 'dropdown' | 'text' | 'datetime' | 'multiselect';
  options?: string[];
  required?: boolean;
  helperText?: string;
  onChange: (val: any) => void;
};
export type QuestionData = Omit<Question_Props, 'onChange'>;

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
    <div
      className="
        bg-white border border-[#CBD2D9] rounded-lg p-6
        shadow-[0_1px_3px_rgba(31,41,51,0.04),0_1px_2px_-1px_rgba(31,41,51,0.04)]
        transition-all duration-150
        hover:shadow-[0_4px_6px_-1px_rgba(31,41,51,0.08),0_2px_4px_-2px_rgba(31,41,51,0.04)]
      "
    >
      <div className="flex flex-col gap-4">
        {/* Question Header */}
        <div className="flex items-start gap-4">
          {/* Question Number Badge */}
          <span
            className="
              flex-shrink-0 w-8 h-8 rounded-md 
              bg-[rgba(45,58,140,0.1)] text-[#2D3A8C]
              text-sm font-semibold flex items-center justify-center
            "
          >
            {id}
          </span>

          {/* Question Text */}
          <div className="flex-1 pt-1">
            <p className="text-[#1F2933] font-medium leading-relaxed">
              {description}
              {required && <span className="text-[#DE3411] ml-1">*</span>}
            </p>

            {/* Helper Text */}
            {helperText && (
              <p className="text-[#3E4C59] text-sm mt-1.5">{helperText}</p>
            )}
          </div>
        </div>

        {/* Answer Field */}
        <div className="pl-12">
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
