import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ChipVariant = 'filter' | 'tag';
type ChipState = 'default' | 'selected' | 'disabled';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ChipVariant;
  state?: ChipState;
  density?: 'compact' | 'comfortable';
}

const baseStyles =
  'inline-flex items-center justify-center rounded-full border text-sm transition-colors duration-150 ease-out focus-visible:outline-none focus-ring disabled:cursor-not-allowed disabled:opacity-60';

const variantStyles: Record<ChipVariant, string> = {
  filter: 'border-border-subtle bg-surface-base text-text-secondary hover:border-brand-300',
  tag: 'border-transparent bg-brand-50 text-brand-700',
};

const stateStyles: Record<ChipState, string> = {
  default: '',
  selected: 'border-brand-500 bg-brand-100 text-brand-800',
  disabled: 'opacity-60',
};

const densityStyles = {
  compact: 'h-8 px-3',
  comfortable: 'h-10 px-4',
};

export const Chip = ({
  children,
  variant = 'filter',
  state = 'default',
  density = 'comfortable',
  className,
  ...props
}: ChipProps) => {
  return (
    <button
      type="button"
      data-state={state}
      className={twMerge(baseStyles, variantStyles[variant], densityStyles[density], stateStyles[state], className)}
      {...props}
    >
      {children}
    </button>
  );
};
