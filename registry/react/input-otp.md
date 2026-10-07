# Input OTP

One-time password input

## Install

```bash
npx denseui@latest add input-otp
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
```

## Example

```tsx
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

export default function InputOTPDemo() {
  return (
    <InputOTP>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## Source: components/ui/input-otp.tsx

```tsx
import * as React from 'react'
import { PinInput } from '@ark-ui/react/pin-input'
import { MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function InputOTP({ className, children, ...props }: PinInput.RootProps) {
  return (
    <PinInput.Root data-slot="input-otp" otp {...props}>
      <PinInput.Control className={cn('flex items-center gap-2 has-data-disabled:opacity-50', className)}>
        {children}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props} />
}

function InputOTPSlot({ className, ...props }: PinInput.InputProps) {
  return (
    <PinInput.Input
      data-slot="input-otp-slot"
      className={cn(
        'relative -ml-px size-7 border border-input bg-input-background text-center text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-75 first:ml-0 first:rounded-l-sm last:rounded-r-sm placeholder:text-subtle-foreground focus:z-10 focus:border-brand/60 focus:ring-2 focus:ring-ring aria-invalid:border-destructive/60 data-invalid:border-destructive/60',
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSeparator(props: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" role="separator" className="text-subtle-foreground" {...props}>
      <MinusIcon className="size-3" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
```
