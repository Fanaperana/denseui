# Sheet

Side panel that slides in from any edge

## Install

```bash
npx denseui@latest add sheet
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from "@/components/ui/sheet"
```

## Example

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const sides = ['left', 'right', 'top', 'bottom'] as const

export default function SheetDemo() {
  return (
    <div className="flex gap-2">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-1">
              <Label htmlFor={`sheet-name-${side}`}>Name</Label>
              <Input id={`sheet-name-${side}`} defaultValue="Jane Doe" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
```

## Source: components/ui/sheet.tsx

```tsx
import * as React from 'react'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Sheet(props: ArkDialog.RootProps) {
  return <ArkDialog.Root lazyMount unmountOnExit {...props} />
}

function SheetTrigger(props: ArkDialog.TriggerProps) {
  return <ArkDialog.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: ArkDialog.CloseTriggerProps) {
  return <ArkDialog.CloseTrigger data-slot="sheet-close" {...props} />
}

const sides = {
  right: {
    positioner: 'justify-end',
    content:
      'h-full w-80 max-w-[calc(100%-2rem)] border-l data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right',
  },
  left: {
    positioner: 'justify-start',
    content:
      'h-full w-80 max-w-[calc(100%-2rem)] border-r data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left',
  },
  top: {
    positioner: 'flex-col justify-start',
    content: 'w-full border-b data-[state=closed]:animate-slide-out-top data-[state=open]:animate-slide-in-top',
  },
  bottom: {
    positioner: 'flex-col justify-end',
    content: 'w-full border-t data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom',
  },
}

type SheetContentProps = ArkDialog.ContentProps & { side?: keyof typeof sides; showClose?: boolean }

function SheetContent({ className, children, side = 'right', showClose = true, ...props }: SheetContentProps) {
  return (
    <Portal>
      <ArkDialog.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <ArkDialog.Positioner className={cn('fixed inset-0 z-50 flex', sides[side].positioner)}>
        <ArkDialog.Content
          data-slot="sheet-content"
          data-side={side}
          className={cn(
            'relative flex flex-col gap-3 border-border bg-popover px-4 py-3 text-sm text-popover-foreground shadow-dialog outline-none',
            sides[side].content,
            className,
          )}
          {...props}
        >
          {children}
          {showClose && (
            <ArkDialog.CloseTrigger
              aria-label="Close"
              className="absolute top-2.5 right-3 inline-flex size-5 items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              <XIcon className="size-3.5" />
            </ArkDialog.CloseTrigger>
          )}
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-0.5 pr-6', className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto ml-auto grid w-fit auto-cols-fr grid-flow-col gap-1.5', className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: ArkDialog.TitleProps) {
  return <ArkDialog.Title data-slot="sheet-title" className={cn('text-lg font-semibold', className)} {...props} />
}

function SheetDescription({ className, ...props }: ArkDialog.DescriptionProps) {
  return (
    <ArkDialog.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
```
