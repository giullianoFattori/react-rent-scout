export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
      <div className="text-lg font-semibold text-slate-900">RS Rent Scout</div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-lg border border-slate-300 px-3 text-sm text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
        >
          Login
        </button>
      </div>
    </div>
  </header>
);
