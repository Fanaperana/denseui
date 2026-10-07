import * as React from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderCircleIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-3.5 animate-spin text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Spinner }
