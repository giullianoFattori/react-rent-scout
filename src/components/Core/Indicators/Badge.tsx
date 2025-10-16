import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'brand' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';
type BadgeTone = 'solid' | 'soft' | 'outline';

const variantMap: Record<BadgeVariant, Record<BadgeTone, string>> = {
  brand: {
    solid: 'bg-brand-600 text-text-inverse',
    soft: 'bg-brand-50 text-brand-700',
    outline: 'border border-brand-400 text-brand-700',
  },
  accent: {
    solid: 'bg-accent-500 text-text-inverse',
    soft: 'bg-accent-50 text-accent-700',
    outline: 'border border-accent-400 text-accent-700',
  },
  neutral: {
    solid: 'bg-neutral-700 text-text-inverse',
    soft: 'bg-neutral-100 text-neutral-900',
    outline: 'border border-border-strong text-text-secondary',
  },
  success: {
    solid: 'bg-feedback-success text-text-inverse',
    soft: 'bg-feedback-success/10 text-feedback-success',
    outline: 'border border-feedback-success text-feedback-success',
  },
  warning: {
    solid: 'bg-feedback-warning text-text-inverse',
    soft: 'bg-feedback-warning/10 text-feedback-warning',
    outline: 'border border-feedback-warning text-feedback-warning',
  },
  error: {
    solid: 'bg-feedback-error text-text-inverse',
    soft: 'bg-feedback-error/10 text-feedback-error',
    outline: 'border border-feedback-error text-feedback-error',
  },
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  className?: string;
}

export const Badge = ({ children, variant = 'brand', tone = 'soft', className }: BadgeProps) => {
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        variantMap[variant][tone],
        className
      )}
    >
      {children}
    </span>
  );
};
