import { useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CodeBlock } from '../code-block'
import { components, loadComponentSource, type DocItem } from '../docs'
import { CliCommand, PackageInstall } from '../install-command'

const sections = [
  { id: 'preview', label: 'Preview' },
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
]

function exportsOf(source: string | undefined, fallback: string) {
  const match = source && /export\s*\{([^}]+)\}/.exec(source)
  if (!match) return [fallback]
  return match[1]!
    .split(',')
    .map((s) => s.trim().split(/\s+as\s+/).pop()!.replace(/^type\s+/, ''))
    .filter((s) => /^[A-Z]/.test(s) && !s.endsWith('Props'))
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
  const index = components.indexOf(item)
  const prev = components[index - 1]
  const next = components[index + 1]
  const { Demo, icon: Icon } = item
  const [usage, setUsage] = useState<string[]>([item.title.replace(/ /g, '')])

  useEffect(() => {
    loadComponentSource(item.name)?.then((code) => setUsage(exportsOf(code, item.title.replace(/ /g, ''))))
  }, [item])

  return (
    <div className="flex gap-10 px-8 py-8">
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
                {Demo ? <Demo /> : <span className="text-sm text-muted-foreground">No demo yet.</span>}
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
        {sections.map((s) => (
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
