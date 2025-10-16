import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SpinnerProps extends HTMLAttributes<SVGSVGElement> {}

export const Spinner = ({ className, ...props }: SpinnerProps) => (
  <svg
    className={twMerge('animate-spin text-brand-600', className)}
    viewBox="0 0 24 24"
    role="presentation"
    {...props}
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-80"
      d="M22 12a10 10 0 00-10-10"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);
