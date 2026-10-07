# Accordion

Vertically stacked headings that reveal sections of content

## Install

```bash
npx denseui@latest add accordion
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
```

## Example

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  { q: 'Is it accessible?', a: 'Yes. Behavior comes from Ark UI state machines that follow WAI-ARIA patterns.' },
  { q: 'Can I customize it?', a: 'The source is copied into your project. Edit anything.' },
  { q: 'Does it work with Vue or Svelte?', a: 'Tokens are shared today. Vue and Svelte components are on the roadmap.' },
]

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={['item-0']} collapsible className="w-80">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.q} value={`item-${i}`}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
```

## Source: components/ui/accordion.tsx

```tsx
import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Accordion({ className, ...props }: ArkAccordion.RootProps) {
  return <ArkAccordion.Root data-slot="accordion" className={cn('flex w-full flex-col', className)} {...props} />
}

function AccordionItem({ className, ...props }: ArkAccordion.ItemProps) {
  return (
    <ArkAccordion.Item
      data-slot="accordion-item"
      className={cn('border-b border-border last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: ArkAccordion.ItemTriggerProps) {
  return (
    <ArkAccordion.ItemTrigger
      data-slot="accordion-trigger"
      className={cn(
        'flex w-full items-center justify-between gap-2 rounded-sm px-2.5 py-2 text-left text-sm font-medium outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
      <ArkAccordion.ItemIndicator className="text-muted-foreground transition-transform duration-150 data-[state=open]:rotate-180">
        <ChevronDownIcon className="size-3.5" />
      </ArkAccordion.ItemIndicator>
    </ArkAccordion.ItemTrigger>
  )
}

function AccordionContent({ className, children, ...props }: ArkAccordion.ItemContentProps) {
  return (
    <ArkAccordion.ItemContent
      data-slot="accordion-content"
      className="overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      {...props}
    >
      <div className={cn('px-2.5 pb-2.5', className)}>{children}</div>
    </ArkAccordion.ItemContent>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```
