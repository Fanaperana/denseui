import { ArrowRightIcon, LayersIcon, PaletteIcon, RulerIcon, TerminalIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { components } from '../docs'

const features = [
  { icon: RulerIcon, title: 'Ultra dense', description: '24px controls, 13px body text and 4px radius by default.' },
  { icon: PaletteIcon, title: 'Tailwind CSS v4', description: 'CSS-first tokens with light and dark themes.' },
  { icon: LayersIcon, title: 'Ark UI', description: 'Accessible state machines that also run in Vue, Svelte and Solid.' },
  { icon: TerminalIcon, title: 'Own your code', description: 'A CLI copies the source into your project.' },
]

export function Introduction() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col items-start gap-3">
        <Badge variant="outline">{components.length} components</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Dense, modern components for serious apps.</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          A compact component library for Tailwind CSS v4, inspired by productivity tools. Copy it into your project and
          make it yours.
        </p>
        <div className="flex gap-1.5">
          <Button size="lg" asChild>
            <a href="#/docs/installation">
              Get started <ArrowRightIcon />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={`#/components/${components[0]?.name}`}>Browse components</a>
          </Button>
        </div>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        {features.map((f) => (
          <Card key={f.title} className="gap-1.5">
            <CardHeader>
              <f.icon className="mb-1 size-4 text-muted-foreground" />
              <CardTitle className="text-base">{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Components</h2>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {components.map((item) => (
            <a
              key={item.name}
              href={`#/components/${item.name}`}
              className="group flex items-center gap-2 rounded-md border border-border px-2.5 py-2 transition-colors hover:bg-accent"
            >
              <item.icon className="size-3.5 text-subtle-foreground group-hover:text-foreground" />
              <span className="text-sm font-medium">{item.title}</span>
            </a>
          ))}
        </div>
      </section>
    </article>
  )
}
