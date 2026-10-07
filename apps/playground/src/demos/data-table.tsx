import { useMemo } from 'react'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotIcon,
  CircleIcon,
  CircleXIcon,
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
  selectColumn,
  type DataTableFilter,
} from '@/components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toaster } from '@/components/ui/toast'

type Task = {
  id: string
  title: string
  label: 'bug' | 'feature' | 'docs'
  status: 'backlog' | 'todo' | 'in-progress' | 'done' | 'canceled'
  priority: 'low' | 'medium' | 'high'
  estimate: number
}

const statuses = [
  { value: 'backlog', label: 'Backlog', icon: CircleDashedIcon },
  { value: 'todo', label: 'Todo', icon: CircleIcon },
  { value: 'in-progress', label: 'In progress', icon: CircleDotIcon },
  { value: 'done', label: 'Done', icon: CircleCheckIcon },
  { value: 'canceled', label: 'Canceled', icon: CircleXIcon },
]

const priorities = [
  { value: 'low', label: 'Low', icon: ArrowDownIcon },
  { value: 'medium', label: 'Medium', icon: ArrowRightIcon },
  { value: 'high', label: 'High', icon: ArrowUpIcon },
]

const labelColor = { bug: 'red', feature: 'blue', docs: 'gray' } as const

const verbs = ['Fix', 'Add', 'Refactor', 'Document', 'Remove', 'Improve', 'Test', 'Migrate']
const subjects = ['date picker focus ring', 'dark mode tokens', 'CLI diff output', 'sidebar collapse', 'toast stacking', 'table pagination', 'select keyboard nav', 'registry schema', 'combobox empty state', 'Inter fallback metrics']

// Seeded so the demo data is identical on every render and reload.
let seed = 7
const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
const pick = <T,>(items: readonly T[]) => items[Math.floor(random() * items.length)]!

const tasks: Task[] = Array.from({ length: 64 }, (_, i) => ({
  id: `TASK-${8100 + i * 37}`,
  title: `${pick(verbs)} ${pick(subjects)}`,
  label: pick(['bug', 'feature', 'docs'] as const),
  status: pick(statuses).value as Task['status'],
  priority: pick(priorities).value as Task['priority'],
  estimate: Math.ceil(random() * 8),
}))

const helper = createDataTableColumnHelper<Task>()

const filters: DataTableFilter[] = [
  { column: 'status', title: 'Status', options: statuses },
  { column: 'priority', title: 'Priority', options: priorities },
]

export default function DataTableDemo() {
  const columns = useMemo(
    () => [
      selectColumn<Task>(),
      helper.accessor('id', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
        cell: (info) => <span className="font-mono text-xs text-muted-foreground">{info.getValue()}</span>,
        enableHiding: false,
      }),
      helper.accessor('title', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => (
          <div className="flex max-w-80 items-center gap-1.5">
            <Badge color={labelColor[row.original.label]}>{row.original.label}</Badge>
            <span className="truncate font-medium">{row.original.title}</span>
          </div>
        ),
      }),
      helper.accessor('status', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: (info) => {
          const status = statuses.find((s) => s.value === info.getValue())
          return status ? (
            <span className="flex items-center gap-1.5">
              <status.icon className="size-3.5 text-muted-foreground" />
              {status.label}
            </span>
          ) : null
        },
        filterFn: 'arrIncludesSome',
      }),
      helper.accessor('priority', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
        cell: (info) => {
          const priority = priorities.find((p) => p.value === info.getValue())
          return priority ? (
            <span className="flex items-center gap-1.5">
              <priority.icon className="size-3.5 text-muted-foreground" />
              {priority.label}
            </span>
          ) : null
        },
        filterFn: 'arrIncludesSome',
      }),
      helper.accessor('estimate', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Points" className="ml-auto" />,
        cell: (info) => <div className="text-right tabular-nums">{info.getValue()}</div>,
        enableGlobalFilter: false,
      }),
      helper.display({
        id: 'actions',
        cell: ({ row }) => (
          <DropdownMenu positioning={{ placement: 'bottom-end' }}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${row.original.id}`}>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem value="edit">
                <PencilIcon /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                value="copy"
                onSelect={() => {
                  navigator.clipboard.writeText(row.original.id)
                  toaster.success({ title: `Copied ${row.original.id}` })
                }}
              >
                <CopyIcon /> Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem value="delete" variant="destructive">
                <Trash2Icon /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableHiding: false,
      }),
    ],
    [],
  )

  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={tasks}
      getRowId={(task) => task.id}
      searchPlaceholder="Search tasks…"
      filters={filters}
      actions={(table) => {
        const count = table.getFilteredSelectedRowModel().rows.length
        return count > 0 ? (
          <Button
            variant="destructive-outline"
            onClick={() => {
              toaster.success({ title: `Deleted ${count} task(s)` })
              table.resetRowSelection()
            }}
          >
            <Trash2Icon /> Delete {count}
          </Button>
        ) : null
      }}
    />
  )
}
