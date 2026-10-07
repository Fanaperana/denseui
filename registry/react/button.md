# Button

24px button with default, outline, ghost, subtle, destructive and link variants

## Install

```bash
npx denseui@latest add button
```

npm dependencies: `@ark-ui/react`, `class-variance-authority`

## Usage

```tsx
import { Button, buttonVariants } from "@/components/ui/button"
```

## Example

```tsx
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>
          <PlusIcon /> New
        </Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="destructive-outline">Remove</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon-sm" variant="ghost" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon-lg" variant="ghost" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}
```

## Source: components/ui/button.tsx

```tsx
import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-default select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-sm font-medium transition-colors duration-75 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        brand: 'bg-brand text-brand-foreground hover:bg-brand-hover',
        outline: 'border border-input bg-background text-foreground hover:bg-surface-hover active:bg-surface-active',
        ghost: 'text-foreground hover:bg-accent active:bg-accent-active',
        subtle: 'text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent-active',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        'destructive-outline':
          'border border-destructive/40 bg-background text-destructive hover:bg-destructive-surface-hover',
        link: 'h-auto px-0 text-brand underline-offset-2 hover:underline',
      },
      size: {
        sm: 'h-5 gap-1 px-2 text-xs',
        default: 'h-6 px-2.5 text-sm',
        lg: 'h-7 px-3 text-base',
        'icon-sm': 'size-5',
        icon: 'size-6',
        'icon-lg': 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<typeof ark.button> & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, asChild, type, ...props }: ButtonProps) {
  return (
    <ark.button
      data-slot="button"
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
```
