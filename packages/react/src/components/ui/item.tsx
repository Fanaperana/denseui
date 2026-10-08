import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-group" className={cn('flex flex-col gap-px', className)} {...props} />
}

const itemVariants = cva(
  'group/item flex flex-wrap items-center gap-2.5 rounded-md border border-transparent text-sm outline-none transition-colors duration-75 focus-visible:ring-2 focus-visible:ring-ring [a]:hover:bg-accent',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border bg-card [a]:hover:bg-surface-hover',
        muted: 'bg-muted [a]:hover:bg-surface-hover',
      },
      size: {
        default: 'px-2.5 py-2',
        sm: 'px-2 py-1',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Item({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ark.div> & VariantProps<typeof itemVariants>) {
  return <ark.div data-slot="item" className={cn(itemVariants({ variant, size }), className)} {...props} />
}

const itemMediaVariants = cva('flex shrink-0 items-center justify-center [&_svg]:pointer-events-none', {
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: "size-7 rounded-sm border border-border bg-muted [&_svg:not([class*='size-'])]:size-3.5",
      image: 'size-8 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover',
    },
  },
  defaultVariants: { variant: 'default' },
})

function ItemMedia({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return <div data-slot="item-media" className={cn(itemMediaVariants({ variant }), className)} {...props} />
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-content" className={cn('flex flex-1 flex-col gap-0.5', className)} {...props} />
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="item-title" className={cn('flex w-fit items-center gap-1.5 font-medium', className)} {...props} />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="item-description" className={cn('line-clamp-2 text-sm text-muted-foreground', className)} {...props} />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-actions" className={cn('flex items-center gap-1', className)} {...props} />
}

function ItemSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-separator" className={cn('my-1 h-px w-full bg-border', className)} {...props} />
}

export { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle }
