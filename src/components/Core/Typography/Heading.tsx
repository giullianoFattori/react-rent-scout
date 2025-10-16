import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<HeadingSize, string> = {
  sm: 'text-lg md:text-xl font-semibold',
  md: 'text-xl md:text-2xl font-semibold',
  lg: 'text-2xl md:text-3xl font-semibold',
  xl: 'text-3xl md:text-4xl font-bold',
};

export interface HeadingProps {
  as?: ElementType;
  level?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
}

export const Heading = ({
  as,
  level = 2,
  size = 'md',
  children,
  className,
}: HeadingProps) => {
  const Component = as ?? (`h${level}` as ElementType);

  return <Component className={twMerge('font-heading text-text-primary', sizeMap[size], className)}>{children}</Component>;
};
