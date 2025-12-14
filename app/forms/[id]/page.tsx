'use client';
import { useState, use } from 'react';
import { QuestionData } from '../../components/Question';
import Link from 'next/link';
import Question from '../../components/Question';
import { generatePDF } from '../../utils/downloadpdf';
import { form_index } from '../../data/form_index';
import { ArrowLeft, Download } from 'lucide-react';

type FormPageProps = {
  params: Promise<{ id: string }>;
};

export default function FormPage({ params }: FormPageProps) {
  const { id } = use(params);
  const formId = Number(id);

  const form = form_index.find((f) => f.id === formId);

  if (!form) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1F2933] mb-2">
            Form not found
          </h1>
          <p className="text-[#3E4C59] mb-6">
            The requested form does not exist.
          </p>
          <Link
            href="/forms"
            className="inline-flex items-center gap-2 text-[#2D3A8C] hover:text-[#2D3A8C]/80 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to forms
          </Link>
        </div>
      </div>
    );
  }

  const [answers, setAnswers] = useState<QuestionData[]>(form.questions);

  const updateAnswer = (questionId: number, newValue: any) => {
    setAnswers((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, value: newValue } : q))
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <header className="bg-white border-b border-[#CBD2D9] sticky top-0 z-10">
        {' '}
        {/* Header */}
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link // Back Button
                href="/forms"
                className=" group w-9 h-9 rounded-lg 
                        bg-indigo-50 
                        flex items-center justify-center
                        transition-all duration-150
                        hover:bg-indigo-100"
              >
                <ArrowLeft
                  className=" w-4 h-4 
                text-indigo-700  
              group-hover:text-[#19216C]
                stroke-[2.6]"
                />
              </Link>

              {/* Title */}
              <div>
                <h1 className="text-lg font-semibold text-[#1F2933] tracking-tight">
                  {form.title}
                </h1>
                <p className="text-[#3E4C59] text-sm">
                  {answers.length} questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Questions */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-4">
          {answers.map((q) => (
            <Question
              key={q.id}
              id={q.id}
              description={q.description}
              value={q.value}
              type={q.type}
              options={q.options}
              required={q.required}
              helperText={q.helperText}
              onChange={(val) => updateAnswer(q.id, val)}
            />
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => generatePDF(answers)}
            className="
              inline-flex items-center gap-2.5 
              bg-[#FFB088] text-[#1F2933]
              px-6 py-3 rounded-lg font-medium text-sm
              shadow-sm hover:shadow-md hover:bg-[#FFB088]/90
              transition-all duration-150 active:scale-[0.98]
            "
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        <div className="h-8" />
      </main>
    </div>
  );
}
