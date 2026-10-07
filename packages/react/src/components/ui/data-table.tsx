import * as React from 'react'
import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludesSome,
  filterFn_includesString,
  filterFn_inNumberRange,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ReactTable,
  type RowData,
} from '@tanstack/react-table'
import { createListCollection } from '@ark-ui/react/select'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  PlusCircleIcon,
  SearchIcon,
  Settings2Icon,
  XIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

/** Keep this object stable (module scope); TanStack Table v9 derives its APIs and types from it. */
const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    arrIncludesSome: filterFn_arrIncludesSome,
    inNumberRange: filterFn_inNumberRange,
  },
  columnFacetingFeature,
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text, datetime: sortFn_datetime, basic: sortFn_basic },
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSelectionFeature,
  columnVisibilityFeature,
})

type DataTableFeatures = typeof dataTableFeatures
type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>
type DataTableColumnDef<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>

function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>()
}

type DataTableFilterOption = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

type DataTableFilter = {
  /** Column id; the column should use `filterFn: 'arrIncludesSome'`. */
  column: string
  title: string
  options: DataTableFilterOption[]
}

function columnTitle<TData extends RowData>(column: Column<DataTableFeatures, TData>) {
  const header = column.columnDef.header
  return typeof header === 'string' ? header : column.id
}

function selectColumn<TData extends RowData>(): DataTableColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on this page"
        checked={
          table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false
        }
        onCheckedChange={(details) => table.toggleAllPageRowsSelected(details.checked === true)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(details) => row.toggleSelected(details.checked === true)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
  }
}

type DataTableColumnHeaderProps<TData extends RowData, TValue> = {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
  className?: string
}

