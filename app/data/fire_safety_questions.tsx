import { QuestionData } from '@/app/components/Question';

export const fire_safety_questions: QuestionData[] = [
  {
    id: 1,
    description: 'Are fire extinguishers present and visible?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 2,
    description: 'Select the type of fire extinguishers available:',
    type: 'dropdown',
    options: ['ABC', 'CO2', 'Water Mist', 'Foam'],
    required: true,
    value: '',
  },
  {
    id: 3,
    description: 'Number of extinguishers in the inspection area:',
    type: 'number',
    required: true,
    value: 0,
  },
  {
    id: 4,
    description: 'Is the fire alarm system operational?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 5,
    description: 'Last fire drill date:',
    type: 'datetime',
    required: true,
    value: '',
  },
  {
    id: 6,
    description: 'Is emergency exit signage clearly visible?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 7,
    description: 'List any fire hazards found:',
    type: 'text',
    required: false,
    helperText: 'Leave blank if no hazards were found.',
    value: '',
  },
];
