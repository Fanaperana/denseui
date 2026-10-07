# Progress

Thin progress bar

## Install

```bash
npx denseui@latest add progress
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Progress } from "@/components/ui/progress"
```

## Example

```tsx
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

export default function ProgressDemo() {
  const [value, setValue] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex w-72 flex-col gap-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Uploading…</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
```

## Source: components/ui/progress.tsx

```tsx
import { Progress as ArkProgress } from '@ark-ui/react/progress'
import { cn } from '@/lib/utils'

function Progress({ className, ...props }: ArkProgress.RootProps) {
  return (
    <ArkProgress.Root data-slot="progress" className={cn('w-full', className)} {...props}>
      <ArkProgress.Track className="h-1 w-full overflow-hidden rounded-full bg-accent-active">
        <ArkProgress.Range className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out data-[state=indeterminate]:w-1/3 data-[state=indeterminate]:animate-pulse" />
      </ArkProgress.Track>
    </ArkProgress.Root>
  )
}

export { Progress }
```
