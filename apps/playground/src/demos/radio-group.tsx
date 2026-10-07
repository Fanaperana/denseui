import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function RadioGroupDemo() {
  return (
    <div className="flex gap-10">
      <RadioGroup defaultValue="board">
        <RadioGroupItem value="table">Table</RadioGroupItem>
        <RadioGroupItem value="board">Board</RadioGroupItem>
        <RadioGroupItem value="list">List</RadioGroupItem>
        <RadioGroupItem value="gallery" disabled>
          Gallery
        </RadioGroupItem>
      </RadioGroup>
      <RadioGroup defaultValue="asc" orientation="horizontal">
        <RadioGroupItem value="asc">Ascending</RadioGroupItem>
        <RadioGroupItem value="desc">Descending</RadioGroupItem>
      </RadioGroup>
    </div>
  )
}
