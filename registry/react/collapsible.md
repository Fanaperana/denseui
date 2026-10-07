# Collapsible

Expands and collapses a panel

## Install

```bash
npx denseui@latest add collapsible
```

npm dependencies: `@ark-ui/react`

## Usage

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
```

## Example

```tsx
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export default function CollapsibleDemo() {
  return (
    <Collapsible className="flex w-72 flex-col gap-1">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-medium">@denseui starred 3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-sm border border-border px-2 py-1 font-mono text-xs">@ark-ui/react</div>
      <CollapsibleContent className="flex flex-col gap-1">
        <div className="rounded-sm border border-border px-2 py-1 font-mono text-xs">tailwindcss</div>
        <div className="rounded-sm border border-border px-2 py-1 font-mono text-xs">lucide-react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

## Source: components/ui/collapsible.tsx

```tsx
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
```
