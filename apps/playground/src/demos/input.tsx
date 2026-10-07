import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function InputDemo() {
  return (
    <div className="grid w-72 gap-3">
      <div className="grid gap-1">
        <Label htmlFor="input-name">Name</Label>
        <Input id="input-name" placeholder="Untitled" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" type="email" aria-invalid defaultValue="not-an-email" />
      </div>
      <Input size="sm" placeholder="Small" />
      <Input size="lg" placeholder="Large" />
      <Input variant="ghost" placeholder="Ghost — hover me" />
      <Input disabled placeholder="Disabled" />
    </div>
  )
}
