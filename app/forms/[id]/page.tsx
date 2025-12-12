'use client';
import Question from '@/app/components/Question';
import { useState } from 'react';
import { mock_questions } from '@/app/data/mock_question';
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
    </div>
  );
}
