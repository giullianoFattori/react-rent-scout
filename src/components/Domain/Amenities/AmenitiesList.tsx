import { ReactNode } from 'react';

import { Chip, Stack, Text } from '../../Core';

export interface Amenity {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface AmenitiesListProps {
  items: Amenity[];
  compact?: boolean;
}

export const AmenitiesList = ({ items, compact = false }: AmenitiesListProps) => (
  <Stack
    as="ul"
    gap={compact ? '2xs' : 'xs'}
    className="list-none p-0"
    direction={compact ? 'horizontal' : 'vertical'}
    wrap={compact}
  >
    {items.map((amenity) => (
      <li key={amenity.id}>
        <Chip variant="tag" density={compact ? 'compact' : 'comfortable'} className="gap-2">
          {amenity.icon && <span aria-hidden>{amenity.icon}</span>}
          <Text as="span" size="sm" weight="medium">
            {amenity.label}
          </Text>
        </Chip>
      </li>
    ))}
  </Stack>
);
