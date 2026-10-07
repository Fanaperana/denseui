import * as React from 'react'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { cn } from '@/lib/utils'

function Drawer(props: ArkDialog.RootProps) {
  return <ArkDialog.Root lazyMount unmountOnExit {...props} />
}

function DrawerTrigger(props: ArkDialog.TriggerProps) {
  return <ArkDialog.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: ArkDialog.CloseTriggerProps) {
  return <ArkDialog.CloseTrigger data-slot="drawer-close" {...props} />
}

function DrawerContent({ className, children, ...props }: ArkDialog.ContentProps) {
  return (
    <Portal>
      <ArkDialog.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <ArkDialog.Positioner className="fixed inset-0 z-50 flex flex-col justify-end">
        <ArkDialog.Content
          data-slot="drawer-content"
          className={cn(
            'mx-auto flex max-h-[85vh] w-full max-w-2xl flex-col rounded-t-xl border border-b-0 border-border bg-popover text-sm text-popover-foreground shadow-dialog outline-none data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom',
            className,
          )}
          {...props}
        >
          <div aria-hidden className="mx-auto mt-2 mb-1 h-1 w-10 shrink-0 rounded-full bg-accent-active" />
          {children}
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={cn('flex flex-col gap-0.5 px-4 py-3 text-center', className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-1.5 px-4 py-3', className)} {...props} />
}

function DrawerTitle({ className, ...props }: ArkDialog.TitleProps) {
  return <ArkDialog.Title data-slot="drawer-title" className={cn('text-lg font-semibold', className)} {...props} />
}

function DrawerDescription({ className, ...props }: ArkDialog.DescriptionProps) {
  return (
    <ArkDialog.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription }
