import type { QuestionData } from '@/app/types/forms';

export const equipment_questions: QuestionData[] = [
  {
    id: 1,
    description: 'Is the equipment powered off before inspection?',
    type: 'boolean',
    required: true,
    value: null,
  },
  {
    id: 2,
    description: 'Enter the equipment serial number:',
    type: 'text',
    required: true,
    value: '',
  },
  {
    id: 3,
    description: 'Record the operating temperature (°F):',
    type: 'number',
    required: true,
    value: '', // raw input string
  },
  {
    id: 4,
    description: 'Select the condition of the equipment:',
    type: 'dropdown',
    options: ['Good', 'Minor Issues', 'Needs Repair', 'Out of Service'],
    required: true,
    value: '',
  },
  {
    id: 5,
    description: 'Did the equipment pass the mechanical check?',
    type: 'boolean',
    required: true,
    value: null,
  },
  {
    id: 6,
    description: 'Inspection date & time:',
    type: 'datetime',
    required: true,
    value: '',
  },
  {
    id: 7,
    description: 'List any defects or notes:',
    type: 'text',
    required: false,
    value: '',
    helperText: 'Leave blank if no defects were found.',
  },
];
