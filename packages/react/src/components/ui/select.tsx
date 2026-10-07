import * as React from 'react'
import { Select as ArkSelect, type CollectionItem } from '@ark-ui/react/select'
import { Portal } from '@ark-ui/react/portal'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

function Select<T extends CollectionItem>({ children, ...props }: ArkSelect.RootProps<T>) {
  return (
    <ArkSelect.Root data-slot="select" lazyMount unmountOnExit {...props}>
      {children}
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  )
}

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between gap-1.5 rounded-sm border border-input bg-input-background text-left text-foreground outline-none transition-[border-color,box-shadow] duration-75 select-none focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-placeholder-shown:text-subtle-foreground aria-invalid:border-destructive/60 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      size: {
        sm: 'h-5 px-1.5 text-xs',
        default: 'h-6 px-2 text-sm',
        lg: 'h-7 px-2.5 text-base',
      },
    },
    defaultVariants: { size: 'default' },
  },
)

function SelectTrigger({
  className,
  children,
  size,
  ...props
}: ArkSelect.TriggerProps & VariantProps<typeof selectTriggerVariants>) {
  return (
    <ArkSelect.Control className="w-full">
      <ArkSelect.Trigger
        data-slot="select-trigger"
        className={cn(selectTriggerVariants({ size }), className)}
        {...props}
      >
        {children}
        <ArkSelect.Indicator className="text-muted-foreground">
          <ChevronDownIcon />
        </ArkSelect.Indicator>
      </ArkSelect.Trigger>
    </ArkSelect.Control>
  )
}

function SelectValue({ className, ...props }: ArkSelect.ValueTextProps) {
  return <ArkSelect.ValueText data-slot="select-value" className={cn('truncate', className)} {...props} />
}

function SelectContent({ className, ...props }: ArkSelect.ContentProps) {
  return (
    <Portal>
      <ArkSelect.Positioner>
        <ArkSelect.Content
          data-slot="select-content"
          className={cn(
            'z-50 max-h-72 min-w-(--reference-width) origin-(--transform-origin) overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-popover outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
            className,
          )}
          {...props}
        />
      </ArkSelect.Positioner>
    </Portal>
  )
}

function SelectItem({ className, children, ...props }: ArkSelect.ItemProps) {
  return (
    <ArkSelect.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-7 pl-2.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <ArkSelect.ItemText className="flex items-center gap-2 truncate">{children}</ArkSelect.ItemText>
      <ArkSelect.ItemIndicator className="absolute right-2.5">
        <CheckIcon />
      </ArkSelect.ItemIndicator>
    </ArkSelect.Item>
  )
}

function SelectGroup(props: ArkSelect.ItemGroupProps) {
  return <ArkSelect.ItemGroup data-slot="select-group" {...props} />
}

function SelectLabel({ className, ...props }: ArkSelect.ItemGroupLabelProps) {
  return (
    <ArkSelect.ItemGroupLabel
      data-slot="select-label"
      className={cn('flex items-center px-2.5 pt-2 pb-1 text-xs font-medium text-subtle-foreground', className)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="select-separator" className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator }
