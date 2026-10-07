import { StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function TooltipDemo() {
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Favorite">
            <StarIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add to Favorites</TooltipContent>
      </Tooltip>
      <Tooltip positioning={{ placement: 'bottom' }}>
        <TooltipTrigger asChild>
          <Button variant="outline">Search</Button>
        </TooltipTrigger>
        <TooltipContent>
          Search pages <Kbd className="ml-1">⌘K</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
