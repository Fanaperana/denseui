import { useState } from 'react'
import { createListCollection } from '@ark-ui/react/listbox'
import { CalendarIcon, CreditCardIcon, SettingsIcon, SmileIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'

const items = [
  { value: 'calendar', label: 'Calendar', icon: CalendarIcon, group: 'Suggestions' },
  { value: 'emoji', label: 'Search emoji', icon: SmileIcon, group: 'Suggestions' },
  { value: 'profile', label: 'Profile', icon: UserIcon, group: 'Settings', shortcut: '⌘P' },
  { value: 'billing', label: 'Billing', icon: CreditCardIcon, group: 'Settings', shortcut: '⌘B' },
  { value: 'settings', label: 'Settings', icon: SettingsIcon, group: 'Settings', shortcut: '⌘S' },
]

function CommandMenu({ onSelect }: { onSelect?: () => void }) {
  const [query, setQuery] = useState('')
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
  const collection = createListCollection({ items: filtered, groupBy: (item) => item.group })

  return (
    <Command collection={collection} onSelect={onSelect}>
      <CommandInput placeholder="Type a command or search…" value={query} onChange={(e) => setQuery(e.target.value)} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {collection.group().map(([group, groupItems]) => (
          <CommandGroup key={group}>
            <CommandGroupLabel>{group}</CommandGroupLabel>
            {groupItems.map((item) => (
              <CommandItem key={item.value} item={item}>
                <item.icon /> {item.label}
                {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  )
}

export default function CommandDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-80 rounded-lg border border-border">
        <CommandMenu />
      </div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open dialog <Kbd>⌘J</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={(e) => setOpen(e.open)}>
        <CommandMenu onSelect={() => setOpen(false)} />
      </CommandDialog>
    </div>
  )
}
