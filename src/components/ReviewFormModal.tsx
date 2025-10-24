import { useState } from 'react';
import Modal from './Modal';
import type { Review } from './Reviews.types';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Review) => void;
}

export default function ReviewFormModal({ isOpen, onClose, onSubmit }: ReviewFormModalProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !text.trim()) {
      setError('Preencha nome e comentário.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('Nota deve estar entre 1 e 5.');
      return;
    }

    const review: Review = {
      id: Math.random().toString(36).slice(2),
      name: name.trim(),
      dateISO: new Date().toISOString(),
      rating,
      text: text.trim(),
      helpful: 0,
    };

    onSubmit(review);
    onClose();
    setName('');
    setText('');
    setRating(5);
    setError(null);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Escrever avaliação">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm text-slate-700" htmlFor="review-name">
            Seu nome
          </label>
          <input
            id="review-name"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-700" htmlFor="review-rating">
            Nota
          </label>
          <select
            id="review-rating"
            className="h-10 w-full rounded-lg border border-slate-300 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
          >
            {[5, 4, 3, 2, 1].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-700" htmlFor="review-text">
            Comentário
          </label>
          <textarea
            id="review-text"
            rows={4}
            className="w-full rounded-lg border border-slate-300 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-slate-300 px-3 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="h-10 rounded-lg bg-teal-600 px-4 text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Publicar
          </button>
        </div>
      </form>
    </Modal>
  );
}
