import * as React from 'react'
import { Menu } from '@ark-ui/react/menu'
import { cn } from '@/lib/utils'

function Menubar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="menubar"
      data-slot="menubar"
      className={cn('flex w-fit items-center gap-px rounded-md border border-border bg-background p-0.5', className)}
      {...props}
    />
  )
}

function MenubarMenu(props: Menu.RootProps) {
  return <Menu.Root lazyMount unmountOnExit positioning={{ placement: 'bottom-start', gutter: 6 }} {...props} />
}

function MenubarTrigger({ className, ...props }: Menu.TriggerProps) {
  return (
    <Menu.Trigger
      data-slot="menubar-trigger"
      className={cn(
        'flex cursor-default items-center rounded-sm px-2.5 py-1 text-sm font-medium outline-none select-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent',
        className,
      )}
      {...props}
    />
  )
}

export { Menubar, MenubarMenu, MenubarTrigger }
export {
  DropdownMenuContent as MenubarContent,
  DropdownMenuItem as MenubarItem,
  DropdownMenuCheckboxItem as MenubarCheckboxItem,
  DropdownMenuRadioGroup as MenubarRadioGroup,
  DropdownMenuRadioItem as MenubarRadioItem,
  DropdownMenuGroup as MenubarGroup,
  DropdownMenuLabel as MenubarLabel,
  DropdownMenuSeparator as MenubarSeparator,
  DropdownMenuShortcut as MenubarShortcut,
  DropdownMenuSub as MenubarSub,
  DropdownMenuSubTrigger as MenubarSubTrigger,
} from '@/components/ui/dropdown-menu'
