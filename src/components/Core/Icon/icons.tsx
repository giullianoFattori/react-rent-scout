import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

const baseIcon = 'h-5 w-5 text-current';

export const HeartIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="M12 21c-.3 0-.6-.1-.8-.3l-7-6.4a5.5 5.5 0 0 1 7.6-7.9l.2.2.2-.2a5.5 5.5 0 0 1 7.6 7.9l-7 6.4c-.2.2-.5.3-.8.3z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const GlobeIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export const UserCircleIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7 18.7a5.6 5.6 0 0 1 10 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

export const StarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="m12 4 2 4.9 5.2.4-4 3.3 1.3 5-4.5-2.8-4.5 2.8 1.3-5-4-3.3 5.2-.4z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      strokeLinejoin="round"
    />
  </svg>
);

export const MapPinIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="M12 3.5a6 6 0 0 0-6 6c0 4.9 6 11 6 11s6-6.1 6-11a6 6 0 0 0-6-6zm0 8.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const SparklesIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="m12 4 1.3 3.7L17 9 13.3 11.3 12 15l-1.3-3.7L7 9l3.7-1.3L12 4zM6 4l.8 2.2L9 7l-2.2.8L6 10l-.8-2.2L3 7l2.2-.8L6 4zm12 10 1 2.8L22 18l-3 1.2L18 22l-1-2.8L14 18l3-1.2L18 14z"
      fill="currentColor"
    />
  </svg>
);

export const FilterIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="M4 6h16M7 12h10M10 18h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ChevronRightIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path d="m9 5 6 7-6 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const ChevronLeftIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path d="m15 5-6 7 6 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const CalendarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const WifiIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="M5 10a12 12 0 0 1 14 0M3 7a16 16 0 0 1 18 0M8 13a8 8 0 0 1 8 0M12 18h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const KitchenIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <rect x="4" y="3" width="6" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M7 6v5M20 7h-4v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PetIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className={twMerge(baseIcon, className)} aria-hidden="true" {...props}>
    <path
      d="M12 13a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="7.5" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="16.5" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="4.5" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="19.5" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
