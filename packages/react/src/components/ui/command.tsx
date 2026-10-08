import * as React from 'react'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { Listbox, type CollectionItem } from '@ark-ui/react/listbox'
import { Portal } from '@ark-ui/react/portal'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Command<T extends CollectionItem>({ className, ...props }: Listbox.RootProps<T>) {
  return (
    <Listbox.Root
      data-slot="command"
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-lg bg-popover text-sm text-popover-foreground',
        className,
      )}
      {...props}
    />
  )
}

function CommandInput({ className, ...props }: Listbox.InputProps) {
  return (
    <div data-slot="command-input-wrapper" className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
      <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
      <Listbox.Input
        data-slot="command-input"
        autoHighlight
        className={cn('h-full w-full bg-transparent text-sm outline-none placeholder:text-subtle-foreground', className)}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, 'aria-label': ariaLabel = 'Results', ...props }: Listbox.ContentProps) {
  return (
    <Listbox.Content
      data-slot="command-list"
      aria-label={ariaLabel}
      className={cn('max-h-72 scroll-py-1 overflow-y-auto p-1 outline-none', className)}
      {...props}
    />
  )
}

function CommandEmpty({ className, ...props }: Listbox.EmptyProps) {
  return (
    <Listbox.Empty
      data-slot="command-empty"
      className={cn('py-6 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: Listbox.ItemGroupProps) {
  return <Listbox.ItemGroup data-slot="command-group" className={cn('not-first:mt-1', className)} {...props} />
}

function CommandGroupLabel({ className, ...props }: Listbox.ItemGroupLabelProps) {
  return (
    <Listbox.ItemGroupLabel
      data-slot="command-group-label"
      className={cn('flex items-center px-3 pt-2 pb-1 text-xs font-medium text-subtle-foreground', className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: Listbox.ItemProps) {
  return (
    <Listbox.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span data-slot="command-shortcut" className={cn('ml-auto text-xs text-subtle-foreground', className)} {...props} />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="command-separator" className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
}

type CommandDialogProps = ArkDialog.RootProps & { className?: string }

function CommandDialog({ children, className, ...props }: CommandDialogProps) {
  return (
    <ArkDialog.Root lazyMount unmountOnExit {...props}>
      <Portal>
        <ArkDialog.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <ArkDialog.Positioner className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[14vh]">
          <ArkDialog.Content
            data-slot="command-dialog"
            className={cn(
              'w-full max-w-lg overflow-hidden rounded-xl shadow-dialog outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
              className,
            )}
          >
            <ArkDialog.Title className="sr-only">Command menu</ArkDialog.Title>
            {children}
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
