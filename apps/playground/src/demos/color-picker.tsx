import { ColorPicker, parseColor } from '@/components/ui/color-picker'
import { Label } from '@/components/ui/label'

export default function ColorPickerDemo() {
  return (
    <div className="flex w-56 flex-col gap-3">
      <div className="grid gap-1">
        <Label>Brand color</Label>
        <ColorPicker />
      </div>
      <div className="grid gap-1">
        <Label>Highlight (no alpha)</Label>
        <ColorPicker defaultValue={parseColor('#1f7a4f')} showAlpha={false} />
      </div>
    </div>
  )
}
