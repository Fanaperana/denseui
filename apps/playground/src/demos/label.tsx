import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LabelDemo() {
  return (
    <div className="grid w-64 gap-1">
      <Label htmlFor="label-title">Page title</Label>
      <Input id="label-title" placeholder="Untitled" />
    </div>
  )
}
