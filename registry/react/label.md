# Label

Muted form label

## Install

```bash
npx denseui@latest add label
```

## Usage

```tsx
import { Label } from "@/components/ui/label"
```

## Example

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LabelDemo() {
  return (
    <div className="grid w-64 gap-1">
      <Label htmlFor="label-title">Page title</Label>
      <Input id="label-title" placeholder="Untitled" />
    </div>
  )
}
```

## Source: components/ui/label.tsx

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'inline-flex select-none items-center gap-1.5 text-xs font-medium text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
```
