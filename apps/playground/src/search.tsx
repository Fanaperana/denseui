import { useEffect, useMemo, useState } from 'react'
import { createListCollection } from '@ark-ui/react/listbox'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import {
  CommandDialog,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { components, examples, guides } from './docs'

const entries = [
  ...guides.map((g) => ({ value: g.href, label: g.title, icon: g.icon, group: 'Getting started' })),
  ...examples.map((e) => ({ value: e.href, label: e.title, icon: e.icon, group: 'Examples' })),
  ...components.map((c) => ({ value: `#/components/${c.name}`, label: c.title, icon: c.icon, group: 'Components' })),
]

export function SearchButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !isTyping(event))) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const collection = useMemo(() => {
    const q = query.trim().toLowerCase()
    return createListCollection({
      items: entries.filter((e) => e.label.toLowerCase().includes(q)),
      groupBy: (e) => e.group,
      groupSort: ['Getting started', 'Examples', 'Components'],
    })
  }, [query])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-6 w-60 items-center gap-2 rounded-sm border border-input bg-muted px-2 text-left text-sm whitespace-nowrap text-subtle-foreground outline-none transition-colors hover:bg-surface-hover hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring max-sm:w-auto"
      >
        <SearchIcon className="size-3.5 shrink-0" />
        <span className="min-w-0 flex-1 truncate max-sm:hidden">Search documentation…</span>
        <KbdGroup className="shrink-0 max-sm:hidden">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={(e) => {
          setOpen(e.open)
          if (!e.open) setQuery('')
        }}
      >
        <Command
          collection={collection}
          onSelect={(details) => {
            location.hash = details.value.replace(/^#/, '')
            setOpen(false)
            setQuery('')
          }}
        >
          <CommandInput placeholder="Search components and docs…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <CommandList className="max-h-96">
            <CommandEmpty>No results found.</CommandEmpty>
            {collection.group().map(([group, items]) => (
              <CommandGroup key={group}>
                <CommandGroupLabel>{group}</CommandGroupLabel>
                {items.map((item) => (
                  <CommandItem key={item.value} item={item} className="group/item">
                    <item.icon />
                    {item.label}
                    <ArrowRightIcon className="ml-auto opacity-0 group-data-highlighted/item:opacity-100" />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

function isTyping(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  return !!target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
}
