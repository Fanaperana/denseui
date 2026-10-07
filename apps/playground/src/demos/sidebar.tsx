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
