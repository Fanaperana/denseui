# Dialog

Modal dialog

## Install

```bash
npx denseui@latest add dialog
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
```

## Example

```tsx
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function DialogDemo() {
  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Rename page</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename page</DialogTitle>
            <DialogDescription>Give this page a short, memorable name.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-1">
            <Label htmlFor="dialog-title">Title</Label>
            <Input id="dialog-title" defaultValue="Components" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog role="alertdialog">
        <DialogTrigger asChild>
          <Button variant="destructive-outline">Delete page…</Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs" showClose={false}>
          <DialogHeader>
            <DialogTitle>Delete this page?</DialogTitle>
            <DialogDescription>You can restore it from Trash for 30 days.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

## Source: components/ui/dialog.tsx

```tsx
import * as React from 'react'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Dialog(props: ArkDialog.RootProps) {
  return <ArkDialog.Root lazyMount unmountOnExit {...props} />
}

function DialogTrigger(props: ArkDialog.TriggerProps) {
  return <ArkDialog.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: ArkDialog.CloseTriggerProps) {
  return <ArkDialog.CloseTrigger data-slot="dialog-close" {...props} />
}

type DialogContentProps = ArkDialog.ContentProps & { showClose?: boolean }

function DialogContent({ className, children, showClose = true, ...props }: DialogContentProps) {
  return (
    <Portal>
      <ArkDialog.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in dark:bg-black/60" />
      <ArkDialog.Positioner className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-[12vh]">
        <ArkDialog.Content
          data-slot="dialog-content"
          className={cn(
            'relative flex w-full max-w-md flex-col gap-3 rounded-lg bg-popover px-4 py-3 text-sm text-popover-foreground shadow-dialog outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
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

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('flex flex-col gap-0.5 pr-6', className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-footer" className={cn('flex items-center justify-end gap-1.5', className)} {...props} />
  )
}

function DialogTitle({ className, ...props }: ArkDialog.TitleProps) {
  return <ArkDialog.Title data-slot="dialog-title" className={cn('text-lg font-semibold', className)} {...props} />
}

function DialogDescription({ className, ...props }: ArkDialog.DescriptionProps) {
  return (
    <ArkDialog.Description
      data-slot="dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```
