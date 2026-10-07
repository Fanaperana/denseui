import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function TextareaDemo() {
  return (
    <div className="grid w-80 gap-1">
      <Label htmlFor="textarea-notes">Notes</Label>
      <Textarea id="textarea-notes" placeholder="Write something, or press '/' for commands…" />
    </div>
  )
}
