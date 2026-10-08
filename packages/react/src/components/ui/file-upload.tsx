import { FileUpload as ArkFileUpload } from '@ark-ui/react/file-upload'
import { FileIcon, UploadIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type FileUploadProps = ArkFileUpload.RootProps & {
  label?: string
  description?: string
}

function FileUpload({
  className,
  label = 'Drop files here or click to browse',
  description,
  maxFiles = 10,
  ...props
}: FileUploadProps) {
  return (
    <ArkFileUpload.Root data-slot="file-upload" maxFiles={maxFiles} className={cn('flex w-full flex-col gap-2', className)} {...props}>
      <ArkFileUpload.Dropzone className="flex cursor-default flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-input bg-background px-6 py-5 text-center outline-none transition-colors hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring data-dragging:border-brand data-dragging:bg-surface-active">
        <span className="mb-1 flex size-7 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
          <UploadIcon className="size-3.5" />
        </span>
        <span className="text-sm font-medium">{label}</span>
        {description && <span className="text-xs text-subtle-foreground">{description}</span>}
      </ArkFileUpload.Dropzone>
      <ArkFileUpload.ItemGroup className="flex flex-col gap-1">
        <ArkFileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <ArkFileUpload.Item
                key={`${file.name}-${file.size}`}
                file={file}
                className="flex items-center gap-2.5 rounded-md border border-border bg-card px-2.5 py-1.5"
              >
                <ArkFileUpload.ItemPreview type="image/*" className="size-7 shrink-0 overflow-hidden rounded-sm">
                  <ArkFileUpload.ItemPreviewImage className="size-full object-cover" />
                </ArkFileUpload.ItemPreview>
                <ArkFileUpload.ItemPreview
                  type=".*"
                  className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-muted text-muted-foreground"
                >
                  <FileIcon className="size-3.5" />
                </ArkFileUpload.ItemPreview>
                <div className="flex min-w-0 flex-1 flex-col">
                  <ArkFileUpload.ItemName className="truncate text-sm font-medium" />
                  <ArkFileUpload.ItemSizeText className="text-xs text-subtle-foreground" />
                </div>
                <ArkFileUpload.ItemDeleteTrigger
                  aria-label={`Remove ${file.name}`}
                  className="flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <XIcon className="size-3" />
                </ArkFileUpload.ItemDeleteTrigger>
              </ArkFileUpload.Item>
            ))
          }
        </ArkFileUpload.Context>
      </ArkFileUpload.ItemGroup>
      <ArkFileUpload.HiddenInput />
    </ArkFileUpload.Root>
  )
}

export { FileUpload, type FileUploadProps }
