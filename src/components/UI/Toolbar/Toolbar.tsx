import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
  density?: 'compact' | 'comfortable';
  position?: 'static' | 'sticky';
}

const densityStyles = {
  compact: 'gap-2 px-sm py-2',
  comfortable: 'gap-3 px-md py-3',
};

export const Toolbar = ({
  children,
  className,
  density = 'compact',
  position = 'static',
}: ToolbarProps) => {
  return (
    <nav
      className={twMerge(
        'w-full rounded-lg border border-border-subtle bg-surface-base shadow-xs',
        densityStyles[density],
        position === 'sticky' && 'sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-surface-base/80',
        'flex flex-wrap items-center',
        className
      )}
      aria-label="Barra de filtros"
    >
      {children}
    </nav>
  );
};
