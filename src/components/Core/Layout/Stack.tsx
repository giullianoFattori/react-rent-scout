import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type StackDirection = 'vertical' | 'horizontal';

const directionMap: Record<StackDirection, string> = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
};

export interface StackProps {
  as?: keyof JSX.IntrinsicElements;
  direction?: StackDirection;
  gap?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
  children: ReactNode;
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

const gapMap = {
  '3xs': 'gap-3xs',
  '2xs': 'gap-2xs',
  xs: 'gap-xs',
  sm: 'gap-sm',
  md: 'gap-md',
  lg: 'gap-lg',
};

export const Stack = ({
  as: Component = 'div',
  direction = 'vertical',
  gap = 'sm',
  wrap = false,
  align = 'stretch',
  justify = 'start',
  className,
  children,
}: StackProps) => {
  return (
    <Component
      className={twMerge(
        'flex',
        directionMap[direction],
        gapMap[gap],
        wrap && 'flex-wrap',
        alignMap[align],
        justifyMap[justify],
        className
      )}
    >
      {children}
    </Component>
  );
};
