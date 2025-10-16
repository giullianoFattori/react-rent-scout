import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '../Button/Button';
import { VisuallyHidden } from '../A11y/VisuallyHidden';
import { Text } from '../Typography/Text';

export interface StepperInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  disabled?: boolean;
  hideLabel?: boolean;
}

export const StepperInput = forwardRef<HTMLInputElement, StepperInputProps>(
  (
    { label, description, min = 0, max = Number.MAX_SAFE_INTEGER, step = 1, value, onChange, disabled, hideLabel = false, ...props },
    ref
  ) => {
    const handleDecrement = () => {
      if (disabled) return;
      const nextValue = Math.max(min, value - step);
      onChange(nextValue);
    };

    const handleIncrement = () => {
      if (disabled) return;
      const nextValue = Math.min(max, value + step);
      onChange(nextValue);
    };

    const id = props.id ?? props.name ?? `stepper-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {hideLabel ? (
          <VisuallyHidden>
            <label htmlFor={id}>{label}</label>
          </VisuallyHidden>
        ) : (
          <label htmlFor={id} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        {description && (
          <Text as="p" size="sm" tone="muted">
            {description}
          </Text>
        )}

        <div className="flex items-center justify-between rounded-md border border-border-subtle bg-surface-base px-sm py-2">
          <Button
            type="button"
            variant="ghost"
            density="compact"
            aria-label={`Diminuir ${label}`}
            onClick={handleDecrement}
            disabled={disabled || value <= min}
          >
            -
          </Button>
          <input
            ref={ref}
            id={id}
            type="number"
            inputMode="numeric"
            className={twMerge(
              'w-12 border-0 bg-transparent text-center text-base font-medium text-text-primary outline-none',
              disabled && 'text-text-disabled'
            )}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            density="compact"
            aria-label={`Aumentar ${label}`}
            onClick={handleIncrement}
            disabled={disabled || value >= max}
          >
            +
          </Button>
        </div>
      </div>
    );
  }
);

StepperInput.displayName = 'StepperInput';
