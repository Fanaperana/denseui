import { CopyIcon, MailIcon, SearchIcon } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'

export default function InputGroupDemo() {
  return (
    <div className="grid w-80 gap-3">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.dev</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput defaultValue="hello@denseui.dev" aria-label="Email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Copy">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask anything…" />
        <InputGroupAddon align="block-end" className="justify-between">
          <InputGroupText className="text-xs">0 / 280</InputGroupText>
          <InputGroupButton className="bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
