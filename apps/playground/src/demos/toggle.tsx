import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="Underline" size="lg">
        <UnderlineIcon /> Underline
      </Toggle>
      <Toggle aria-label="Disabled" disabled>
        <BoldIcon />
      </Toggle>
    </div>
  )
}
