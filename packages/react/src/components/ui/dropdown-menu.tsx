import * as React from 'react'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronRightIcon, DotIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const itemClass =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg:not([class*='text-'])]:text-muted-foreground"

function DropdownMenu(props: Menu.RootProps) {
  return <Menu.Root lazyMount unmountOnExit {...props} />
}

function DropdownMenuTrigger(props: Menu.TriggerProps) {
  return <Menu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function ContextMenuTrigger(props: Menu.ContextTriggerProps) {
  return <Menu.ContextTrigger data-slot="context-menu-trigger" {...props} />
}

type DropdownMenuContentProps = Menu.ContentProps & { portalled?: boolean }

function DropdownMenuContent({ className, portalled = true, ...props }: DropdownMenuContentProps) {
  return (
    <Portal disabled={!portalled}>
      <Menu.Positioner>
        <Menu.Content
          data-slot="dropdown-menu-content"
          className={cn(
            'z-50 max-h-(--available-height) min-w-44 origin-(--transform-origin) overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        />
      </Menu.Positioner>
    </Portal>
  )
}

type DropdownMenuItemProps = Menu.ItemProps & { variant?: 'default' | 'destructive'; inset?: boolean }

function DropdownMenuItem({ className, variant = 'default', inset, ...props }: DropdownMenuItemProps) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(
        itemClass,
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:[&_svg]:text-destructive',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({ className, children, ...props }: Menu.CheckboxItemProps) {
  return (
    <Menu.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn(itemClass, 'pl-8', className)} {...props}>
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center">
        <Menu.ItemIndicator>
          <CheckIcon className="text-foreground" />
        </Menu.ItemIndicator>
      </span>
      <Menu.ItemText>{children}</Menu.ItemText>
    </Menu.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(props: Menu.RadioItemGroupProps) {
  return <Menu.RadioItemGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({ className, children, ...props }: Menu.RadioItemProps) {
  return (
    <Menu.RadioItem data-slot="dropdown-menu-radio-item" className={cn(itemClass, 'pl-8', className)} {...props}>
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center">
        <Menu.ItemIndicator>
          <DotIcon className="size-5 text-foreground" strokeWidth={4} />
        </Menu.ItemIndicator>
      </span>
      <Menu.ItemText>{children}</Menu.ItemText>
    </Menu.RadioItem>
  )
}

function DropdownMenuGroup(props: Menu.ItemGroupProps) {
  return <Menu.ItemGroup data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({ className, ...props }: Menu.ItemGroupLabelProps) {
  return (
    <Menu.ItemGroupLabel
      data-slot="dropdown-menu-label"
      className={cn('flex items-center px-2.5 pt-2 pb-1 text-xs font-medium text-muted-foreground select-none', className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: Menu.SeparatorProps) {
  return (
    <Menu.Separator
      data-slot="dropdown-menu-separator"
      className={cn('-mx-1 my-1 h-px border-0 bg-border', className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn('ml-auto pl-4 text-xs text-subtle-foreground', className)}
      {...props}
    />
  )
}

/** Nested submenu: `<DropdownMenuSub><DropdownMenuSubTrigger/><DropdownMenuContent/></DropdownMenuSub>` */
function DropdownMenuSub(props: Menu.RootProps) {
  return <Menu.Root lazyMount unmountOnExit positioning={{ placement: 'right-start', gutter: 2 }} {...props} />
}

function DropdownMenuSubTrigger({ className, children, ...props }: Menu.TriggerItemProps) {
  return (
    <Menu.TriggerItem
      data-slot="dropdown-menu-sub-trigger"
      className={cn(itemClass, 'data-[state=open]:bg-accent', className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </Menu.TriggerItem>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  ContextMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
}
