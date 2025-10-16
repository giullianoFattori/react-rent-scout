import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const paddingMap: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-sm',
  md: 'p-md',
  lg: 'p-lg',
};

export interface CardProps {
  children: ReactNode;
  padding?: CardPadding;
  className?: string;
  interactive?: boolean;
  as?: ElementType;
}

export const Card = ({
  children,
  padding = 'md',
  className,
  interactive = false,
  as: Component = 'section',
}: CardProps) => {
  return (
    <Component
      className={twMerge(
        'card',
        paddingMap[padding],
        interactive && 'hover:translate-y-[-1px] hover:shadow-lg focus-visible:outline-none focus-ring',
        className
      )}
    >
      {children}
    </Component>
  );
};
