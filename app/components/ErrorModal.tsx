'use client';

import { X } from 'lucide-react';
import type { ValidationError } from '../utils/validateForm';

type Props = {
  open: boolean;
  errors: ValidationError[];
  onClose: () => void;
};

export default function ErrorModal({ open, errors, onClose }: Props) {
  if (!open) return null;

  const grouped = errors.reduce<Record<number, ValidationError[]>>((acc, e) => {
    acc[e.questionId] = acc[e.questionId] ? [...acc[e.questionId], e] : [e];
    return acc;
  }, {});

  const groups = Object.entries(grouped).map(([qid, list]) => ({
    qid: Number(qid),
    title: list[0]?.description ?? `Question ${qid}`,
    list,
  }));

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl border border-[#CBD2D9] shadow-xl">
          {/* HEADER */}
          <div className="flex items-start gap-4 p-5 border-b border-[#CBD2D9]">
            {/* subtle red accent */}
            <div className="w-1 h-9 bg-[#DE3411] rounded-full opacity-30" />

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#1F2933]">
                Fix these before submit/download
              </h2>
              <p className="text-sm text-[#52606D] mt-1">
                {errors.length} issue{errors.length === 1 ? '' : 's'} found.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                w-9 h-9 rounded-lg 
                bg-[#F3F4F6] text-[#3E4C59]
                hover:bg-[#E4E7EB]
                transition flex items-center justify-center
              "
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* BODY */}
          <div className="p-5 max-h-[60vh] overflow-auto">
            <div className="space-y-4">
              {groups.map((g) => (
                <div
                  key={g.qid}
                  className="
                    border border-[#CBD2D9] rounded-lg p-4
                    bg-[#F5F7FA]
                    border-l-4 border-l-[rgba(222,52,17,0.25)]
                  "
                >
                  <div className="text-sm font-semibold text-[#1F2933]">
                    {g.qid === -1 ? g.title : `${g.qid}. ${g.title}`}
                  </div>

                  <ul className="mt-2 list-disc pl-5 text-sm text-[#3E4C59] space-y-1 marker:text-[#DE3411]">
                    {g.list.map((e, idx) => (
                      <li key={idx}>{e.message}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-[#CBD2D9] flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                px-5 py-2.5 rounded-lg
                bg-[#2D3A8C] text-white text-sm font-medium
                hover:bg-[#19216C]
                transition
              "
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
