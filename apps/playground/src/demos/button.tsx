import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>
          <PlusIcon /> New
        </Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="destructive-outline">Remove</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon-sm" variant="ghost" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button size="icon-lg" variant="ghost" aria-label="Add">
          <PlusIcon />
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}
