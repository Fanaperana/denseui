import { Label } from '@/components/ui/label'
import { NumberInput } from '@/components/ui/number-input'

export default function NumberInputDemo() {
  return (
    <div className="flex gap-3">
      <div className="grid w-28 gap-1">
        <Label htmlFor="qty">Quantity</Label>
        <NumberInput id="qty" defaultValue="3" min={0} max={99} />
      </div>
      <div className="grid w-32 gap-1">
        <Label htmlFor="price">Price</Label>
        <NumberInput
          id="price"
          defaultValue="24.5"
          step={0.5}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
      </div>
      <div className="grid w-28 gap-1">
        <Label htmlFor="opacity">Opacity</Label>
        <NumberInput id="opacity" defaultValue="0.8" step={0.05} min={0} max={1} formatOptions={{ style: 'percent' }} />
      </div>
    </div>
  )
}
