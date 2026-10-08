# Menubar

Desktop-style horizontal menu bar

## Install

```bash
npx denseui@latest add menubar
```

npm dependencies: `@ark-ui/react`

Also installs: `dropdown-menu`

## Usage

```tsx
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarGroup, MenubarLabel, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubTrigger } from "@/components/ui/menubar"
```

## Example

```tsx
import { useState } from 'react'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'

export default function MenubarDemo() {
  const [showBookmarks, setShowBookmarks] = useState(true)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem value="new-tab">
            New tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem value="new-window">
            New window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarContent>
              <MenubarItem value="email">Email link</MenubarItem>
              <MenubarItem value="messages">Messages</MenubarItem>
            </MenubarContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem value="print">
            Print… <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem value="undo">
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem value="redo">
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem value="bookmarks" checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            Show bookmarks
          </MenubarCheckboxItem>
          <MenubarItem value="reload" inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
```

## Source: components/ui/menubar.tsx

```tsx
import * as React from 'react'
import { Menu } from '@ark-ui/react/menu'
import { cn } from '@/lib/utils'

type MenubarContextValue = {
  active: string | null
  setActive: (value: string | null) => void
}

const MenubarContext = React.createContext<MenubarContextValue | null>(null)

function Menubar({ className, onKeyDown, ...props }: React.ComponentProps<'div'>) {
  const [active, setActive] = React.useState<string | null>(null)
  const ref = React.useRef<HTMLDivElement>(null)

  const triggers = () => [...(ref.current?.querySelectorAll<HTMLElement>('[data-slot=menubar-trigger]') ?? [])]

  // Menu content stops keydown propagation, so listen in the capture phase while a menu is open.
  React.useEffect(() => {
    if (active === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      const list = triggers()
      const index = list.findIndex((t) => t.dataset.menubarValue === active)
      const contentId = list[index]?.getAttribute('aria-controls')
      const target = event.target as HTMLElement | null
      if (!contentId || !target?.closest(`[id="${contentId}"]`)) return
      // Leave arrows to an item that opens a submenu.
      if (event.key === 'ArrowRight' && target.querySelector('[data-highlighted][aria-haspopup]')) return
      const step = event.key === 'ArrowRight' ? 1 : -1
      const next = list[(index + step + list.length) % list.length]
      if (!next?.dataset.menubarValue) return
      event.preventDefault()
      event.stopPropagation()
      setActive(next.dataset.menubarValue)
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [active])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const list = triggers()
    const focusedIndex = list.indexOf(event.target as HTMLElement)
    if (focusedIndex < 0 || active !== null) return
    event.preventDefault()
    const step = event.key === 'ArrowRight' ? 1 : -1
    list[(focusedIndex + step + list.length) % list.length]?.focus()
  }

  return (
    <MenubarContext.Provider value={{ active, setActive }}>
      <div
        ref={ref}
        role="menubar"
        data-slot="menubar"
        className={cn('flex w-fit items-center gap-px rounded-md border border-border bg-background p-0.5', className)}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </MenubarContext.Provider>
  )
}

const MenubarMenuContext = React.createContext<string | null>(null)

function MenubarMenu({ onOpenChange, ...props }: Menu.RootProps) {
  const value = React.useId()
  const bar = React.useContext(MenubarContext)
  const open = bar ? bar.active === value : undefined

  return (
    <MenubarMenuContext.Provider value={value}>
      <Menu.Root
        lazyMount
        unmountOnExit
        positioning={{ placement: 'bottom-start', gutter: 6 }}
        open={open}
        onOpenChange={(details) => {
          onOpenChange?.(details)
          bar?.setActive(details.open ? value : bar.active === value ? null : bar.active)
        }}
        {...props}
      />
    </MenubarMenuContext.Provider>
  )
}

function MenubarTrigger({ className, onPointerEnter, ...props }: Menu.TriggerProps) {
  const value = React.useContext(MenubarMenuContext)
  const bar = React.useContext(MenubarContext)

  return (
    <Menu.Trigger
      data-slot="menubar-trigger"
      role="menuitem"
      data-menubar-value={value ?? undefined}
      className={cn(
        'flex cursor-default items-center rounded-sm px-2.5 py-1 text-sm font-medium outline-none select-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent',
        className,
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (bar && value && bar.active !== null && bar.active !== value) bar.setActive(value)
      }}
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
```
