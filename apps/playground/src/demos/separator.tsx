import { Separator } from '@/components/ui/separator'

export default function SeparatorDemo() {
  return (
    <div className="w-64 text-sm">
      <div className="font-medium">DenseUI</div>
      <div className="text-muted-foreground">Ultra-compact components.</div>
      <Separator className="my-2" />
      <div className="flex h-4 items-center gap-2 text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>CLI</span>
      </div>
    </div>
  )
}
