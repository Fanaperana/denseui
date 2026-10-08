# Password Input

Password field with show/hide toggle

## Install

```bash
npx denseui@latest add password-input
```

npm dependencies: `@ark-ui/react`, `lucide-react`

Also installs: `input`

## Usage

```tsx
import { PasswordInput } from "@/components/ui/password-input"
```

## Example

```tsx
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'

export default function PasswordInputDemo() {
  return (
    <div className="grid w-64 gap-1">
      <Label htmlFor="password">Password</Label>
      <PasswordInput id="password" placeholder="At least 12 characters" defaultValue="correct-horse-battery" />
    </div>
  )
}
```

## Source: components/ui/password-input.tsx

```tsx
import { PasswordInput as ArkPasswordInput } from '@ark-ui/react/password-input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { inputVariants } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type PasswordInputProps = ArkPasswordInput.RootProps & { placeholder?: string; inputClassName?: string }

/** `id` targets the input, so `<Label htmlFor={id}>` works. */
function PasswordInput({ className, placeholder, inputClassName, id, ids, ...props }: PasswordInputProps) {
  return (
    <ArkPasswordInput.Root
      data-slot="password-input"
      id={id}
      ids={id ? { input: id, ...ids } : ids}
      className={cn('w-full', className)}
      {...props}
    >
      <ArkPasswordInput.Control className="relative w-full">
        <ArkPasswordInput.Input placeholder={placeholder} className={cn(inputVariants(), 'pr-7', inputClassName)} />
        <ArkPasswordInput.VisibilityTrigger className="absolute inset-y-0 right-0.5 my-auto flex size-5 items-center justify-center rounded-xs text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
          <ArkPasswordInput.Indicator fallback={<EyeOffIcon className="size-3.5" />}>
            <EyeIcon className="size-3.5" />
          </ArkPasswordInput.Indicator>
        </ArkPasswordInput.VisibilityTrigger>
      </ArkPasswordInput.Control>
    </ArkPasswordInput.Root>
  )
}

export { PasswordInput, type PasswordInputProps }
```
