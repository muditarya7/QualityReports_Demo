import type { QuestionData } from '@/app/types/forms';

export const facility_questions: QuestionData[] = [
  {
    id: 1,
    description: 'Is the facility clean and free of obstructions?',
    type: 'boolean',
    required: true,
    value: null,
  },
  {
    id: 2,
    description: 'Enter the building/area name:',
    type: 'text',
    required: true,
    value: '',
    validation: {
      text: {
        minLen: 2,
        maxLen: 80,
        pattern: /^[A-Za-z0-9.' -]+$/,
        normalize: true,
      },
    },
  },
  {
    id: 3,
    description: 'Rate the facility lighting condition on a scale of 1–10:',
    type: 'number',
    required: true,
    value: '',
    validation: {
      number: {
        min: 1,
        max: 10,
        integerOnly: true,
      },
    },
  },
  {
    id: 4,
    description: 'Select flooring condition:',
    type: 'dropdown',
    options: ['Dry', 'Wet', 'Damaged', 'Uneven'],
    required: true,
    value: '',
    validation: {
      options: {
        enforce: true,
      },
    },
  },
  {
    id: 5,
    description: 'Is ventilation functioning properly?',
    type: 'boolean',
    required: true,
    value: null,
  },
  {
    id: 6,
    description: 'Inspection timestamp:',
    type: 'datetime',
    required: true,
    value: '',
    validation: {
      datetime: {
        enforceValid: true,
      },
    },
  },
  {
    id: 7,
    description: 'Describe any hazards or maintenance needs:',
    type: 'text',
    required: false,
    helperText: 'Leave blank if no issues were found.',
    value: '',
    validation: {
      text: {
        maxLen: 600,
        normalize: true,
      },
    },
  },
];
