import { Link } from 'react-router-dom';

import { GlobeIcon, Stack, Text } from '../../Core';

const footerLinks = [
  { label: 'Ajuda', to: '/ajuda' },
  { label: 'Termos', to: '/termos' },
  { label: 'Política de Privacidade', to: '/politica' },
  { label: 'Contato', to: '/contato' },
];

export const Footer = () => {
  return (
    <footer className="mt-lg border-t border-border-subtle bg-surface-base" aria-labelledby="footer-heading">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-sm px-gutter py-lg">
        <Text as="h2" id="footer-heading" className="sr-only">
          Rodapé Rent Scout
        </Text>
        <Stack
          direction="horizontal"
          gap="sm"
          wrap
          align="center"
          justify="between"
          className="text-sm text-text-secondary"
        >
          <span>&copy; {new Date().getFullYear()} Rent Scout</span>
          <nav aria-label="Links institucionais">
            <ul className="flex flex-wrap items-center gap-4">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link className="focus-ring text-sm text-text-secondary hover:text-text-primary" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className="flex items-center gap-2 text-sm text-text-secondary focus-ring">
            <GlobeIcon className="h-5 w-5" />
            <span>Português (BR)</span>
          </button>
        </Stack>
      </div>
    </footer>
  );
};
