import { Suspense, useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, SparklesIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CodeBlock } from '../code-block'
import { components, loadComponentSource, type DocItem } from '../docs'
import { CliCommand, PackageInstall } from '../install-command'

const sections = [
  { id: 'preview', label: 'Preview' },
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'examples', label: 'Examples' },
  { id: 'api', label: 'API Reference' },
]

function DemoLoading() {
  return <Spinner data-docs-loading="" />
}

type ApiRow = { name: string; renders: string; href?: string }
type ApiVariant = { prop: string; values: string[]; defaultValue?: string }

/** Derives an API table from the component source: what each export renders and its cva variants. */
function parseApi(source: string): { rows: ApiRow[]; variants: ApiVariant[] } {
  const arkModules = new Map<string, string>()
  for (const m of source.matchAll(/import \{([^}]+)\} from '@ark-ui\/react\/([\w-]+)'/g)) {
    for (const part of m[1]!.split(',')) {
      const alias = part.trim().split(/\s+as\s+/).pop()!
      if (alias && !alias.startsWith('type ')) arkModules.set(alias, m[2]!)
    }
  }
  const rows: ApiRow[] = []
  for (const m of source.matchAll(/^function (\w+)(?:<[^>]*>)?\(([\s\S]*?)\)\s*(?::[^{]+)?\{/gm)) {
    const name = m[1]!
    const params = m[2]!
    if (!/^[A-Z]/.test(name)) continue
    const ark = /(Ark\w+|[A-Z]\w+)\.(\w+)Props/.exec(params)
    const html = /React\.ComponentProps<'(\w+)'>/.exec(params)
    const factory = /typeof ark\.(\w+)/.exec(params)
    const wraps = /React\.ComponentProps<typeof (\w+)>/.exec(params)
    if (ark && arkModules.has(ark[1]!)) {
      const module = arkModules.get(ark[1]!)!
      const docSlug = module === 'progress' ? 'progress-linear' : module
      rows.push({
        name,
        renders: `${ark[1]!.replace(/^Ark/, '')}.${ark[2]}`,
        href: `https://ark-ui.com/docs/components/${docSlug}#api-reference`,
      })
    } else if (html) rows.push({ name, renders: `<${html[1]}>` })
    else if (factory) rows.push({ name, renders: `<${factory[1]}> (asChild)` })
    else if (wraps) rows.push({ name, renders: wraps[1]! })
  }
  const variants: ApiVariant[] = []
  for (const block of source.matchAll(/variants:\s*\{([\s\S]*?)\n\s{4}\},?\n[\s\S]*?defaultVariants:\s*\{([^}]*)\}/g)) {
    const defaults = Object.fromEntries([...block[2]!.matchAll(/(\w+):\s*'([\w-]+)'/g)].map((d) => [d[1], d[2]]))
    for (const group of block[1]!.matchAll(/^\s{6}(\w+):\s*\{([\s\S]*?)^\s{6}\}/gm)) {
      const values = [...group[2]!.matchAll(/^\s{8}'?([\w-]+)'?:/gm)].map((v) => v[1]!)
      if (values.length) variants.push({ prop: group[1]!, values, defaultValue: defaults[group[1]!] })
    }
  }
  return { rows, variants }
}

