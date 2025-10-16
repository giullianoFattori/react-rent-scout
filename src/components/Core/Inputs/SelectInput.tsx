import { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from '../Typography/Text';

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

export interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  description?: string;
  hint?: string;
  errorMessage?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, label, description, hint, errorMessage, options, className, ...props }, ref) => {
    const selectId = id ?? props.name ?? `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = errorMessage ? `${selectId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(errorMessage);

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
        {description && (
          <Text as="p" size="sm" tone="muted">
            {description}
          </Text>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-describedby={describedBy}
          aria-invalid={hasError}
          className={twMerge(
            'h-11 rounded-md border border-border-subtle bg-surface-base px-4 text-sm text-text-primary focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-brand-400/40',
            hasError && 'border-feedback-error',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hint && !hasError && (
          <Text as="p" id={hintId} size="sm" tone="muted">
            {hint}
          </Text>
        )}
        {hasError && (
          <Text as="p" id={errorId} size="sm" tone="error" role="alert">
            {errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';
