import { NextResponse } from 'next/server';
import type { QuestionData, QuestionValue } from '../../../types/forms';
import { form_index } from '../../../data/form_index';
import { validateForm } from '../../../utils/validateForm';

type Payload = {
  formId: number;
  answers: Array<{ id: number; value: QuestionValue }>;
};

function cloneQuestions(qs: QuestionData[]): QuestionData[] {
  return qs.map((q) => ({
    ...q,
    value: Array.isArray(q.value) ? [...q.value] : q.value,
  }));
}

export async function POST(req: Request) {
  let body: Payload | null = null;

  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: [
          {
            questionId: -1,
            description: 'Request',
            type: 'server',
            message: 'Invalid JSON.',
          },
        ],
      },
      { status: 400 }
    );
  }

  const formId = Number(body?.formId);
  const form = form_index.find((f) => f.id === formId);

  if (!form) {
    return NextResponse.json(
      {
        ok: false,
        errors: [
          {
            questionId: -1,
            description: 'Form',
            type: 'server',
            message: 'Form not found.',
          },
        ],
      },
      { status: 404 }
    );
  }

  const incoming = new Map<number, QuestionValue>();
  for (const a of body?.answers ?? []) incoming.set(a.id, a.value);

  const base = cloneQuestions(form.questions);

  const questionsWithValues: QuestionData[] = base.map((q) => ({
    ...q,
    value: incoming.has(q.id) ? (incoming.get(q.id) as QuestionValue) : q.value,
  }));

  const result = validateForm(questionsWithValues);

  if (!result.isValid) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 400 }
    );
  }

  // TODO: persist to DB
  return NextResponse.json({ ok: true }, { status: 200 });
}
