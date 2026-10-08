import { DatePicker, DatePickerContent, DatePickerInput } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

export default function DatePickerDemo() {
  return (
    <div className="flex items-start gap-4">
      <DatePicker className="grid w-44 gap-1">
        <Label>Due date</Label>
        <DatePickerInput placeholder="mm/dd/yyyy" />
        <DatePickerContent />
      </DatePicker>
      <DatePicker selectionMode="range" className="grid w-56 gap-1">
        <Label>Date range</Label>
        <DatePickerInput index={0} placeholder="Start" />
        <DatePickerInput index={1} placeholder="End" />
        <DatePickerContent />
      </DatePicker>
    </div>
  )
}
