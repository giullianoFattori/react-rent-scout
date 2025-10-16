import { SearchCompactPayload } from './SearchCompact';

interface HeaderProps {
  onSearch?: (payload: SearchCompactPayload) => void;
}

const GlobeIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 text-slate-500"
    focusable="false"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Header = ({ onSearch: _ }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-slate-900">RSRent Scout</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-transparent px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
            aria-label="Alterar idioma"
          >
            <GlobeIcon />
            <span className="hidden sm:inline">PT-BR</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-800 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};
