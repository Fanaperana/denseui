import { useState, type ReactNode } from 'react'
import {
  ArchiveIcon,
  CalendarIcon,
  ChevronDownIcon,
  CopyIcon,
  FileTextIcon,
  HashIcon,
  LinkIcon,
  ListIcon,
  MoonIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  SunIcon,
  TagIcon,
  Trash2Icon,
  UserIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  ContextMenuTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useDarkMode } from '../use-theme'

const colors = ['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const

const textColors: Record<(typeof colors)[number], string> = {
  default: 'text-tag-default',
  gray: 'text-tag-gray',
  brown: 'text-tag-brown',
  orange: 'text-tag-orange',
  yellow: 'text-tag-yellow',
  green: 'text-tag-green',
  blue: 'text-tag-blue',
  purple: 'text-tag-purple',
  pink: 'text-tag-pink',
  red: 'text-tag-red',
}

const pages = [
  { icon: '📘', name: 'Getting started' },
  { icon: '🎨', name: 'Design tokens' },
  { icon: '🧩', name: 'Components', active: true },
  { icon: '🛠️', name: 'CLI' },
  { icon: '🗺️', name: 'Roadmap' },
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xs font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  )
}

function Property({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-7 items-center">
      <div className="flex w-36 shrink-0 items-center gap-1.5 text-sm text-muted-foreground [&_svg]:size-3.5">
        {icon}
        {label}
      </div>
      <div className="flex min-h-7 flex-1 flex-wrap items-center gap-1 rounded-sm px-1.5 text-sm hover:bg-accent">
        {children}
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col gap-0.5 bg-muted p-1.5 max-md:hidden">
      <button className="flex h-7 items-center gap-2 rounded-sm px-2 text-sm font-medium hover:bg-accent">
        <Avatar>
          <AvatarFallback className="rounded-sm">D</AvatarFallback>
        </Avatar>
        DenseUI
        <ChevronDownIcon className="size-3 text-muted-foreground" />
      </button>
      {[
        { icon: <SearchIcon />, label: 'Search' },
        { icon: <SettingsIcon />, label: 'Settings' },
      ].map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent [&_svg]:size-3.5"
        >
          {item.icon}
          {item.label}
        </button>
      ))}
      <div className="mt-3 px-2.5 pb-1 text-xs font-medium text-muted-foreground">Workspace</div>
      {pages.map((page) => (
        <button
          key={page.name}
          data-active={page.active}
          className="group flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-accent data-active:bg-accent-active data-active:font-medium data-active:text-foreground"
        >
          <span className="w-4 text-center text-xs">{page.icon}</span>
          <span className="truncate">{page.name}</span>
          <PlusIcon className="ml-auto size-3.5 opacity-0 group-hover:opacity-100" />
        </button>
      ))}
    </aside>
  )
}

