# Separator

Hairline divider

## Install

```bash
npx denseui@latest add separator
```

## Usage

```tsx
import { Separator } from "@/components/ui/separator"
```

## Example

```tsx
import { Separator } from '@/components/ui/separator'

export default function SeparatorDemo() {
  return (
    <div className="w-64 text-sm">
      <div className="font-medium">DenseUI</div>
      <div className="text-muted-foreground">Ultra-compact components.</div>
      <Separator className="my-2" />
      <div className="flex h-4 items-center gap-2 text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>CLI</span>
      </div>
    </div>
  )
}
```

## Source: components/ui/separator.tsx

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

type SeparatorProps = React.ComponentProps<'div'> & {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
```
