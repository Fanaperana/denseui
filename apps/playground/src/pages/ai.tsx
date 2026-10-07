import { BookTextIcon, FileTextIcon, WrenchIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '../code-block'
import { CliCommand } from '../install-command'

const tools = [
  { name: 'list_components', description: 'Search components by name, description, category or exported symbol.' },
  { name: 'get_component', description: 'Install command, dependencies, exported API, a full example and optional source.' },
  { name: 'get_add_command', description: 'The exact command to run, plus every component and npm package it installs.' },
  { name: 'get_design_guidelines', description: 'Density, spacing, color tokens and which component to use for which job.' },
  { name: 'get_theme', description: 'Every CSS variable and Tailwind theme value.' },
  { name: 'get_project_setup', description: "Whether the project is initialized, its paths, and installed components." },
]

const clients = [
  {
    id: 'vscode',
    label: 'VS Code',
    file: '.vscode/mcp.json',
    config: { servers: { denseui: { type: 'stdio', command: 'npx', args: ['-y', 'denseui@latest', 'mcp'] } } },
  },
  {
    id: 'cursor',
    label: 'Cursor',
    file: '.cursor/mcp.json',
    config: { mcpServers: { denseui: { command: 'npx', args: ['-y', 'denseui@latest', 'mcp'] } } },
  },
  {
    id: 'claude',
    label: 'Claude Code',
    file: '.mcp.json',
    config: { mcpServers: { denseui: { command: 'npx', args: ['-y', 'denseui@latest', 'mcp'] } } },
  },
]

const prompts = [
  'Build a settings page with a sidebar, using denseui.',
  'Show my orders in a denseui data table with status filters and pagination.',
  'Which denseui component should I use to pick one of 30 countries?',
  'Add a ⌘K command palette to the app header.',
]

export function AiPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">AI & MCP</h1>
        <p className="text-lg text-muted-foreground">
          denseui is built to be used by AI assistants: a built-in MCP server, llms.txt, and machine-readable docs for
          every component.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">MCP server</h2>
        <p className="text-muted-foreground">
          The CLI includes a Model Context Protocol server. It gives your assistant live access to the registry, so it
          can find the right component, read its API and example, and install it with the right command.
        </p>
        <CliCommand args="mcp init --client vscode" />
        <Tabs defaultValue="vscode">
          <TabsList>
            {clients.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {clients.map((c) => (
            <TabsContent key={c.id} value={c.id} className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Or add it manually to <code className="font-mono">{c.file}</code>:
              </p>
              <CodeBlock code={JSON.stringify(c.config, null, 2)} />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <WrenchIcon className="size-4 text-muted-foreground" /> Tools
        </h2>
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
          {tools.map((t) => (
            <div key={t.name} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
              <code className="w-44 shrink-0 font-mono text-sm font-medium">{t.name}</code>
              <span className="text-sm text-muted-foreground">{t.description}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Resources: <code className="font-mono">denseui://guidelines</code>,{' '}
          <code className="font-mono">denseui://theme</code>, <code className="font-mono">denseui://llms.txt</code>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Try asking</h2>
        <div className="flex flex-col gap-1.5">
          {prompts.map((p) => (
            <div key={p} className="rounded-md border border-border bg-muted px-3 py-2 text-sm">
              {p}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">llms.txt</h2>
        <p className="text-muted-foreground">
          For assistants without MCP, point them at the plain-text docs. Every component page also has a{' '}
          <Badge variant="outline">Copy for AI</Badge> button.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { href: '/llms.txt', icon: FileTextIcon, title: '/llms.txt', description: 'Index of docs and components' },
            {
              href: '/llms-full.txt',
              icon: BookTextIcon,
              title: '/llms-full.txt',
              description: 'Guidelines plus every component with example and source',
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-surface-hover"
            >
              <link.icon className="mt-0.5 size-4 text-muted-foreground" />
              <span className="flex flex-col gap-0.5">
                <span className="font-mono text-sm font-medium">{link.title}</span>
                <span className="text-sm text-muted-foreground">{link.description}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </article>
  )
}
