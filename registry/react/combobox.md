# Combobox

Searchable input with a list of suggestions

## Install

```bash
npx denseui@latest add combobox
```

npm dependencies: `@ark-ui/react`, `lucide-react`

Also installs: `input`

## Usage

```tsx
import { Combobox, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxEmpty } from "@/components/ui/combobox"
```

## Example

```tsx
import { useListCollection } from '@ark-ui/react/combobox'
import { useFilter } from '@ark-ui/react/locale'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem } from '@/components/ui/combobox'

const frameworks = ['Next.js', 'Remix', 'Astro', 'Vite', 'Nuxt', 'SvelteKit', 'SolidStart', 'TanStack Start']

export default function ComboboxDemo() {
  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({ initialItems: frameworks, filter: contains })

  return (
    <Combobox
      collection={collection}
      onInputValueChange={(details) => filter(details.inputValue)}
      className="w-60"
    >
      <ComboboxInput placeholder="Select framework…" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        {collection.items.map((item) => (
          <ComboboxItem key={item} item={item}>
            {item}
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  )
}
```

## Source: components/ui/combobox.tsx

```tsx
import { Combobox as ArkCombobox, type CollectionItem } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { inputVariants } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function Combobox<T extends CollectionItem>(props: ArkCombobox.RootProps<T>) {
  return <ArkCombobox.Root data-slot="combobox" lazyMount unmountOnExit {...props} />
}

type ComboboxInputProps = ArkCombobox.InputProps & { showClear?: boolean }

function ComboboxInput({ className, showClear = false, ...props }: ComboboxInputProps) {
  return (
    <ArkCombobox.Control className="relative w-full">
      <ArkCombobox.Input
        data-slot="combobox-input"
        className={cn(inputVariants(), showClear ? 'pr-10' : 'pr-6', className)}
        {...props}
      />
      <div className="absolute inset-y-0 right-0.5 flex items-center">
        {showClear && (
          <ArkCombobox.ClearTrigger className="flex size-5 items-center justify-center rounded-xs text-muted-foreground hover:bg-accent">
            <XIcon className="size-3" />
          </ArkCombobox.ClearTrigger>
        )}
        <ArkCombobox.Trigger className="flex size-5 items-center justify-center rounded-xs text-muted-foreground hover:bg-accent">
          <ChevronsUpDownIcon className="size-3" />
        </ArkCombobox.Trigger>
      </div>
    </ArkCombobox.Control>
  )
}

function ComboboxContent({ className, ...props }: ArkCombobox.ContentProps) {
  return (
    <Portal>
      <ArkCombobox.Positioner>
        <ArkCombobox.Content
          data-slot="combobox-content"
          className={cn(
            'z-50 max-h-64 min-w-(--reference-width) origin-(--transform-origin) overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        />
      </ArkCombobox.Positioner>
    </Portal>
  )
}

function ComboboxItem({ className, children, ...props }: ArkCombobox.ItemProps) {
  return (
    <ArkCombobox.Item
      data-slot="combobox-item"
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-7 pl-2.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent',
        className,
      )}
      {...props}
    >
      <ArkCombobox.ItemText className="truncate">{children}</ArkCombobox.ItemText>
      <ArkCombobox.ItemIndicator className="absolute right-2.5">
        <CheckIcon className="size-3.5" />
      </ArkCombobox.ItemIndicator>
    </ArkCombobox.Item>
  )
}

function ComboboxGroup(props: ArkCombobox.ItemGroupProps) {
  return <ArkCombobox.ItemGroup data-slot="combobox-group" {...props} />
}

function ComboboxLabel({ className, ...props }: ArkCombobox.ItemGroupLabelProps) {
  return (
    <ArkCombobox.ItemGroupLabel
      data-slot="combobox-label"
      className={cn('flex items-center px-2.5 pt-2 pb-1 text-xs font-medium text-subtle-foreground', className)}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: ArkCombobox.EmptyProps) {
  return (
    <ArkCombobox.Empty
      data-slot="combobox-empty"
      className={cn('py-4 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export { Combobox, ComboboxInput, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxEmpty }
```
