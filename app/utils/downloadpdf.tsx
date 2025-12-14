import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const generatePDF = (answers: any[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Inspection Report', 14, 20);

  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

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

  doc.save('inspection-report.pdf');
};
