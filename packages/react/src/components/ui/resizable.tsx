import { Splitter } from '@ark-ui/react/splitter'
import { cn } from '@/lib/utils'

function ResizablePanelGroup({ className, ...props }: Splitter.RootProps) {
  return (
    <Splitter.Root
      data-slot="resizable-panel-group"
      className={cn('flex size-full data-[orientation=vertical]:flex-col', className)}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }: Splitter.PanelProps) {
  return <Splitter.Panel data-slot="resizable-panel" className={cn('overflow-hidden', className)} {...props} />
}

function ResizableHandle({ className, 'aria-label': ariaLabel = 'Resize', ...props }: Splitter.ResizeTriggerProps) {
  return (
    <Splitter.ResizeTrigger
      data-slot="resizable-handle"
      aria-label={ariaLabel}
      className={cn(
        'relative shrink-0 bg-border outline-none transition-colors after:absolute focus-visible:bg-brand data-dragging:bg-brand data-[orientation=horizontal]:w-px data-[orientation=horizontal]:after:inset-y-0 data-[orientation=horizontal]:after:-inset-x-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:-inset-y-1 hover:bg-brand/60',
        className,
      )}
      {...props}
    />
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
