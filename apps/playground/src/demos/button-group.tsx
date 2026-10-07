import { ArchiveIcon, ChevronDownIcon, ClockIcon, ReplyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">
            <ArchiveIcon /> Archive
          </Button>
          <Button variant="outline">
            <ClockIcon /> Snooze
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">
            <ReplyIcon /> Reply
          </Button>
          <Button variant="outline" size="icon" aria-label="More">
            <ChevronDownIcon />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="denseui.dev" className="w-40" />
        <Button>Go</Button>
      </ButtonGroup>
    </div>
  )
}
