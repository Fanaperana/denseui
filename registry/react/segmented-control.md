# Segmented Control

Single-choice segmented switcher with a sliding indicator

## Install

```bash
npx denseui@latest add segmented-control
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
```

## Example

```tsx
import { CalendarIcon, KanbanIcon, ListIcon, TableIcon } from 'lucide-react'
import { SegmentedControl, SegmentedControlItem } from '@/components/ui/segmented-control'

export default function SegmentedControlDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl defaultValue="board">
        <SegmentedControlItem value="table">
          <TableIcon /> Table
        </SegmentedControlItem>
        <SegmentedControlItem value="board">
          <KanbanIcon /> Board
        </SegmentedControlItem>
        <SegmentedControlItem value="list">
          <ListIcon /> List
        </SegmentedControlItem>
        <SegmentedControlItem value="calendar">
          <CalendarIcon /> Calendar
        </SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl defaultValue="month">
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
```

## Source: components/ui/segmented-control.tsx

```tsx
import { SegmentGroup } from '@ark-ui/react/segment-group'
import { cn } from '@/lib/utils'

function SegmentedControl({ className, children, ...props }: SegmentGroup.RootProps) {
  return (
    <SegmentGroup.Root
      data-slot="segmented-control"
      className={cn(
        'relative inline-flex w-fit items-center gap-px rounded-md bg-muted p-0.5 ring-1 ring-border ring-inset data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className,
      )}
      {...props}
    >
      <SegmentGroup.Indicator className="absolute top-(--top) left-(--left) h-(--height) w-(--width) rounded-sm bg-background shadow-[0_0_0_1px_var(--border),0_1px_2px_rgba(0,0,0,0.06)] transition-[left,top,width,height] duration-150 ease-out" />
      {children}
    </SegmentGroup.Root>
  )
}

function SegmentedControlItem({ className, children, ...props }: SegmentGroup.ItemProps) {
  return (
    <SegmentGroup.Item
      data-slot="segmented-control-item"
      className={cn(
        "relative z-10 inline-flex cursor-default items-center justify-center gap-1.5 rounded-sm px-2.5 py-1 text-sm text-muted-foreground transition-colors duration-75 select-none hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-40 data-[state=checked]:font-medium data-[state=checked]:text-foreground data-focus-visible:ring-2 data-focus-visible:ring-ring [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <SegmentGroup.ItemText className="inline-flex items-center gap-1.5">{children}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  )
}

export { SegmentedControl, SegmentedControlItem }
```
