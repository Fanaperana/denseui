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