export function NotionExample() {
  const [dark, setDark] = useDarkMode()
  const [showDone, setShowDone] = useState(true)
  const [sort, setSort] = useState('manual')

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-11 shrink-0 items-center gap-1 px-3">
          <span className="text-sm text-muted-foreground">Workspace</span>
          <span className="text-sm text-subtle-foreground">/</span>
          <span className="text-sm">🧩 Components</span>
          <div className="ml-auto flex items-center gap-0.5">
            <span className="mr-2 text-xs text-subtle-foreground">Edited just now</span>
            <Button variant="ghost">Share</Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Favorite">
                  <StarIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add to Favorites</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setDark(!dark)}>
                  {dark ? <SunIcon /> : <MoonIcon />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Toggle theme <Kbd className="ml-1">⌘ ⇧ L</Kbd>
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="More">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem value="copy-link">
                  <LinkIcon /> Copy link <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem value="duplicate">
                  <CopyIcon /> Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem value="rename">
                  <PencilIcon /> Rename <DropdownMenuShortcut>⌘⇧R</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ArchiveIcon /> Move to
                  </DropdownMenuSubTrigger>
                  <DropdownMenuContent>
                    {pages.map((p) => (
                      <DropdownMenuItem key={p.name} value={`move-${p.name}`}>
                        <span className="w-3.5 text-center text-xs">{p.icon}</span> {p.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem value="delete" variant="destructive">
                  <Trash2Icon /> Move to Trash
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-12 pt-16 pb-32">
            <div>
              <div className="mb-2 text-5xl leading-none">🧩</div>
              <h1 className="text-3xl font-bold tracking-tight">Components</h1>
            </div>

            <div className="flex flex-col">
              <Property icon={<UserIcon />} label="Owner">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                Jane Doe
              </Property>
              <Property icon={<ListIcon />} label="Status">
                <Badge color="green">● Done</Badge>
              </Property>
              <Property icon={<TagIcon />} label="Tags">
                {colors.map((c) => (
                  <Badge key={c} color={c}>
                    {c}
                  </Badge>
                ))}
              </Property>
              <Property icon={<CalendarIcon />} label="Updated">
                October 7, 2026
              </Property>
              <Property icon={<HashIcon />} label="Density">
                <span className="text-muted-foreground">13px body · 24px controls · 4px radius</span>
              </Property>
            </div>

            <Separator />

            <Tabs defaultValue="components">
              <TabsList>
                <TabsTrigger value="components">
                  <FileTextIcon /> Components
                </TabsTrigger>
                <TabsTrigger value="palette">Palette</TabsTrigger>
                <TabsTrigger value="loading">Loading</TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="flex flex-col gap-6 pt-4">
                <Section title="Button">
                  <Button>
                    <PlusIcon /> New
                  </Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="subtle">Subtle</Button>
                  <Button variant="destructive">Delete</Button>
                  <Button variant="destructive-outline">Remove</Button>
                  <Button variant="link">Link</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg" variant="outline">
                    Large
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Add">
                    <PlusIcon />
                  </Button>
                  <Button disabled>Disabled</Button>
                </Section>

                <Section title="Input">
                  <div className="grid w-full grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Untitled" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" aria-invalid placeholder="name@example.com" />
                    </div>
                    <Input size="sm" placeholder="Small input" />
                    <Input variant="ghost" placeholder="Ghost input — hover me" />
                    <Textarea className="col-span-2" placeholder="Write something, or press '/' for commands…" />
                  </div>
                </Section>

                <Section title="Selection controls">
                  <div className="flex flex-wrap items-start gap-8">
                    <div className="flex flex-col gap-1.5">
                      <Checkbox defaultChecked>Show completed</Checkbox>
                      <Checkbox checked="indeterminate">Indeterminate</Checkbox>
                      <Checkbox disabled>Disabled</Checkbox>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Switch defaultChecked>Full width</Switch>
                      <Switch>Small text</Switch>
                      <Switch disabled>Lock page</Switch>
                    </div>
                    <RadioGroup defaultValue="board">
                      <RadioGroupItem value="table">Table</RadioGroupItem>
                      <RadioGroupItem value="board">Board</RadioGroupItem>
                      <RadioGroupItem value="list">List</RadioGroupItem>
                    </RadioGroup>
                  </div>
                </Section>

                <Section title="Overlays">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        View options <ChevronDownIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Show</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem
                          value="done"
                          checked={showDone}
                          onCheckedChange={setShowDone}
                        >
                          Completed tasks
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={sort} onValueChange={(e) => setSort(e.value)}>
                          <DropdownMenuRadioItem value="manual">Manual</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="created">Created time</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="edited">Last edited</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <LinkIcon /> Add link
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2">
                      <Input placeholder="Paste link or search pages" autoFocus />
                      <div className="flex justify-end">
                        <Button size="sm">Link</Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive-outline">Delete page…</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xs">
                      <DialogHeader>
                        <DialogTitle>Delete this page?</DialogTitle>
                        <DialogDescription>You can restore it from Trash for 30 days.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="destructive">Delete</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <ContextMenuTrigger className="flex h-6 items-center rounded-sm border border-dashed border-input px-3 text-sm text-muted-foreground">
                      Right-click me
                    </ContextMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem value="copy">
                        <CopyIcon /> Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem value="delete" variant="destructive">
                        <Trash2Icon /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Section>

                <Section title="Kbd">
                  <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </KbdGroup>
                  <span className="text-sm text-muted-foreground">
                    Press <Kbd>/</Kbd> for commands
                  </span>
                </Section>
              </TabsContent>

              <TabsContent value="palette" className="flex flex-col gap-4 pt-4">
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((c) => (
                    <div key={c} className="flex flex-col gap-1">
                      <Badge color={c}>{c}</Badge>
                      <span className={`text-sm ${textColors[c]}`}>{c} text</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="loading" className="flex flex-col gap-2 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Spinner /> Loading…
                </div>
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
