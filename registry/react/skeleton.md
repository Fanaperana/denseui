# Skeleton

Loading placeholder

## Install

```bash
npx denseui@latest add skeleton
```

## Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

## Example

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonDemo() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}
```

## Source: components/ui/skeleton.tsx

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="skeleton" className={cn('animate-pulse rounded-sm bg-accent-active', className)} {...props} />
}

export { Skeleton }
```
