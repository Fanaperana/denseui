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
