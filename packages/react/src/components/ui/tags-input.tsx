import { TagsInput as ArkTagsInput } from '@ark-ui/react/tags-input'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const tagColors = [
  'bg-tag-gray-bg text-tag-gray',
  'bg-tag-brown-bg text-tag-brown',
  'bg-tag-orange-bg text-tag-orange',
  'bg-tag-yellow-bg text-tag-yellow',
  'bg-tag-green-bg text-tag-green',
  'bg-tag-blue-bg text-tag-blue',
  'bg-tag-purple-bg text-tag-purple',
  'bg-tag-pink-bg text-tag-pink',
  'bg-tag-red-bg text-tag-red',
]

/** Stable color per tag value, like Notion's multi-select. */
function tagColor(value: string) {
  let hash = 0
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return tagColors[Math.abs(hash) % tagColors.length]
}

type TagsInputProps = ArkTagsInput.RootProps & {
  placeholder?: string
  /** Color tags by their value (default) or render them all neutral. */
  colorful?: boolean
}

function TagsInput({ className, placeholder = 'Add tag…', colorful = true, id, ids, ...props }: TagsInputProps) {
  return (
    <ArkTagsInput.Root
      data-slot="tags-input"
      id={id}
      ids={id ? { input: id, ...ids } : ids}
      className={cn('w-full', className)}
      {...props}
    >
      <ArkTagsInput.Context>
        {(api) => (
          <ArkTagsInput.Control className="flex min-h-6 w-full flex-wrap items-center gap-1 rounded-sm border border-input bg-input-background px-1.5 py-[3px] transition-[border-color,box-shadow] duration-75 focus-within:border-brand/60 focus-within:ring-2 focus-within:ring-ring data-disabled:opacity-50">
            {api.value.map((value, index) => (
              <ArkTagsInput.Item key={`${value}-${index}`} index={index} value={value}>
                <ArkTagsInput.ItemPreview
                  className={cn(
                    'inline-flex items-center gap-0.5 rounded-xs py-px pr-0.5 pl-1.5 text-xs leading-[14px] data-highlighted:ring-2 data-highlighted:ring-ring',
                    colorful ? tagColor(value) : 'bg-tag-default-bg text-tag-default',
                  )}
                >
                  <ArkTagsInput.ItemText>{value}</ArkTagsInput.ItemText>
                  <ArkTagsInput.ItemDeleteTrigger
                    aria-label={`Remove ${value}`}
                    className="flex size-3.5 items-center justify-center rounded-xs opacity-60 hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10"
                  >
                    <XIcon className="size-2.5" />
                  </ArkTagsInput.ItemDeleteTrigger>
                </ArkTagsInput.ItemPreview>
                <ArkTagsInput.ItemInput className="w-20 rounded-xs bg-transparent px-1 text-xs outline-none ring-1 ring-ring" />
              </ArkTagsInput.Item>
            ))}
            <ArkTagsInput.Input
              placeholder={placeholder}
              className="h-[18px] min-w-16 flex-1 bg-transparent px-0.5 text-sm outline-none placeholder:text-subtle-foreground"
            />
          </ArkTagsInput.Control>
        )}
      </ArkTagsInput.Context>
      <ArkTagsInput.HiddenInput />
    </ArkTagsInput.Root>
  )
}

export { TagsInput, tagColor, type TagsInputProps }
