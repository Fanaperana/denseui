# Scroll Area

Custom overlay scrollbars

## Install

```bash
npx denseui@latest add scroll-area
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

## Example

```tsx
import { Fragment } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const tags = Array.from({ length: 40 }, (_, i) => `v1.2.0-beta.${40 - i}`)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-56 w-48 rounded-lg border border-border">
      <div className="p-3">
        <h4 className="mb-2 text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-1.5" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
```

## Source: components/ui/scroll-area.tsx

```tsx
import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area'
import { cn } from '@/lib/utils'

function ScrollArea({ className, children, ...props }: ArkScrollArea.RootProps) {
  return (
    <ArkScrollArea.Root data-slot="scroll-area" className={cn('relative overflow-hidden', className)} {...props}>
      <ArkScrollArea.Viewport className="size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
```
