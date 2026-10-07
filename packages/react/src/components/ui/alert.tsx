import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-md border px-2.5 py-2 text-sm has-[>svg]:grid-cols-[14px_1fr] has-[>svg]:gap-x-2 [&>svg]:size-3.5 [&>svg]:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground [&>svg]:text-muted-foreground',
        info: 'border-tag-blue/25 bg-tag-blue-bg text-tag-blue [&>svg]:text-current',
        success: 'border-tag-green/25 bg-tag-green-bg text-tag-green [&>svg]:text-current',
        warning: 'border-tag-orange/25 bg-tag-orange-bg text-tag-orange [&>svg]:text-current',
        destructive: 'border-destructive/25 bg-tag-red-bg text-destructive [&>svg]:text-current',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn('col-start-2 font-medium', className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('col-start-2 text-sm opacity-80 [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
