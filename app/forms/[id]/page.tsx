'use client';
import Question from '@/app/components/Question';
import { useState } from 'react';
import { mock_questions } from '@/app/data/mock_question';
import { generatePDF } from '@/app/utils/downloadpdf';

export default function FormPage() {
  const [answers, setAnswers] = useState(mock_questions);
  const updateAnswer = (id: number, newValue: any) => {
    setAnswers((prev) =>
      prev.map((q) => (q.id === id ? { ...q, value: newValue } : q))
    );
  };

  return (
    <div>
      <h1>Form title</h1>
      {answers.map((Q) => (
        <Question
          key={Q.id}
          id={Q.id}
          description={Q.description}
          value={Q.value}
          type={Q.type}
          options={Q.options}
          required={Q.required}
          helperText={Q.helperText}
          onChange={(val) => updateAnswer(Q.id, val)}
        />
      ))}
      <button
        onClick={() => generatePDF(answers)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-8"
      >
        Download PDF
      </button>
    </div>
  );
}
