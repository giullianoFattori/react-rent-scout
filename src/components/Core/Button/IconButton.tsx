import { forwardRef, ReactElement } from 'react';

import { Button, ButtonProps } from './Button';

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon' | 'iconPosition'> {
  icon: ReactElement;
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ icon, label, density = 'compact', ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      density={density}
      aria-label={label}
      title={props.title ?? label}
      icon={icon}
    />
  );
});

IconButton.displayName = 'IconButton';