function ApiReference({ name }: { name: string }) {
  const [api, setApi] = useState<ReturnType<typeof parseApi>>()

  useEffect(() => {
    let cancelled = false
    loadComponentSource(name)?.then((code) => !cancelled && setApi(parseApi(code)))
    return () => {
      cancelled = true
    }
  }, [name])

  if (!api || (api.rows.length === 0 && api.variants.length === 0)) return null

  return (
    <section id="api" className="flex scroll-mt-16 flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-tight">API Reference</h2>
      <p className="text-sm text-muted-foreground">
        Every part accepts <code className="font-mono">className</code> (merged last) and the props of what it renders.
        Parts built on Ark UI link to the full prop reference.
      </p>
      {api.rows.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="hover:bg-transparent">
                <TableHead>Part</TableHead>
                <TableHead>Renders / props from</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {api.rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-mono text-xs font-medium">{row.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {row.href ? (
                      <a href={row.href} target="_blank" rel="noreferrer" className="text-brand hover:underline">
                        Ark UI {row.renders}
                      </a>
                    ) : (
                      row.renders
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {api.variants.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="hover:bg-transparent">
                <TableHead>Variant prop</TableHead>
                <TableHead>Values</TableHead>
                <TableHead>Default</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {api.variants.map((v) => (
                <TableRow key={v.prop}>
                  <TableCell className="font-mono text-xs font-medium">{v.prop}</TableCell>
                  <TableCell className="whitespace-normal">
                    <div className="flex flex-wrap gap-1">
                      {v.values.map((value) => (
                        <Badge key={value} variant="outline" className="font-mono">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{v.defaultValue ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  )
}

function exportsOf(source: string | undefined, fallback: string) {
  const blocks = source ? [...source.matchAll(/export\s*\{([^}]+)\}/g)] : []
  if (blocks.length === 0) return [fallback]
  return blocks
    .flatMap((block) => block[1]!.split(','))
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('type '))
    .map((s) => s.split(/\s+as\s+/).pop()!)
    .filter((s) => !s.endsWith('Props'))
}

function CopyForAiButton({ item, usage }: { item: DocItem; usage: string[] }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    const source = (await loadComponentSource(item.name)) ?? ''
    const markdown = [
      `# ${item.title} (denseui)`,
      '',
      item.description,
      '',
      '## Install',
      '',
      '```bash',
      `npx denseui@latest add ${item.name}`,
      '```',
      '',
      '## Usage',
      '',
      '```tsx',
      `import { ${usage.join(', ')} } from "@/components/ui/${item.name}"`,
      '```',
      ...(item.demoSource ? ['', '## Example', '', '```tsx', item.demoSource.trim(), '```'] : []),
      '',
      `## Source: components/ui/${item.name}.tsx`,
      '',
      '```tsx',
      source.trim(),
      '```',
      '',
      'Design rules: https://github.com/Fanaperana/denseui/blob/main/packages/react/llm/guidelines.md',
    ].join('\n')
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={copy}>
          {copied ? <CheckIcon /> : <SparklesIcon />} {copied ? 'Copied' : 'Copy for AI'}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy docs, example and source as markdown</TooltipContent>
    </Tooltip>
  )
}

function ManualInstall({ item }: { item: DocItem }) {
  const [source, setSource] = useState<string>()

  useEffect(() => {
    let cancelled = false
    loadComponentSource(item.name)?.then((code) => !cancelled && setSource(code))
    return () => {
      cancelled = true
    }
  }, [item.name])

  return (
    <ol className="flex flex-col gap-4 border-l border-border pl-4 [counter-reset:step]">
      {item.dependencies.length > 0 && (
        <li className="flex flex-col gap-2">
          <p className="text-sm font-medium">Install the following dependencies:</p>
          <PackageInstall packages={item.dependencies} />
        </li>
      )}
      <li className="flex flex-col gap-2">
        <p className="text-sm font-medium">Copy and paste the following code into your project.</p>
        {source ? (
          <CodeBlock code={source} className="max-h-96 overflow-y-auto" />
        ) : (
          <div className="flex h-24 items-center justify-center rounded-md border border-border">
            <Spinner />
          </div>
        )}
      </li>
      <li className="text-sm font-medium">Update the import paths to match your project setup.</li>
    </ol>
  )
}

export function ComponentPage({ item }: { item: DocItem }) {
  const index = components.findIndex((c) => c.name === item.name)
  const prev = index > 0 ? components[index - 1] : undefined
  const next = index >= 0 ? components[index + 1] : undefined
  const { Demo, icon: Icon } = item
  const [usage, setUsage] = useState<string[]>([item.title.replace(/ /g, '')])

  useEffect(() => {
    loadComponentSource(item.name)?.then((code) => setUsage(exportsOf(code, item.title.replace(/ /g, ''))))
  }, [item])

  return (
    <div className="flex gap-10 px-8 py-8 max-md:px-4 max-md:py-6">
      <article className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-8">
        <header className="flex flex-col gap-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#/">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`#/components/${components[0]?.name}`}>Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
              <Icon className="size-4.5" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <h1 className="text-2xl font-semibold tracking-tight">{item.title}</h1>
              <p className="text-lg text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex gap-1">
              <CopyForAiButton item={item} usage={usage} />
              {prev && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild aria-label={`Previous: ${prev.title}`}>
                      <a href={`#/components/${prev.name}`}>
                        <ArrowLeftIcon />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{prev.title}</TooltipContent>
                </Tooltip>
              )}
              {next && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild aria-label={`Next: ${next.title}`}>
                      <a href={`#/components/${next.name}`}>
                        <ArrowRightIcon />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{next.title}</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
          {item.registryDependencies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              Uses
              {item.registryDependencies.map((dep) => (
                <a key={dep} href={`#/components/${dep}`}>
                  <Badge variant="outline" className="hover:bg-accent">
                    {dep}
                  </Badge>
                </a>
              ))}
            </div>
          )}
        </header>

        <section id="preview" className="scroll-mt-16">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code" disabled={!item.demoSource}>
                Code
              </TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="flex min-h-80 items-center justify-center rounded-lg border border-border bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-10">
                <Suspense fallback={<DemoLoading />}>
                  {Demo ? <Demo /> : <span className="text-sm text-muted-foreground">No demo yet.</span>}
                </Suspense>
              </div>
            </TabsContent>
            <TabsContent value="code">
              {item.demoSource && <CodeBlock code={item.demoSource} className="max-h-[480px] overflow-y-auto" />}
            </TabsContent>
          </Tabs>
        </section>

        <section id="installation" className="flex scroll-mt-16 flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
          <Tabs defaultValue="cli">
            <TabsList>
              <TabsTrigger value="cli">Command</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli">
              <CliCommand args={`add ${item.name}`} />
            </TabsContent>
            <TabsContent value="manual">
              <ManualInstall item={item} />
            </TabsContent>
          </Tabs>
        </section>

        <section id="usage" className="flex scroll-mt-16 flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
          <CodeBlock
            code={`import {\n${usage.map((name) => `  ${name},`).join('\n')}\n} from "@/components/ui/${item.name}"`}
          />
        </section>

        {item.examples.length > 0 && (
          <section id="examples" className="flex scroll-mt-16 flex-col gap-6">
            <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
            {item.examples.map((example) => (
              <div key={example.slug} className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{example.title}</h3>
                <Tabs defaultValue="preview">
                  <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview">
                    <div className="flex min-h-60 items-center justify-center rounded-lg border border-border bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-10">
                      <Suspense fallback={<DemoLoading />}>
                        <example.Demo />
                      </Suspense>
                    </div>
                  </TabsContent>
                  <TabsContent value="code">
                    <CodeBlock code={example.source} className="max-h-[480px] overflow-y-auto" />
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </section>
        )}

        <ApiReference name={item.name} />

        <nav className="flex items-center justify-between border-t border-border pt-4">
          {prev ? (
            <Button variant="ghost" asChild>
              <a href={`#/components/${prev.name}`}>
                <ArrowLeftIcon /> {prev.title}
              </a>
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button variant="ghost" asChild>
              <a href={`#/components/${next.name}`}>
                {next.title} <ArrowRightIcon />
              </a>
            </Button>
          )}
        </nav>
      </article>

      <aside className="sticky top-19 hidden h-fit w-40 shrink-0 flex-col gap-1 xl:flex">
        <div className="text-xs font-medium text-subtle-foreground">On this page</div>
        {sections
          .filter((s) => s.id !== 'examples' || item.examples.length > 0)
          .map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-left text-sm text-muted-foreground hover:text-foreground"
            >
              {s.label}
            </button>
          ))}
      </aside>
    </div>
  )
}
