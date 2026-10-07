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
