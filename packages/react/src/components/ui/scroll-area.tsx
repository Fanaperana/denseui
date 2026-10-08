import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area'
import { cn } from '@/lib/utils'

function ScrollArea({ className, children, ...props }: ArkScrollArea.RootProps) {
  return (
    <ArkScrollArea.Root data-slot="scroll-area" className={cn('relative overflow-hidden', className)} {...props}>
      <ArkScrollArea.Viewport
        tabIndex={0}
        className="size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArkScrollArea.Content>{children}</ArkScrollArea.Content>
      </ArkScrollArea.Viewport>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
      <ArkScrollArea.Corner />
    </ArkScrollArea.Root>
  )
}

function ScrollBar({ className, orientation = 'vertical', ...props }: ArkScrollArea.ScrollbarProps) {
  return (
    <ArkScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px opacity-0 transition-opacity duration-150 select-none data-hover:opacity-100 data-scrolling:opacity-100 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2',
        className,
      )}
      {...props}
    >
      <ArkScrollArea.Thumb className="relative flex-1 rounded-full bg-foreground/20 hover:bg-foreground/35" />
    </ArkScrollArea.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
