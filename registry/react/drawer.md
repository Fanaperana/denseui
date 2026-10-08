# Drawer

Panel that slides up from the bottom

## Install

```bash
npx denseui@latest add drawer
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
```

## Example

```tsx
import { useState } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function DrawerDemo() {
  const [goal, setGoal] = useState(350)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xs">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-4 p-3">
            <Button variant="outline" size="icon" aria-label="Decrease" onClick={() => setGoal(goal - 10)}>
              <MinusIcon />
            </Button>
            <div className="text-center">
              <div className="text-5xl font-bold tracking-tighter tabular-nums">{goal}</div>
              <div className="text-xs text-muted-foreground uppercase">calories/day</div>
            </div>
            <Button variant="outline" size="icon" aria-label="Increase" onClick={() => setGoal(goal + 10)}>
              <PlusIcon />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```

## Source: components/ui/drawer.tsx

```tsx
import * as React from 'react'
import { Drawer as ArkDrawer } from '@ark-ui/react/drawer'
import { Portal } from '@ark-ui/react/portal'
import { cn } from '@/lib/utils'

/** Bottom sheet that can be swiped down to close. */
function Drawer(props: ArkDrawer.RootProps) {
  return <ArkDrawer.Root lazyMount unmountOnExit {...props} />
}

function DrawerTrigger(props: ArkDrawer.TriggerProps) {
  return <ArkDrawer.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: ArkDrawer.CloseTriggerProps) {
  return <ArkDrawer.CloseTrigger data-slot="drawer-close" {...props} />
}

function DrawerContent({ className, children, ...props }: ArkDrawer.ContentProps) {
  return (
    <Portal>
      <ArkDrawer.Backdrop className="fixed inset-0 z-50 bg-black/40 opacity-[calc(1-var(--drawer-swipe-progress,0))] data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
      <ArkDrawer.Positioner className="fixed inset-0 z-50 flex flex-col justify-end">
        <ArkDrawer.Content
          data-slot="drawer-content"
          className={cn(
            'mx-auto flex max-h-[85vh] w-full max-w-2xl flex-col rounded-t-xl border border-b-0 border-border bg-popover text-sm text-popover-foreground shadow-dialog outline-none transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom',
            className,
          )}
          {...props}
        >
          <ArkDrawer.Grabber className="flex shrink-0 cursor-grab justify-center pt-2 pb-1 active:cursor-grabbing">
            <ArkDrawer.GrabberIndicator className="h-1 w-10 rounded-full bg-accent-active" />
          </ArkDrawer.Grabber>
          {children}
        </ArkDrawer.Content>
      </ArkDrawer.Positioner>
    </Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={cn('flex flex-col gap-0.5 px-4 py-3 text-center', className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-1.5 px-4 py-3', className)} {...props} />
}

function DrawerTitle({ className, ...props }: ArkDrawer.TitleProps) {
  return <ArkDrawer.Title data-slot="drawer-title" className={cn('text-lg font-semibold', className)} {...props} />
}

function DrawerDescription({ className, ...props }: ArkDrawer.DescriptionProps) {
  return (
    <ArkDrawer.Description
      data-slot="drawer-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription }
```
