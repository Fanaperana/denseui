import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Spinner /> Loading…
      </span>
      <Button disabled>
        <Spinner className="text-current" /> Saving
      </Button>
    </div>
  )
}
