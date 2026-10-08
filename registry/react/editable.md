# Editable

Click-to-edit inline text, like a page title

## Install

```bash
npx denseui@latest add editable
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Editable } from "@/components/ui/editable"
```

## Example

```tsx
import { Editable } from '@/components/ui/editable'

export default function EditableDemo() {
  return (
    <div className="flex w-96 flex-col gap-2">
      <Editable defaultValue="Q4 Planning" placeholder="Untitled" textClassName="text-3xl font-bold tracking-tight" />
      <Editable placeholder="Add a description…" textClassName="text-base text-muted-foreground" />
    </div>
  )
}
```

## Source: components/ui/editable.tsx

```tsx
import { Editable as ArkEditable } from '@ark-ui/react/editable'
import { cn } from '@/lib/utils'

type EditableProps = ArkEditable.RootProps & {
  /** Applied to both the preview and the input so editing doesn't shift layout. */
  textClassName?: string
}

function Editable({ className, textClassName, activationMode = 'click', ...props }: EditableProps) {
  return (
    <ArkEditable.Root
      data-slot="editable"
      activationMode={activationMode}
      className={cn('w-full', className)}
      {...props}
    >
      <ArkEditable.Area className="relative">
        <ArkEditable.Input
          className={cn(
            'w-full min-w-0 rounded-sm bg-transparent px-1.5 py-0.5 text-foreground outline-none ring-2 ring-ring',
            textClassName,
          )}
        />
        <ArkEditable.Preview
          className={cn(
            'block min-h-[1lh] cursor-text truncate rounded-sm px-1.5 py-0.5 transition-colors duration-75 hover:bg-accent data-placeholder-shown:text-subtle-foreground',
            textClassName,
          )}
        />
      </ArkEditable.Area>
    </ArkEditable.Root>
  )
}

export { Editable, type EditableProps }
```
