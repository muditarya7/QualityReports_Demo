import { equipment_questions } from './equip_questions';
import { fire_safety_questions } from './fire_safety_questions';
import { facility_questions } from './facility_questions';
import { mock_questions } from './mock_question';

export const form_index = [
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
    questions: equipment_questions,
  },
  {
    id: 3,
    title: 'Facility Condition Report',
    description: 'Building, ventilation, lighting, and hazard inspection.',
    questions: facility_questions,
  },
  {
    id: 4,
    title: 'Fire Safety Audit',
    description: 'Extinguishers, alarms, fire drills, and hazard detection.',
    questions: fire_safety_questions,
  },
];
