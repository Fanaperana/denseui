# Tooltip

Dark compact tooltip

## Install

```bash
npx denseui@latest add tooltip
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
```

## Example

```tsx
import { StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function TooltipDemo() {
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Favorite">
            <StarIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add to Favorites</TooltipContent>
      </Tooltip>
      <Tooltip positioning={{ placement: 'bottom' }}>
        <TooltipTrigger asChild>
          <Button variant="outline">Search</Button>
        </TooltipTrigger>
        <TooltipContent>
          Search pages <Kbd className="ml-1">⌘K</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
```

## Source: components/ui/tooltip.tsx

```tsx
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
```
