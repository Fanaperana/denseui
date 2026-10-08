import * as React from 'react'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function AlertDialog(props: ArkDialog.RootProps) {
  return <ArkDialog.Root role="alertdialog" closeOnInteractOutside={false} lazyMount unmountOnExit {...props} />
}

function AlertDialogTrigger(props: ArkDialog.TriggerProps) {
  return <ArkDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogContent({ className, ...props }: ArkDialog.ContentProps) {
  return (
    <Portal>
      <ArkDialog.Backdrop className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <ArkDialog.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <ArkDialog.Content
          data-slot="alert-dialog-content"
          className={cn(
            'flex w-full max-w-sm flex-col gap-3 rounded-lg bg-popover px-4 py-3 text-sm text-popover-foreground shadow-dialog outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        />
      </ArkDialog.Positioner>
    </Portal>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-dialog-header" className={cn('flex flex-col gap-0.5', className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-dialog-footer" className={cn('flex items-center justify-end gap-1.5', className)} {...props} />
  )
}

function AlertDialogTitle({ className, ...props }: ArkDialog.TitleProps) {
  return <ArkDialog.Title data-slot="alert-dialog-title" className={cn('text-lg font-semibold', className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: ArkDialog.DescriptionProps) {
  return (
    <ArkDialog.Description
      data-slot="alert-dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = 'default',
  ...props
}: ArkDialog.CloseTriggerProps & Pick<VariantProps<typeof buttonVariants>, 'variant'>) {
  return (
    <ArkDialog.CloseTrigger
      data-slot="alert-dialog-action"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }: ArkDialog.CloseTriggerProps) {
  return (
    <ArkDialog.CloseTrigger
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
