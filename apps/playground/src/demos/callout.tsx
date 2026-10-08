import { LightbulbIcon } from 'lucide-react'
import { Callout } from '@/components/ui/callout'

export default function CalloutDemo() {
  return (
    <div className="flex w-[440px] flex-col gap-2">
      <Callout>Keep controls at 24px. Density is a feature, not a bug.</Callout>
      <Callout color="blue" icon="ℹ️">
        <strong className="font-semibold">Heads up:</strong> the registry is rebuilt on every push.
      </Callout>
      <Callout color="yellow" icon="⚠️">
        Changing <code className="font-mono text-sm">--text-sm--line-height</code> breaks optical centering.
      </Callout>
      <Callout variant="outline" icon={<LightbulbIcon className="text-warning" />}>
        Tip: press <kbd className="font-mono text-sm">⌘K</kbd> to search the docs.
      </Callout>
    </div>
  )
}
