import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Spinner } from '../Feedback/Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonDensity = 'compact' | 'comfortable';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  density?: ButtonDensity;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
}

const baseStyles =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-ring disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-text-inverse hover:bg-brand-700 focus-visible:bg-brand-700 active:bg-brand-800',
  secondary:
    'bg-surface-muted text-text-primary border border-border-subtle hover:border-border-strong hover:bg-surface-base focus-visible:border-brand-400',
  ghost:
    'bg-transparent text-text-primary hover:bg-brand-50 hover:text-brand-800 focus-visible:bg-brand-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-md',
};

const densityStyles: Record<ButtonDensity, string> = {
  compact: 'h-9 px-sm gap-2',
  comfortable: 'h-11 px-md gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      density = 'comfortable',
      loading = false,
      icon,
      iconPosition = 'start',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const hasIconOnly = icon && !children;

    const spacing = hasIconOnly
      ? density === 'compact'
        ? 'h-9 w-9'
        : 'h-11 w-11'
      : densityStyles[density];

    return (
      <button
        ref={ref}
        className={twMerge(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          spacing,
          hasIconOnly && 'px-0',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Spinner className="h-4 w-4" aria-hidden="true" />
        ) : (
          <>
            {icon && iconPosition === 'start' && (
              <span aria-hidden className="inline-flex items-center">
                {icon}
              </span>
            )}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'end' && (
              <span aria-hidden className="inline-flex items-center">
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
