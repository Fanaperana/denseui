import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'
import {
  AlignLeftIcon,
  AppWindowIcon,
  AsteriskIcon,
  BellIcon,
  BoldIcon,
  BookOpenIcon,
  BotIcon,
  BoxIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ChevronsDownUpIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  CircleDotIcon,
  CircleUserIcon,
  ClipboardListIcon,
  Columns3Icon,
  CommandIcon,
  CompassIcon,
  ComponentIcon,
  ContactIcon,
  DownloadIcon,
  EllipsisIcon,
  FoldVerticalIcon,
  GalleryHorizontalIcon,
  GaugeIcon,
  GripVerticalIcon,
  GroupIcon,
  InboxIcon,
  KeyboardIcon,
  LayoutTemplateIcon,
  ListIcon,
  LoaderCircleIcon,
  MenuIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  MessageSquareWarningIcon,
  MousePointer2Icon,
  MousePointerClickIcon,
  PaletteIcon,
  PanelBottomIcon,
  PanelLeftIcon,
  PanelRightIcon,
  PanelsTopLeftIcon,
  PanelTopIcon,
  RatioIcon,
  Rows3Icon,
  ScrollIcon,
  SearchIcon,
  SeparatorHorizontalIcon,
  SlidersHorizontalIcon,
  SquareCheckIcon,
  SquareChevronDownIcon,
  SquareIcon,
  TableIcon,
  TablePropertiesIcon,
  TagIcon,
  TerminalIcon,
  TextCursorInputIcon,
  ToggleRightIcon,
  TriangleAlertIcon,
  TypeIcon,
  type LucideIcon,
} from 'lucide-react'
import registry from '../../../packages/react/registry.json'

export interface DocItem {
  name: string
  title: string
  description: string
  icon: LucideIcon
  dependencies: string[]
  registryDependencies: string[]
  Demo?: ComponentType
  demoSource?: string
}

const icons: Record<string, LucideIcon> = {
  accordion: ChevronsDownUpIcon,
  alert: TriangleAlertIcon,
  'alert-dialog': MessageSquareWarningIcon,
  'aspect-ratio': RatioIcon,
  avatar: CircleUserIcon,
  badge: TagIcon,
  breadcrumb: ChevronsRightIcon,
  button: MousePointerClickIcon,
  'button-group': GroupIcon,
  calendar: CalendarIcon,
  card: SquareIcon,
  carousel: GalleryHorizontalIcon,
  checkbox: SquareCheckIcon,
  collapsible: FoldVerticalIcon,
  combobox: ChevronsUpDownIcon,
  command: CommandIcon,
  'context-menu': MousePointer2Icon,
  'data-table': TablePropertiesIcon,
  'date-picker': CalendarDaysIcon,
  dialog: AppWindowIcon,
  drawer: PanelBottomIcon,
  'dropdown-menu': MenuIcon,
  empty: InboxIcon,
  field: ClipboardListIcon,
  'hover-card': ContactIcon,
  input: TextCursorInputIcon,
  'input-group': SearchIcon,
  'input-otp': AsteriskIcon,
  item: Rows3Icon,
  kbd: KeyboardIcon,
  label: TypeIcon,
  menubar: PanelTopIcon,
  'native-select': SquareChevronDownIcon,
  'navigation-menu': CompassIcon,
  pagination: EllipsisIcon,
  popover: MessageSquareIcon,
  progress: GaugeIcon,
  'radio-group': CircleDotIcon,
  resizable: GripVerticalIcon,
  'scroll-area': ScrollIcon,
  select: ListIcon,
  separator: SeparatorHorizontalIcon,
  sheet: PanelRightIcon,
  sidebar: PanelLeftIcon,
  skeleton: BoxIcon,
  slider: SlidersHorizontalIcon,
  spinner: LoaderCircleIcon,
  switch: ToggleRightIcon,
  table: TableIcon,
  tabs: PanelsTopLeftIcon,
  textarea: AlignLeftIcon,
  toast: BellIcon,
  toggle: BoldIcon,
  'toggle-group': Columns3Icon,
  tooltip: MessageCircleIcon,
}

const demos = import.meta.glob<{ default: ComponentType }>('./demos/*.tsx', { eager: true })
const demoSources = import.meta.glob<string>('./demos/*.tsx', { eager: true, query: '?raw', import: 'default' })
const componentSources = import.meta.glob<string>('../../../packages/react/src/components/ui/*.tsx', {
  query: '?raw',
  import: 'default',
})

export function loadComponentSource(name: string): Promise<string> | undefined {
  return componentSources[`../../../packages/react/src/components/ui/${name}.tsx`]?.()
}

const toTitle = (name: string) =>
  name.replace(/(^|-)(\w)/g, (_, sep: string, c: string) => (sep ? ' ' : '') + c.toUpperCase()).replace('Otp', 'OTP')

export const components: DocItem[] = registry.items
  .filter((item) => item.type === 'registry:ui')
  .map((item) => ({
    name: item.name,
    title: toTitle(item.name),
    description: item.description ?? '',
    icon: icons[item.name] ?? ComponentIcon,
    dependencies: item.dependencies ?? [],
    registryDependencies: (item.registryDependencies ?? []).filter((d) => d !== 'utils'),
    Demo: demos[`./demos/${item.name}.tsx`]?.default,
    demoSource: demoSources[`./demos/${item.name}.tsx`],
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export const guides = [
  { slug: 'introduction', title: 'Introduction', icon: BookOpenIcon, href: '#/' },
  { slug: 'installation', title: 'Installation', icon: DownloadIcon, href: '#/docs/installation' },
  { slug: 'theming', title: 'Theming', icon: PaletteIcon, href: '#/docs/theming' },
  { slug: 'cli', title: 'CLI', icon: TerminalIcon, href: '#/docs/cli' },
  { slug: 'ai', title: 'AI & MCP', icon: BotIcon, href: '#/docs/ai' },
] as const

export const examples = [{ slug: 'notion', title: 'Workspace page', icon: LayoutTemplateIcon, href: '#/examples/notion' }]

export type GuideSlug = (typeof guides)[number]['slug']

export type Route =
  | { page: 'guide'; slug: GuideSlug }
  | { page: 'example'; slug: 'notion' }
  | { page: 'component'; item: DocItem }

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (path === 'examples/notion') return { page: 'example', slug: 'notion' }
  const guide = guides.find((g) => path === `docs/${g.slug}`)
  if (guide) return { page: 'guide', slug: guide.slug }
  const match = /^components\/([a-z0-9-]+)$/.exec(path)
  const item = match && components.find((c) => c.name === match[1])
  return item ? { page: 'component', item } : { page: 'guide', slug: 'introduction' }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parse(location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
