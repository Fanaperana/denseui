import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const data = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const config = {
  desktop: { label: 'Desktop', color: 'var(--brand)' },
  mobile: { label: 'Mobile', color: 'var(--tag-green)' },
} satisfies ChartConfig

export default function ChartDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <ChartContainer config={config} className="h-48 w-full">
        <BarChart data={data} margin={{ left: -20, right: 4, top: 4 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={6} />
          <YAxis tickLine={false} axisLine={false} width={44} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={3} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={3} />
        </BarChart>
      </ChartContainer>
      <ChartContainer config={config} className="h-48 w-full">
        <LineChart data={data} margin={{ left: -20, right: 8, top: 4 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={6} />
          <YAxis tickLine={false} axisLine={false} width={44} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} type="monotone" />
          <Line dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} type="monotone" />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
