import { Progress as ArkProgress } from '@ark-ui/react/progress'
import { cn } from '@/lib/utils'

function Progress({ className, ...props }: ArkProgress.RootProps) {
  return (
    <ArkProgress.Root data-slot="progress" className={cn('w-full', className)} {...props}>
      <ArkProgress.Track className="h-1 w-full overflow-hidden rounded-full bg-accent-active">
        <ArkProgress.Range className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out data-[state=indeterminate]:w-1/3 data-[state=indeterminate]:animate-pulse" />
      </ArkProgress.Track>
    </ArkProgress.Root>
  )
}

export { Progress }
