import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-default select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-sm font-medium transition-colors duration-75 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        brand: 'bg-brand text-brand-foreground hover:bg-brand-hover',
        outline: 'border border-input text-foreground hover:bg-accent active:bg-accent-active',
        ghost: 'text-foreground hover:bg-accent active:bg-accent-active',
        subtle: 'text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent-active',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
        'destructive-outline':
          'border border-destructive/40 text-destructive hover:bg-destructive/10 active:bg-destructive/15',
        link: 'h-auto px-0 text-brand underline-offset-2 hover:underline',
      },
      size: {
        sm: 'h-5 gap-1 px-2 text-xs',
        default: 'h-6 px-2.5 text-sm',
        lg: 'h-7 px-3 text-base',
        'icon-sm': 'size-5',
        icon: 'size-6',
        'icon-lg': 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = React.ComponentProps<typeof ark.button> & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, asChild, type, ...props }: ButtonProps) {
  return (
    <ark.button
      data-slot="button"
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
