import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonDemo() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}
