# Radio Group

Radio group

## Install

```bash
npx denseui@latest add radio-group
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

## Example

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function RadioGroupDemo() {
  return (
    <div className="flex gap-10">
      <RadioGroup defaultValue="board">
        <RadioGroupItem value="table">Table</RadioGroupItem>
        <RadioGroupItem value="board">Board</RadioGroupItem>
        <RadioGroupItem value="list">List</RadioGroupItem>
        <RadioGroupItem value="gallery" disabled>
          Gallery
        </RadioGroupItem>
      </RadioGroup>
      <RadioGroup defaultValue="asc" orientation="horizontal">
        <RadioGroupItem value="asc">Ascending</RadioGroupItem>
        <RadioGroupItem value="desc">Descending</RadioGroupItem>
      </RadioGroup>
    </div>
  )
}
```

## Source: components/ui/radio-group.tsx

```tsx
import { RadioGroup as ArkRadioGroup } from '@ark-ui/react/radio-group'
import { cn } from '@/lib/utils'

function RadioGroup({ className, ...props }: ArkRadioGroup.RootProps) {
  return (
    <ArkRadioGroup.Root
      data-slot="radio-group"
      className={cn('flex flex-col gap-1 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:gap-3', className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, children, ...props }: ArkRadioGroup.ItemProps) {
  return (
    <ArkRadioGroup.Item
      data-slot="radio-group-item"
      className={cn(
        'group inline-flex cursor-default select-none items-center gap-1.5 text-sm data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <ArkRadioGroup.ItemControl className="size-3.5 shrink-0 rounded-full border-[1.5px] border-foreground/40 transition-[border] duration-75 group-hover:bg-accent data-focus-visible:ring-2 data-focus-visible:ring-ring data-[state=checked]:border-4 data-[state=checked]:border-primary data-[state=checked]:bg-primary-foreground" />
      {children != null && <ArkRadioGroup.ItemText>{children}</ArkRadioGroup.ItemText>}
      <ArkRadioGroup.ItemHiddenInput />
    </ArkRadioGroup.Item>
  )
}

export { RadioGroup, RadioGroupItem }
```
