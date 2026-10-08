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
