import { useState } from 'react'
import { ArchiveIcon, ChevronDownIcon, CopyIcon, LinkIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function DropdownMenuDemo() {
  const [showDone, setShowDone] = useState(true)
  const [sort, setSort] = useState('manual')

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Page <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem value="copy-link">
            <LinkIcon /> Copy link <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem value="duplicate">
            <CopyIcon /> Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem value="rename">
            <PencilIcon /> Rename
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ArchiveIcon /> Move to
            </DropdownMenuSubTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem value="move-docs">Docs</DropdownMenuItem>
              <DropdownMenuItem value="move-roadmap">Roadmap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem value="delete" variant="destructive">
            <Trash2Icon /> Move to Trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            View options <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Show</DropdownMenuLabel>
            <DropdownMenuCheckboxItem value="done" checked={showDone} onCheckedChange={setShowDone}>
              Completed tasks
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sort} onValueChange={(e) => setSort(e.value)}>
              <DropdownMenuRadioItem value="manual">Manual</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="created">Created time</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="edited">Last edited</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <ContextMenuTrigger className="flex h-16 w-48 items-center justify-center rounded-md border border-dashed border-input text-sm text-muted-foreground">
          Right-click here
        </ContextMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem value="copy">
            <CopyIcon /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem value="delete" variant="destructive">
            <Trash2Icon /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
