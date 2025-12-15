import type { QuestionData } from '../types/forms';

import { mock_questions } from './mock_question';
import { equipment_questions } from './equip_questions';
import { fire_safety_questions } from './fire_safety_questions';
import { facility_questions } from './facility_questions';

export const form_index: Array<{
  id: number;
  title: string;
  description: string;
  questions: QuestionData[];
}> = [
  {
    id: 1,
    title: 'General Safety Inspection',
    description: 'Covers basic workplace safety and authorization checks.',
    questions: mock_questions,
  },
  {
    id: 2,
    title: 'Equipment Checklist',
    description: 'Daily equipment condition and mechanical integrity checks.',
    questions: equipment_questions as QuestionData[],
  },
  {
    id: 3,
    title: 'Facility Condition Report',
    description: 'Building, ventilation, lighting, and hazard inspection.',
    questions: facility_questions as QuestionData[],
  },
  {
    id: 4,
    title: 'Fire Safety Audit',
    description: 'Extinguishers, alarms, fire drills, and hazard detection.',
    questions: fire_safety_questions as QuestionData[],
  },
];
