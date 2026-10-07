import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex w-72 flex-col gap-1">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-medium">@denseui starred 3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-sm border border-border px-2 py-1 font-mono text-xs">@ark-ui/react</div>
      <CollapsibleContent className="flex flex-col gap-1">
        <div className="rounded-sm border border-border px-2 py-1 font-mono text-xs">tailwindcss</div>
        <div className="rounded-sm border border-border px-2 py-1 font-mono text-xs">lucide-react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
