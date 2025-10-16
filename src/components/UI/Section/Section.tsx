import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Heading } from '../../Core/Typography/Heading';
import { Text } from '../../Core/Typography/Text';

export interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingMap = {
  sm: 'gap-sm',
  md: 'gap-md',
  lg: 'gap-lg',
};

export const Section = ({
  title,
  description,
  children,
  className,
  action,
  spacing = 'md',
}: SectionProps) => {
  return (
    <section className={twMerge('flex flex-col gap-md', className)}>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className={twMerge('flex flex-col', spacingMap[spacing])}>
          <Heading level={2} size="lg">
            {title}
          </Heading>
          {description && (
            <Text tone="secondary" size="md">
              {description}
            </Text>
          )}
        </div>
        {action && <div className="mt-xs sm:mt-0">{action}</div>}
      </header>
      <div>{children}</div>
    </section>
  );
};
