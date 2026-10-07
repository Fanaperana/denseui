import { Fragment } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const tags = Array.from({ length: 40 }, (_, i) => `v1.2.0-beta.${40 - i}`)

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-56 w-48 rounded-lg border border-border">
      <div className="p-3">
        <h4 className="mb-2 text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-1.5" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
