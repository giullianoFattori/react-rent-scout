import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ToolbarActionProps {
  children: ReactNode;
  className?: string;
  grow?: boolean;
}

export const ToolbarAction = ({ children, className, grow = false }: ToolbarActionProps) => (
  <div className={twMerge('flex items-center', grow && 'flex-1', className)}>{children}</div>
);
