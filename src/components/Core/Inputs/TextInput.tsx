import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from '../Typography/Text';
import { VisuallyHidden } from '../A11y/VisuallyHidden';

type InputState = 'default' | 'error' | 'success';
type InputDensity = 'compact' | 'comfortable';
type InputSize = 'sm' | 'md' | 'lg';

const stateBorder: Record<InputState, string> = {
  default: 'border-border-subtle focus-visible:border-brand-400',
  error: 'border-feedback-error',
  success: 'border-feedback-success',
};

const sizeStyles: Record<InputSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

const densityStyles: Record<InputDensity, string> = {
  compact: 'h-9 px-3',
  comfortable: 'h-11 px-4',
};

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  description?: string;
  hint?: string;
  errorMessage?: string;
  state?: InputState;
  size?: InputSize;
  density?: InputDensity;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  'data-evt'?: string;
  'data-ctx'?: string;
  hideLabel?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      description,
      hint,
      errorMessage,
      state = 'default',
      size = 'md',
      density = 'comfortable',
      leadingIcon,
      trailingIcon,
      className,
      disabled,
      hideLabel = false,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? props.name ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = errorMessage ? `${inputId}-error` : undefined;
    const describedBy = [descriptionId, hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {hideLabel ? (
          <VisuallyHidden>
            <label htmlFor={inputId}>{label}</label>
          </VisuallyHidden>
        ) : (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}

        {description && (
          <Text as="p" id={descriptionId} size="sm" tone="muted">
            {description}
          </Text>
        )}

        <div
          className={twMerge(
            'group relative flex w-full items-center rounded-md border bg-surface-base text-text-primary shadow-xs',
            densityStyles[density],
            sizeStyles[size],
            stateBorder[state],
            disabled && 'bg-neutral-100 text-text-disabled',
            className
          )}
        >
          {leadingIcon && (
            <span className="mr-3 inline-flex items-center text-neutral-600" aria-hidden>
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={twMerge(
              'h-full w-full bg-transparent text-inherit outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed',
              leadingIcon && 'pl-1',
              trailingIcon && 'pr-1'
            )}
            aria-describedby={describedBy}
            aria-invalid={state === 'error'}
            disabled={disabled}
            {...props}
          />
          {trailingIcon && (
            <span className="ml-3 inline-flex items-center text-neutral-600" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </div>

        {hint && state !== 'error' && (
          <Text as="p" id={hintId} size="sm" tone="muted">
            {hint}
          </Text>
        )}

        {errorMessage && state === 'error' && (
          <Text as="p" id={errorId} size="sm" tone="error" role="alert">
            {errorMessage}
          </Text>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
