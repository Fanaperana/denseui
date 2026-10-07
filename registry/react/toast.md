# Toast

Stacked notifications with types and actions

## Install

```bash
npx denseui@latest add toast
```

npm dependencies: `@ark-ui/react`, `lucide-react`

## Usage

```tsx
import { Toaster, toaster } from "@/components/ui/toast"
```

## Example

```tsx
import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toast'

export default function ToastDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toaster.create({
            title: 'Event created',
            description: 'Sunday, October 12 at 9:00 AM',
            action: { label: 'Undo', onClick: () => {} },
          })
        }
      >
        Default
      </Button>
      <Button variant="outline" onClick={() => toaster.success({ title: 'Changes saved' })}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toaster.error({ title: 'Upload failed', description: 'File exceeds 10 MB.' })}
      >
        Error
      </Button>
      <Button variant="outline" onClick={() => toaster.info({ title: 'New version available' })}>
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toaster.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: { title: 'Publishing…' },
            success: { title: 'Published' },
            error: { title: 'Failed to publish' },
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}
```

## Source: components/ui/toast.tsx

```tsx
import { Toast, Toaster as ArkToaster, createToaster } from '@ark-ui/react/toast'
import { Portal } from '@ark-ui/react/portal'
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, LoaderCircleIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Call `toaster.create({ title, description, type })` or `toaster.success(...)` from anywhere. */
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 8, max: 5 })

const icons = {
  success: <CircleCheckIcon className="size-3.5 text-success" />,
  error: <CircleAlertIcon className="size-3.5 text-destructive" />,
  warning: <CircleAlertIcon className="size-3.5 text-warning" />,
  info: <InfoIcon className="size-3.5 text-brand" />,
  loading: <LoaderCircleIcon className="size-3.5 animate-spin text-muted-foreground" />,
}

function Toaster({ className }: { className?: string }) {
  return (
    <Portal>
      <ArkToaster toaster={toaster}>
        {(toast) => (
          <Toast.Root
            data-slot="toast"
            className={cn(
              'z-(--z-index) flex h-(--height) w-80 items-start gap-2 rounded-lg bg-popover px-3 py-2.5 text-sm text-popover-foreground opacity-(--opacity) shadow-popover [translate:var(--x)_var(--y)] [scale:var(--scale)] transition-[translate,scale,opacity,height] duration-300 ease-[cubic-bezier(0.21,1.02,0.73,1)] will-change-[translate,opacity,scale] data-[state=closed]:transition-[translate,scale,opacity] data-[state=closed]:ease-[cubic-bezier(0.06,0.71,0.55,1)]',
              className,
            )}
          >
            {toast.type && toast.type in icons && (
              <span className="mt-0.5 shrink-0">{icons[toast.type as keyof typeof icons]}</span>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {toast.title && <Toast.Title className="font-medium">{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description className="text-muted-foreground">{toast.description}</Toast.Description>
              )}
            </div>
            {toast.action && (
              <Toast.ActionTrigger className="inline-flex shrink-0 items-center rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground hover:bg-primary-hover">
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            {toast.closable !== false && (
              <Toast.CloseTrigger
                aria-label="Close"
                className="flex size-4 shrink-0 items-center justify-center rounded-xs text-muted-foreground hover:bg-accent"
              >
                <XIcon className="size-3" />
              </Toast.CloseTrigger>
            )}
          </Toast.Root>
        )}
      </ArkToaster>
    </Portal>
  )
}

export { Toaster, toaster }
```
