# Date Picker

Date input with a calendar popover

## Install

```bash
npx denseui@latest add date-picker
```

npm dependencies: `@ark-ui/react`, `lucide-react`

Also installs: `input`, `calendar`

## Usage

```tsx
import { DatePicker, DatePickerInput, DatePickerContent } from "@/components/ui/date-picker"
```

## Example

```tsx
import { DatePicker, DatePickerContent, DatePickerInput } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

export default function DatePickerDemo() {
  return (
    <div className="flex gap-4">
      <DatePicker className="grid w-44 gap-1">
        <Label>Due date</Label>
        <DatePickerInput placeholder="mm/dd/yyyy" />
        <DatePickerContent />
      </DatePicker>
      <DatePicker selectionMode="range" className="grid w-56 gap-1">
        <Label>Date range</Label>
        <DatePickerInput index={0} placeholder="Start" />
        <DatePickerInput index={1} placeholder="End" />
        <DatePickerContent />
      </DatePicker>
    </div>
  )
}
```

## Source: components/ui/date-picker.tsx

```tsx
import { DatePicker as ArkDatePicker } from '@ark-ui/react/date-picker'
import { Portal } from '@ark-ui/react/portal'
import { CalendarIcon } from 'lucide-react'
import { CalendarViews } from '@/components/ui/calendar'
import { inputVariants } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function DatePicker(props: ArkDatePicker.RootProps) {
  return <ArkDatePicker.Root data-slot="date-picker" lazyMount unmountOnExit {...props} />
}

function DatePickerInput({ className, ...props }: ArkDatePicker.InputProps) {
  return (
    <ArkDatePicker.Control className="relative w-full">
      <ArkDatePicker.Input
        data-slot="date-picker-input"
        className={cn(inputVariants(), 'pr-6', className)}
        {...props}
      />
      <ArkDatePicker.Trigger className="absolute inset-y-0 right-0.5 my-auto flex size-5 items-center justify-center rounded-xs text-muted-foreground outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
        <CalendarIcon className="size-3" />
      </ArkDatePicker.Trigger>
    </ArkDatePicker.Control>
  )
}

function DatePickerContent({ className, children, ...props }: ArkDatePicker.ContentProps) {
  return (
    <Portal>
      <ArkDatePicker.Positioner>
        <ArkDatePicker.Content
          data-slot="date-picker-content"
          className={cn(
            'z-50 origin-(--transform-origin) rounded-lg bg-popover px-3 py-2 text-popover-foreground shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        >
          {children ?? <CalendarViews />}
        </ArkDatePicker.Content>
      </ArkDatePicker.Positioner>
    </Portal>
  )
}

export { DatePicker, DatePickerInput, DatePickerContent }
```
