# Switch

Small toggle switch

## Install

```bash
npx denseui@latest add switch
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Switch } from "@/components/ui/switch"
```

## Example

```tsx
import { Switch } from '@/components/ui/switch'

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-1.5">
      <Switch defaultChecked>Full width</Switch>
      <Switch>Small text</Switch>
      <Switch disabled>Lock page</Switch>
    </div>
  )
}
```

## Source: components/ui/switch.tsx

```tsx
import { Switch as ArkSwitch } from '@ark-ui/react/switch'
import { cn } from '@/lib/utils'

/** `id` targets the hidden input, so `<Label htmlFor={id}>` works. */
function Switch({ className, children, id, ids, ...props }: ArkSwitch.RootProps) {
  return (
    <ArkSwitch.Root
      data-slot="switch"
      id={id}
      ids={id ? { hiddenInput: id, ...ids } : ids}
      className={cn(
        'inline-flex cursor-default select-none items-center gap-1.5 text-sm data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <ArkSwitch.Control className="inline-flex h-3.5 w-6 shrink-0 items-center rounded-full bg-foreground/15 p-0.5 transition-colors duration-100 data-focus-visible:ring-2 data-focus-visible:ring-ring data-[state=checked]:bg-primary">
        <ArkSwitch.Thumb className="size-2.5 rounded-full bg-white shadow-xs transition-transform duration-100 data-[state=checked]:translate-x-2.5 data-[state=checked]:bg-primary-foreground" />
      </ArkSwitch.Control>
      {children != null && <ArkSwitch.Label>{children}</ArkSwitch.Label>}
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  )
}

export { Switch }
```
