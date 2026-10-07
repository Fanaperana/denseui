# Hover Card

Preview content when hovering a link

## Install

```bash
npx denseui@latest add hover-card
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
```

## Example

```tsx
import { CalendarIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@denseui</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">DU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="font-semibold">@denseui</div>
            <p className="text-muted-foreground">Ultra-compact components for Tailwind CSS v4.</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-subtle-foreground">
              <CalendarIcon className="size-3" /> Joined October 2026
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
```

## Source: components/ui/hover-card.tsx

```tsx
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
```
