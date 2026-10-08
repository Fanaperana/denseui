import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  DataTable,
  DataTableColumnHeader,
  createDataTableColumnHelper,
  type DataTableQuery,
} from '@/components/ui/data-table'

type Order = { id: string; customer: string; status: 'paid' | 'pending' | 'refunded'; total: number }

const statusColor = { paid: 'green', pending: 'yellow', refunded: 'gray' } as const
const customers = ['Acme Inc.', 'Globex', 'Initech', 'Umbrella', 'Hooli', 'Soylent', 'Stark Ind.', 'Wayne Ent.']

// A fake API: in your app, replace with fetch(`/api/orders?${params}`).
const allOrders: Order[] = Array.from({ length: 1240 }, (_, i) => ({
  id: `ORD-${10000 + i}`,
  customer: customers[(i * 7) % customers.length]!,
  status: (['paid', 'paid', 'pending', 'refunded'] as const)[(i * 3) % 4]!,
  total: Math.round(((i * 7919) % 50000) / 10) / 10 + 4.99,
}))

function fetchOrders(query: DataTableQuery): Promise<{ rows: Order[]; total: number }> {
  return new Promise((resolve) =>
    setTimeout(() => {
      let rows = allOrders
      if (query.search) {
        const q = query.search.toLowerCase()
        rows = rows.filter((o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q))
      }
      for (const { id, desc } of [...query.sorting].reverse()) {
        rows = [...rows].sort((a, b) => {
          const x = a[id as keyof Order]
          const y = b[id as keyof Order]
          return (x < y ? -1 : x > y ? 1 : 0) * (desc ? -1 : 1)
        })
      }
      const start = query.pageIndex * query.pageSize
      resolve({ rows: rows.slice(start, start + query.pageSize), total: rows.length })
    }, 350),
  )
}

const helper = createDataTableColumnHelper<Order>()

export default function DataTableServerDemo() {
  const [data, setData] = useState<Order[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const latest = useRef(0)

  const onQueryChange = useCallback(async (query: DataTableQuery) => {
    const request = ++latest.current
    setLoading(true)
    const result = await fetchOrders(query)
    if (request !== latest.current) return
    setData(result.rows)
    setRowCount(result.total)
    setLoading(false)
  }, [])

  useEffect(() => () => void (latest.current = -1), [])

  const columns = useMemo(
    () => [
      helper.accessor('id', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
        cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span>,
      }),
      helper.accessor('customer', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      }),
      helper.accessor('status', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: (info) => <Badge color={statusColor[info.getValue()]}>{info.getValue()}</Badge>,
      }),
      helper.accessor('total', {
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total" className="ml-auto" />,
        cell: (info) => <div className="text-right tabular-nums">${info.getValue().toFixed(2)}</div>,
      }),
    ],
    [],
  )

  return (
    <DataTable
      className="w-full"
      columns={columns}
      data={data}
      getRowId={(order) => order.id}
      searchPlaceholder="Search orders…"
      manual={{ rowCount, onQueryChange }}
      loading={loading}
    />
  )
}
