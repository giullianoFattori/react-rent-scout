import { useMemo, useState } from 'react';

import { Button, Chip, FilterIcon, Stack, Text } from '../../Core';
import { Toolbar, ToolbarAction } from '../../UI';

export interface FilterChip {
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface FiltersBarProps {
  chips: FilterChip[];
  onToggleChip: (id: string) => void;
  onOpenMoreFilters?: () => void;
}

export const FiltersBar = ({ chips, onToggleChip, onOpenMoreFilters }: FiltersBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeCount = useMemo(() => chips.filter((chip) => chip.selected).length, [chips]);

  return (
    <div className="w-full">
      <Toolbar className="hidden md:flex" density="comfortable" position="sticky">
        <ToolbarAction grow>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip
                key={chip.id}
                variant="filter"
                state={chip.selected ? 'selected' : chip.disabled ? 'disabled' : 'default'}
                onClick={() => onToggleChip(chip.id)}
                disabled={chip.disabled}
                data-evt="filter_apply"
                data-ctx={`filters_${chip.id}`}
              >
                {chip.label}
              </Chip>
            ))}
          </div>
        </ToolbarAction>
        <ToolbarAction>
          <Button
            type="button"
            variant="secondary"
            data-evt="filter_open"
            data-ctx="filters_more"
            onClick={onOpenMoreFilters}
            className="gap-2"
          >
            <FilterIcon className="h-5 w-5" />
            Mais filtros
          </Button>
        </ToolbarAction>
      </Toolbar>

      <div className="md:hidden">
        <Button
          type="button"
          variant="secondary"
          density="comfortable"
          className="flex w-full items-center justify-between gap-2"
          onClick={() => {
            setIsExpanded((prev) => !prev);
            if (!isExpanded) {
              onOpenMoreFilters?.();
            }
          }}
          data-evt="filter_open"
          data-ctx="filters_mobile_sheet"
        >
          <Stack direction="horizontal" gap="xs" align="center">
            <FilterIcon className="h-5 w-5" />
            <span>Filtros</span>
          </Stack>
          <Text as="span" tone="secondary" size="sm">
            {activeCount > 0 ? `${activeCount} ativos` : 'Nenhum'}
          </Text>
        </Button>
        {isExpanded && (
          <div className="mt-3 rounded-lg border border-border-subtle bg-surface-base p-sm shadow-sm">
            <Stack gap="xs">
              {chips.map((chip) => (
                <Chip
                  key={chip.id}
                  variant="filter"
                  state={chip.selected ? 'selected' : chip.disabled ? 'disabled' : 'default'}
                  onClick={() => onToggleChip(chip.id)}
                  disabled={chip.disabled}
                  density="compact"
                  className="justify-start"
                  data-evt="filter_apply"
                  data-ctx={`filters_mobile_${chip.id}`}
                >
                  {chip.label}
                </Chip>
              ))}
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};
