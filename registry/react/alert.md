# Alert

Callout for important information, with info, success, warning and destructive variants

## Install

```bash
npx denseui@latest add alert
```

npm dependencies: `class-variance-authority`

## Usage

```tsx
import { Alert, AlertTitle, AlertDescription, alertVariants } from "@/components/ui/alert"
```

## Example

```tsx
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TerminalIcon, TriangleAlertIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AlertDemo() {
  return (
    <div className="grid w-96 gap-2">
      <Alert>
        <TerminalIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Add components with the CLI.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>New version available</AlertTitle>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Changes saved</AlertTitle>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>You have used 92% of your workspace storage.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Please update your billing details.</AlertDescription>
      </Alert>
    </div>
  )
}
```

## Source: components/ui/alert.tsx

```tsx
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
```
