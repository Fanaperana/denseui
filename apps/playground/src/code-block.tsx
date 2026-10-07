import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn('group relative rounded-md border border-border bg-muted', className)}>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-5">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Copy code"
        onClick={copy}
        className="absolute top-2 right-2 bg-muted opacity-0 group-hover:opacity-100 hover:bg-[color-mix(in_oklab,var(--muted),var(--foreground)_8%)] focus-visible:opacity-100"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
