import { CalendarIcon, KanbanIcon, ListIcon, TableIcon } from 'lucide-react'
import { SegmentedControl, SegmentedControlItem } from '@/components/ui/segmented-control'

export default function SegmentedControlDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl defaultValue="board">
        <SegmentedControlItem value="table">
          <TableIcon /> Table
        </SegmentedControlItem>
        <SegmentedControlItem value="board">
          <KanbanIcon /> Board
        </SegmentedControlItem>
        <SegmentedControlItem value="list">
          <ListIcon /> List
        </SegmentedControlItem>
        <SegmentedControlItem value="calendar">
          <CalendarIcon /> Calendar
        </SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl defaultValue="month">
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}
