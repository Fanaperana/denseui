import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { components, examples, guides, useRoute, type Route } from './docs'
import { CliPage } from './pages/cli'
import { ComponentPage } from './pages/component-page'
import { InstallationPage } from './pages/installation'
import { Introduction } from './pages/introduction'
import { NotionExample } from './pages/notion-example'
import { ThemingPage } from './pages/theming'
import { SearchButton } from './search'
import { useDarkMode } from './use-theme'

function NavLink({
  href,
  active,
  icon: Icon,
  children,
}: {
  href: string
  active: boolean
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-75 hover:bg-accent hover:text-foreground',
        active && 'bg-accent-active font-medium text-foreground',
      )}
    >
      <Icon
        className={cn(
          'size-3.5 shrink-0 text-subtle-foreground group-hover:text-muted-foreground',
          active && 'text-foreground group-hover:text-foreground',
        )}
      />
      <span className="truncate">{children}</span>
    </a>
  )
}

function NavHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex items-center px-2.5 pb-1 text-xs font-medium text-subtle-foreground first:mt-0">
      {children}
    </div>
  )
}

function Sidebar({ route }: { route: Route }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => components.filter((c) => c.title.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  )

  return (
    <aside className="sticky top-11 flex h-[calc(100svh-2.75rem)] w-56 shrink-0 flex-col max-md:hidden">
      <div className="px-3 pt-4 pb-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter components…"
          variant="ghost"
          className="bg-accent"
        />
      </div>
      <nav className="flex flex-1 flex-col gap-px overflow-y-auto px-3 pb-6">
        {!query && (
          <>
            <NavHeading>Getting started</NavHeading>
            {guides.map((g) => (
              <NavLink key={g.slug} href={g.href} icon={g.icon} active={route.page === 'guide' && route.slug === g.slug}>
                {g.title}
              </NavLink>
            ))}
            <NavHeading>Examples</NavHeading>
            {examples.map((e) => (
              <NavLink key={e.slug} href={e.href} icon={e.icon} active={route.page === 'example'}>
                {e.title}
              </NavLink>
            ))}
          </>
        )}
        <NavHeading>
          Components
          <Badge variant="outline" className="ml-auto h-4 px-1 text-[10px]">
            {filtered.length}
          </Badge>
        </NavHeading>
        {filtered.map((item) => (
          <NavLink
            key={item.name}
            href={`#/components/${item.name}`}
            icon={item.icon}
            active={route.page === 'component' && route.item === item}
          >
            {item.title}
          </NavLink>
        ))}
        {filtered.length === 0 && <div className="px-2 text-sm text-subtle-foreground">No results.</div>}
      </nav>
    </aside>
  )
}

function Header({ route }: { route: Route }) {
  const [dark, setDark] = useDarkMode()
  const section = route.page === 'component' ? 'components' : route.page === 'example' ? 'examples' : 'docs'

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-screen-2xl items-center gap-4 px-4">
        <a href="#/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="grid size-5 grid-cols-2 gap-px rounded-sm bg-primary p-1">
            <span className="rounded-[1px] bg-primary-foreground" />
            <span className="rounded-[1px] bg-primary-foreground/60" />
            <span className="rounded-[1px] bg-primary-foreground/60" />
            <span className="rounded-[1px] bg-primary-foreground" />
          </span>
          denseui
        </a>
        <nav className="flex items-center gap-0.5 max-sm:hidden">
          {[
            { id: 'docs', label: 'Docs', href: '#/' },
            { id: 'components', label: 'Components', href: `#/components/${components[0]?.name ?? ''}` },
            { id: 'examples', label: 'Examples', href: '#/examples/notion' },
          ].map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'flex items-center rounded-sm px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground',
                section === link.id && 'font-medium text-foreground',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <SearchButton />
          <Separator orientation="vertical" className="mx-1 h-4" />
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  const route = useRoute()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  return (
    <div className="min-h-svh">
      <Header route={route} />
      <div className="mx-auto flex max-w-screen-2xl">
        <Sidebar route={route} />
        <main className="min-w-0 flex-1">
          {route.page === 'example' ? (
            <div className="h-[calc(100svh-2.75rem)] border-l border-border">
              <NotionExample />
            </div>
          ) : route.page === 'component' ? (
            <ComponentPage key={route.item.name} item={route.item} />
          ) : (
            <div className="mx-auto max-w-3xl px-8 py-8">
              {route.slug === 'installation' ? (
                <InstallationPage />
              ) : route.slug === 'theming' ? (
                <ThemingPage />
              ) : route.slug === 'cli' ? (
                <CliPage />
              ) : (
                <Introduction />
              )}
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
