# Spinner

Loading spinner

## Install

```bash
npx denseui@latest add spinner
```

npm dependencies: `lucide-react`

## Usage

```tsx
import { Spinner } from "@/components/ui/spinner"
```

## Example

```tsx
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Spinner /> Loading…
      </span>
      <Button disabled>
        <Spinner className="text-current" /> Saving
      </Button>
    </div>
  )
}
```

## Source: components/ui/spinner.tsx

```tsx
import * as React from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderCircleIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-3.5 animate-spin text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Spinner }
```
