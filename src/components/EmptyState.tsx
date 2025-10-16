interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel: string;
  onCta: () => void;
}

export const EmptyState = ({ title, description, ctaLabel, onCta }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>
    </div>
    <button
      type="button"
      onClick={onCta}
      className="inline-flex items-center rounded-full bg-teal-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
    >
      {ctaLabel}
    </button>
  </div>
);
