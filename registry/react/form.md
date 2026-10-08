# Form

react-hook-form bindings with accessible labels, descriptions and error messages

## Install

```bash
npx denseui@latest add form
```

npm dependencies: `react-hook-form`, `@ark-ui/react`

Also installs: `label`

## Usage

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField } from "@/components/ui/form"
```

## Example

```tsx
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toaster } from '@/components/ui/toast'

type Values = { username: string; email: string; marketing: boolean }

export default function FormDemo() {
  const form = useForm<Values>({ defaultValues: { username: '', email: '', marketing: false }, mode: 'onTouched' })

  return (
    <Form {...form}>
      <form
        className="flex w-80 flex-col gap-3"
        onSubmit={form.handleSubmit((values) => toaster.success({ title: 'Saved', description: JSON.stringify(values) }))}
      >
        <FormField
          control={form.control}
          name="username"
          rules={{ required: 'Username is required.', minLength: { value: 3, message: 'At least 3 characters.' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="janedoe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{ required: 'Email is required.', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email.' } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jane@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex-row items-center justify-between rounded-md border border-border px-3 py-2">
              <div className="flex flex-col gap-0.5">
                <FormLabel>Product updates</FormLabel>
                <FormDescription>One email a month, no spam.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={(e) => field.onChange(e.checked)} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          Save
        </Button>
      </form>
    </Form>
  )
}
```

## Source: components/ui/form.tsx

```tsx
import * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const Form = FormProvider

const FormFieldContext = React.createContext<{ name: string } | null>(null)
const FormItemContext = React.createContext<{ id: string } | null>(null)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const field = React.useContext(FormFieldContext)
  const item = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  if (!field || !item) throw new Error('useFormField must be used within <FormField> and <FormItem>')
  const formState = useFormState({ name: field.name })
  const fieldState = getFieldState(field.name, formState)

  return {
    name: field.name,
    formItemId: `${item.id}-item`,
    formDescriptionId: `${item.id}-description`,
    formMessageId: `${item.id}-message`,
    ...fieldState,
  }
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('flex flex-col gap-1', className)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField()
  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      className={cn('data-[error=true]:text-destructive', className)}
      {...props}
    />
  )
}

/** Passes id and aria attributes to its single child control. */
function FormControl(props: Omit<React.ComponentProps<typeof ark.div>, 'asChild'>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <ark.div
      data-slot="form-control"
      asChild
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()
  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-xs text-subtle-foreground', className)}
      {...props}
    />
  )
}

function FormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? '') : children
  if (!body) return null
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      role="alert"
      className={cn('text-xs text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField }
```
