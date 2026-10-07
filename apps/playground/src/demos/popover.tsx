import { LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <LinkIcon /> Add link
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Input placeholder="Paste link or search pages" autoFocus />
        <div className="flex justify-end">
          <PopoverClose asChild>
            <Button size="sm">Link</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
