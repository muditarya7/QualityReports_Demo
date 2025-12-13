import { QuestionData } from '@/app/components/Question';

export const facility_questions: QuestionData[] = [
  {
    id: 1,
    description: 'Is the facility clean and free of obstructions?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 2,
    description: 'Enter the building/area name:',
    type: 'text',
    required: true,
    value: '',
  },
  {
    id: 3,
    description: 'Rate the facility lighting condition on a scale of 1–10:',
    type: 'number',
    required: true,
    value: 0,
  },
  {
    id: 4,
    description: 'Select flooring condition:',
    type: 'dropdown',
    options: ['Dry', 'Wet', 'Damaged', 'Uneven'],
    required: true,
    value: '',
  },
  {
    id: 5,
    description: 'Is ventilation functioning properly?',
    type: 'boolean',
    required: true,
    value: false,
  },
  {
    id: 6,
    description: 'Inspection timestamp:',
    type: 'datetime',
    required: true,
    value: '',
  },
  {
    id: 7,
    description: 'Describe any hazards or maintenance needs:',
    type: 'text',
    required: false,
    helperText: 'Leave blank if no issues were found.',
    value: '',
  },
];
