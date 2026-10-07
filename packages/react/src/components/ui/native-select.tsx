import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <div data-slot="native-select-wrapper" className="relative w-fit has-[select:disabled]:opacity-50">
      <select
        data-slot="native-select"
        className={cn(
          'h-6 w-full min-w-0 appearance-none rounded-sm border border-input bg-input-background py-0 pr-6 pl-2 text-sm text-foreground outline-none focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed aria-invalid:border-destructive/60',
          className,
        )}
        {...props}
      />
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>) {
  return (
    <option data-slot="native-select-option" className={cn('bg-popover text-popover-foreground', className)} {...props} />
  )
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn('bg-popover text-muted-foreground', className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
