# Aspect Ratio

Keeps content at a fixed ratio

## Install

```bash
npx denseui@latest add aspect-ratio
```

## Usage

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

## Example

```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function AspectRatioDemo() {
  return (
    <div className="w-80">
      <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center rounded-lg bg-gradient-to-br from-tag-purple-bg to-tag-blue-bg text-sm text-muted-foreground"
      >
        16 / 9
      </AspectRatio>
    </div>
  )
}
```

## Source: components/ui/aspect-ratio.tsx

```tsx
import * as React from 'react'

type AspectRatioProps = React.ComponentProps<'div'> & { ratio?: number }

function AspectRatio({ ratio = 1, style, ...props }: AspectRatioProps) {
  return <div data-slot="aspect-ratio" style={{ aspectRatio: ratio, ...style }} {...props} />
}

export { AspectRatio }
```
