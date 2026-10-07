import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Checkbox({ className, children, ...props }: ArkCheckbox.RootProps) {
  return (
    <ArkCheckbox.Root
      data-slot="checkbox"
      className={cn(
        'group inline-flex cursor-default select-none items-center gap-1.5 text-sm data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <ArkCheckbox.Control className="flex size-3.5 shrink-0 items-center justify-center rounded-sm border-[1.5px] border-foreground/40 text-primary-foreground transition-colors duration-75 group-hover:bg-accent data-focus-visible:ring-2 data-focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary">
        <ArkCheckbox.Indicator>
          <CheckIcon className="size-2.5" strokeWidth={3.5} />
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator indeterminate>
          <MinusIcon className="size-2.5" strokeWidth={3.5} />
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {children != null && <ArkCheckbox.Label>{children}</ArkCheckbox.Label>}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
}

export { Checkbox }
