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
