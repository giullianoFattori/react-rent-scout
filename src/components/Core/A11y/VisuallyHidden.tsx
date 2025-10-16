import { CSSProperties, ElementType, ReactNode } from 'react';

const styles: CSSProperties = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
};

export interface VisuallyHiddenProps {
  as?: ElementType;
  children: ReactNode;
}

export const VisuallyHidden = ({ as: Component = 'span', children }: VisuallyHiddenProps) => {
  return <Component style={styles}>{children}</Component>;
};
