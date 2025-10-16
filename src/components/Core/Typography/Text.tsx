import { ElementType, ReactNode } from 'react';
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

export interface TextProps {
  as?: ElementType;
  tone?: TextTone;
  size?: TextSize;
  weight?: TextWeight;
  children: ReactNode;
  className?: string;
}

export const Text = ({
  as: Component = 'p',
  tone = 'primary',
  size = 'md',
  weight = 'regular',
  children,
  className,
}: TextProps) => {
  return (
    <Component className={twMerge('leading-relaxed', toneMap[tone], sizeMap[size], weightMap[weight], className)}>
      {children}
    </Component>
  );
};
