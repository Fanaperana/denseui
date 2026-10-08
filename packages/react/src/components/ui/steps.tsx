import * as React from 'react'
import { Steps as ArkSteps, useStepsContext } from '@ark-ui/react/steps'
import { CheckIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Steps({ className, ...props }: ArkSteps.RootProps) {
  return <ArkSteps.Root data-slot="steps" className={cn('flex w-full flex-col gap-4', className)} {...props} />
}

function StepsList({ className, ...props }: ArkSteps.ListProps) {
  return <ArkSteps.List data-slot="steps-list" className={cn('flex w-full items-center gap-2', className)} {...props} />
}

type StepsItemProps = ArkSteps.ItemProps & { title: React.ReactNode; description?: React.ReactNode }

// The tab already conveys the current step via aria-selected; Ark's aria-current on the item would
// make it non-presentational and break the tablist's required-children contract.
function StepsItemShell({ 'aria-current': _current, ...props }: React.ComponentProps<'div'>) {
  return <div role="presentation" {...props} />
}

function StepsItem({ className, index, title, description, children, ...props }: StepsItemProps) {
  const state = useStepsContext().getItemState({ index })
  return (
    <ArkSteps.Item
      data-slot="steps-item"
      data-complete={state.completed ? '' : undefined}
      data-current={state.current ? '' : undefined}
      index={index}
      className={cn('group/step flex flex-1 items-center gap-2 last:flex-none', className)}
      asChild
      {...props}
    >
      <StepsItemShell>
        <ArkSteps.Trigger className="flex shrink-0 items-center gap-2 rounded-sm px-1.5 py-1 text-left outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
          <ArkSteps.Indicator className="flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background text-xs font-medium text-muted-foreground tabular-nums data-complete:border-primary data-complete:bg-primary data-complete:text-primary-foreground data-current:border-primary data-current:text-foreground">
            <span className="group-data-complete/step:hidden">{index + 1}</span>
            <CheckIcon className="hidden size-3 group-data-complete/step:block" strokeWidth={3} />
          </ArkSteps.Indicator>
          <span className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground group-data-complete/step:text-foreground group-data-current/step:text-foreground">
              {title}
            </span>
            {description && <span className="text-xs text-subtle-foreground">{description}</span>}
          </span>
        </ArkSteps.Trigger>
        {children}
        <div aria-hidden className="h-px flex-1 bg-border group-last/step:hidden group-data-complete/step:bg-primary" />
      </StepsItemShell>
    </ArkSteps.Item>
  )
}

function StepsContent({ className, ...props }: ArkSteps.ContentProps) {
  return <ArkSteps.Content data-slot="steps-content" className={cn('text-sm', className)} {...props} />
}

function StepsCompletedContent({ className, ...props }: ArkSteps.CompletedContentProps) {
  return <ArkSteps.CompletedContent data-slot="steps-completed" className={cn('text-sm', className)} {...props} />
}

function StepsPrevTrigger({ className, ...props }: ArkSteps.PrevTriggerProps) {
  return (
    <ArkSteps.PrevTrigger
      data-slot="steps-prev"
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

function StepsNextTrigger({ className, ...props }: ArkSteps.NextTriggerProps) {
  return <ArkSteps.NextTrigger data-slot="steps-next" className={cn(buttonVariants(), className)} {...props} />
}

export { Steps, StepsList, StepsItem, StepsContent, StepsCompletedContent, StepsPrevTrigger, StepsNextTrigger }
