import * as React from 'react'
import { cn } from '@/lib/utils'

function PropertyList({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="property-list" className={cn('flex w-full flex-col', className)} {...props} />
}

type PropertyProps = React.ComponentProps<'div'> & {
  label: React.ReactNode
  icon?: React.ReactNode
}

function Property({ label, icon, className, children, ...props }: PropertyProps) {
  return (
    <div data-slot="property" className={cn('flex min-h-7 items-start', className)} {...props}>
      <div
        data-slot="property-label"
        className="flex w-36 shrink-0 items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0"
      >
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div
        data-slot="property-value"
        className="flex min-h-7 min-w-0 flex-1 flex-wrap items-center gap-1 rounded-sm px-2 py-1 text-sm transition-colors duration-75 hover:bg-accent has-[[data-slot=editable]]:p-0.5"
      >
        {children}
      </div>
    </div>
  )
}

function PropertyEmpty({ className, children = 'Empty', ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="property-empty" className={cn('text-subtle-foreground', className)} {...props}>{children}</span>
}

export { PropertyList, Property, PropertyEmpty, type PropertyProps }
