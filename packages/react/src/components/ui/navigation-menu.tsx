import { NavigationMenu as ArkNavigationMenu } from '@ark-ui/react/navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function NavigationMenu({ className, ...props }: ArkNavigationMenu.RootProps) {
  return <ArkNavigationMenu.Root data-slot="navigation-menu" className={cn('relative', className)} {...props} />
}

function NavigationMenuList({ className, ...props }: ArkNavigationMenu.ListProps) {
  return (
    <ArkNavigationMenu.List
      data-slot="navigation-menu-list"
      className={cn('flex list-none items-center gap-0.5', className)}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, ...props }: ArkNavigationMenu.ItemProps) {
  return <ArkNavigationMenu.Item data-slot="navigation-menu-item" className={cn('relative', className)} {...props} />
}

const triggerClass =
  'inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-sm font-medium outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent'

function NavigationMenuTrigger({ className, children, ...props }: ArkNavigationMenu.TriggerProps) {
  return (
    <ArkNavigationMenu.Trigger data-slot="navigation-menu-trigger" className={cn(triggerClass, 'group', className)} {...props}>
      {children}
      <ChevronDownIcon className="size-3 text-muted-foreground transition-transform duration-150 group-data-[state=open]:rotate-180" />
    </ArkNavigationMenu.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: ArkNavigationMenu.ContentProps) {
  return (
    <ArkNavigationMenu.Content
      data-slot="navigation-menu-content"
      className={cn(
        'absolute top-full left-0 z-50 mt-1.5 min-w-56 origin-top-left rounded-lg bg-popover p-1 text-popover-foreground shadow-popover data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuLink({ className, ...props }: ArkNavigationMenu.LinkProps) {
  return (
    <ArkNavigationMenu.Link
      data-slot="navigation-menu-link"
      className={cn(
        'flex flex-col gap-0.5 rounded-sm px-2.5 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-current:bg-accent-active',
        className,
      )}
      {...props}
    />
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  triggerClass as navigationMenuTriggerStyle,
}
