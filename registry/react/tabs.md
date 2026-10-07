# Tabs

Underlined tabs

## Install

```bash
npx denseui@latest add tabs
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

## Example

```tsx
import { FileTextIcon, LayoutGridIcon, TableIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TabsDemo() {
  return (
    <Tabs defaultValue="table" className="w-80">
      <TabsList>
        <TabsTrigger value="table">
          <TableIcon /> Table
        </TabsTrigger>
        <TabsTrigger value="board">
          <LayoutGridIcon /> Board
        </TabsTrigger>
        <TabsTrigger value="docs">
          <FileTextIcon /> Docs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="table" className="text-sm text-muted-foreground">
        Rows and columns, Notion database style.
      </TabsContent>
      <TabsContent value="board" className="text-sm text-muted-foreground">
        Cards grouped by status.
      </TabsContent>
      <TabsContent value="docs" className="text-sm text-muted-foreground">
        Plain pages.
      </TabsContent>
    </Tabs>
  )
}
```

## Source: components/ui/tabs.tsx

```tsx
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import { cn } from '@/lib/utils'

function Tabs({ className, ...props }: ArkTabs.RootProps) {
  return <ArkTabs.Root data-slot="tabs" className={cn('flex flex-col', className)} {...props} />
}

function TabsList({ className, ...props }: ArkTabs.ListProps) {
  return (
    <ArkTabs.List
      data-slot="tabs-list"
      className={cn('flex items-center gap-0.5 border-b border-border', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: ArkTabs.TriggerProps) {
  return (
    <ArkTabs.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative mb-1 inline-flex cursor-default items-center gap-1.5 rounded-sm px-2.5 py-1 text-sm text-muted-foreground outline-none transition-colors duration-75 select-none after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-disabled:opacity-40 data-selected:text-foreground data-selected:after:bg-foreground [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: ArkTabs.ContentProps) {
  return <ArkTabs.Content data-slot="tabs-content" className={cn('pt-2 outline-none', className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
```
