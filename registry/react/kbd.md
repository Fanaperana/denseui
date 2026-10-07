# Kbd

Keyboard shortcut hint

## Install

```bash
npx denseui@latest add kbd
```

## Usage

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"
```

## Example

```tsx
import { Kbd, KbdGroup } from '@/components/ui/kbd'

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <span>
        Press <Kbd>/</Kbd> for commands
      </span>
    </div>
  )
}
```

## Source: components/ui/kbd.tsx

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex min-w-4 select-none items-center justify-center gap-0.5 rounded-sm border border-border bg-muted px-1.5 py-0.5 font-sans text-[10px] leading-none font-medium text-muted-foreground [&_svg]:size-2.5',
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="kbd-group" className={cn('inline-flex items-center gap-0.5', className)} {...props} />
}

export { Kbd, KbdGroup }
```
