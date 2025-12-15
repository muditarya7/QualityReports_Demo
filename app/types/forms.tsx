export type QuestionType =
  | 'boolean'
  | 'number'
  | 'dropdown'
  | 'text'
  | 'datetime'
  | 'multiselect';

export type ValidationRules = {
  required?: boolean;

  text?: {
    minLen?: number;
    maxLen?: number;
    pattern?: RegExp; // full-string match
    forbidPattern?: RegExp; // any-match invalid
    normalize?: boolean; // trim + collapse spaces
  };

  number?: {
    min?: number;
    max?: number;
    integerOnly?: boolean;
  };

  options?: {
    enforce?: boolean; // must be in options[]
    minSelected?: number;
    maxSelected?: number;
    unique?: boolean;
  };

  datetime?: {
    minISO?: string; // 'YYYY-MM-DDTHH:mm'
    maxISO?: string;
    enforceValid?: boolean;
  };
};

export type QuestionValue = string | number | boolean | string[] | null;

export type QuestionData = {
  id: number;
  description: string;
  value: QuestionValue;
  type: QuestionType;
  options?: string[];
  required?: boolean;
  helperText?: string;
  validation?: ValidationRules;
};