function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <span className={className}>{title}</span>
  }
  const sorted = column.getIsSorted()

  return (
    <DropdownMenu positioning={{ placement: 'bottom-start' }}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            '-ml-2 font-medium text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground',
            className,
          )}
        >
          {title}
          {sorted === 'desc' ? (
            <ArrowDownIcon className="size-3" />
          ) : sorted === 'asc' ? (
            <ArrowUpIcon className="size-3" />
          ) : (
            <ChevronsUpDownIcon className="size-3 opacity-60" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-36">
        {column.getCanSort() && (
          <>
            <DropdownMenuItem value="asc" onSelect={() => column.toggleSorting(false)}>
              <ArrowUpIcon /> Ascending
            </DropdownMenuItem>
            <DropdownMenuItem value="desc" onSelect={() => column.toggleSorting(true)}>
              <ArrowDownIcon /> Descending
            </DropdownMenuItem>
            {sorted && (
              <DropdownMenuItem value="clear" onSelect={() => column.clearSorting()}>
                <XIcon /> Clear sort
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanSort() && column.getCanHide() && <DropdownMenuSeparator />}
        {column.getCanHide() && (
          <DropdownMenuItem value="hide" onSelect={() => column.toggleVisibility(false)}>
            <EyeOffIcon /> Hide column
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type DataTableFacetedFilterProps<TData extends RowData> = {
  table: DataTableInstance<TData>
  column: Column<DataTableFeatures, TData>
  title: string
  options: DataTableFilterOption[]
}

function DataTableFacetedFilter<TData extends RowData>({
  table,
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData>) {
  const [query, setQuery] = React.useState('')
  const facets = column.getFacetedUniqueValues()
  const selected = new Set((column.getFilterValue() as string[] | undefined) ?? [])
  const visible = options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))

  const toggle = (value: string) => {
    const next = new Set(selected)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    column.setFilterValue(next.size ? [...next] : undefined)
  }

  return (
    <Popover positioning={{ placement: 'bottom-start' }} onOpenChange={(e) => !e.open && setQuery('')}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <PlusCircleIcon />
          {title}
          {selected.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-0.5 h-3" />
              {selected.size > 2 ? (
                <Badge className="rounded-xs px-1 font-normal">{selected.size} selected</Badge>
              ) : (
                options
                  .filter((o) => selected.has(o.value))
                  .map((o) => (
                    <Badge key={o.value} className="rounded-xs px-1 font-normal">
                      {o.label}
                    </Badge>
                  ))
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={title}
            aria-label={`Filter ${title} options`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-subtle-foreground"
          />
        </div>
        <div role="listbox" aria-multiselectable aria-label={title} className="max-h-64 overflow-y-auto p-1">
          {visible.length === 0 && <div className="py-4 text-center text-sm text-muted-foreground">No results.</div>}
          {visible.map((option) => {
            const isSelected = selected.has(option.value)
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => toggle(option.value)}
                className="flex w-full cursor-default items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent"
              >
                <span
                  className={cn(
                    'flex size-3.5 shrink-0 items-center justify-center rounded-sm border-[1.5px] border-foreground/40',
                    isSelected && 'border-primary bg-primary text-primary-foreground',
                  )}
                >
                  {isSelected && <CheckIcon className="size-2.5" strokeWidth={3.5} />}
                </span>
                {option.icon && <option.icon className="size-3.5 text-muted-foreground" />}
                <span className="flex-1 truncate">{option.label}</span>
                <span className="font-mono text-xs text-subtle-foreground tabular-nums">
                  {facets.get(option.value) ?? 0}
                </span>
              </button>
            )
          })}
        </div>
        {selected.size > 0 && (
          <div className="border-t border-border p-1">
            <button
              type="button"
              onClick={() => {
                column.setFilterValue(undefined)
                table.setPageIndex(0)
              }}
              className="w-full rounded-sm px-2.5 py-1.5 text-center text-sm outline-none hover:bg-accent focus-visible:bg-accent"
            >
              Clear filters
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

function DataTableViewOptions<TData extends RowData>({ table }: { table: DataTableInstance<TData> }) {
  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide())

  return (
    <DropdownMenu positioning={{ placement: 'bottom-end' }}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2Icon /> View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              value={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(checked) => column.toggleVisibility(checked)}
              closeOnSelect={false}
            >
              {columnTitle(column)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type DataTableToolbarProps<TData extends RowData> = {
  table: DataTableInstance<TData>
  searchPlaceholder?: string
  filters?: DataTableFilter[]
  children?: React.ReactNode
}

function DataTableToolbar<TData extends RowData>({
  table,
  searchPlaceholder = 'Search…',
  filters = [],
  children,
}: DataTableToolbarProps<TData>) {
  const globalFilter = (table.state.globalFilter as string | undefined) ?? ''
  const isFiltered = globalFilter.length > 0 || table.state.columnFilters.length > 0

  return (
    <div data-slot="data-table-toolbar" className="flex flex-wrap items-center gap-1.5">
      <InputGroup className="w-56">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Search rows"
        />
      </InputGroup>
      {filters.map((filter) => {
        const column = table.getColumn(filter.column)
        return column ? (
          <DataTableFacetedFilter
            key={filter.column}
            table={table}
            column={column}
            title={filter.title}
            options={filter.options}
          />
        ) : null
      })}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            table.resetColumnFilters()
            table.setGlobalFilter('')
          }}
        >
          Reset <XIcon />
        </Button>
      )}
      <div className="ml-auto flex items-center gap-1.5">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

type DataTablePaginationProps<TData extends RowData> = {
  table: DataTableInstance<TData>
  pageSizeOptions?: number[]
}

function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const pageCount = Math.max(table.getPageCount(), 1)
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const filteredCount = table.getFilteredRowModel().rows.length
  const sizes = React.useMemo(
    () => createListCollection({ items: pageSizeOptions.map(String) }),
    [pageSizeOptions],
  )

  return (
    <div
      data-slot="data-table-pagination"
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1 text-sm text-muted-foreground"
    >
      <div className="tabular-nums">
        {selectedCount > 0 ? `${selectedCount} of ${filteredCount} row(s) selected` : `${filteredCount} row(s)`}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Rows per page</span>
          <Select
            collection={sizes}
            value={[String(pageSize)]}
            onValueChange={(details) => table.setPageSize(Number(details.value[0]))}
            className="w-16"
          >
            <SelectTrigger aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizes.items.map((size) => (
                <SelectItem key={size} item={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="whitespace-nowrap tabular-nums">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="outline"
            size="icon"
            aria-label="First page"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Last page"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

type DataTableProps<TData extends RowData> = {
  /** Keep stable (module scope or useMemo) so row models aren't rebuilt every render. */
  columns: DataTableColumnDef<TData>[]
  /** Keep stable (state or useMemo) for the same reason. */
  data: TData[]
  getRowId?: (row: TData) => string
  searchPlaceholder?: string
  filters?: DataTableFilter[]
  pageSizeOptions?: number[]
  initialPageSize?: number
  /** Toolbar content before the View button; receives the table for bulk actions. */
  actions?: (table: DataTableInstance<TData>) => React.ReactNode
  emptyMessage?: React.ReactNode
  className?: string
}

function DataTable<TData extends RowData>({
  columns,
  data,
  getRowId,
  searchPlaceholder,
  filters,
  pageSizeOptions = [10, 20, 50, 100],
  initialPageSize = pageSizeOptions[0] ?? 10,
  actions,
  emptyMessage = 'No results.',
  className,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
    globalFilterFn: 'includesString',
    initialState: { pagination: { pageIndex: 0, pageSize: initialPageSize } },
  })
  const rows = table.getRowModel().rows

  return (
    <div data-slot="data-table" className={cn('flex flex-col gap-2', className)}>
      <DataTableToolbar table={table} searchPlaceholder={searchPlaceholder} filters={filters}>
        {actions?.(table)}
      </DataTableToolbar>
      <div data-slot="data-table-container" className="overflow-hidden rounded-lg border border-border bg-background">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
  createDataTableColumnHelper,
  dataTableFeatures,
  selectColumn,
  type DataTableColumnDef,
  type DataTableFeatures,
  type DataTableFilter,
  type DataTableFilterOption,
  type DataTableInstance,
}
