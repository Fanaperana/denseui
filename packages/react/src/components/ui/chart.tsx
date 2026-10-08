import * as React from 'react'
import * as Recharts from 'recharts'
import { cn } from '@/lib/utils'

type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType<{ className?: string }>
    /** Any CSS color, e.g. `var(--brand)` or `var(--tag-green)`. */
    color?: string
  }
>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error('useChart must be used within a <ChartContainer />')
  return context
}

type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ComponentProps<typeof Recharts.ResponsiveContainer>['children']
}

function ChartContainer({ config, className, children, style, ...props }: ChartContainerProps) {
  // Series colors become --color-<key> so charts reference them as `fill="var(--color-desktop)"`.
  const vars = Object.fromEntries(
    Object.entries(config)
      .filter(([, item]) => item.color)
      .map(([key, item]) => [`--color-${key}`, item.color]),
  ) as React.CSSProperties

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        style={{ ...vars, ...style }}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-accent [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className,
        )}
        {...props}
      >
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartTooltip = Recharts.Tooltip

type TooltipItem = {
  name?: string | number
  value?: unknown
  dataKey?: string | number
  color?: string
  fill?: string
  payload?: Record<string, unknown>
}

type ChartTooltipContentProps = {
  active?: boolean
  payload?: TooltipItem[]
  label?: React.ReactNode
  className?: string
  hideLabel?: boolean
  indicator?: 'dot' | 'line'
  labelFormatter?: (label: React.ReactNode) => React.ReactNode
  valueFormatter?: (value: unknown, key: string) => React.ReactNode
}

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel = false,
  indicator = 'dot',
  labelFormatter,
  valueFormatter = (value) => (typeof value === 'number' ? value.toLocaleString() : String(value)),
}: ChartTooltipContentProps) {
  const { config } = useChart()
  if (!active || !payload?.length) return null

  return (
    <div
      data-slot="chart-tooltip"
      className={cn(
        'grid min-w-32 gap-1 rounded-md bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-popover',
        className,
      )}
    >
      {!hideLabel && label != null && (
        <div className="font-medium">{labelFormatter ? labelFormatter(label) : label}</div>
      )}
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.name ?? 'value')
        const itemConfig = config[key]
        const color = item.color ?? item.fill ?? itemConfig?.color
        return (
          <div key={key} className="flex items-center gap-2">
            {itemConfig?.icon ? (
              <itemConfig.icon className="size-3 text-muted-foreground" />
            ) : (
              <span
                className={cn('shrink-0 rounded-[2px]', indicator === 'dot' ? 'size-2' : 'h-3 w-1')}
                style={{ background: color }}
              />
            )}
            <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>
            <span className="ml-auto font-mono font-medium tabular-nums">{valueFormatter(item.value, key)}</span>
          </div>
        )
      })}
    </div>
  )
}

const ChartLegend = Recharts.Legend

type ChartLegendContentProps = {
  payload?: { value?: unknown; dataKey?: unknown; color?: string }[]
  className?: string
}

function ChartLegendContent({ payload, className }: ChartLegendContentProps) {
  const { config } = useChart()
  if (!payload?.length) return null

  return (
    <div data-slot="chart-legend" className={cn('flex items-center justify-center gap-3 pt-2', className)}>
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.value ?? '')
        const itemConfig = config[key]
        return (
          <div key={key} className="flex items-center gap-1.5 text-muted-foreground">
            {itemConfig?.icon ? (
              <itemConfig.icon className="size-3" />
            ) : (
              <span className="size-2 shrink-0 rounded-[2px]" style={{ background: item.color }} />
            )}
            {itemConfig?.label ?? key}
          </div>
        )
      })}
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, useChart, type ChartConfig }
