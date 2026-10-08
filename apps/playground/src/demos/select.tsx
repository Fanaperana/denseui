import { createListCollection } from '@ark-ui/react/select'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple', group: 'Fruits' },
    { label: 'Banana', value: 'banana', group: 'Fruits' },
    { label: 'Blueberry', value: 'blueberry', group: 'Fruits' },
    { label: 'Carrot', value: 'carrot', group: 'Vegetables' },
    { label: 'Broccoli', value: 'broccoli', group: 'Vegetables', disabled: true },
  ],
  groupBy: (item) => item.group,
})

export default function SelectDemo() {
  return (
    <Select collection={fruits} className="w-48">
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {fruits.group().map(([group, items]) => (
          <SelectGroup key={group}>
            <SelectLabel>{group}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.value} item={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
