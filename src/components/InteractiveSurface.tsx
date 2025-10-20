import { ElementType, forwardRef, type HTMLAttributes } from 'react';

export type InteractiveSurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

const surfaceBaseClasses =
  'transition-transform duration-200 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const InteractiveSurface = forwardRef<HTMLElement, InteractiveSurfaceProps>(
  ({ as: Component = 'div', className, children, ...rest }, ref) => {
    const merged = cx(surfaceBaseClasses, className);

    return (
      <Component ref={ref as never} className={merged} data-interactive-surface {...rest}>
        {children}
      </Component>
    );
  }
);

InteractiveSurface.displayName = 'InteractiveSurface';
