import { Question_Props } from '../components/Question';
export const mock_questions: Question_Props[] = [
  {
    id: 1,
    description: 'Are you authorized to fill out this inspection form?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 2,
    description: 'What is the name of the inspector?',
    type: 'text',
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
    description: 'Select the inspection area:',
    type: 'dropdown',
    options: ['Warehouse', 'Office', 'Storage', 'Loading Dock'],
    required: true,
    value: '',
  },
  {
    id: 5,
    description: 'Did all safety equipment pass visual inspection?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 6,
    description: 'Pick the date and time of inspection:',
    type: 'datetime',
    required: true,
    value: '',
  },
  {
    id: 7,
    description: 'List any issues found during inspection:',
    type: 'text',
    required: false,
    helperText: 'Leave blank if no issues were found.',
    value: '',
  },
];
