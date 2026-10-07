import { Checkbox } from '@/components/ui/checkbox'

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-1.5">
      <Checkbox defaultChecked>Show completed tasks</Checkbox>
      <Checkbox>Wrap cells</Checkbox>
      <Checkbox checked="indeterminate">Select all</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
    </div>
  )
}
