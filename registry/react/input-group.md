# Input Group

Input with icons, text or buttons attached

## Install

```bash
npx denseui@latest add input-group
```

npm dependencies: `class-variance-authority`

## Usage

```tsx
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
```

## Example

```tsx
import { CopyIcon, MailIcon, SearchIcon } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'

export default function InputGroupDemo() {
  return (
    <div className="grid w-80 gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.dev</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput defaultValue="hello@denseui.dev" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Copy">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask anything…" />
        <InputGroupAddon align="block-end" className="justify-between">
          <InputGroupText className="text-xs">0 / 280</InputGroupText>
          <InputGroupButton className="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

## Source: components/ui/input-group.tsx

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group relative flex h-6 w-full min-w-0 items-center rounded-sm border border-input bg-input-background transition-[border-color,box-shadow] duration-75 has-[textarea]:h-auto has-[textarea]:flex-col has-[textarea]:items-stretch has-[[data-slot=input-group-control]:focus-visible]:border-brand/60 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[aria-invalid=true]]:border-destructive/60',
        className,
      )}
      {...props}
    />
  )
}

const addonVariants = cva(
  "flex h-full cursor-text items-center gap-1 text-sm text-muted-foreground select-none [&>kbd]:rounded-sm [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-2',
        'inline-end': 'order-last pr-1.5',
        'block-start': 'order-first w-full px-2 py-1.5',
        'block-end': 'order-last w-full px-2 py-1.5',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof addonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(addonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return
        e.currentTarget.parentElement?.querySelector<HTMLElement>('input, textarea')?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input-group-control"
      className={cn(
        'h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-subtle-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="input-group-control"
      className={cn(
        'field-sizing-content min-h-12 w-full resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-subtle-foreground',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn("flex items-center gap-1 text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5", className)}
      {...props}
    />
  )
}

function InputGroupButton({ className, type = 'button', ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type={type}
      data-slot="input-group-button"
      className={cn(
        "inline-flex items-center gap-1 rounded-xs px-1.5 py-0.5 text-xs font-medium text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea }
```
