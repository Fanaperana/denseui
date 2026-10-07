import { HoverCard as ArkHoverCard } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'
import { cn } from '@/lib/utils'

function HoverCard({ openDelay = 400, closeDelay = 150, ...props }: ArkHoverCard.RootProps) {
  return <ArkHoverCard.Root openDelay={openDelay} closeDelay={closeDelay} lazyMount unmountOnExit {...props} />
}

function HoverCardTrigger(props: ArkHoverCard.TriggerProps) {
  return <ArkHoverCard.Trigger data-slot="hover-card-trigger" {...props} />
}

function HoverCardContent({ className, ...props }: ArkHoverCard.ContentProps) {
  return (
    <Portal>
      <ArkHoverCard.Positioner>
        <ArkHoverCard.Content
          data-slot="hover-card-content"
          className={cn(
            'z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover px-4 py-3 text-sm text-popover-foreground shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        />
      </ArkHoverCard.Positioner>
    </Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
