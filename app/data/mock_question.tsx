import type { QuestionData } from '../types/forms';

export const mock_questions: QuestionData[] = [
  {
    id: 1,
    description: 'What is the name of the inspector?',
    type: 'text',
    required: true,
    value: '',
    validation: {
      text: {
        normalize: true,
        minLen: 2,
        maxLen: 60,
        pattern: /^[A-Za-z.' -]+$/,
        forbidPattern: /_/,
      },
    },
  },
  {
    id: 2,
    description: 'Select the inspection area:',
    type: 'dropdown',
    options: ['Warehouse', 'Office', 'Storage', 'Loading Dock'],
    required: true,
    value: '',
    validation: { options: { enforce: true } },
  },
  {
    id: 3,
    description: 'Enter the temperature reading (°F):',
    type: 'number',
    required: true,
    value: '', // raw input string
    validation: { number: { min: -50, max: 200 } },
  },
  {
    id: 4,
    description: 'Did all safety equipment pass visual inspection?',
    type: 'boolean',
    required: true,
    value: null, // unanswered state
  },
  {
    id: 5,
    description: 'Pick the date and time of inspection:',
    type: 'datetime',
    required: true,
    value: '',
    validation: { datetime: { enforceValid: true } },
  },
  {
    id: 6,
    description: 'List any issues found during inspection:',
    type: 'text',
    required: false,
    helperText: 'Leave blank if no issues were found.',
    value: '',
    validation: { text: { normalize: true, maxLen: 500 } },
  },
];
