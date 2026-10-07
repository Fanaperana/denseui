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
```
