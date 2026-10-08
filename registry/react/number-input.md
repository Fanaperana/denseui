# Number Input

Numeric input with steppers, min/max and formatting

## Install

```bash
npx denseui@latest add number-input
```

npm dependencies: `@ark-ui/react`, `lucide-react`

Also installs: `input`

## Usage

```tsx
import { NumberInput } from "@/components/ui/number-input"
```

## Example

```tsx
import { Label } from '@/components/ui/label'
import { NumberInput } from '@/components/ui/number-input'

export default function NumberInputDemo() {
  return (
    <div className="flex gap-3">
      <div className="grid w-28 gap-1">
        <Label htmlFor="qty">Quantity</Label>
        <NumberInput id="qty" defaultValue="3" min={0} max={99} />
      </div>
      <div className="grid w-32 gap-1">
        <Label htmlFor="price">Price</Label>
        <NumberInput
          id="price"
          defaultValue="24.5"
          step={0.5}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
      </div>
      <div className="grid w-28 gap-1">
        <Label htmlFor="opacity">Opacity</Label>
        <NumberInput id="opacity" defaultValue="0.8" step={0.05} min={0} max={1} formatOptions={{ style: 'percent' }} />
      </div>
    </div>
  )
}
```

## Source: components/ui/number-input.tsx

```tsx
import { NumberInput as ArkNumberInput } from '@ark-ui/react/number-input'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { inputVariants } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const stepper =
  'flex flex-1 items-center justify-center text-muted-foreground outline-none hover:bg-surface-hover hover:text-foreground disabled:pointer-events-none disabled:opacity-40'

/** `id` targets the input, so `<Label htmlFor={id}>` works. */
function NumberInput({ className, id, ids, ...props }: ArkNumberInput.RootProps) {
  return (
    <ArkNumberInput.Root
      data-slot="number-input"
      id={id}
      ids={id ? { input: id, ...ids } : ids}
      className={cn('w-full', className)}
      {...props}
    >
      <ArkNumberInput.Control className="relative flex w-full">
        <ArkNumberInput.Input className={cn(inputVariants(), 'pr-6 tabular-nums')} />
        <div className="absolute inset-y-px right-px flex w-5 flex-col overflow-hidden rounded-r-[3px] border-l border-input">
          <ArkNumberInput.IncrementTrigger aria-label="Increment" className={stepper}>
            <ChevronUpIcon className="size-2.5" />
          </ArkNumberInput.IncrementTrigger>
          <ArkNumberInput.DecrementTrigger aria-label="Decrement" className={cn(stepper, 'border-t border-input')}>
            <ChevronDownIcon className="size-2.5" />
          </ArkNumberInput.DecrementTrigger>
        </div>
      </ArkNumberInput.Control>
    </ArkNumberInput.Root>
  )
}

export { NumberInput }
```
