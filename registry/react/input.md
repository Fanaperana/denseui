# Input

Compact text input

## Install

```bash
npx denseui@latest add input
```

npm dependencies: `class-variance-authority`

## Usage

```tsx
import { Input, inputVariants } from "@/components/ui/input"
```

## Example

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function InputDemo() {
  return (
    <div className="grid w-72 gap-3">
      <div className="grid gap-1">
        <Label htmlFor="input-name">Name</Label>
        <Input id="input-name" placeholder="Untitled" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" type="email" aria-invalid defaultValue="not-an-email" />
      </div>
      <Input size="sm" placeholder="Small" />
      <Input size="lg" placeholder="Large" />
      <Input variant="ghost" placeholder="Ghost — hover me" />
      <Input disabled placeholder="Disabled" />
    </div>
  )
}
```

## Source: components/ui/input.tsx

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full min-w-0 rounded-sm border border-input bg-input-background text-foreground outline-none transition-[border-color,box-shadow] duration-75 placeholder:text-subtle-foreground focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/20 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground',
  {
    variants: {
      size: {
        sm: 'h-5 px-1.5 text-xs',
        default: 'h-6 px-2 text-sm',
        lg: 'h-7 px-2.5 text-base',
      },
      variant: {
        default: '',
        ghost: 'border-transparent bg-transparent hover:bg-accent focus-visible:bg-input-background',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
)

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>

function Input({ className, size, variant, type = 'text', ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants({ size, variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants, type InputProps }
```
