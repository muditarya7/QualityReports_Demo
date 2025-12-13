'use client';
import Link from 'next/link';
import { form_index } from '../data/form_index';

export default function FormList() {
  return (
    <div>
      <h1>this is form list page</h1>

      {form_index.map((form_item) => (
        <Link key={form_item.id} href={`/forms/${form_item.id}`}>
          <div className="flex flex-row">
            <button className="bg-slate-200 max-width">
              {form_item.title}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
