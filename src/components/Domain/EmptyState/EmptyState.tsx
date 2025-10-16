import { ReactNode } from 'react';

import { Button, Stack, Text } from '../../Core';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  illustration?: ReactNode;
}

export const EmptyState = ({ title, description, actionLabel, onAction, illustration }: EmptyStateProps) => {
  return (
    <Stack
      gap="sm"
      className="items-center rounded-xl border border-dashed border-border-subtle bg-surface-base p-lg text-center shadow-sm"
    >
      {illustration}
      <Stack gap="2xs">
        <Text as="h3" size="lg" weight="semibold">
          {title}
        </Text>
        <Text as="p" size="md" tone="secondary">
          {description}
        </Text>
      </Stack>
      <Button type="button" variant="secondary" onClick={onAction} data-evt="cta_click" data-ctx="empty_state_action">
        {actionLabel}
      </Button>
    </Stack>
  );
};
