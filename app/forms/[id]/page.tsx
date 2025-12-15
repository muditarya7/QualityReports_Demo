'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

import Question from '../../components/Question';
import ErrorModal from '../../components/ErrorModal';

import { form_index } from '../../data/form_index';
import { validateForm, type ValidationError } from '../../utils/validateForm';
import { generatePDF } from '../../utils/downloadpdf';

import type { QuestionData, QuestionValue } from '../../types/forms';

type FormPageProps = {
  params: Promise<{ id: string }>;
};

function cloneQuestions(qs: QuestionData[]): QuestionData[] {
  return qs.map((q) => ({
    ...q,
    value: Array.isArray(q.value) ? [...q.value] : q.value,
  }));
}

function coerceForOutput(qs: QuestionData[]): QuestionData[] {
  // converts number raw strings to numbers when possible (for nicer PDF output)
  return qs.map((q) => {
    if (q.type !== 'number') return q;

    const v = q.value;
    if (typeof v === 'number') return q;
    if (typeof v !== 'string') return q;

    const s = v.trim();
    if (!/^-?\d+(\.\d+)?$/.test(s)) return q;

    const n = Number(s);
    if (Number.isNaN(n)) return q;

    return { ...q, value: n };
  });
}

export default function FormPage({ params }: FormPageProps) {
  const { id } = use(params);
  const formId = Number(id);

  const form = form_index.find((f) => f.id === formId);

  const [answers, setAnswers] = useState<QuestionData[]>(() =>
    form ? cloneQuestions(form.questions) : []
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalErrors, setModalErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If route changes (or hot reload), keep state aligned with the selected form
  useEffect(() => {
    if (form) setAnswers(cloneQuestions(form.questions));
  }, [formId]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateAnswer = (questionId: number, newValue: any) => {
    setAnswers((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, value: newValue } : q))
    );
  };

  const openErrors = (errs: ValidationError[]) => {
    setModalErrors(errs);
    setModalOpen(true);
  };

  const handleSubmitAndDownload = async () => {
    if (!form) return;

    const local = validateForm(answers);
    if (!local.isValid) {
      openErrors(local.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        formId,
        answers: answers.map((q) => ({
          id: q.id,
          value: q.value as QuestionValue,
        })),
      };

      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          errors?: ValidationError[];
        } | null;

        openErrors(
          data?.errors?.length
            ? data.errors
            : [
                {
                  questionId: -1,
                  description: 'Server Error',
                  type: 'server',
                  message: `Server responded with ${res.status}.`,
                },
              ]
        );
        return;
      }

      generatePDF(coerceForOutput(answers));
    } catch {
      openErrors([
        {
          questionId: -1,
          description: 'Network',
          type: 'network',
          message: 'Network error. Try again.',
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <ErrorModal
        open={modalOpen}
        errors={modalErrors}
        onClose={() => setModalOpen(false)}
      />

      <header className="bg-white border-b border-[#CBD2D9] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/forms"
                className="group w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center transition-all duration-150 hover:bg-indigo-100"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-700 group-hover:text-[#19216C] stroke-[2.6]" />
              </Link>

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

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-4">
          {answers.map((q) => (
            <Question
              key={q.id}
              {...q}
              onChange={(val) => updateAnswer(q.id, val)}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSubmitAndDownload}
            disabled={isSubmitting}
            className="
              inline-flex items-center gap-2.5
              bg-[#FFB088] text-[#1F2933]
              px-6 py-3 rounded-lg font-medium text-sm
              shadow-sm hover:shadow-md hover:bg-[#FFB088]/90
              transition-all duration-150 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
            "
          >
            <Download className="w-4 h-4" />
            {isSubmitting ? 'Submitting…' : 'Submit & Download Report'}
          </button>
        </div>

        <div className="h-8" />
      </main>
    </div>
  );
}
