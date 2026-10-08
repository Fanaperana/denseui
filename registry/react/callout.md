# Callout

Highlighted note with an emoji or icon

## Install

```bash
npx denseui@latest add callout
```

npm dependencies: `class-variance-authority`

## Usage

```tsx
import { Callout, calloutVariants } from "@/components/ui/callout"
```

## Example

```tsx
import { LightbulbIcon } from 'lucide-react'
import { Callout } from '@/components/ui/callout'

export default function CalloutDemo() {
  return (
    <div className="flex w-[440px] flex-col gap-2">
      <Callout>Keep controls at 24px. Density is a feature, not a bug.</Callout>
      <Callout color="blue" icon="ℹ️">
        <strong className="font-semibold">Heads up:</strong> the registry is rebuilt on every push.
      </Callout>
      <Callout color="yellow" icon="⚠️">
        Changing <code className="font-mono text-sm">--text-sm--line-height</code> breaks optical centering.
      </Callout>
      <Callout variant="outline" icon={<LightbulbIcon className="text-warning" />}>
        Tip: press <kbd className="font-mono text-sm">⌘K</kbd> to search the docs.
      </Callout>
    </div>
  )
}
```

## Source: components/ui/callout.tsx

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const calloutVariants = cva('flex w-full items-start gap-2.5 rounded-md px-4 py-3 text-base', {
  variants: {
    color: {
      default: 'bg-muted',
      gray: 'bg-tag-gray-bg',
      brown: 'bg-tag-brown-bg',
      orange: 'bg-tag-orange-bg',
      yellow: 'bg-tag-yellow-bg',
      green: 'bg-tag-green-bg',
      blue: 'bg-tag-blue-bg',
      purple: 'bg-tag-purple-bg',
      pink: 'bg-tag-pink-bg',
      red: 'bg-tag-red-bg',
    },
    variant: {
      default: '',
      outline: 'border border-border bg-background',
    },
  },
  defaultVariants: { color: 'default', variant: 'default' },
})

type CalloutProps = Omit<React.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof calloutVariants> & {
    /** Emoji or icon element shown at the start. */
    icon?: React.ReactNode
  }

function Callout({ className, color, variant, icon = '💡', children, ...props }: CalloutProps) {
  return (
    <div data-slot="callout" role="note" className={cn(calloutVariants({ color, variant }), className)} {...props}>
      {icon != null && (
        <span data-slot="callout-icon" className="flex h-5 shrink-0 items-center text-base leading-none [&_svg]:size-4">
          {icon}
        </span>
      )}
      <div data-slot="callout-content" className="min-w-0 flex-1 leading-5">
        {children}
      </div>
    </div>
  )
}

export { Callout, calloutVariants, type CalloutProps }
```
