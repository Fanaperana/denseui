# Block

Content block with hover gutter: add button and drag/menu grip

## Install

```bash
npx denseui@latest add block
```

npm dependencies: `lucide-react`

Also installs: `dropdown-menu`

## Usage

```tsx
import { Block } from "@/components/ui/block"
```

## Example

```tsx
import { useState } from 'react'
import { CopyIcon, Trash2Icon, TypeIcon } from 'lucide-react'
import { Block } from '@/components/ui/block'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export default function BlockDemo() {
  const [blocks, setBlocks] = useState([
    'Hover a block to reveal its handles.',
    'Click + to insert a block below.',
    'Click the grip to open the block menu.',
  ])

  const insertAfter = (index: number) =>
    setBlocks((b) => [...b.slice(0, index + 1), 'New block', ...b.slice(index + 1)])

  return (
    <div className="flex w-[420px] flex-col gap-0.5 pl-12">
      {blocks.map((text, index) => (
        <Block
          key={`${index}-${text}`}
          onAdd={() => insertAfter(index)}
          menu={
            <>
              <DropdownMenuItem value="turn-into">
                <TypeIcon /> Turn into
              </DropdownMenuItem>
              <DropdownMenuItem value="duplicate" onSelect={() => insertAfter(index)}>
                <CopyIcon /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                value="delete"
                variant="destructive"
                onSelect={() => setBlocks((b) => b.filter((_, i) => i !== index))}
              >
                <Trash2Icon /> Delete
              </DropdownMenuItem>
            </>
          }
        >
          <p className="rounded-sm px-1 py-0.5 text-base">{text}</p>
        </Block>
      ))}
    </div>
  )
}
```

## Source: components/ui/block.tsx

```tsx
import * as React from 'react'
import { GripVerticalIcon, PlusIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const handleButton =
  'flex h-6 w-5 items-center justify-center rounded-sm text-subtle-foreground outline-none hover:bg-accent hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5'

type BlockProps = React.ComponentProps<'div'> & {
  /** Called when the "+" handle is clicked. */
  onAdd?: () => void
  /** DropdownMenu items shown when the grip handle is clicked. */
  menu?: React.ReactNode
  /** Props for the grip, e.g. drag listeners from your DnD library. */
  handleProps?: React.ComponentProps<'button'>
}

/** Notion-style block: hover reveals "+" and a drag/menu grip in the left gutter. */
function Block({ onAdd, menu, handleProps, className, children, ...props }: BlockProps) {
  const grip = (
    <button type="button" aria-label="Drag to move, click for options" className={cn(handleButton, 'cursor-grab')} {...handleProps}>
      <GripVerticalIcon />
    </button>
  )

  return (
    <div data-slot="block" className={cn('group/block relative -ml-12 flex items-start pl-12', className)} {...props}>
      <div
        data-slot="block-handle"
        className="absolute top-0 left-0 flex items-center gap-px pr-1 opacity-0 transition-opacity duration-100 group-hover/block:opacity-100 group-focus-within/block:opacity-100 has-[[data-state=open]]:opacity-100"
      >
        {onAdd && (
          <button type="button" aria-label="Add block below" className={handleButton} onClick={onAdd}>
            <PlusIcon />
          </button>
        )}
        {menu ? (
          <DropdownMenu positioning={{ placement: 'left-start' }}>
            <DropdownMenuTrigger asChild>{grip}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">{menu}</DropdownMenuContent>
          </DropdownMenu>
        ) : (
          grip
        )}
      </div>
      <div data-slot="block-content" className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  )
}

export { Block, type BlockProps }
```
