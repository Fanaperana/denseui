import { Editable } from '@/components/ui/editable'

export default function EditableDemo() {
  return (
    <div className="flex w-96 flex-col gap-2">
      <Editable defaultValue="Q4 Planning" placeholder="Untitled" textClassName="text-3xl font-bold tracking-tight" />
      <Editable placeholder="Add a description…" textClassName="text-base text-muted-foreground" />
    </div>
  )
}
