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
