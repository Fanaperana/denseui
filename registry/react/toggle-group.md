# Toggle Group

Set of toggles, single or multiple selection

## Install

```bash
npx denseui@latest add toggle-group
```

npm dependencies: `@ark-ui/react`, `class-variance-authority`

Also installs: `toggle`

## Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

## Example

```tsx
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup multiple defaultValue={['bold']}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant="outline" defaultValue={['left']}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
```

## Source: components/ui/toggle-group.tsx

```tsx
import * as React from 'react'
import { ToggleGroup as ArkToggleGroup } from '@ark-ui/react/toggle-group'
import { type VariantProps } from 'class-variance-authority'
import { toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

type ToggleVariants = VariantProps<typeof toggleVariants>

const ToggleGroupContext = React.createContext<ToggleVariants>({})

function ToggleGroup({ className, variant, size, children, ...props }: ArkToggleGroup.RootProps & ToggleVariants) {
  return (
    <ArkToggleGroup.Root
      data-slot="toggle-group"
      data-variant={variant}
      className={cn(
        'flex w-fit items-center gap-px rounded-md data-[variant=outline]:gap-0 data-[variant=outline]:*:rounded-none data-[variant=outline]:*:first:rounded-l-sm data-[variant=outline]:*:last:rounded-r-sm data-[variant=outline]:*:not-first:border-l-0',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ArkToggleGroup.Root>
  )
}

function ToggleGroupItem({ className, variant, size, ...props }: ArkToggleGroup.ItemProps & ToggleVariants) {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ArkToggleGroup.Item
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({ variant: context.variant ?? variant, size: context.size ?? size }),
        'focus-visible:z-10',
        className,
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
```
