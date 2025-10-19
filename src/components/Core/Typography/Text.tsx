import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TextTone = 'primary' | 'secondary' | 'muted' | 'inverse' | 'success' | 'warning' | 'error';
type TextSize = 'sm' | 'md' | 'lg';
type TextWeight = 'regular' | 'medium' | 'semibold';

const toneMap: Record<TextTone, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-neutral-600',
  inverse: 'text-text-inverse',
  success: 'text-feedback-success',
  warning: 'text-feedback-warning',
  error: 'text-feedback-error',
};

const sizeMap: Record<TextSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const weightMap: Record<TextWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

export type TextProps<C extends ElementType = 'p'> = {
  as?: C;
  tone?: TextTone;
  size?: TextSize;
  weight?: TextWeight;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | 'children' | 'className'>;

export const Text = <C extends ElementType = 'p'>({
  as,
  tone = 'primary',
  size = 'md',
  weight = 'regular',
  children,
  className,
  ...rest
}: TextProps<C>) => {
  const Component = (as ?? 'p') as ElementType;

  return (
    <Component
      className={twMerge('leading-relaxed', toneMap[tone], sizeMap[size], weightMap[weight], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
