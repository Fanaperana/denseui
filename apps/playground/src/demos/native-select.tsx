import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@/components/ui/native-select'

export default function NativeSelectDemo() {
  return (
    <div className="flex gap-3">
      <NativeSelect defaultValue="" className="w-40">
        <NativeSelectOption value="" disabled>
          Select status
        </NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
      </NativeSelect>
      <NativeSelect className="w-40">
        <NativeSelectOptGroup label="Frontend">
          <NativeSelectOption>React</NativeSelectOption>
          <NativeSelectOption>Vue</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Backend">
          <NativeSelectOption>Node</NativeSelectOption>
          <NativeSelectOption>Go</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </div>
  )
}
