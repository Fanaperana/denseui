# Calendar

Inline date grid with day, month and year views

## Install

```bash
npx denseui@latest add calendar
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { Calendar, CalendarViews } from "@/components/ui/calendar"
```

## Example

```tsx
import { Calendar } from '@/components/ui/calendar'

export default function CalendarDemo() {
  return <Calendar />
}
```

## Source: components/ui/calendar.tsx

```tsx
import { DatePicker } from '@ark-ui/react/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const navButton =
  'inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40'

const cell =
  'flex h-7 items-center justify-center rounded-sm text-sm outline-none transition-colors duration-75 select-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-30 data-in-range:rounded-none data-in-range:bg-accent data-outside-range:text-subtle-foreground data-today:font-semibold data-today:text-brand data-unavailable:line-through data-selected:bg-primary data-selected:text-primary-foreground data-range-start:rounded-l-sm data-range-end:rounded-r-sm'

function CalendarHeader() {
  return (
    <DatePicker.ViewControl className="mb-1 flex items-center justify-between">
      <DatePicker.PrevTrigger className={navButton}>
        <ChevronLeftIcon className="size-3.5" />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger className="rounded-sm px-2.5 py-1 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.NextTrigger className={navButton}>
        <ChevronRightIcon className="size-3.5" />
      </DatePicker.NextTrigger>
    </DatePicker.ViewControl>
  )
}

/** Day/month/year grids. Render inside a DatePicker root (inline or in a popover). */
function CalendarViews() {
  return (
    <>
      <DatePicker.View view="day">
        <DatePicker.Context>
          {(api) => (
            <>
              <CalendarHeader />
              <DatePicker.Table className="w-full border-collapse">
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    {api.weekDays.map((day, i) => (
                      <DatePicker.TableHeader key={i} className="h-6 w-7 text-xs font-normal text-subtle-foreground">
                        {day.narrow}
                      </DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {api.weeks.map((week, i) => (
                    <DatePicker.TableRow key={i}>
                      {week.map((day, j) => (
                        <DatePicker.TableCell key={j} value={day} className="p-0">
                          <DatePicker.TableCellTrigger className={cn(cell, 'w-7')}>{day.day}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>
      <DatePicker.View view="month">
        <DatePicker.Context>
          {(api) => (
            <>
              <CalendarHeader />
              <DatePicker.Table className="w-full">
                <DatePicker.TableBody>
                  {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, i) => (
                    <DatePicker.TableRow key={i}>
                      {months.map((month, j) => (
                        <DatePicker.TableCell key={j} value={month.value} className="p-0.5">
                          <DatePicker.TableCellTrigger className={cn(cell, 'w-full px-2')}>
                            {month.label}
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>
      <DatePicker.View view="year">
        <DatePicker.Context>
          {(api) => (
            <>
              <CalendarHeader />
              <DatePicker.Table className="w-full">
                <DatePicker.TableBody>
                  {api.getYearsGrid({ columns: 4 }).map((years, i) => (
                    <DatePicker.TableRow key={i}>
                      {years.map((year, j) => (
                        <DatePicker.TableCell key={j} value={year.value} className="p-0.5">
                          <DatePicker.TableCellTrigger className={cn(cell, 'w-full px-2')}>
                            {year.label}
                          </DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>
    </>
  )
}

function Calendar({ className, ...props }: DatePicker.RootProps) {
  return (
    <DatePicker.Root data-slot="calendar" inline {...props}>
      <DatePicker.Content className={cn('w-fit rounded-lg border border-border bg-card px-3 py-2', className)}>
        <CalendarViews />
      </DatePicker.Content>
    </DatePicker.Root>
  )
}

export { Calendar, CalendarViews }
```
