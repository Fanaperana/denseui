import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '../code-block'

const semantic = [
  'background',
  'foreground',
  'muted',
  'muted-foreground',
  'accent',
  'border',
  'input',
  'primary',
  'primary-foreground',
  'brand',
  'destructive',
  'success',
  'warning',
  'popover',
  'card',
  'tooltip',
]

const tags = ['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const

const typeScale = [
  { cls: 'text-xs', label: 'xs · 11/16' },
  { cls: 'text-sm', label: 'sm · 12/16' },
  { cls: 'text-base', label: 'base · 13/20' },
  { cls: 'text-lg', label: 'lg · 14/20' },
  { cls: 'text-xl', label: 'xl · 20' },
  { cls: 'text-2xl', label: '2xl · 24' },
]

const heights = [
  { cls: 'h-5', label: 'sm · 20px' },
  { cls: 'h-6', label: 'default · 24px' },
  { cls: 'h-7', label: 'lg · 28px' },
]

export function ThemingPage() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Theming</h1>
        <p className="text-lg text-muted-foreground">
          Semantic CSS variables mapped to Tailwind utilities. Override them in{' '}
          <code className="font-mono text-base">denseui.css</code>.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Colors</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {semantic.map((name) => (
            <div key={name} className="flex flex-col gap-1">
              <div className="h-10 rounded-md border border-border" style={{ background: `var(--${name})` }} />
              <code className="font-mono text-xs text-muted-foreground">--{name}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Tag palette</h2>
        <p className="text-muted-foreground">
          <code className="font-mono text-sm">bg-tag-&lt;color&gt;-bg</code> with{' '}
          <code className="font-mono text-sm">text-tag-&lt;color&gt;</code>, used by Badge.
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((c) => (
            <Badge key={c} color={c}>
              {c}
            </Badge>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Type scale</h2>
        <div className="flex flex-col divide-y divide-border rounded-md border border-border">
          {typeScale.map((t) => (
            <div key={t.cls} className="flex items-baseline gap-4 px-3 py-2">
              <code className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{t.label}</code>
              <span className={t.cls}>The quick brown fox jumps over the lazy dog</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Control heights</h2>
        <div className="flex items-end gap-3">
          {heights.map((h) => (
            <div key={h.cls} className="flex flex-col items-center gap-1">
              <div className={`${h.cls} w-24 rounded-sm border border-dashed border-brand bg-brand/10`} />
              <code className="font-mono text-xs text-muted-foreground">{h.label}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Customize</h2>
        <CodeBlock
          code={`/* src/denseui.css */\n:root {\n  --brand: #0ea5e9;\n  --ring: rgba(14, 165, 233, 0.32);\n}\n\n.dark {\n  --background: #000000;\n}`}
        />
      </section>
    </article>
  )
}
