const footerLinks = [
  { label: 'Ajuda', href: '#' },
  { label: 'Termos', href: '#' },
  { label: 'Política de privacidade', href: '#' },
  { label: 'Contato', href: '#' },
];

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-slate-900">RSRent Scout</span>
          <p className="text-sm text-slate-600">
            Curadoria de estadias para suas próximas viagens, com suporte em português.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Explorar</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Idioma &amp; Moeda</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <button
              type="button"
              className="inline-flex w-max items-center rounded-full border border-slate-300 px-3 py-1.5 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Português (BR)
            </button>
            <button
              type="button"
              className="inline-flex w-max items-center rounded-full border border-slate-300 px-3 py-1.5 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              BRL (R$)
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} RSRent Scout. Todos os direitos reservados.</p>
          <p className="text-xs text-slate-500">Inspirado em experiências de locação por temporada.</p>
        </div>
      </div>
    </footer>
  );
};
