# Toggle

Two-state button

## Install

```bash
npx denseui@latest add toggle
```

npm dependencies: `@ark-ui/react`, `class-variance-authority`

## Usage

```tsx
import { Toggle, toggleVariants } from "@/components/ui/toggle"
```

## Example

```tsx
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Underline" size="lg">
        <UnderlineIcon /> Underline
      </Toggle>
      <Toggle aria-label="Disabled" disabled>
        <BoldIcon />
      </Toggle>
    </div>
  )
}
```

## Source: components/ui/toggle.tsx

```tsx
import { Toggle as ArkToggle } from '@ark-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  "inline-flex shrink-0 cursor-default items-center justify-center gap-1.5 rounded-sm text-sm font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors duration-75 select-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 data-[state=on]:bg-accent-active data-[state=on]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-background hover:bg-surface-hover data-[state=on]:bg-surface-active data-[state=on]:hover:bg-surface-active',
      },
      size: {
        sm: 'h-5 min-w-5 px-1.5',
        default: 'h-6 min-w-6 px-2',
        lg: 'h-7 min-w-7 px-2.5',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Toggle({ className, variant, size, ...props }: ArkToggle.RootProps & VariantProps<typeof toggleVariants>) {
  return <ArkToggle.Root data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />
}

export { Toggle, toggleVariants }
```
