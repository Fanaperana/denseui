# Utils

cn() class merging helper

## Install

```bash
npx denseui@latest add utils
```

npm dependencies: `clsx`, `tailwind-merge`

## Usage

```tsx
import { cn } from "@/components/ui/utils"
```

## Source: lib/utils.ts

```tsx
import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ['popover', 'dialog'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
