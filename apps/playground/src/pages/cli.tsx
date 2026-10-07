import { CodeBlock } from '../code-block'
import { CliCommand } from '../install-command'

const commands = [
  { args: 'init', description: 'Set up tokens, components.json and the cn() helper.' },
  { args: 'add button dialog', description: 'Copy components and their dependencies into your project.' },
  { args: 'add --all', description: 'Add every component.' },
  { args: 'list', description: 'Show available components. Installed ones are highlighted.' },
  { args: 'diff button', description: 'Compare your local copy with the latest registry version.' },
]

export function CliPage() {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">CLI</h1>
        <p className="text-lg text-muted-foreground">Add and update components from the command line.</p>
      </header>
      {commands.map((c) => (
        <section key={c.args} className="flex flex-col gap-2">
          <h2 className="font-mono text-base font-semibold">{c.args}</h2>
          <p className="text-muted-foreground">{c.description}</p>
          <CliCommand args={c.args} />
        </section>
      ))}
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">components.json</h2>
        <CodeBlock
          code={JSON.stringify(
            {
              framework: 'react',
              tailwind: { css: 'src/index.css' },
              aliases: { components: '@/components', ui: '@/components/ui', lib: '@/lib', utils: '@/lib/utils' },
              paths: { ui: 'src/components/ui', lib: 'src/lib' },
            },
            null,
            2,
          )}
        />
      </section>
    </article>
  )
}
