import { ReactNode } from 'react';

export interface AppProviderProps {
  children: ReactNode;
}

/**
 * Central point to compose context providers and global configuration.
 * Extend this component as new cross-cutting concerns are added
 * (e.g. theme provider, query client provider, etc.).
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return children;
};
