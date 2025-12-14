'use client';
import Link from 'next/link';
import { form_index } from '../data/form_index';
import { ChevronRight, ClipboardList } from 'lucide-react';

export default function FormList() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#E4E7EB] border-b border-[#CBD2D9]">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[rgba(45,58,140,0.1)] flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-[#2D3A8C]" />
            </div>
            <h1 className="text-2xl font-semibold text-[#323F4B] tracking-tight">
              Inspection Forms
            </h1>
          </div>

          <p className="text-[#52606D] text-sm ml-[52px]">
            Select a form to begin your quality inspection
          </p>
        </div>
      </header>

      {/* Form List */}
      <main className="max-w-3xl mx-auto px-6 py-8 ">
        <div className="flex flex-col gap-3">
          {form_index.map((form) => (
            <Link key={form.id} href={`/forms/${form.id}`} className="group">
              <div
                className="
                bg-white border border-[#CBD2D9] rounded-lg p-5 
                  shadow-[0_1px_3px_0_rgba(31,41,51,0.04),0_1px_2px_-1px_rgba(31,41,51,0.04)]
                  transition-all duration-150 
                  hover:shadow-[0_0_12px_rgba(45,58,140,0.10)]


                   hover:border-indigo-300/40
                  flex items-center justify-between
                "
              >
                <div className="flex items-center gap-4">
                  {/* Form Number */}
                  <span
                    className="
                    w-10 h-10 rounded-lg 
                    bg-indigo-50 text-indigo-700
                    text-sm font-semibold flex items-center justify-center
                    transition-colors duration-150
                    group-hover:bg-indigo-100 group-hover:text-[#19216C]
                    "
                  >
                    {form.id}
                  </span>

                  {/* Form Info */}
                  <div>
                    <h2
                      className="
                        text-[#1F2933] font-medium 
                        transition-colors duration-150 
                        group-hover:text-[#2D3A8C]
                      "
                    >
                      {form.title}
                    </h2>
                    <p className="text-[#7B8794] text-sm mt-0.5">
                      {form.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className="
                    w-5 h-5 text-indigo-700 
                    transition-all duration-150 
                    group-hover:text-[#2D3A8C]
                    group-hover:translate-x-0.5
                    stroke-[2.2]
                  "
                />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-[#3E4C59] text-xs underline mt-8">
          {form_index.length} Forms available
        </p>
      </main>
    </div>
  );
}
