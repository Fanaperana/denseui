import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.')
  return context
}

type SidebarProviderProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp ?? internalOpen

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value)
      else setInternalOpen(value)
    },
    [onOpenChange],
  )
  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen])

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle])

  const value = React.useMemo(() => ({ open, setOpen, toggle }), [open, setOpen, toggle])

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={{ '--sidebar-width': '15rem', '--sidebar-width-icon': '2.75rem', ...style } as React.CSSProperties}
        className={cn('flex min-h-svh w-full', className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

type SidebarProps = React.ComponentProps<'aside'> & {
  side?: 'left' | 'right'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

function Sidebar({ side = 'left', collapsible = 'offcanvas', className, children, ...props }: SidebarProps) {
  const { open } = useSidebar()
  const collapsed = collapsible !== 'none' && !open

  return (
    <aside
      data-slot="sidebar"
      data-state={collapsed ? 'collapsed' : 'expanded'}
      data-collapsible={collapsed ? collapsible : ''}
      data-side={side}
      className={cn(
        'group/sidebar sticky top-0 hidden h-svh w-(--sidebar-width) shrink-0 overflow-hidden border-border bg-muted text-foreground transition-[width] duration-200 ease-out md:flex',
        side === 'left' ? 'order-first border-r' : 'order-last border-l',
        'data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:border-0 data-[collapsible=icon]:w-(--sidebar-width-icon)',
        className,
      )}
      {...props}
    >
      <div className="flex w-(--sidebar-width) min-w-0 flex-col group-data-[collapsible=icon]/sidebar:w-(--sidebar-width-icon)">
        {children}
      </div>
    </aside>
  )
}

function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggle } = useSidebar()
  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      aria-label="Toggle sidebar"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggle()
      }}
      {...props}
    >
      <PanelLeftIcon />
    </Button>
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return <main data-slot="sidebar-inset" className={cn('flex min-w-0 flex-1 flex-col bg-background', className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-header" className={cn('flex flex-col gap-1 p-1.5', className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-footer" className={cn('mt-auto flex flex-col gap-1 p-1.5', className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn('flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  )
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-separator" className={cn('mx-2 h-px bg-border', className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group" className={cn('relative flex flex-col px-1.5 py-1', className)} {...props} />
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<typeof ark.div>) {
  return (
    <ark.div
      data-slot="sidebar-group-label"
      className={cn(
        'flex h-6 shrink-0 items-center px-2.5 text-xs font-medium text-subtle-foreground transition-opacity group-data-[collapsible=icon]/sidebar:pointer-events-none group-data-[collapsible=icon]/sidebar:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({ className, ...props }: React.ComponentProps<typeof ark.button>) {
  return (
    <ark.button
      data-slot="sidebar-group-action"
      className={cn(
        'absolute top-1.5 right-2.5 flex size-5 items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring group-data-[collapsible=icon]/sidebar:hidden [&>svg]:size-3.5',
        className,
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group-content" className={cn('w-full', className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="sidebar-menu" className={cn('flex w-full min-w-0 flex-col gap-px', className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-item" className={cn('group/menu-item relative', className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  'flex w-full items-center gap-2 overflow-hidden rounded-sm text-left text-sm text-muted-foreground outline-none transition-colors duration-75 hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent-active data-[active=true]:font-medium data-[active=true]:text-foreground group-data-[collapsible=icon]/sidebar:size-7! group-data-[collapsible=icon]/sidebar:justify-center group-data-[collapsible=icon]/sidebar:p-0! group-has-data-[slot=sidebar-menu-action]/menu-item:pr-7 [&>span:last-child]:truncate group-data-[collapsible=icon]/sidebar:[&>span]:hidden [&>svg]:size-3.5 [&>svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-2.5 py-1.5',
        lg: 'px-2.5 py-2',
      },
    },
    defaultVariants: { size: 'default' },
  },
)

type SidebarMenuButtonProps = React.ComponentProps<typeof ark.button> &
  VariantProps<typeof sidebarMenuButtonVariants> & { isActive?: boolean }

function SidebarMenuButton({ className, size, isActive = false, ...props }: SidebarMenuButtonProps) {
  return (
    <ark.button
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ size }), className)}
      {...props}
    />
  )
}

type SidebarMenuActionProps = React.ComponentProps<typeof ark.button> & { showOnHover?: boolean }

function SidebarMenuAction({ className, showOnHover = false, ...props }: SidebarMenuActionProps) {
  return (
    <ark.button
      data-slot="sidebar-menu-action"
      className={cn(
        'absolute top-1/2 right-1 flex size-5 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-accent-active hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring group-data-[collapsible=icon]/sidebar:hidden [&>svg]:size-3.5',
        showOnHover && 'opacity-0 group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100 data-[state=open]:opacity-100',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      className={cn(
        'pointer-events-none absolute top-1/2 right-1.5 flex min-w-4 -translate-y-1/2 items-center justify-center rounded-sm px-1.5 py-0.5 text-[10px] leading-none font-medium text-subtle-foreground tabular-nums select-none group-data-[collapsible=icon]/sidebar:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        'ml-3.5 flex min-w-0 flex-col gap-px border-l border-border py-0.5 pl-1.5 group-data-[collapsible=icon]/sidebar:hidden',
        className,
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem(props: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-sub-item" {...props} />
}

function SidebarMenuSubButton({
  className,
  isActive = false,
  ...props
}: React.ComponentProps<typeof ark.a> & { isActive?: boolean }) {
  return (
    <ark.a
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        'flex min-w-0 items-center gap-2 overflow-hidden rounded-sm px-2 py-1 text-sm text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-accent-active data-[active=true]:text-foreground [&>span:last-child]:truncate [&>svg]:size-3.5',
        className,
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
