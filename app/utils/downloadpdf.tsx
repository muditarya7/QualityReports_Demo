import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GeneratePDFInput = {
  title: string;
  answers: any[];
};

export const generatePDF = ({ title, answers }: GeneratePDFInput) => {
  const doc = new jsPDF();

  // Report title
  doc.setFontSize(18);
  doc.text(title, 14, 20);

  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  // Table rows
  const rows = answers.map((q) => [
    q.id,
    q.description,
    Array.isArray(q.value) ? q.value.join(', ') : String(q.value),
  ]);

  autoTable(doc, {
    startY: 40,
    head: [['ID', 'Question', 'Answer']],
    body: rows,
    theme: 'striped',
  });

  // Filename derived from title
  const safeTitle = title.replace(/\s+/g, '_').toLowerCase();
  doc.save(`${safeTitle}.pdf`);
};
