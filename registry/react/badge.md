# Badge

Colored tag using the 10-color palette

## Install

```bash
npx denseui@latest add badge
```

npm dependencies: `class-variance-authority`

## Usage

```tsx
import { Badge, badgeVariants } from "@/components/ui/badge"
```

## Example

```tsx
import { Badge } from '@/components/ui/badge'

const colors = ['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const

export default function BadgeDemo() {
  return (
    <div className="flex max-w-md flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-1">
        {colors.map((color) => (
          <Badge key={color} color={color}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex gap-1">
        <Badge variant="outline">Outline</Badge>
        <Badge variant="solid">New</Badge>
      </div>
    </div>
  )
}
```

## Source: components/ui/badge.tsx

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex max-w-full shrink-0 items-center gap-1 truncate rounded-sm px-1.5 py-0.5 text-xs leading-[14px] whitespace-nowrap [&_svg]:size-3',
  {
    variants: {
      color: {
        default: 'bg-tag-default-bg text-tag-default',
        gray: 'bg-tag-gray-bg text-tag-gray',
        brown: 'bg-tag-brown-bg text-tag-brown',
        orange: 'bg-tag-orange-bg text-tag-orange',
        yellow: 'bg-tag-yellow-bg text-tag-yellow',
        green: 'bg-tag-green-bg text-tag-green',
        blue: 'bg-tag-blue-bg text-tag-blue',
        purple: 'bg-tag-purple-bg text-tag-purple',
        pink: 'bg-tag-pink-bg text-tag-pink',
        red: 'bg-tag-red-bg text-tag-red',
      },
      variant: {
        default: '',
        outline: 'border border-border bg-background text-muted-foreground',
        solid: 'bg-primary font-medium text-primary-foreground',
        brand: 'bg-brand font-medium text-brand-foreground',
      },
    },
    defaultVariants: {
      color: 'default',
      variant: 'default',
    },
  },
)

type BadgeProps = Omit<React.ComponentProps<'span'>, 'color'> & VariantProps<typeof badgeVariants>

function Badge({ className, color, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ color, variant }), className)} {...props} />
}

export { Badge, badgeVariants, type BadgeProps }
```
