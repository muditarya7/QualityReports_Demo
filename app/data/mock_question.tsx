import { QuestionData } from '../components/Question';
export const mock_questions: QuestionData[] = [
  {
    id: 1,
    description: 'What is the name of the inspector?',
    type: 'text',
    required: true,
    value: '',
  },
  {
    id: 2,
    description: 'Select the inspection area:',
    type: 'dropdown',
    options: ['Warehouse', 'Office', 'Storage', 'Loading Dock'],
    required: true,
    value: '',
  },
  {
    id: 3,
    description: 'Enter the temperature reading (°F):',
    type: 'number',
    required: true,
    value: 0,
  },

  {
    id: 4,
    description: 'Did all safety equipment pass visual inspection?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 5,
    description: 'Pick the date and time of inspection:',
    type: 'datetime',
    required: true,
    value: '',
  },
  {
    id: 6,
    description: 'List any issues found during inspection:',
    type: 'text',
    required: false,
    helperText: 'Leave blank if no issues were found.',
    value: '',
  },
];
