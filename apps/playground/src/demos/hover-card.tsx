import { CalendarIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@denseui</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">DU</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="font-semibold">@denseui</div>
            <p className="text-muted-foreground">Ultra-compact components for Tailwind CSS v4.</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-subtle-foreground">
              <CalendarIcon className="size-3" /> Joined October 2026
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
