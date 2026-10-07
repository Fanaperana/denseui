import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { Portal } from '@ark-ui/react/portal'
import { cn } from '@/lib/utils'

function Tooltip({ openDelay = 500, closeDelay = 0, ...props }: ArkTooltip.RootProps) {
  return <ArkTooltip.Root openDelay={openDelay} closeDelay={closeDelay} lazyMount unmountOnExit {...props} />
}

function TooltipTrigger(props: ArkTooltip.TriggerProps) {
  return <ArkTooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({ className, ...props }: ArkTooltip.ContentProps) {
  return (
    <Portal>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content
          data-slot="tooltip-content"
          className={cn(
            'z-50 max-w-60 origin-(--transform-origin) rounded-md bg-tooltip px-1.5 py-0.5 text-xs font-medium text-tooltip-foreground shadow-popover data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in',
            className,
          )}
          {...props}
        />
      </ArkTooltip.Positioner>
    </Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
