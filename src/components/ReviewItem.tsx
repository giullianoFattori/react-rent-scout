import { useState } from 'react';
import type { Review } from './Reviews.types';

export default function ReviewItem({ r }: { r: Review }) {
  const [helpful, setHelpful] = useState(r.helpful || 0);
  const [marked, setMarked] = useState(false);
  const date = new Date(r.dateISO);
  const dateLabel = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium text-slate-900">{r.name}</div>
        <div className="text-sm text-slate-600">{dateLabel}</div>
      </div>
      <div className="mt-1 text-sm text-slate-700">★ {r.rating.toFixed(1)}</div>
      <p className="mt-2 text-slate-700">{r.text}</p>
      <div className="mt-3">
        <button
          type="button"
          className={`h-9 rounded-lg border border-slate-300 px-3 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 ${marked ? 'cursor-default bg-slate-100 text-slate-500' : 'hover:bg-slate-50'}`}
          onClick={() => {
            if (marked) return;
            setHelpful((value) => value + 1);
            setMarked(true);
          }}
          aria-label="Marcar avaliação como útil"
          aria-pressed={marked}
        >
          Útil • {helpful}
        </button>
      </div>
    </article>
  );
}
