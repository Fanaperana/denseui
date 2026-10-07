# Textarea

Auto-growing textarea

## Install

```bash
npx denseui@latest add textarea
```

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

## Example

```tsx
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function TextareaDemo() {
  return (
    <div className="grid w-80 gap-1">
      <Label htmlFor="textarea-notes">Notes</Label>
      <Textarea id="textarea-notes" placeholder="Write something, or press '/' for commands…" />
    </div>
  )
}
```

## Source: components/ui/textarea.tsx

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-12 w-full rounded-sm border border-input bg-input-background px-2 py-1 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-75 placeholder:text-subtle-foreground focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/20',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
```
