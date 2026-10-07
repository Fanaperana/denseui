# Popover

Floating panel

## Install

```bash
npx denseui@latest add popover
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose } from "@/components/ui/popover"
```

## Example

```tsx
import { LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <LinkIcon /> Add link
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Input placeholder="Paste link or search pages" autoFocus />
        <div className="flex justify-end">
          <PopoverClose asChild>
            <Button size="sm">Link</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

## Source: components/ui/popover.tsx

```tsx
import { Popover as ArkPopover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { cn } from '@/lib/utils'

function Popover(props: ArkPopover.RootProps) {
  return <ArkPopover.Root lazyMount unmountOnExit {...props} />
}

function PopoverTrigger(props: ArkPopover.TriggerProps) {
  return <ArkPopover.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverAnchor(props: ArkPopover.AnchorProps) {
  return <ArkPopover.Anchor data-slot="popover-anchor" {...props} />
}

type PopoverContentProps = ArkPopover.ContentProps & { portalled?: boolean }

function PopoverContent({ className, portalled = true, ...props }: PopoverContentProps) {
  return (
    <Portal disabled={!portalled}>
      <ArkPopover.Positioner>
        <ArkPopover.Content
          data-slot="popover-content"
          className={cn(
            'z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover px-3 py-2 text-sm text-popover-foreground shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        />
      </ArkPopover.Positioner>
    </Portal>
  )
}

function PopoverClose(props: ArkPopover.CloseTriggerProps) {
  return <ArkPopover.CloseTrigger data-slot="popover-close" {...props} />
}

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverClose }
```
