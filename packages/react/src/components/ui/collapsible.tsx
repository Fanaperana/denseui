import { Collapsible as ArkCollapsible } from '@ark-ui/react/collapsible'
import { cn } from '@/lib/utils'

function Collapsible(props: ArkCollapsible.RootProps) {
  return <ArkCollapsible.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger(props: ArkCollapsible.TriggerProps) {
  return <ArkCollapsible.Trigger data-slot="collapsible-trigger" {...props} />
}

function CollapsibleContent({ className, ...props }: ArkCollapsible.ContentProps) {
  return (
    <ArkCollapsible.Content
      data-slot="collapsible-content"
      className={cn(
        'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        className,
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
