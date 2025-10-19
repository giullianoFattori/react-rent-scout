export const Header = () => (
  <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
    <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
      <div className="text-slate-900 font-semibold tracking-tight">RS Rent Scout</div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline text-slate-700">PT-BR</span>
        <button
          type="button"
          className="inline-flex h-9 px-4 items-center rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 shadow-sm"
          data-evt="header_login_click"
        >
          Login
        </button>
      </div>
    </div>
  </header>
);
