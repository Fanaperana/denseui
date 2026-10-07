import { Kbd, KbdGroup } from '@/components/ui/kbd'

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
      <span>
        Press <Kbd>/</Kbd> for commands
      </span>
    </div>
  )
}
