# Native Select

Styled native select element

## Install

```bash
npx denseui@latest add native-select
```

npm dependencies: `lucide-react`

## Usage

```tsx
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"
```

## Example

```tsx
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@/components/ui/native-select'

export default function NativeSelectDemo() {
  return (
    <div className="flex gap-3">
      <NativeSelect defaultValue="" className="w-40">
        <NativeSelectOption value="" disabled>
          Select status
        </NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
      </NativeSelect>
      <NativeSelect className="w-40">
        <NativeSelectOptGroup label="Frontend">
          <NativeSelectOption>React</NativeSelectOption>
          <NativeSelectOption>Vue</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Backend">
          <NativeSelectOption>Node</NativeSelectOption>
          <NativeSelectOption>Go</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  )
}
```

## Source: components/ui/native-select.tsx

```tsx
import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function NativeSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <div data-slot="native-select-wrapper" className="relative w-fit has-[select:disabled]:opacity-50">
      <select
        data-slot="native-select"
        className={cn(
          'h-6 w-full min-w-0 appearance-none rounded-sm border border-input bg-input-background py-0 pr-6 pl-2 text-sm text-foreground outline-none focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed aria-invalid:border-destructive/60',
          className,
        )}
        {...props}
      />
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>) {
  return (
    <option data-slot="native-select-option" className={cn('bg-popover text-popover-foreground', className)} {...props} />
  )
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn('bg-popover text-muted-foreground', className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
```
