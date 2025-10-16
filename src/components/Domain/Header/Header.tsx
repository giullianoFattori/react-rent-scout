import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, GlobeIcon, HeartIcon, IconButton, Stack, Text } from '../../Core';
import { SearchCompact, SearchCompactProps, SearchCompactValue } from '../Search/SearchCompact';

type HeaderVariant = 'transparent' | 'solid';

export interface HeaderProps {
  variant?: HeaderVariant;
  onSearch?: SearchCompactProps['onSubmit'];
  loading?: boolean;
  onLogin?: () => void;
  onOpenFavorites?: () => void;
}

export const Header = ({ variant = 'solid', onSearch, loading = false, onLogin, onOpenFavorites }: HeaderProps) => {
  const [isElevated, setIsElevated] = useState(variant === 'solid');

  useEffect(() => {
    if (variant === 'solid') return;
    const onScroll = () => {
      setIsElevated(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  const handleSearch = (value: SearchCompactValue) => {
    onSearch?.(value);
  };

  return (
    <header
      className={[
        'top-0 z-50 w-full transition-all duration-200 ease-out',
        variant === 'transparent' ? 'fixed' : 'relative',
        isElevated ? 'bg-surface-base shadow-md' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-sm px-gutter py-sm">
        <Stack direction="horizontal" justify="between" align="center" gap="sm">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-brand-700 focus-ring">
            <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              RS
            </span>
            <span>Rent Scout</span>
          </Link>

          <Stack direction="horizontal" gap="sm" align="center" className="hidden md:flex">
            <Button variant="ghost" data-evt="cta_click" data-ctx="header_login" onClick={onLogin}>
              Login
            </Button>
            <IconButton
              variant="ghost"
              label="Favoritos"
              icon={<HeartIcon className="h-5 w-5" />}
              data-evt="cta_click"
              data-ctx="header_favorites"
              onClick={onOpenFavorites}
            />
            <Button
              variant="secondary"
              density="compact"
              className="gap-2"
              data-evt="cta_click"
              data-ctx="header_language"
            >
              <GlobeIcon className="h-5 w-5" />
              <Text as="span" size="sm">
                PT-BR
              </Text>
            </Button>
          </Stack>
        </Stack>

        <SearchCompact variant="inline" onSubmit={handleSearch} loading={loading} />

        <div className="flex items-center justify-between md:hidden">
          <Button
            variant="ghost"
            density="compact"
            data-evt="cta_click"
            data-ctx="header_login_mobile"
            onClick={onLogin}
          >
            Login
          </Button>
          <IconButton
            variant="ghost"
            label="Favoritos"
            icon={<HeartIcon className="h-5 w-5" />}
            onClick={onOpenFavorites}
            data-evt="cta_click"
            data-ctx="header_favorites_mobile"
          />
        </div>
      </div>
    </header>
  );
};
