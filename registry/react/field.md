# Field

Form field layout with label, description and error

## Install

```bash
npx denseui@latest add field
```

npm dependencies: `class-variance-authority`

Also installs: `label`

## Usage

```tsx
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
```

## Example

```tsx
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function FieldDemo() {
  return (
    <form className="w-80" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-name">Full name</FieldLabel>
            <Input id="field-name" placeholder="Jane Doe" />
            <FieldDescription>Shown on your public profile.</FieldDescription>
          </Field>
          <Field data-invalid="true">
            <FieldLabel htmlFor="field-username">Username</FieldLabel>
            <Input id="field-username" aria-invalid defaultValue="jd" />
            <FieldError>Username must be at least 3 characters.</FieldError>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldLabel htmlFor="field-public">Public profile</FieldLabel>
            <Switch id="field-public" defaultChecked />
          </Field>
          <Field orientation="horizontal">
            <Checkbox defaultChecked>Email me about product updates</Checkbox>
          </Field>
          <Button type="submit" className="self-end">
            Save
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
```

## Source: components/ui/field.tsx

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return <fieldset data-slot="field-set" className={cn('flex flex-col gap-3', className)} {...props} />
}

function FieldLegend({ className, ...props }: React.ComponentProps<'legend'>) {
  return <legend data-slot="field-legend" className={cn('mb-1 text-lg font-medium', className)} {...props} />
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-group" className={cn('flex w-full flex-col gap-3', className)} {...props} />
}

const fieldVariants = cva('group/field flex w-full gap-1 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row items-center gap-2 [&>[data-slot=field-label]]:flex-auto',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

function Field({ className, orientation, ...props }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation ?? 'vertical'}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-content" className={cn('flex flex-1 flex-col gap-0.5', className)} {...props} />
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn('group-data-[disabled=true]/field:opacity-50 group-data-[invalid=true]/field:text-destructive', className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-xs text-subtle-foreground [&>a]:underline [&>a]:underline-offset-2', className)}
      {...props}
    />
  )
}

function FieldError({ className, children, ...props }: React.ComponentProps<'div'>) {
  if (!children) return null
  return (
    <div role="alert" data-slot="field-error" className={cn('text-xs text-destructive', className)} {...props}>
      {children}
    </div>
  )
}

function FieldSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-separator" className={cn('my-1 h-px w-full bg-border', className)} {...props} />
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
}
```
