import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit card', amount: 250 },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: 150 },
  { id: 'INV003', status: 'Unpaid', method: 'Bank transfer', amount: 350 },
  { id: 'INV004', status: 'Paid', method: 'Credit card', amount: 450 },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: 550 },
]

const statusColor = { Paid: 'green', Pending: 'yellow', Unpaid: 'red' } as const

export default function TableDemo() {
  return (
    <div className="w-full max-w-lg">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-6">
              <Checkbox aria-label="Select all" />
            </TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Checkbox aria-label={`Select ${invoice.id}`} />
              </TableCell>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>
                <Badge color={statusColor[invoice.status as keyof typeof statusColor]}>{invoice.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{invoice.method}</TableCell>
              <TableCell className="text-right tabular-nums">${invoice.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right tabular-nums">$1,750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
