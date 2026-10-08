import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const calloutVariants = cva('flex w-full items-start gap-2.5 rounded-md px-4 py-3 text-base', {
  variants: {
    color: {
      default: 'bg-muted',
      gray: 'bg-tag-gray-bg',
      brown: 'bg-tag-brown-bg',
      orange: 'bg-tag-orange-bg',
      yellow: 'bg-tag-yellow-bg',
      green: 'bg-tag-green-bg',
      blue: 'bg-tag-blue-bg',
      purple: 'bg-tag-purple-bg',
      pink: 'bg-tag-pink-bg',
      red: 'bg-tag-red-bg',
    },
    variant: {
      default: '',
      outline: 'border border-border bg-background',
    },
  },
  defaultVariants: { color: 'default', variant: 'default' },
})

type CalloutProps = Omit<React.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof calloutVariants> & {
    /** Emoji or icon element shown at the start. */
    icon?: React.ReactNode
  }

function Callout({ className, color, variant, icon = '💡', children, ...props }: CalloutProps) {
  return (
    <div data-slot="callout" role="note" className={cn(calloutVariants({ color, variant }), className)} {...props}>
      {icon != null && (
        <span data-slot="callout-icon" className="flex h-5 shrink-0 items-center text-base leading-none [&_svg]:size-4">
          {icon}
        </span>
      )}
      <div data-slot="callout-content" className="min-w-0 flex-1 leading-5">
        {children}
      </div>
    </div>
  )
}

export { Callout, calloutVariants, type CalloutProps }
