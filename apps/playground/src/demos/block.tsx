import { useState } from 'react'
import { CopyIcon, Trash2Icon, TypeIcon } from 'lucide-react'
import { Block } from '@/components/ui/block'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

export default function BlockDemo() {
  const [blocks, setBlocks] = useState([
    'Hover a block to reveal its handles.',
    'Click + to insert a block below.',
    'Click the grip to open the block menu.',
  ])

  const insertAfter = (index: number) =>
    setBlocks((b) => [...b.slice(0, index + 1), 'New block', ...b.slice(index + 1)])

  return (
    <div className="flex w-[420px] flex-col gap-0.5 pl-12">
      {blocks.map((text, index) => (
        <Block
          key={`${index}-${text}`}
          onAdd={() => insertAfter(index)}
          menu={
            <>
              <DropdownMenuItem value="turn-into">
                <TypeIcon /> Turn into
              </DropdownMenuItem>
              <DropdownMenuItem value="duplicate" onSelect={() => insertAfter(index)}>
                <CopyIcon /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                value="delete"
                variant="destructive"
                onSelect={() => setBlocks((b) => b.filter((_, i) => i !== index))}
              >
                <Trash2Icon /> Delete
              </DropdownMenuItem>
            </>
          }
        >
          <p className="rounded-sm px-1 py-0.5 text-base">{text}</p>
        </Block>
      ))}
    </div>
  )
}
