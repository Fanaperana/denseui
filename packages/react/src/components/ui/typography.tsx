import * as React from 'react'
import { cn } from '@/lib/utils'

function TypographyH1({ className, ...props }: React.ComponentProps<'h1'>) {
  return <h1 data-slot="h1" className={cn('scroll-m-16 text-3xl font-bold tracking-tight text-balance', className)} {...props} />
}

function TypographyH2({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="h2"
      className={cn('scroll-m-16 border-b border-border pb-1.5 text-2xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  )
}

function TypographyH3({ className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 data-slot="h3" className={cn('scroll-m-16 text-xl font-semibold tracking-tight', className)} {...props} />
}

function TypographyH4({ className, ...props }: React.ComponentProps<'h4'>) {
  return <h4 data-slot="h4" className={cn('scroll-m-16 text-lg font-semibold tracking-tight', className)} {...props} />
}

function TypographyP({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="p" className={cn('leading-6 [&:not(:first-child)]:mt-3', className)} {...props} />
}

function TypographyLead({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="lead" className={cn('text-lg text-muted-foreground', className)} {...props} />
}

function TypographyMuted({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="muted" className={cn('text-sm text-muted-foreground', className)} {...props} />
}

function TypographyInlineCode({ className, ...props }: React.ComponentProps<'code'>) {
  return (
    <code
      data-slot="inline-code"
      className={cn('rounded-xs bg-muted px-1 py-px font-mono text-[0.9em] text-tag-red', className)}
      {...props}
    />
  )
}

function TypographyBlockquote({ className, ...props }: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn('mt-3 border-l-[3px] border-foreground pl-3.5 text-lg', className)}
      {...props}
    />
  )
}

function TypographyList({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="list" className={cn('mt-3 ml-5 list-disc [&>li]:mt-1', className)} {...props} />
}

export {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
}
