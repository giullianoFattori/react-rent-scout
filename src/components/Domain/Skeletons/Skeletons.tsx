import { Card, Stack } from '../../Core';

const shimmer = 'animate-pulse rounded bg-neutral-200';

export const PropertyCardSkeleton = () => (
  <Card padding="none" className="overflow-hidden">
    <div className={`${shimmer} h-48`} />
    <Stack gap="sm" className="p-md">
      <div className={`${shimmer} h-6 w-3/4`} />
      <div className={`${shimmer} h-4 w-1/2`} />
      <div className={`${shimmer} h-4 w-1/3`} />
      <div className={`${shimmer} h-5 w-24`} />
    </Stack>
  </Card>
);

export const ListingDetailSkeleton = () => (
  <div className="grid gap-lg lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.5fr)]">
    <Stack gap="sm">
      <div className={`${shimmer} h-9 w-2/3`} />
      <div className={`${shimmer} h-5 w-1/2`} />
      <div className={`${shimmer} h-72 rounded-xl`} />
      <div className="grid grid-cols-2 gap-sm">
        <div className={`${shimmer} h-24 rounded-lg`} />
        <div className={`${shimmer} h-24 rounded-lg`} />
        <div className={`${shimmer} h-24 rounded-lg`} />
        <div className={`${shimmer} h-24 rounded-lg`} />
      </div>
    </Stack>
    <Card className="flex flex-col gap-sm">
      <div className={`${shimmer} h-7 w-40`} />
      <div className={`${shimmer} h-5 w-1/2`} />
      <div className={`${shimmer} h-11 w-full rounded-md`} />
      <div className={`${shimmer} h-11 w-full rounded-md`} />
    </Card>
  </div>
);
