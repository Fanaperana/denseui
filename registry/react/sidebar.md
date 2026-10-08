# Sidebar

Collapsible app sidebar with groups, menus and sub-menus

## Install

```bash
npx denseui@latest add sidebar
```

npm dependencies: `@ark-ui/react`, `lucide-react`, `class-variance-authority`

Also installs: `button`

## Usage

```tsx
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarSeparator, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
```

## Example

```tsx
import { useState } from 'react'
import {
  ChevronRightIcon,
  FileTextIcon,
  HomeIcon,
  InboxIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
} from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
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
  SidebarTrigger,
} from '@/components/ui/sidebar'

const main = [
  { icon: SearchIcon, label: 'Search' },
  { icon: HomeIcon, label: 'Home' },
  { icon: InboxIcon, label: 'Inbox', badge: 12 },
]

const pages = [
  { label: 'Engineering', children: ['Roadmap', 'RFCs', 'On-call'] },
  { label: 'Design', children: ['Tokens', 'Components'] },
  { label: 'Marketing', children: [] },
]

export default function SidebarDemo() {
  const [active, setActive] = useState('Home')

  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border border-border [&_[data-slot=sidebar-wrapper]]:min-h-0 [&_[data-slot=sidebar]]:h-96">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="font-medium text-foreground">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-primary text-[9px] text-primary-foreground">
                    A
                  </span>
                  <span>Acme Inc.</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {main.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={active === item.label} onClick={() => setActive(item.label)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add page">
                <PlusIcon />
              </SidebarGroupAction>
              <SidebarMenu>
                {pages.map((page) => (
                  <Collapsible key={page.label} asChild>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="group/trigger">
                          <ChevronRightIcon className="transition-transform group-data-[state=open]/trigger:rotate-90" />
                          <span>{page.label}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <SidebarMenuAction showOnHover aria-label="More">
                        <MoreHorizontalIcon />
                      </SidebarMenuAction>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {page.children.map((child) => (
                            <SidebarMenuSubItem key={child}>
                              <SidebarMenuSubButton
                                href="#"
                                isActive={active === child}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setActive(child)
                                }}
                              >
                                <FileTextIcon />
                                <span>{child}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                          {page.children.length === 0 && (
                            <div className="px-2 text-xs text-subtle-foreground">No pages inside</div>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-10 items-center gap-2 border-b border-border px-2">
            <SidebarTrigger />
            <span className="text-sm font-medium">{active}</span>
          </header>
          <div className="p-4 text-sm text-muted-foreground">
            Press <kbd className="font-mono">⌘B</kbd> or the trigger to collapse to icons.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
```

## Source: components/ui/sidebar.tsx

```tsx
import * as React from 'react'
import { Dialog } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { Portal } from '@ark-ui/react/portal'
import { cva, type VariantProps } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MOBILE_QUERY = '(max-width: 767px)'

function useIsMobile() {
  return React.useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(MOBILE_QUERY)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
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
  const [openMobile, setOpenMobile] = React.useState(false)
  const isMobile = useIsMobile()
  const open = openProp ?? internalOpen

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value)
      else setInternalOpen(value)
    },
    [onOpenChange],
  )
  const toggle = React.useCallback(
    () => (isMobile ? setOpenMobile((value) => !value) : setOpen(!open)),
    [isMobile, open, setOpen],
  )

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

  const value = React.useMemo(
    () => ({ open, setOpen, isMobile, openMobile, setOpenMobile, toggle }),
    [open, setOpen, isMobile, openMobile, toggle],
  )

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
  const { open, isMobile, openMobile, setOpenMobile } = useSidebar()
  const collapsed = collapsible !== 'none' && !open

  if (isMobile) {
    return (
      <Dialog.Root open={openMobile} onOpenChange={(e) => setOpenMobile(e.open)} lazyMount unmountOnExit>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
          <Dialog.Positioner className={cn('fixed inset-0 z-50 flex', side === 'right' && 'justify-end')}>
            <Dialog.Content
              data-slot="sidebar"
              data-mobile="true"
              data-side={side}
              className={cn(
                'group/sidebar flex h-full w-(--sidebar-width) max-w-[85vw] flex-col border-border bg-muted text-foreground shadow-dialog outline-none',
                side === 'left'
                  ? 'border-r data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left'
                  : 'border-l data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right',
                className,
              )}
              style={{ '--sidebar-width': '17rem' } as React.CSSProperties}
            >
              <Dialog.Title className="sr-only">Sidebar</Dialog.Title>
              {children}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    )
  }

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
```
