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
