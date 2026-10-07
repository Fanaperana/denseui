# Resizable

Resizable panel groups

## Install

```bash
npx denseui@latest add resizable
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
```

## Example

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function ResizableDemo() {
  return (
    <div className="h-48 w-96 overflow-hidden rounded-lg border border-border">
      <ResizablePanelGroup panels={[{ id: 'nav', minSize: 20 }, { id: 'main' }]} defaultSize={[30, 70]}>
        <ResizablePanel id="nav" className="flex items-center justify-center bg-muted text-sm font-medium">
          Sidebar
        </ResizablePanel>
        <ResizableHandle id="nav:main" />
        <ResizablePanel id="main">
          <ResizablePanelGroup
            orientation="vertical"
            panels={[{ id: 'editor', minSize: 20 }, { id: 'terminal', minSize: 20 }]}
            defaultSize={[65, 35]}
          >
            <ResizablePanel id="editor" className="flex items-center justify-center text-sm font-medium">
              Editor
            </ResizablePanel>
            <ResizableHandle id="editor:terminal" />
            <ResizablePanel id="terminal" className="flex items-center justify-center text-sm font-medium">
              Terminal
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
```

## Source: components/ui/resizable.tsx

```tsx
import { Splitter } from '@ark-ui/react/splitter'
import { cn } from '@/lib/utils'

function ResizablePanelGroup({ className, ...props }: Splitter.RootProps) {
  return (
    <Splitter.Root
      data-slot="resizable-panel-group"
      className={cn('flex size-full data-[orientation=vertical]:flex-col', className)}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }: Splitter.PanelProps) {
  return <Splitter.Panel data-slot="resizable-panel" className={cn('overflow-hidden', className)} {...props} />
}

function ResizableHandle({ className, ...props }: Splitter.ResizeTriggerProps) {
  return (
    <Splitter.ResizeTrigger
      data-slot="resizable-handle"
      className={cn(
        'relative shrink-0 bg-border outline-none transition-colors after:absolute focus-visible:bg-brand data-dragging:bg-brand data-[orientation=horizontal]:w-px data-[orientation=horizontal]:after:inset-y-0 data-[orientation=horizontal]:after:-inset-x-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:-inset-y-1 hover:bg-brand/60',
        className,
      )}
      {...props}
    />
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```
